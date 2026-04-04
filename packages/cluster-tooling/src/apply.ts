import type { CommandExecutor } from '@effect/platform/CommandExecutor';
import * as FileSystem from '@effect/platform/FileSystem';
import { NodeContext } from '@effect/platform-node';
import * as Path from '@effect/platform/Path';
import * as Effect from 'effect/Effect';
import { exitCodeInherit, exitCodeSilent } from './cluster-shell.js';
import { CLUSTER_FPK_OUT } from './cluster-fpk-paths.js';
import { resolveStack, stackApplyDirs, type ClusterStack } from './stack.js';

export type ApplyClusterRequirements = FileSystem.FileSystem | Path.Path | CommandExecutor;

export const applyClusterProgram = (
    cwd: string,
    stackArg?: ClusterStack,
): Effect.Effect<number, unknown, ApplyClusterRequirements> =>
    Effect.gen(function* () {
        const path = yield* Path.Path;
        const fs = yield* FileSystem.FileSystem;
        const outRoot = path.join(cwd, CLUSTER_FPK_OUT);
        const outExists = yield* fs.exists(outRoot);
        if (!outExists) {
            console.error(`Rendered manifests not found at ${CLUSTER_FPK_OUT}. Run cluster:render first.`);
            return 1;
        }

        const whichCode = yield* exitCodeSilent(cwd, 'which', ['kubectl']);
        const hasKubectl = whichCode === 0;
        const clusterInfoCode = hasKubectl ? yield* exitCodeSilent(cwd, 'kubectl', ['cluster-info']) : 1;
        const hasCluster = hasKubectl && clusterInfoCode === 0;

        if (!hasKubectl) {
            console.warn('kubectl not found; skipping cluster apply and continuing with local runtime.');
            return 0;
        }

        if (!hasCluster) {
            console.warn('kubectl is available but no Kubernetes cluster is reachable; skipping cluster apply.');
            return 0;
        }

        const s = stackArg ?? resolveStack();

        if (s === 'full') {
            return yield* exitCodeInherit(cwd, 'kubectl', ['apply', '-R', '-f', CLUSTER_FPK_OUT]);
        }

        const dirs = stackApplyDirs[s];
        if (!dirs) {
            console.error(
                `Unknown EVENTIVA_CLUSTER_STACK="${s}". Use postgresql, mysql, or full (or set EVENTIVA_CLUSTER_PROFILE).`,
            );
            return 1;
        }

        for (const dir of dirs) {
            const manifestDir = path.join(outRoot, dir);
            const dirExists = yield* fs.exists(manifestDir);
            if (!dirExists) {
                console.warn(`Skipping missing manifest dir (run cluster:render): ${manifestDir}`);
                continue;
            }
            const st = yield* exitCodeInherit(cwd, 'kubectl', ['apply', '-R', '-f', manifestDir]);
            if (st !== 0) {
                return st;
            }
        }
        return 0;
    });

export const applyClusterSync = (cwd: string, stack?: ClusterStack): Promise<number> =>
    Effect.runPromise(applyClusterProgram(cwd, stack).pipe(Effect.provide(NodeContext.layer)));

export const applyCluster = Effect.gen(function* () {
    const code = yield* applyClusterProgram(process.cwd());
    if (code !== 0) {
        return yield* Effect.fail(new Error(`kubectl apply failed with exit code ${code}`));
    }
});
