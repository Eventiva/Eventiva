#!/usr/bin/env node
/**
 * Verify RPC/HTTP endpoints and /api/docs after two-phase startup.
 * Spawns platforms-postgresql:run, waits for port 3000, then curls contacts, hello-worlds, and /api/docs.
 * Detached child process uses `node:child_process` (process group); HTTP uses `node:http`.
 */
import { spawn, type ChildProcess } from 'node:child_process';
import { createConnection } from 'node:net';
import http from 'node:http';

const PORT = 3000;
const MAX_WAIT_MS = 90000;
const REQUEST_TIMEOUT_MS = 15000;

function waitForPort(port: number, timeoutMs: number): Promise<void> {
    return new Promise((resolve, reject) => {
        const deadline = Date.now() + timeoutMs;
        const tryConnect = () => {
            const socket = createConnection(port, '127.0.0.1', () => {
                socket.destroy();
                resolve();
            });
            socket.on('error', () => {
                if (Date.now() > deadline) {
                    reject(new Error(`Port ${port} not open after ${timeoutMs}ms`));
                    return;
                }
                setTimeout(tryConnect, 1500);
            });
        };
        tryConnect();
    });
}

function httpPost(path: string, body: unknown): Promise<{ status: number; body: string }> {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);
        const req = http.request(
            {
                hostname: '127.0.0.1',
                port: PORT,
                path,
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) },
            },
            (res) => {
                clearTimeout(timeoutId);
                let buf = '';
                res.on('data', (c) => (buf += c));
                res.on('end', () => resolve({ status: res.statusCode ?? 0, body: buf }));
            },
        );
        const timeoutId = setTimeout(() => {
            req.destroy(new Error('Request timed out'));
        }, REQUEST_TIMEOUT_MS);
        req.on('error', (err) => {
            clearTimeout(timeoutId);
            reject(err);
        });
        req.write(data);
        req.end();
    });
}

function httpGet(path: string): Promise<{ status: number; body: string }> {
    return new Promise((resolve, reject) => {
        const req = http.get(`http://127.0.0.1:${PORT}${path}`, (res) => {
            clearTimeout(timeoutId);
            let buf = '';
            res.on('data', (c) => (buf += c));
            res.on('end', () => resolve({ status: res.statusCode ?? 0, body: buf }));
        });
        const timeoutId = setTimeout(() => {
            req.destroy(new Error('Request timed out'));
        }, REQUEST_TIMEOUT_MS);
        req.on('error', (err) => {
            clearTimeout(timeoutId);
            reject(err);
        });
    });
}

async function main(): Promise<void> {
    const child = spawn('pnpm', ['nx', 'run', 'platforms-postgresql:run'], {
        cwd: process.cwd(),
        stdio: ['ignore', 'pipe', 'pipe'],
        detached: true,
    }) as ChildProcess;
    child.unref();

    try {
        console.log('Waiting for port', PORT, '...');
        await waitForPort(PORT, MAX_WAIT_MS);
        console.log('Port', PORT, 'is open.\n');

        const contactRes = await httpPost('/api/rpc/contacts', { method: 'list', payload: {} });
        console.log('POST /api/rpc/contacts ->', contactRes.status);
        console.log(contactRes.body.slice(0, 300) + (contactRes.body.length > 300 ? '...' : ''));
        const contactOk = contactRes.status === 200 && !contactRes.body.includes('Unknown pathPrefix');
        console.log(contactOk ? 'PASS (contacts)' : 'FAIL (contacts)\n');

        const helloRes = await httpPost('/api/rpc/hello-worlds', { method: 'list', payload: {} });
        console.log('\nPOST /api/rpc/hello-worlds ->', helloRes.status);
        console.log(helloRes.body.slice(0, 200) + (helloRes.body.length > 200 ? '...' : ''));
        const helloOk = helloRes.status === 200;
        console.log(helloOk ? 'PASS (hello-worlds)' : 'FAIL (hello-worlds)\n');

        const docsRes = await httpGet('/api/docs');
        console.log('\nGET /api/docs ->', docsRes.status);
        const docsOk = docsRes.status === 200;
        console.log(docsOk ? 'PASS (Swagger)' : 'FAIL (Swagger)');

        const allOk = contactOk && helloOk && docsOk;
        process.exit(allOk ? 0 : 1);
    } catch (e) {
        console.error(e);
        if (child.pid) {
            try {
                process.kill(-child.pid, 'SIGTERM');
            } catch {
                /* ignore */
            }
        }
        process.exit(1);
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
