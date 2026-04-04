import type { CommandExecutor } from '@effect/platform/CommandExecutor';
import * as FileSystem from '@effect/platform/FileSystem';
import { NodeContext } from '@effect/platform-node';
import * as Path from '@effect/platform/Path';
import * as Effect from 'effect/Effect';
import { exitCodeInherit } from './cluster-shell.js';
import { CLUSTER_FPK_OUT, CLUSTER_FPK_SRC } from './cluster-fpk-paths.js';

const fpkArgs = (srcRel: string, outRel: string) =>
    ['exec', 'fpk', '-d', srcRel, '-o', outRel, '-f', 'yaml', '-i', 'package.json'] as const;

export type RenderClusterRequirements = FileSystem.FileSystem | Path.Path | CommandExecutor;

/** Renders FPK manifests (removes `packages/cluster-tooling/fpk/out` first). */
export const renderClusterProgram = (cwd: string): Effect.Effect<number, unknown, RenderClusterRequirements> =>
    Effect.gen(function* () {
        const path = yield* Path.Path;
        const fs = yield* FileSystem.FileSystem;
        const outDir = path.join(cwd, CLUSTER_FPK_OUT);
        const exists = yield* fs.exists(outDir);
        if (exists) {
            yield* fs.remove(outDir, { recursive: true });
        }
        return yield* exitCodeInherit(cwd, 'pnpm', [...fpkArgs(CLUSTER_FPK_SRC, CLUSTER_FPK_OUT)]);
    });

export const renderClusterSync = (cwd: string): Promise<number> =>
    Effect.runPromise(renderClusterProgram(cwd).pipe(Effect.provide(NodeContext.layer)));

export const renderCluster = Effect.gen(function* () {
    const code = yield* renderClusterProgram(process.cwd());
    if (code !== 0) {
        return yield* Effect.fail(new Error(`fpk render failed with exit code ${code}`));
    }
});
