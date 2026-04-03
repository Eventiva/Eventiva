#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const hasKubectl = spawnSync('which', ['kubectl'], { stdio: 'ignore', cwd: process.cwd() }).status === 0;
const hasCluster =
    hasKubectl && spawnSync('kubectl', ['cluster-info'], { stdio: 'ignore', cwd: process.cwd() }).status === 0;
if (!hasKubectl) {
    console.warn('kubectl not found; cluster status unavailable.');
    process.exit(0);
}
if (!hasCluster) {
    console.warn('kubectl is available but no Kubernetes cluster is reachable; cluster status unavailable.');
    process.exit(0);
}

const namespaces = ['postgres', 'shard-manager', 'runner', 'eventiva-workload'];

for (const ns of namespaces) {
    const r = spawnSync('kubectl', ['get', 'all', '-n', ns], { stdio: 'inherit', cwd: process.cwd() });
    if ((r.status ?? 0) !== 0) process.exit(r.status ?? 1);
}
