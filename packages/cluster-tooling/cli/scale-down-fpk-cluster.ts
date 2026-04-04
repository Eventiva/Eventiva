#!/usr/bin/env node
/**
 * Scale all Deployments in the FPK demo namespaces to zero replicas (workloads + DBs stop; PVCs remain).
 */
import type { CommandExecutor } from '@effect/platform/CommandExecutor';
import * as Effect from 'effect/Effect';
import { captureStdout, exitCodeInherit, exitCodeSilent } from '../src/cluster-shell.js';
import { runClusterCli } from '../src/cli-run.js';

const cwd = process.cwd();

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

const program: Effect.Effect<number, unknown, CommandExecutor> = Effect.gen(function* () {
    if ((yield* exitCodeSilent(cwd, 'which', ['kubectl'])) !== 0) {
        console.warn('kubectl not found; nothing to scale.');
        return 0;
    }
    if ((yield* exitCodeSilent(cwd, 'kubectl', ['cluster-info'])) !== 0) {
        console.warn('kubectl is available but no Kubernetes cluster is reachable.');
        return 0;
    }

    const namespaces = (process.env.EVENTIVA_CLUSTER_SCALE_NAMESPACES ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    const targetNs = namespaces.length > 0 ? namespaces : defaultNamespaces;

    for (const ns of targetNs) {
        const listed = yield* Effect.either(
            captureStdout(cwd, 'kubectl', [
                'get',
                'deploy',
                '-n',
                ns,
                '-o',
                'jsonpath={.items[*].metadata.name}',
            ]),
        );
        if (listed._tag === 'Left') {
            continue;
        }
        const names = listed.right.trim().split(/\s+/).filter(Boolean);
        for (const name of names) {
            const code = yield* exitCodeInherit(cwd, 'kubectl', [
                'scale',
                `deployment/${name}`,
                '-n',
                ns,
                '--replicas=0',
            ]);
            if (code !== 0) {
                return code;
            }
        }
    }

    console.log('Scale-down complete (replicas=0 for deployments in target namespaces).');
    return 0;
});

runClusterCli(program);
