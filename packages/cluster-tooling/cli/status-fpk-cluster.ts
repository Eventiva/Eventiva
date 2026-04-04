#!/usr/bin/env node
import type { CommandExecutor } from '@effect/platform/CommandExecutor';
import * as Effect from 'effect/Effect';
import { exitCodeInherit, exitCodeSilent } from '../src/cluster-shell.js';
import { runClusterCli } from '../src/cli-run.js';

const cwd = process.cwd();
const namespaces = ['postgres', 'shard-manager', 'runner', 'eventiva-workload'];

const program: Effect.Effect<number, unknown, CommandExecutor> = Effect.gen(function* () {
    if ((yield* exitCodeSilent(cwd, 'which', ['kubectl'])) !== 0) {
        console.warn('kubectl not found; cluster status unavailable.');
        return 0;
    }
    if ((yield* exitCodeSilent(cwd, 'kubectl', ['cluster-info'])) !== 0) {
        console.warn('kubectl is available but no Kubernetes cluster is reachable; cluster status unavailable.');
        return 0;
    }

    for (const ns of namespaces) {
        const code = yield* exitCodeInherit(cwd, 'kubectl', ['get', 'all', '-n', ns]);
        if (code !== 0) {
            return code;
        }
    }
    return 0;
});

runClusterCli(program);
