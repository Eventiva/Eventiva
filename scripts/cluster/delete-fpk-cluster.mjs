#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const hasKubectl = spawnSync('which', ['kubectl'], { stdio: 'ignore', cwd: process.cwd() }).status === 0;
const hasCluster =
    hasKubectl && spawnSync('kubectl', ['cluster-info'], { stdio: 'ignore', cwd: process.cwd() }).status === 0;
if (!hasKubectl) {
    console.warn('kubectl not found; skipping cluster delete.');
    process.exit(0);
}
if (!hasCluster) {
    console.warn('kubectl is available but no Kubernetes cluster is reachable; skipping cluster delete.');
    process.exit(0);
}

const result = spawnSync('kubectl', ['delete', '-R', '-f', 'tools/cluster/out', '--ignore-not-found=true'], {
    stdio: 'inherit',
    cwd: process.cwd(),
});

process.exit(result.status ?? 1);
