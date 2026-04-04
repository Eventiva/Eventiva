#!/usr/bin/env node
import type { CommandExecutor } from '@effect/platform/CommandExecutor';
import * as Effect from 'effect/Effect';
import { exitCodeInherit, exitCodeSilent } from '../src/cluster-shell.js';
import { runClusterCli } from '../src/cli-run.js';

const cwd = process.cwd();

const program: Effect.Effect<number, unknown, CommandExecutor> = Effect.gen(function* () {
    if ((yield* exitCodeSilent(cwd, 'which', ['kubectl'])) !== 0) {
        console.warn('kubectl not found; cluster logs unavailable.');
        return 0;
    }
    if ((yield* exitCodeSilent(cwd, 'kubectl', ['cluster-info'])) !== 0) {
        console.warn('kubectl is available but no Kubernetes cluster is reachable; cluster logs unavailable.');
        return 0;
    }

    const namespace = process.env.EVENTIVA_LOG_NAMESPACE ?? 'runner';
    const selector = process.env.EVENTIVA_LOG_SELECTOR ?? 'app=runner';
    const follow = process.env.EVENTIVA_LOG_FOLLOW === '1';
    const args = ['logs', '-n', namespace, '-l', selector, '--tail=200'];
    if (follow) {
        args.push('--follow');
    }
    return yield* exitCodeInherit(cwd, 'kubectl', args);
});

runClusterCli(program);
