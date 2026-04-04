import type { CommandExecutor } from '@effect/platform/CommandExecutor';
import { NodeContext } from '@effect/platform-node';
import * as Effect from 'effect/Effect';
import { exitCodeInherit, exitCodeSilent } from './cluster-shell.js';
import { CLUSTER_FPK_OUT } from './cluster-fpk-paths.js';

export type DeleteClusterRequirements = CommandExecutor;

export const deleteClusterProgram = (cwd: string): Effect.Effect<number, unknown, DeleteClusterRequirements> =>
    Effect.gen(function* () {
        const whichCode = yield* exitCodeSilent(cwd, 'which', ['kubectl']);
        if (whichCode !== 0) {
            console.warn('kubectl not found; skipping cluster delete.');
            return 0;
        }
        const clusterInfoCode = yield* exitCodeSilent(cwd, 'kubectl', ['cluster-info']);
        if (clusterInfoCode !== 0) {
            console.warn('kubectl is available but no Kubernetes cluster is reachable; skipping cluster delete.');
            return 0;
        }
        return yield* exitCodeInherit(cwd, 'kubectl', [
            'delete',
            '-R',
            '-f',
            CLUSTER_FPK_OUT,
            '--ignore-not-found=true',
        ]);
    });

export const deleteClusterSync = (cwd: string): Promise<number> =>
    Effect.runPromise(deleteClusterProgram(cwd).pipe(Effect.provide(NodeContext.layer)));
