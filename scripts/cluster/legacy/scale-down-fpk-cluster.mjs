#!/usr/bin/env node
/**
 * Scale all Deployments in the FPK demo namespaces to zero replicas (workloads + DBs stop; PVCs remain).
 */
import { spawnSync } from 'node:child_process';

const run = (cmd, args) => spawnSync(cmd, args, { stdio: 'inherit', cwd: process.cwd(), encoding: 'utf8' });
const check = (cmd, args) => spawnSync(cmd, args, { stdio: 'ignore', cwd: process.cwd() }).status === 0;

const hasKubectl = check('which', ['kubectl']);
const hasCluster = hasKubectl && check('kubectl', ['cluster-info']);
if (!hasKubectl) {
    console.warn('kubectl not found; nothing to scale.');
    process.exit(0);
}
if (!hasCluster) {
    console.warn('kubectl is available but no Kubernetes cluster is reachable.');
    process.exit(0);
}

const namespaces = (process.env.EVENTIVA_CLUSTER_SCALE_NAMESPACES ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

const defaultNamespaces = [
    'postgres',
    'mysql',
    'shard-manager',
    'shard-manager-mysql',
    'battleships',
    'battleships-mysql',
    'shooter',
    'speed-shooter',
    'slow-shooter',
    'shooter-mysql',
    'speed-shooter-mysql',
    'slow-shooter-mysql',
    'runner',
    'eventiva-workload',
];

const targetNs = namespaces.length > 0 ? namespaces : defaultNamespaces;

for (const ns of targetNs) {
    const list = spawnSync(
        'kubectl',
        ['get', 'deploy', '-n', ns, '-o', 'jsonpath={.items[*].metadata.name}'],
        { cwd: process.cwd(), encoding: 'utf8' }
    );
    if ((list.status ?? 1) !== 0) {
        continue;
    }
    const names = (list.stdout ?? '').trim().split(/\s+/).filter(Boolean);
    for (const name of names) {
        run('kubectl', ['scale', `deployment/${name}`, '-n', ns, '--replicas=0']);
    }
}

console.log('Scale-down complete (replicas=0 for deployments in target namespaces).');
