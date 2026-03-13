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
const REQUEST_TIMEOUT_MS = 30000;

/**
 * Waits until the given TCP port on 127.0.0.1 accepts a connection or the timeout elapses.
 * @param {number} port - TCP port number to check.
 * @param {number} timeoutMs - Maximum wait time in milliseconds.
 * @returns {Promise<void>} Resolves when a connection to the port is successful, rejects with an Error if the port is not open within `timeoutMs`.
 */
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

/**
 * Send a JSON HTTP POST to the local server at the given path on 127.0.0.1:PORT and return the response.
 * @param {string} path - Request path, including any leading slash (e.g. `/api/rpc/contacts`).
 * @param {*} body - Value to be serialized as the JSON request body.
 * @returns {{status: number, body: string}} The HTTP response status code and the response body as a string.
 */
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
                res.on('end', () => {
                    clearTimeout(timer);
                    resolve({ status: res.statusCode, body: buf });
                });
            }
        );
        const timer = setTimeout(() => {
            req.destroy();
            reject(new Error(`Request timeout after ${REQUEST_TIMEOUT_MS}ms: POST ${path}`));
        }, REQUEST_TIMEOUT_MS);
        req.on('error', (err) => {
            clearTimeout(timer);
            reject(err);
        });
        req.write(data);
        req.end();
    });
}

/**
 * Perform an HTTP GET against the local server and return the response.
 * @param {string} path - Request path on the local server (should begin with `/`).
 * @returns {Promise<{status: number, body: string}>} An object with HTTP `status` and response `body`.
 */
function httpGet(path) {
    return new Promise((resolve, reject) => {
        const req = http.get(`http://127.0.0.1:${PORT}${path}`, (res) => {
            let buf = '';
            res.on('data', (c) => (buf += c));
            res.on('end', () => {
                clearTimeout(timer);
                resolve({ status: res.statusCode, body: buf });
            });
        });
        const timer = setTimeout(() => {
            req.destroy();
            reject(new Error(`Request timeout after ${REQUEST_TIMEOUT_MS}ms: GET ${path}`));
        }, REQUEST_TIMEOUT_MS);
        req.on('error', (err) => {
            clearTimeout(timer);
            reject(err);
        });
    });
}

/**
 * Verifies runtime endpoints by starting the platform, probing port 3000, calling specific HTTP endpoints and exiting with success or failure.
 *
 * Starts a detached platform process, waits for the configured port to become available, sends POST requests to the RPC contacts and hello-worlds endpoints and a GET to /api/docs, logs status snippets for each response, and exits with code 0 if the contacts check passes (no "Unknown pathPrefix" in the response) or 1 otherwise. On error it terminates the spawned process group and exits with code 1.
 */
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
        const helloOk = helloRes.status === 200 && !helloRes.body.includes('Unknown pathPrefix');
        console.log(helloOk ? 'PASS (hello-worlds)' : 'FAIL (hello-worlds)\n');

        const docsRes = await httpGet('/api/docs');
        console.log('\nGET /api/docs ->', docsRes.status);
        console.log(docsRes.status === 200 ? 'PASS (Swagger)' : 'FAIL (Swagger)');

        process.kill(-child.pid, 'SIGTERM');
        process.exit(contactOk ? 0 : 1);
    } catch (e) {
        console.error(e);
        process.kill(-child.pid, 'SIGTERM');
        process.exit(1);
    }
}

main();
