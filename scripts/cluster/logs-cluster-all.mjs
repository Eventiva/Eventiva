#!/usr/bin/env node
/**
 * Follow logs from all Eventiva cluster components in parallel, with a tag prefix per stream.
 * Requires kubectl. Optional: install `stern` and use `stern '.*' -n postgres -n shard-manager ...`
 * for a single-process alternative with colors.
 */
import { spawn, spawnSync } from 'node:child_process';

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
const streams = [
    { ns: 'postgres', label: 'app=postgres', tag: 'postgres' },
    { ns: 'shard-manager', label: 'app=shard-manager', tag: 'shard-manager' },
    { ns: 'runner', label: 'app=runner', tag: 'runner' },
    { ns: 'eventiva-workload', label: 'app=eventiva-workload', tag: 'workload' },
];

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
