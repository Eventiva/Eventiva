#!/usr/bin/env node
/**
 * Postgres + Contact E2E via Nx (matches docs/plans/pg_e2e_verification plan).
 * Spawns `pnpm nx run platforms-postgresql:run`, then exercises RPC + REST CRUD and optionally validates `psql \\d contact`.
 *
 * `which psql` uses @effect/platform Command; detached platform spawn stays on `node:child_process`.
 *
 * Env (defaults suit local postgres/postgres/postgres on localhost:5432):
 * - CONTACT_SEED_ENABLED=false recommended for stable counts
 * - EVENTIVA_DATABASE, PGPORT, PGUSER, PGPASSWORD, HOST, DATABASE
 * - SKIP_PSQL=1 — skip `psql` table checks
 * - PG_E2E_RESET=1 — `DELETE FROM contact` before run (data only; does not fix stale FKs)
 * - PG_E2E_SCHEMA_RESET=1 — `DROP TABLE contact` + `_created_by_placeholder` then restart (required after
 *   `created_by` FK target changes; `CREATE TABLE IF NOT EXISTS` never migrates existing tables)
 * - PG_E2E_SKIP_PLATFORM_START=1 — do not spawn `nx run platforms-postgresql:run`; use an API already reachable
 *   on `PG_E2E_HTTP_HOST`:`EVENTIVA_HTTP_PORT` (e.g. after `kubectl port-forward` from the cluster workload).
 *   Use `SKIP_PSQL=1` unless Postgres is port-forwarded to localhost or psql targets the cluster DB.
 * - PG_E2E_SKIP_RUNNER_RPC_WAIT=1 — do not wait for `EVENTIVA_CLUSTER_RUNNER_RPC_PORT` (TCP inter-runner RPC).
 * - PG_E2E_RUNNER_RPC_HOST — host for runner RPC wait (default: same as `PG_E2E_HTTP_HOST`).
 */
import { execFileSync, spawn, type ChildProcess } from 'node:child_process';
import { createConnection } from 'node:net';
import http from 'node:http';
import { runPromiseWithNode } from '../src/cli-run.js';
import { exitCodeSilent } from '../src/cluster-shell.js';

const cwd = process.cwd();

/** Entity HTTP server port (must match `EVENTIVA_HTTP_PORT` on the platform). */
const HTTP_PORT = Number(process.env.EVENTIVA_HTTP_PORT ?? 3000);
/** Host for HTTP checks (use 127.0.0.1 with kubectl port-forward). */
const HTTP_HOST = process.env.PG_E2E_HTTP_HOST ?? '127.0.0.1';
/** TCP port for @effect/cluster runner RPC (`SocketRunner`); must match `EVENTIVA_CLUSTER_RUNNER_RPC_PORT`. */
const RUNNER_RPC_PORT = Number(process.env.EVENTIVA_CLUSTER_RUNNER_RPC_PORT ?? '34431');
const RUNNER_RPC_HOST = process.env.PG_E2E_RUNNER_RPC_HOST ?? HTTP_HOST;
const SKIP_PLATFORM_START = process.env.PG_E2E_SKIP_PLATFORM_START === '1';
const SKIP_RUNNER_RPC_WAIT = process.env.PG_E2E_SKIP_RUNNER_RPC_WAIT === '1';
const MAX_WAIT_MS = 120000;
/** Cluster entity round-trips can exceed 20s on cold start; keep generous for CI/local. */
const REQUEST_TIMEOUT_MS = Number(process.env.PG_E2E_HTTP_TIMEOUT_MS ?? 90000);

function waitForPort(port: number, timeoutMs: number, host = HTTP_HOST): Promise<void> {
    return new Promise((resolve, reject) => {
        const deadline = Date.now() + timeoutMs;
        const tryConnect = () => {
            const socket = createConnection(port, host, () => {
                socket.destroy();
                resolve();
            });
            socket.on('error', () => {
                if (Date.now() > deadline) {
                    reject(new Error(`Port ${host}:${port} not open after ${timeoutMs}ms`));
                    return;
                }
                setTimeout(tryConnect, 1500);
            });
        };
        tryConnect();
    });
}

function httpRequest(method: string, path: string, body?: unknown): Promise<{ status: number; body: string }> {
    return new Promise((resolve, reject) => {
        const data = body != null ? JSON.stringify(body) : undefined;
        const req = http.request(
            {
                hostname: HTTP_HOST,
                port: HTTP_PORT,
                path,
                method,
                headers:
                    data != null
                        ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
                        : {},
            },
            (res) => {
                clearTimeout(timeoutId);
                let buf = '';
                res.on('data', (c) => (buf += c));
                res.on('end', () => resolve({ status: res.statusCode ?? 0, body: buf }));
            },
        );
        const timeoutId = setTimeout(() => req.destroy(new Error('Request timed out')), REQUEST_TIMEOUT_MS);
        req.on('error', (err) => {
            clearTimeout(timeoutId);
            reject(err);
        });
        if (data != null) req.write(data);
        req.end();
    });
}

