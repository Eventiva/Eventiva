#!/usr/bin/env node
import type { CommandExecutor } from '@effect/platform/CommandExecutor';
import * as Effect from 'effect/Effect';
import { captureStdout, exitCodeInherit, exitCodeSilent } from '../src/cluster-shell.js';
import { runClusterCli } from '../src/cli-run.js';
import { CLUSTER_FPK_OUT } from '../src/cluster-fpk-paths.js';

const cwd = process.cwd();
const rolloutTimeoutSeconds = Number(process.env.EVENTIVA_CLUSTER_ROLLOUT_TIMEOUT_SECONDS ?? '90');

const deploymentMap: Record<string, readonly [string, string]> = {
    postgres: ['postgres', 'postgres'],
    'shard-manager': ['shard-manager', 'shard-manager'],
    runner: ['runner', 'runner'],
    workload: ['eventiva-workload', 'eventiva-workload'],
};

const program: Effect.Effect<number, unknown, CommandExecutor> = Effect.gen(function* () {
    if ((yield* exitCodeSilent(cwd, 'which', ['kubectl'])) !== 0) {
        console.error('kubectl not found; cluster run requires a reachable Kubernetes cluster.');
        return 1;
    }
    if ((yield* exitCodeSilent(cwd, 'kubectl', ['cluster-info'])) !== 0) {
        console.error('kubectl is available but no Kubernetes cluster is reachable.');
        return 1;
    }

    const buildImages = process.env.EVENTIVA_CLUSTER_BUILD_IMAGES !== '0';
    if (buildImages) {
        const b = yield* exitCodeInherit(cwd, 'pnpm', ['exec', 'nx', 'run', 'cluster-tooling:build-local-images']);
        if (b !== 0) {
            return b;
        }
    }

    const r = yield* exitCodeInherit(cwd, 'pnpm', ['exec', 'nx', 'run', 'cluster-tooling:render-fpk']);
    if (r !== 0) {
        return r;
    }

    const a = yield* exitCodeInherit(cwd, 'kubectl', ['apply', '-R', '-f', CLUSTER_FPK_OUT]);
    if (a !== 0) {
        return a;
    }

    const requiredDeployments = (process.env.EVENTIVA_CLUSTER_REQUIRED_DEPLOYMENTS ?? 'postgres,workload')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    const deployments = requiredDeployments.map((name) => deploymentMap[name]).filter(Boolean);
    if (deployments.length === 0) {
        console.error('No valid deployments selected. Set EVENTIVA_CLUSTER_REQUIRED_DEPLOYMENTS to known values.');
        return 1;
    }

    for (const [namespace, deployment] of deployments) {
        const rollout = yield* exitCodeInherit(cwd, 'kubectl', [
            'rollout',
            'status',
            `deployment/${deployment}`,
            '-n',
            namespace,
            `--timeout=${rolloutTimeoutSeconds}s`,
        ]);
        if (rollout !== 0) {
            console.error(`Rollout failed for deployment/${deployment} in namespace ${namespace}.`);
            const podListed = yield* Effect.either(
                captureStdout(cwd, 'kubectl', [
                    'get',
                    'pods',
                    '-n',
                    namespace,
                    '-l',
                    `app=${deployment}`,
                    '-o',
                    'jsonpath={range .items[*]}{.metadata.name}{"\\t"}{.status.phase}{"\\t"}{.status.containerStatuses[0].state.waiting.reason}{"\\n"}{end}',
                ]),
            );
            const podStateOutput =
                podListed._tag === 'Right' ? podListed.right.trim() : '';
            if (podStateOutput.includes('ImagePullBackOff') || podStateOutput.includes('ErrImagePull')) {
                console.error(
                    [
                        `Image pull failed for ${deployment}.`,
                        'Set a reachable image for your runtime, for example:',
                        `- EVENTIVA_SHARD_MANAGER_IMAGE (for shard-manager)`,
                        `- EVENTIVA_RUNNER_IMAGE (for runner)`,
                        `- EVENTIVA_WORKLOAD_IMAGE (for eventiva-workload)`,
                        'If using Kind with local images, build/load them into the cluster first.',
                    ].join('\n'),
                );
            }
            yield* exitCodeInherit(cwd, 'kubectl', ['get', 'pods', '-n', namespace, '-o', 'wide']);
            yield* exitCodeInherit(cwd, 'kubectl', ['describe', 'deployment', deployment, '-n', namespace]);
            return rollout;
        }
    }

    const namespace = process.env.EVENTIVA_LOG_NAMESPACE ?? 'eventiva-workload';
    const selector = process.env.EVENTIVA_LOG_SELECTOR ?? 'app=eventiva-workload';
    return yield* exitCodeInherit(cwd, 'kubectl', [
        'logs',
        '-n',
        namespace,
        '-l',
        selector,
        '--tail=200',
        '--follow',
    ]);
});

runClusterCli(program);
