#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const run = (cmd, args) => spawnSync(cmd, args, { stdio: 'inherit', cwd: process.cwd() });
const hasKubectl = spawnSync('which', ['kubectl'], { stdio: 'ignore', cwd: process.cwd() }).status === 0;
const hasCluster =
    hasKubectl && spawnSync('kubectl', ['cluster-info'], { stdio: 'ignore', cwd: process.cwd() }).status === 0;
if (!existsSync('tools/cluster/out')) {
    console.error('Rendered manifests not found at tools/cluster/out. Run cluster:render first.');
    process.exit(1);
}

if (!hasKubectl) {
    console.warn('kubectl not found; skipping cluster apply and continuing with local runtime.');
    process.exit(0);
}

if (!hasCluster) {
    console.warn('kubectl is available but no Kubernetes cluster is reachable; skipping cluster apply.');
    process.exit(0);
}

/** postgresql | mysql | full — which manifest subtrees to apply (default: full). */
const stack = process.env.EVENTIVA_CLUSTER_STACK ?? process.env.EVENTIVA_CLUSTER_PROFILE ?? 'full';

const STACK_DIRS = {
    postgresql: ['pg', 'shard-manager', 'battleships', 'shooter', 'speed-shooter', 'slow-shooter'],
    mysql: [
        'mysql',
        'shard-manager-mysql',
        'battleships-mysql',
        'shooter-mysql',
        'speed-shooter-mysql',
        'slow-shooter-mysql',
    ],
};

if (stack === 'full') {
    const applied = run('kubectl', ['apply', '-R', '-f', 'tools/cluster/out']);
    process.exit(applied.status ?? 1);
}

const dirs = STACK_DIRS[stack];
if (!dirs) {
    console.error(
        `Unknown EVENTIVA_CLUSTER_STACK="${stack}". Use postgresql, mysql, or full (or set EVENTIVA_CLUSTER_PROFILE).`
    );
    process.exit(1);
}

const outRoot = 'tools/cluster/out';
for (const dir of dirs) {
    const manifestDir = join(outRoot, dir);
    if (!existsSync(manifestDir)) {
        console.warn(`Skipping missing manifest dir (run cluster:render): ${manifestDir}`);
        continue;
    }
    const applied = run('kubectl', ['apply', '-R', '-f', manifestDir]);
    if ((applied.status ?? 1) !== 0) {
        process.exit(applied.status ?? 1);
    }
}
process.exit(0);
