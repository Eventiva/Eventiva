import type { CommandExecutor } from '@effect/platform/CommandExecutor';
import { NodeContext } from '@effect/platform-node';
import * as Effect from 'effect/Effect';

export const envRecord = (env: NodeJS.ProcessEnv): Record<string, string | undefined> =>
    Object.fromEntries(Object.entries(env).map(([k, v]) => [k, v === undefined ? undefined : String(v)]));

/** Run any Effect that only needs `CommandExecutor` (from `NodeContext`). */
export const runPromiseWithNode = <A, E>(
    program: Effect.Effect<A, E, CommandExecutor>,
): Promise<A> => Effect.runPromise(program.pipe(Effect.provide(NodeContext.layer)));

/** Run an exit-code Effect (requires `CommandExecutor` from `NodeContext`). */
export const runClusterCli = (program: Effect.Effect<number, unknown, CommandExecutor>): void => {
    Effect.runPromise(program.pipe(Effect.provide(NodeContext.layer)))
        .then((code) => process.exit(code))
        .catch((e) => {
            console.error(e);
            process.exit(1);
        });
};

export const runExitPromise = (p: Promise<number>): void => {
    p.then((code) => process.exit(code)).catch((e) => {
        console.error(e);
        process.exit(1);
    });
};
