#!/usr/bin/env node
/**
 * Follow logs from all Eventiva cluster components in parallel, with a tag prefix per stream.
 * Uses @effect/platform Command (`Command.start` + prefixed line streams).
 *
 * Set EVENTIVA_CLUSTER_PORT_FORWARD=1 to also start port-forward (tsx this package’s port-forward CLI).
 */
import type { CommandExecutor } from '@effect/platform/CommandExecutor';
import * as Effect from 'effect/Effect';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { exitCodeSilent } from '../src/cluster-shell.js';
import { runClusterCli } from '../src/cli-run.js';
import { awaitShutdownSignal, startPrefixedProcess } from '../src/prefixed-process.js';

const cwd = process.cwd();
const cliDir = path.dirname(fileURLToPath(import.meta.url));
const tail = process.env.EVENTIVA_LOG_TAIL ?? '80';

const allStreams = [
    { ns: 'kafka', label: 'app=redpanda', tag: 'kafka', profile: 'shared' as const },
    { ns: 'postgres', label: 'app=postgres', tag: 'postgres', profile: 'postgresql' as const },
    { ns: 'mysql', label: 'app=mysql', tag: 'mysql', profile: 'mysql' as const },
    { ns: 'shard-manager', label: 'app=shard-manager', tag: 'shard-manager', profile: 'postgresql' as const },
    {
        ns: 'shard-manager-mysql',
        label: 'app=shard-manager-mysql',
        tag: 'shard-manager-mysql',
        profile: 'mysql' as const,
    },
    { ns: 'battleships', label: 'app=battleships', tag: 'battleships', profile: 'postgresql' as const },
    {
        ns: 'battleships-mysql',
        label: 'app=battleships-mysql',
        tag: 'battleships-mysql',
        profile: 'mysql' as const,
    },
    { ns: 'shooter-mysql', label: 'app=shooter-mysql', tag: 'shooter-mysql', profile: 'mysql' as const },
    {
        ns: 'speed-shooter-mysql',
        label: 'app=speed-shooter-mysql',
        tag: 'speed-shooter-mysql',
        profile: 'mysql' as const,
    },
    {
        ns: 'slow-shooter-mysql',
        label: 'app=slow-shooter-mysql',
        tag: 'slow-shooter-mysql',
        profile: 'mysql' as const,
    },
    { ns: 'shooter', label: 'app=shooter', tag: 'shooter', profile: 'postgresql' as const },
    { ns: 'speed-shooter', label: 'app=speed-shooter', tag: 'speed-shooter', profile: 'postgresql' as const },
    { ns: 'slow-shooter', label: 'app=slow-shooter', tag: 'slow-shooter', profile: 'postgresql' as const },
    { ns: 'runner', label: 'app=runner', tag: 'runner', profile: 'legacy' as const },
    {
        ns: 'eventiva-workload',
        label: 'app=eventiva-workload',
        tag: 'workload',
        profile: 'legacy' as const,
    },
];

const program: Effect.Effect<number, unknown, CommandExecutor> = Effect.gen(function* () {
    if ((yield* exitCodeSilent(cwd, 'which', ['kubectl'])) !== 0) {
        console.warn('kubectl not found; cluster logs unavailable.');
        return 0;
    }
    if ((yield* exitCodeSilent(cwd, 'kubectl', ['cluster-info'])) !== 0) {
        console.warn('kubectl is available but no Kubernetes cluster is reachable; cluster logs unavailable.');
        return 0;
    }

    const profile = process.env.EVENTIVA_CLUSTER_LOG_PROFILE ?? 'full';
    let streams: typeof allStreams;
    if (profile === 'full') {
        streams = allStreams;
    } else if (profile === 'postgresql') {
        streams = allStreams.filter((s) => s.profile === 'postgresql' || s.profile === 'shared');
    } else if (profile === 'mysql') {
        streams = allStreams.filter((s) => s.profile === 'mysql' || s.profile === 'shared');
    } else {
        console.error(`Unknown EVENTIVA_CLUSTER_LOG_PROFILE="${profile}". Use full, postgresql, or mysql.`);
        return 1;
    }

    return yield* Effect.scoped(
        Effect.gen(function* () {
            if (process.env.EVENTIVA_CLUSTER_PORT_FORWARD === '1') {
                const pfScript = path.join(cliDir, 'port-forward-fpk-cluster.ts');
                yield* startPrefixedProcess(cwd, 'pnpm', ['exec', 'tsx', pfScript], '[port-forward] ');
            }

            for (const { ns, label, tag } of streams) {
                const prefix = `[${tag}] `;
                const args = [
                    'logs',
                    '-n',
                    ns,
                    '-l',
                    label,
                    '--tail',
                    tail,
                    '--follow',
                    '--prefix=true',
                    '--timestamps=true',
                ];
                yield* startPrefixedProcess(cwd, 'kubectl', args, prefix);
            }

            yield* awaitShutdownSignal;
            return 0;
        }),
    );
});

runClusterCli(program);