const httpGet = (path: string) => httpRequest('GET', path);
const httpPost = (path: string, body: unknown) => httpRequest('POST', path, body);
const httpPatch = (path: string, body: unknown) => httpRequest('PATCH', path, body);
const httpDelete = (path: string) => httpRequest('DELETE', path);

function parseList(body: string): unknown[] {
    const j = JSON.parse(body) as unknown;
    if (Array.isArray(j)) return j;
    if (j && typeof j === 'object' && j !== null && 'success' in j) {
        const s = (j as { success: unknown }).success;
        if (Array.isArray(s)) return s;
    }
    throw new Error(`Expected JSON array or { success: [] }, got: ${body.slice(0, 200)}`);
}

function listLen(body: string): number {
    return parseList(body).length;
}

function parseCreateId(body: string): string {
    const j = JSON.parse(body) as Record<string, unknown>;
    if (j && typeof j.id === 'string') return j.id;
    if (j && j.success && typeof j.success === 'object' && j.success !== null) {
        const s = j.success as { id?: unknown };
        if (typeof s.id === 'string') return s.id;
    }
    throw new Error(`Expected { id } from create, got: ${body.slice(0, 200)}`);
}

async function hasPsql(): Promise<boolean> {
    if (process.platform === 'win32') return false;
    const code = await runPromiseWithNode(exitCodeSilent(cwd, 'which', ['psql']));
    return code === 0;
}

async function psqlDescribeContact(env: NodeJS.ProcessEnv): Promise<boolean> {
    if (process.env.SKIP_PSQL === '1' || !(await hasPsql())) {
        console.log('SKIP psql \\d contact (SKIP_PSQL=1 or psql not found)');
        return true;
    }
    let out = '';
    try {
        out = execFileSync('psql', ['-v', 'ON_ERROR_STOP=1', '-c', '\\d contact'], {
            env,
            encoding: 'utf-8',
            stdio: ['ignore', 'pipe', 'pipe'],
        });
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error('psql \\d contact failed:', msg);
        return false;
    }
    const ok =
        out.includes('firstname') &&
        out.includes('lastname') &&
        out.includes('date_of_birth') &&
        out.includes('email') &&
        out.includes('phone');
    if (!ok) {
        console.error('psql \\d contact output missing expected columns:\n', out.slice(0, 2000));
        return false;
    }
    console.log('PASS psql \\d contact (columns present)');
    return true;
}

/** Ensures `contact.created_by` FK references `contact`, not `_created_by_placeholder` (stale DB symptom). */
async function psqlVerifyContactCreatedByFk(env: NodeJS.ProcessEnv): Promise<boolean> {
    if (process.env.SKIP_PSQL === '1' || !(await hasPsql())) {
        console.log('SKIP created_by FK check (SKIP_PSQL=1 or psql not found)');
        return true;
    }
    const sql = `
SELECT pg_get_constraintdef(c.oid) AS def
FROM pg_constraint c
WHERE c.conrelid = 'public.contact'::regclass
  AND c.contype = 'f'
  AND pg_get_constraintdef(c.oid) ILIKE '%created_by%';
`;
    let out = '';
    try {
        out = execFileSync('psql', ['-v', 'ON_ERROR_STOP=1', '-t', '-A', '-c', sql], {
            env,
            encoding: 'utf-8',
            stdio: ['ignore', 'pipe', 'pipe'],
        });
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error('psql created_by FK check failed:', msg);
        return false;
    }
    const lines = out
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
    const bad = lines.some((line) => line.includes('_created_by_placeholder'));
    const good = lines.some(
        (line) => /REFERENCES\s+"?contact"?/i.test(line) || line.includes('REFERENCES public.contact'),
    );
    if (bad || !good) {
        console.error(
            'contact.created_by FK must reference contact(id), not _created_by_placeholder.\n' +
                'Run once with PG_E2E_SCHEMA_RESET=1 (or drop contact + placeholder manually).\n' +
                'Got:\n',
            lines.join('\n') || '(no matching FK rows)',
        );
        return false;
    }
    console.log('PASS psql created_by FK references contact');
    return true;
}

