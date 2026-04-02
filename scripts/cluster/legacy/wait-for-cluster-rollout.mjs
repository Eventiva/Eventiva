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
    mysql: ['mysql', 'mysql'],
    'shard-manager': ['shard-manager', 'shard-manager'],
    'shard-manager-mysql': ['shard-manager-mysql', 'shard-manager-mysql'],
    battleships: ['battleships', 'battleships'],
    'battleships-mysql': ['battleships-mysql', 'battleships-mysql'],
    shooter: ['shooter', 'shooter'],
    'speed-shooter': ['speed-shooter', 'speed-shooter'],
    'slow-shooter': ['slow-shooter', 'slow-shooter'],
    'shooter-mysql': ['shooter-mysql', 'shooter-mysql'],
    'speed-shooter-mysql': ['speed-shooter-mysql', 'speed-shooter-mysql'],
    'slow-shooter-mysql': ['slow-shooter-mysql', 'slow-shooter-mysql'],
    runner: ['runner', 'runner'],
    workload: ['eventiva-workload', 'eventiva-workload'],
};

const stack = process.env.EVENTIVA_CLUSTER_STACK ?? process.env.EVENTIVA_CLUSTER_PROFILE ?? 'full';

/** Default rollout sets per stack (postgresql and mysql are independent). Override with EVENTIVA_CLUSTER_REQUIRED_DEPLOYMENTS. */
const stackDefaultRequired = {
    postgresql:
        'postgres,shard-manager,battleships,shooter,speed-shooter,slow-shooter',
    mysql: 'mysql,shard-manager-mysql,battleships-mysql,shooter-mysql,speed-shooter-mysql,slow-shooter-mysql',
    full: 'postgres,mysql,shard-manager,shard-manager-mysql,battleships,battleships-mysql,shooter,speed-shooter,slow-shooter,shooter-mysql,speed-shooter-mysql,slow-shooter-mysql',
};

let requiredDeploymentsRaw;
if (process.env.EVENTIVA_CLUSTER_REQUIRED_DEPLOYMENTS) {
    requiredDeploymentsRaw = process.env.EVENTIVA_CLUSTER_REQUIRED_DEPLOYMENTS;
} else {
    const def = stackDefaultRequired[stack];
    if (def === undefined) {
        console.error(
            `Unknown EVENTIVA_CLUSTER_STACK="${stack}". Use postgresql, mysql, or full (or set EVENTIVA_CLUSTER_REQUIRED_DEPLOYMENTS).`
        );
        process.exit(1);
    }
    requiredDeploymentsRaw = def;
}

const requiredDeployments = requiredDeploymentsRaw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
const deployments = requiredDeployments.map((name) => deploymentMap[name]).filter(Boolean);

// After a local image rebuild, `kubectl apply` may report deployments unchanged and pods keep the old image.
// Set EVENTIVA_CLUSTER_RESTART_RUNTIME_DEPLOYMENTS=1 to restart runner + workload before waiting (Kind/local dev).
if (process.env.EVENTIVA_CLUSTER_RESTART_RUNTIME_DEPLOYMENTS === '1') {
    for (const [namespace, deployment] of [
        ['runner', 'runner'],
        ['eventiva-workload', 'eventiva-workload'],
    ]) {
        run('kubectl', ['rollout', 'restart', `deployment/${deployment}`, '-n', namespace]);
    }
}

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
