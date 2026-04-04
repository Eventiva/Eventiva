import type { CommandExecutor } from '@effect/platform/CommandExecutor';
import { NodeContext } from '@effect/platform-node';
import * as Effect from 'effect/Effect';
import { captureStdout, exitCodeInherit, exitCodeSilent } from './cluster-shell.js';
import { resolveRolloutDeployments } from './rollout.js';

export type WaitRolloutRequirements = CommandExecutor;

export const waitRolloutProgram = (cwd: string): Effect.Effect<number, unknown, WaitRolloutRequirements> =>
    Effect.gen(function* () {
        const whichCode = yield* exitCodeSilent(cwd, 'which', ['kubectl']);
        if (whichCode !== 0) {
            console.error('kubectl not found; cannot wait for rollout.');
            return 1;
        }

        const clusterInfoCode = yield* exitCodeSilent(cwd, 'kubectl', ['cluster-info']);
        if (clusterInfoCode !== 0) {
            console.error('kubectl is available but no Kubernetes cluster is reachable.');
            return 1;
        }

        const rolloutTimeoutSeconds = Number(process.env.EVENTIVA_CLUSTER_ROLLOUT_TIMEOUT_SECONDS ?? '180');

        let deployments: ReturnType<typeof resolveRolloutDeployments>;
        try {
            deployments = resolveRolloutDeployments();
        } catch (e) {
            console.error((e as Error).message);
            return 1;
        }

        if (deployments.length === 0) {
            console.error('No valid deployments selected. Set EVENTIVA_CLUSTER_REQUIRED_DEPLOYMENTS to known values.');
            return 1;
        }

        if (process.env.EVENTIVA_CLUSTER_RESTART_RUNTIME_DEPLOYMENTS === '1') {
            for (const [namespace, deployment] of [
                ['runner', 'runner'],
                ['eventiva-workload', 'eventiva-workload'],
            ] as const) {
                yield* exitCodeInherit(cwd, 'kubectl', [
                    'rollout',
                    'restart',
                    `deployment/${deployment}`,
                    '-n',
                    namespace,
                ]);
            }
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
                const podStateOutput = (
                    yield* captureStdout(cwd, 'kubectl', [
                        'get',
                        'pods',
                        '-n',
                        namespace,
                        '-l',
                        `app=${deployment}`,
                        '-o',
                        'jsonpath={range .items[*]}{.metadata.name}{"\\t"}{.status.phase}{"\\t"}{.status.containerStatuses[0].state.waiting.reason}{"\\n"}{end}',
                    ])
                ).trim();
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
        return 0;
    });

export const waitRolloutSync = (cwd: string): Promise<number> =>
    Effect.runPromise(waitRolloutProgram(cwd).pipe(Effect.provide(NodeContext.layer)));