function mergeChildEnv(): NodeJS.ProcessEnv {
    const host = process.env.HOST ?? 'localhost';
    const database = process.env.DATABASE ?? 'postgres';
    return {
        ...process.env,
        CONTACT_SEED_ENABLED: process.env.CONTACT_SEED_ENABLED ?? 'false',
        EVENTIVA_DATABASE: process.env.EVENTIVA_DATABASE ?? 'postgres',
        EVENTIVA_CLUSTER_MODE: process.env.EVENTIVA_CLUSTER_MODE ?? 'distributed',
        PGPORT: process.env.PGPORT ?? '5432',
        PGUSER: process.env.PGUSER ?? 'postgres',
        PGPASSWORD: process.env.PGPASSWORD ?? 'postgres',
        HOST: host,
        DATABASE: database,
        /** libpq/psql read PGHOST/PGDATABASE; HOST/DATABASE alone are ignored by psql. */
        PGHOST: process.env.PGHOST ?? host,
        PGDATABASE: process.env.PGDATABASE ?? database,
    };
}

async function main(): Promise<void> {
    const childEnv = mergeChildEnv();

    if (process.env.PG_E2E_SCHEMA_RESET === '1' && (await hasPsql())) {
        console.log(
            'PG_E2E_SCHEMA_RESET=1: DROP contact + _created_by_placeholder (fresh DDL on next app start)...',
        );
        execFileSync(
            'psql',
            [
                '-v',
                'ON_ERROR_STOP=1',
                '-c',
                'DROP TABLE IF EXISTS "contact" CASCADE; DROP TABLE IF EXISTS "_created_by_placeholder" CASCADE;',
            ],
            { env: childEnv, stdio: 'inherit' },
        );
    }

    if (process.env.PG_E2E_RESET === '1' && (await hasPsql())) {
        console.log('PG_E2E_RESET=1: DELETE FROM contact;');
        execFileSync('psql', ['-v', 'ON_ERROR_STOP=1', '-c', 'DELETE FROM contact;'], {
            env: childEnv,
            stdio: 'inherit',
        });
    }

    const logPlatform = process.env.PG_E2E_LOG_PLATFORM === '1';
    const terminatePlatformChild = (c: ChildProcess | null) => {
        if (!c?.pid) return;
        try {
            if (logPlatform) {
                c.kill('SIGTERM');
            } else {
                process.kill(-c.pid, 'SIGTERM');
            }
        } catch {
            /* ignore kill errors */
        }
    };
    let child: ChildProcess | null = null;
    if (!SKIP_PLATFORM_START) {
        child = spawn('pnpm', ['nx', 'run', 'platforms-postgresql:run'], {
            cwd: process.cwd(),
            stdio: logPlatform ? 'inherit' : ['ignore', 'pipe', 'pipe'],
            detached: !logPlatform,
            env: childEnv,
        });
        if (!logPlatform) {
            child.unref();
        }
    }

    try {
        if (SKIP_PLATFORM_START) {
            console.log(
                `Waiting for HTTP ${HTTP_HOST}:${HTTP_PORT} (PG_E2E_SKIP_PLATFORM_START=1; ensure port-forward or local server)...`,
            );
        } else {
            console.log('Waiting for HTTP', HTTP_PORT, '(nx run platforms-postgresql:run)...');
        }
        await waitForPort(HTTP_PORT, MAX_WAIT_MS);

        if (!SKIP_RUNNER_RPC_WAIT) {
            console.log('Waiting for runner RPC TCP', `${RUNNER_RPC_HOST}:${RUNNER_RPC_PORT}`, '...');
            await waitForPort(RUNNER_RPC_PORT, MAX_WAIT_MS, RUNNER_RPC_HOST);
            console.log('PASS runner RPC TCP listening');
        }

        if (!(await psqlDescribeContact(childEnv))) {
            terminatePlatformChild(child);
            process.exit(1);
        }

        if (!(await psqlVerifyContactCreatedByFk(childEnv))) {
            terminatePlatformChild(child);
            process.exit(1);
        }

        const list0 = await httpGet('/api/contacts');
        if (list0.status !== 200) throw new Error(`GET /api/contacts -> ${list0.status}`);
        const c0 = listLen(list0.body);
        console.log('Initial GET /api/contacts count:', c0);

        const rpcList = await httpPost('/api/rpc/contacts', { method: 'list', payload: {} });
        if (rpcList.status !== 200 || rpcList.body.includes('Unknown pathPrefix')) {
            throw new Error(`RPC list failed: ${rpcList.status} ${rpcList.body.slice(0, 400)}`);
        }
        console.log('PASS POST /api/rpc/contacts list');

        const p1 = await httpPost('/api/contacts', {
            firstname: 'Nx',
            lastname: 'E2E One',
            dateOfBirth: '2001-01-01',
            email: `nx-e2e-1-${Date.now()}@test.dev`,
            phone: '+10001',
        });
        if (p1.status == null || p1.status < 200 || p1.status >= 300)
            throw new Error(`POST create 1 -> ${p1.status} ${p1.body}`);
        const id1 = parseCreateId(p1.body);

        const p2 = await httpPost('/api/contacts', {
            firstname: 'Nx',
            lastname: 'E2E Two',
            dateOfBirth: '2002-02-02',
            email: `nx-e2e-2-${Date.now()}@test.dev`,
            phone: '+10002',
        });
        if (p2.status == null || p2.status < 200 || p2.status >= 300)
            throw new Error(`POST create 2 -> ${p2.status} ${p2.body}`);
        const id2 = parseCreateId(p2.body);
        console.log('Created ids:', id1, id2);

        const fkChild = await httpPost('/api/contacts', {
            firstname: 'Nx',
            lastname: 'E2E CreatedByChild',
            dateOfBirth: '2003-03-03',
            email: `nx-e2e-fk-${Date.now()}@test.dev`,
            phone: '+10003',
            createdBy: id1,
        });
        if (fkChild.status == null || fkChild.status < 200 || fkChild.status >= 300) {
            throw new Error(
                `POST create with createdBy (self-FK) -> ${fkChild.status} ${fkChild.body?.slice?.(0, 500) ?? fkChild.body}`,
            );
        }
        const idFk = parseCreateId(fkChild.body);
        console.log('PASS POST create with createdBy ->', idFk);

        const rpcDelFk = await httpPost('/api/rpc/contacts', { method: 'delete', payload: { id: idFk } });
        if (rpcDelFk.status !== 200) throw new Error(`RPC delete fk child -> ${rpcDelFk.status}`);

        const list2 = await httpGet('/api/contacts');
        if (listLen(list2.body) !== c0 + 2) {
            throw new Error(`Expected ${c0 + 2} rows after creates, got ${listLen(list2.body)}`);
        }
        console.log('PASS list count after 2 creates (fk child removed)');

        const rpcUp = await httpPost('/api/rpc/contacts', {
            method: 'update',
            payload: { id: id1, patch: { firstname: 'Nx', lastname: 'E2E One Updated' } },
        });
        if (rpcUp.status !== 200) throw new Error(`RPC update -> ${rpcUp.status}`);

        const restPatch = await httpPatch(`/api/contacts/${id2}`, { phone: '+19999' });
        if (restPatch.status !== 200 && restPatch.status !== 204) {
            throw new Error(`PATCH -> ${restPatch.status} ${restPatch.body}`);
        }
        console.log('PASS RPC update + REST PATCH');

        const rpcDel = await httpPost('/api/rpc/contacts', { method: 'delete', payload: { id: id2 } });
        if (rpcDel.status !== 200) throw new Error(`RPC delete -> ${rpcDel.status}`);
        if (rpcDel.body.includes('Unknown method')) {
            throw new Error(`RPC delete not wired: ${rpcDel.body}`);
        }

        const listFinal = await httpGet('/api/contacts');
        if (listLen(listFinal.body) !== c0 + 1) {
            throw new Error(`Expected ${c0 + 1} rows after delete, got ${listLen(listFinal.body)}`);
        }
        console.log('PASS RPC delete + final list count');

        const restDel = await httpDelete(`/api/contacts/${id1}`);
        if (restDel.status !== 200 && restDel.status !== 204) {
            throw new Error(`REST DELETE -> ${restDel.status}`);
        }

        const listAfterRestDel = await httpGet('/api/contacts');
        if (listLen(listAfterRestDel.body) !== c0) {
            throw new Error(`Expected ${c0} rows after REST delete, got ${listLen(listAfterRestDel.body)}`);
        }
        console.log('PASS REST DELETE restored initial count');

        const docs = await httpGet('/api/docs');
        if (docs.status !== 200) throw new Error(`GET /api/docs -> ${docs.status}`);
        console.log('PASS GET /api/docs');

        console.log(
            SKIP_PLATFORM_START
                ? '\nAll Postgres E2E checks passed (external server).'
                : '\nAll Postgres E2E checks passed (via nx run platforms-postgresql:run).',
        );
        terminatePlatformChild(child);
        process.exit(0);
    } catch (e) {
        console.error(e);
        try {
            terminatePlatformChild(child);
        } catch {
            /* ignore */
        }
        process.exit(1);
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
