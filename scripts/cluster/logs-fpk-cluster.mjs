#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

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

const namespace = process.env.EVENTIVA_LOG_NAMESPACE ?? 'runner';
const selector = process.env.EVENTIVA_LOG_SELECTOR ?? 'app=runner';
const follow = process.env.EVENTIVA_LOG_FOLLOW === '1';
const args = ['logs', '-n', namespace, '-l', selector, '--tail=200'];
if (follow) args.push('--follow');

const result = spawnSync('kubectl', args, {
    stdio: 'inherit',
    cwd: process.cwd(),
});

process.exit(result.status ?? 1);
