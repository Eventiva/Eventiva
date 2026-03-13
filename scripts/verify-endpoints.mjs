#!/usr/bin/env node
/**
 * Verify RPC/HTTP endpoints and /api/docs after two-phase startup.
 * Spawns platforms-default:run, waits for port 3000, then curls contacts, hello-worlds, and /api/docs.
 */
import { spawn } from 'child_process';
import { createConnection } from 'net';
import http from 'http';

const PORT = 3000;
const MAX_WAIT_MS = 90000;

function waitForPort(port, timeoutMs) {
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

function httpPost(path, body) {
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
                let buf = '';
                res.on('data', (c) => (buf += c));
                res.on('end', () => resolve({ status: res.statusCode, body: buf }));
            }
        );
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

function httpGet(path) {
    return new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${PORT}${path}`, (res) => {
            let buf = '';
            res.on('data', (c) => (buf += c));
            res.on('end', () => resolve({ status: res.statusCode, body: buf }));
        }).on('error', reject);
    });
}

async function main() {
    const child = spawn('npx', ['nx', 'run', 'platforms-default:run'], {
        cwd: process.cwd(),
        stdio: ['ignore', 'pipe', 'pipe'],
        detached: true,
    });
    child.unref();

    let exitCode = null;
    child.on('exit', (code) => {
        exitCode = code;
    });

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
        console.log(helloRes.status === 200 ? 'PASS (hello-worlds)' : 'FAIL (hello-worlds)\n');

        const docsRes = await httpGet('/api/docs');
        console.log('\nGET /api/docs ->', docsRes.status);
        console.log(docsRes.status === 200 ? 'PASS (Swagger)' : 'FAIL (Swagger)');

        process.exit(contactOk ? 0 : 1);
    } catch (e) {
        console.error(e);
        process.kill(-child.pid, 'SIGTERM');
        process.exit(1);
    }
}

main();
