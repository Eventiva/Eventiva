#!/usr/bin/env node
/**
 * Local full-cluster CI parity: cluster wait, port-forward, then nx run-many test:e2e.
 * Uses @effect/platform Command for subprocesses.
 */
import type { CommandExecutor } from '@effect/platform/CommandExecutor';
import * as Effect from 'effect/Effect';
import { createConnection } from 'node:net';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { envRecord, runClusterCli } from '../src/cli-run.js';
import { exitCodeInherit } from '../src/cluster-shell.js';
import { startPrefixedProcess } from '../src/prefixed-process.js';

const cliDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(cliDir, '../../..');

function waitForPort(port: number, timeoutMs: number, host = '127.0.0.1'): Promise<void> {
    return new Promise((resolve, reject) => {
        const deadline = Date.now() + timeoutMs;
        const tryConnect = () => {
            const socket = createConnection(port, host, () => {
                socket.destroy();
                resolve();
            });
            socket.on('error', () => {
                if (Date.now() > deadline) {
                    reject(new Error(`Port ${host}:${port} not open after ${timeoutMs}ms`));
                    return;
                }
                setTimeout(tryConnect, 1500);
            });
        };
        tryConnect();
    });
}

const program: Effect.Effect<number, unknown, CommandExecutor> = Effect.gen(function* () {
    const skipCluster = process.env.LOCAL_CI_SKIP_CLUSTER === '1';
    if (!skipCluster) {
        const wait = yield* exitCodeInherit(root, 'pnpm', [
            'exec',
            'nx',
            'run',
            'platforms-postgresql:cluster:wait',
        ]);
        if (wait !== 0) {
            return wait;
        }
    } else {
        console.log('LOCAL_CI_SKIP_CLUSTER=1: skipping platforms-postgresql:cluster:wait');
    }

    const pfEnv: NodeJS.ProcessEnv = {
        ...process.env,
        EVENTIVA_PF_KAFKA: process.env.EVENTIVA_PF_KAFKA ?? '1',
    };

    return yield* Effect.scoped(
        Effect.gen(function* () {
            yield* startPrefixedProcess(
                root,
                'pnpm',
                ['exec', 'nx', 'run', 'cluster-tooling:port-forward-fpk'],
                '[port-forward] ',
                envRecord(pfEnv),
            );

            const httpPort = Number(process.env.EVENTIVA_HTTP_PORT ?? process.env.EVENTIVA_PF_HTTP_PORT ?? 3000);
            const rpcPort = Number(process.env.EVENTIVA_CLUSTER_RUNNER_RPC_PORT ?? 34431);

            const testEnv: NodeJS.ProcessEnv = {
                ...pfEnv,
                EVENTIVA_CLUSTER_E2E: '1',
                PG_E2E_SKIP_PLATFORM_START: '1',
                PG_E2E_HTTP_HOST: '127.0.0.1',
                SKIP_PSQL: process.env.SKIP_PSQL ?? '0',
            };

            console.log(`Waiting for workload HTTP on 127.0.0.1:${httpPort} ...`);
            yield* Effect.promise(() => waitForPort(httpPort, 120_000, '127.0.0.1'));
            console.log(`Waiting for runner RPC on 127.0.0.1:${rpcPort} ...`);
            yield* Effect.promise(() => waitForPort(rpcPort, 120_000, '127.0.0.1'));

            return yield* exitCodeInherit(
                root,
                'pnpm',
                [
                    'exec',
                    'nx',
                    'run-many',
                    '-t',
                    'test:e2e',
                    '--all',
                    '--exclude=eventiva',
                    '--output-style=stream',
                ],
                envRecord(testEnv),
            );
        }),
    );
});

runClusterCli(program);
