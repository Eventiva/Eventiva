#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const run = (cmd, args) => spawnSync(cmd, args, { stdio: 'inherit', cwd: process.cwd() });
const runCapture = (cmd, args) =>
    spawnSync(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], cwd: process.cwd(), encoding: 'utf8' });
const check = (cmd, args) => spawnSync(cmd, args, { stdio: 'ignore', cwd: process.cwd() }).status === 0;

const hasKubectl = check('which', ['kubectl']);
if (!hasKubectl) {
    console.error('kubectl not found; cannot wait for rollout.');
    process.exit(1);
}

const hasCluster = check('kubectl', ['cluster-info']);
if (!hasCluster) {
    console.error('kubectl is available but no Kubernetes cluster is reachable.');
    process.exit(1);
}

const rolloutTimeoutSeconds = Number(process.env.EVENTIVA_CLUSTER_ROLLOUT_TIMEOUT_SECONDS ?? '180');
const deploymentMap = {
    postgres: ['postgres', 'postgres'],
    'shard-manager': ['shard-manager', 'shard-manager'],
    runner: ['runner', 'runner'],
    workload: ['eventiva-workload', 'eventiva-workload'],
};

const requiredDeployments = (process.env.EVENTIVA_CLUSTER_REQUIRED_DEPLOYMENTS ?? 'postgres,workload')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
const deployments = requiredDeployments.map((name) => deploymentMap[name]).filter(Boolean);

if (deployments.length === 0) {
    console.error('No valid deployments selected. Set EVENTIVA_CLUSTER_REQUIRED_DEPLOYMENTS to known values.');
    process.exit(1);
}

for (const [namespace, deployment] of deployments) {
    const rollout = run('kubectl', [
        'rollout',
        'status',
        `deployment/${deployment}`,
        '-n',
        namespace,
        `--timeout=${rolloutTimeoutSeconds}s`,
    ]);
    if ((rollout.status ?? 1) !== 0) {
        console.error(`Rollout failed for deployment/${deployment} in namespace ${namespace}.`);
        const podStates = runCapture('kubectl', [
            'get',
            'pods',
            '-n',
            namespace,
            '-l',
            `app=${deployment}`,
            '-o',
            'jsonpath={range .items[*]}{.metadata.name}{"\\t"}{.status.phase}{"\\t"}{.status.containerStatuses[0].state.waiting.reason}{"\\n"}{end}',
        ]);
        const podStateOutput = (podStates.stdout ?? '').trim();
        if (podStateOutput.includes('ImagePullBackOff') || podStateOutput.includes('ErrImagePull')) {
            console.error(
                [
                    `Image pull failed for ${deployment}.`,
                    'Set a reachable image for your runtime, for example:',
                    `- EVENTIVA_SHARD_MANAGER_IMAGE (for shard-manager)`,
                    `- EVENTIVA_RUNNER_IMAGE (for runner)`,
                    `- EVENTIVA_WORKLOAD_IMAGE (for eventiva-workload)`,
                    'If using Kind with local images, build/load them into the cluster first.',
                ].join('\n')
            );
        }
        run('kubectl', ['get', 'pods', '-n', namespace, '-o', 'wide']);
        run('kubectl', ['describe', 'deployment', deployment, '-n', namespace]);
        process.exit(rollout.status ?? 1);
    }
}
