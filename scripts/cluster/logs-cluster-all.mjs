#!/usr/bin/env node
/**
 * Follow logs from all Eventiva cluster components in parallel, with a tag prefix per stream.
 * Requires kubectl. Optional: install `stern` and use `stern '.*' -n postgres -n mysql -n shard-manager ...`
 * for a single-process alternative with colors.
 *
 * Set EVENTIVA_CLUSTER_PORT_FORWARD=1 to also start kubectl port-forwards (Postgres + workload HTTP + runner RPC).
 * See scripts/cluster/port-forward-fpk-cluster.mjs for port env vars.
 */
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasKubectl = spawnSync('which', ['kubectl'], { stdio: 'ignore', cwd: process.cwd() }).status === 0;
const hasCluster =
    hasKubectl && spawnSync('kubectl', ['cluster-info'], { stdio: 'ignore', cwd: process.cwd() }).status === 0;
if (!hasKubectl) {
    console.warn('kubectl not found; cluster logs unavailable.');
    process.exit(0);
}
if (!hasCluster) {
    console.warn('kubectl is available but no Kubernetes cluster is reachable; cluster logs unavailable.');
    process.exit(0);
}

const tail = process.env.EVENTIVA_LOG_TAIL ?? '80';

/**
 * FPK-rendered demo (`tools/cluster/out`) + optional legacy runner/workload namespaces.
 *
 * `EVENTIVA_CLUSTER_LOG_PROFILE`:
 * - `full` (default): Postgres + MySQL stacks + legacy namespaces (if present).
 * - `postgresql`: Postgres stack only (postgres, shard-manager, battleships, shooters).
 * - `mysql`: MySQL stack only (mysql, shard-manager-mysql, battleships-mysql, shooter-mysql, …).
 */
const allStreams = [
    /** In-cluster broker (Redpanda); shared by Postgres and MySQL stacks. */
    { ns: 'kafka', label: 'app=redpanda', tag: 'kafka', profile: 'shared' },
    { ns: 'postgres', label: 'app=postgres', tag: 'postgres', profile: 'postgresql' },
    { ns: 'mysql', label: 'app=mysql', tag: 'mysql', profile: 'mysql' },
    { ns: 'shard-manager', label: 'app=shard-manager', tag: 'shard-manager', profile: 'postgresql' },
    { ns: 'shard-manager-mysql', label: 'app=shard-manager-mysql', tag: 'shard-manager-mysql', profile: 'mysql' },
    { ns: 'battleships', label: 'app=battleships', tag: 'battleships', profile: 'postgresql' },
    { ns: 'battleships-mysql', label: 'app=battleships-mysql', tag: 'battleships-mysql', profile: 'mysql' },
    { ns: 'shooter-mysql', label: 'app=shooter-mysql', tag: 'shooter-mysql', profile: 'mysql' },
    { ns: 'speed-shooter-mysql', label: 'app=speed-shooter-mysql', tag: 'speed-shooter-mysql', profile: 'mysql' },
    { ns: 'slow-shooter-mysql', label: 'app=slow-shooter-mysql', tag: 'slow-shooter-mysql', profile: 'mysql' },
    { ns: 'shooter', label: 'app=shooter', tag: 'shooter', profile: 'postgresql' },
    { ns: 'speed-shooter', label: 'app=speed-shooter', tag: 'speed-shooter', profile: 'postgresql' },
    { ns: 'slow-shooter', label: 'app=slow-shooter', tag: 'slow-shooter', profile: 'postgresql' },
    { ns: 'runner', label: 'app=runner', tag: 'runner', profile: 'legacy' },
    { ns: 'eventiva-workload', label: 'app=eventiva-workload', tag: 'workload', profile: 'legacy' },
];

const profile = process.env.EVENTIVA_CLUSTER_LOG_PROFILE ?? 'full';
let streams;
if (profile === 'full') {
    streams = allStreams;
} else if (profile === 'postgresql') {
    streams = allStreams.filter((s) => s.profile === 'postgresql' || s.profile === 'shared');
} else if (profile === 'mysql') {
    streams = allStreams.filter((s) => s.profile === 'mysql' || s.profile === 'shared');
} else {
    console.error(`Unknown EVENTIVA_CLUSTER_LOG_PROFILE="${profile}". Use full, postgresql, or mysql.`);
    process.exit(1);
}

function pipePrefixed(child, prefix) {
    const flush = (buf, chunk, out) => {
        buf.val += chunk.toString();
        const lines = buf.val.split('\n');
        buf.val = lines.pop() ?? '';
        for (const line of lines) {
            out.write(`${prefix}${line}\n`);
        }
    };
    const ob = { val: '' };
    const eb = { val: '' };
    child.stdout?.on('data', (c) => flush(ob, c, process.stdout));
    child.stderr?.on('data', (c) => flush(eb, c, process.stderr));
    child.on('close', () => {
        if (ob.val) process.stdout.write(`${prefix}${ob.val}\n`);
        if (eb.val) process.stderr.write(`${prefix}${eb.val}\n`);
    });
}

const children = [];

if (process.env.EVENTIVA_CLUSTER_PORT_FORWARD === '1') {
    const pfScript = path.join(__dirname, 'port-forward-fpk-cluster.mjs');
    const pf = spawn(process.execPath, [pfScript], {
        stdio: ['ignore', 'pipe', 'pipe'],
        cwd: process.cwd(),
    });
    const pfPrefix = '[port-forward] ';
    const flushPf = (buf, chunk, out) => {
        buf.val += chunk.toString();
        const lines = buf.val.split('\n');
        buf.val = lines.pop() ?? '';
        for (const line of lines) {
            out.write(`${pfPrefix}${line}\n`);
        }
    };
    const pfo = { val: '' };
    const pfe = { val: '' };
    pf.stdout?.on('data', (c) => flushPf(pfo, c, process.stdout));
    pf.stderr?.on('data', (c) => flushPf(pfe, c, process.stderr));
    pf.on('close', () => {
        if (pfo.val) process.stdout.write(`${pfPrefix}${pfo.val}\n`);
        if (pfe.val) process.stderr.write(`${pfPrefix}${pfe.val}\n`);
    });
    children.push(pf);
}

for (const { ns, label, tag } of streams) {
    const prefix = `[${tag}] `;
    const args = ['logs', '-n', ns, '-l', label, '--tail', tail, '--follow', '--prefix=true', '--timestamps=true'];
    const child = spawn('kubectl', args, {
        stdio: ['ignore', 'pipe', 'pipe'],
        cwd: process.cwd(),
    });
    pipePrefixed(child, prefix);
    child.on('exit', (code, signal) => {
        if (code !== 0 && code !== null) {
            process.stderr.write(`${prefix}(kubectl exited ${code}${signal ? ` signal ${signal}` : ''})\n`);
        }
    });
    children.push(child);
}

const shutdown = () => {
    for (const c of children) {
        try {
            c.kill('SIGTERM');
        } catch {
            /* ignore */
        }
    }
    process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
