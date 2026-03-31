#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

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

const applied = run('kubectl', ['apply', '-R', '-f', 'tools/cluster/out']);
process.exit(applied.status ?? 1);
