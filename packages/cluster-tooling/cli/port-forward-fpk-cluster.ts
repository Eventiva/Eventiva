#!/usr/bin/env node
/**
 * kubectl port-forward for local FPK cluster: Postgres + workload HTTP + runner RPC.
 *
 * Run: `pnpm exec tsx packages/cluster-tooling/cli/port-forward-fpk-cluster.ts`
 * or: `pnpm exec nx run cluster-tooling:port-forward-fpk`
 *
 * Uses @effect/platform Command (see https://effect.website/docs/platform/command/).
 */
import type { CommandExecutor } from '@effect/platform/CommandExecutor';
import * as Effect from 'effect/Effect';
import { exitCodeSilent } from '../src/cluster-shell.js';
import { runClusterCli } from '../src/cli-run.js';
import { awaitShutdownSignal, startPrefixedProcess } from '../src/prefixed-process.js';

const cwd = process.cwd();

const pgNs = process.env.EVENTIVA_PF_PG_NAMESPACE ?? 'postgres';
const pgSvc = process.env.EVENTIVA_PF_PG_SERVICE ?? 'postgres';
const pgLocal = process.env.EVENTIVA_PF_PG_PORT ?? '5432';

const wlNs = process.env.EVENTIVA_PF_WORKLOAD_NS ?? 'eventiva-workload';
const wlDep = process.env.EVENTIVA_PF_WORKLOAD_DEPLOY ?? 'eventiva-workload';
const httpLocal = process.env.EVENTIVA_PF_HTTP_PORT ?? process.env.EVENTIVA_HTTP_PORT ?? '3000';
const rpcLocal = process.env.EVENTIVA_PF_RUNNER_RPC_PORT ?? '34431';
const rpcRemote = process.env.EVENTIVA_PF_RUNNER_RPC_REMOTE_PORT ?? process.env.EVENTIVA_CLUSTER_RUNNER_RPC_PORT ?? '34431';
const skipRpc = process.env.EVENTIVA_PF_SKIP_RUNNER_RPC === '1';
const pfKafka = process.env.EVENTIVA_PF_KAFKA === '1';
const kafkaNs = process.env.EVENTIVA_PF_KAFKA_NAMESPACE ?? 'kafka';
const kafkaSvc = process.env.EVENTIVA_PF_KAFKA_SERVICE ?? 'redpanda';
const kafkaLocal = process.env.EVENTIVA_PF_KAFKA_PORT ?? '9094';

const program: Effect.Effect<number, unknown, CommandExecutor> = Effect.gen(function* () {
    if ((yield* exitCodeSilent(cwd, 'which', ['kubectl'])) !== 0) {
        console.error('kubectl not found; port-forward requires kubectl.');
        return 1;
    }
    if ((yield* exitCodeSilent(cwd, 'kubectl', ['cluster-info'])) !== 0) {
        console.error('No Kubernetes cluster reachable (kubectl cluster-info failed).');
        return 1;
    }

    return yield* Effect.scoped(
        Effect.gen(function* () {
            yield* startPrefixedProcess(
                cwd,
                'kubectl',
                ['port-forward', '-n', pgNs, `svc/${pgSvc}`, `${pgLocal}:5432`],
                '[postgres] ',
            );

            const workloadArgs = ['port-forward', '-n', wlNs, `deployment/${wlDep}`, `${httpLocal}:3000`];
            if (!skipRpc) {
                workloadArgs.push(`${rpcLocal}:${rpcRemote}`);
            }
            yield* startPrefixedProcess(cwd, 'kubectl', workloadArgs, '[workload] ');

            if (pfKafka) {
                yield* startPrefixedProcess(
                    cwd,
                    'kubectl',
                    ['port-forward', '-n', kafkaNs, `svc/${kafkaSvc}`, `${kafkaLocal}:9092`],
                    '[kafka] ',
                );
            }

            console.log(
                [
                    'Port forwards (Ctrl+C to stop):',
                    `  Postgres:     127.0.0.1:${pgLocal}  -> ${pgNs}/svc/${pgSvc}:5432`,
                    `  HTTP API:     127.0.0.1:${httpLocal}  -> ${wlNs}/deployment/${wlDep}:3000`,
                    ...(skipRpc ? [] : [`  Runner RPC:   127.0.0.1:${rpcLocal}  -> pod:${rpcRemote}`]),
                    ...(pfKafka
                        ? [`  Kafka API:    127.0.0.1:${kafkaLocal}  -> ${kafkaNs}/svc/${kafkaSvc}:9092`]
                        : []),
                ].join('\n'),
            );

            yield* awaitShutdownSignal;
            return 0;
        }),
    );
});

runClusterCli(program);
