import { Command } from '@effect/platform';
import type { CommandExecutor } from '@effect/platform/CommandExecutor';
import type { Process } from '@effect/platform/CommandExecutor';
import type { PlatformError } from '@effect/platform/Error';
import * as Effect from 'effect/Effect';
import * as Scope from 'effect/Scope';
import * as Stream from 'effect/Stream';
import { pipe } from 'effect/Function';

/**
 * Start a child process with piped stdout/stderr, prefix each decoded line, and kill the process when the scope ends.
 * Used for long-running `kubectl` streams (logs, port-forward). See [Command](https://effect.website/docs/platform/command/).
 */
export const startPrefixedProcess = (
    cwd: string,
    program: string,
    args: ReadonlyArray<string>,
    linePrefix: string,
    env?: Record<string, string | undefined>,
): Effect.Effect<Process, PlatformError, CommandExecutor | Scope.Scope> =>
    Effect.gen(function* () {
        let cmd = pipe(
            Command.make(program, ...args),
            Command.workingDirectory(cwd),
            Command.stdout('pipe'),
            Command.stderr('pipe'),
        );
        if (env) {
            cmd = pipe(cmd, Command.env(env));
        }
        const proc = yield* Command.start(cmd);
        yield* Effect.addFinalizer(() =>
            pipe(
                proc.kill('SIGTERM'),
                Effect.catchAll(() => Effect.void),
            ),
        );
        const drain = (stream: Stream.Stream<Uint8Array, PlatformError>, out: NodeJS.WriteStream) =>
            pipe(
                stream,
                Stream.decodeText('utf-8'),
                Stream.splitLines,
                Stream.runForEach((line) =>
                    Effect.sync(() => {
                        out.write(linePrefix + line + '\n');
                    }),
                ),
            );
        yield* Effect.forkScoped(drain(proc.stdout, process.stdout));
        yield* Effect.forkScoped(drain(proc.stderr, process.stderr));
        return proc;
    });

/** Block until SIGINT or SIGTERM (then scope finalizers run). */
export const awaitShutdownSignal: Effect.Effect<void, never, never> = Effect.async<void>((resume) => {
    const done = () => {
        resume(Effect.void);
    };
    process.once('SIGINT', done);
    process.once('SIGTERM', done);
    return Effect.sync(() => {
        process.off('SIGINT', done);
        process.off('SIGTERM', done);
    });
});
