import { Command } from '@effect/platform';
import type { CommandExecutor } from '@effect/platform/CommandExecutor';
import type { PlatformError } from '@effect/platform/Error';
import * as Effect from 'effect/Effect';
import { pipe } from 'effect/Function';

const inheritIo = (self: Command.Command) =>
    pipe(self, Command.stdin('inherit'), Command.stdout('inherit'), Command.stderr('inherit'));

/** Run a command with inherited stdio; returns exit code (0 = success). */
export const exitCodeInherit = (
    cwd: string,
    program: string,
    args: ReadonlyArray<string>,
    env?: Record<string, string | undefined>,
): Effect.Effect<number, PlatformError, CommandExecutor> => {
    let cmd = pipe(Command.make(program, ...args), Command.workingDirectory(cwd), inheritIo);
    if (env) {
        cmd = pipe(cmd, Command.env(env));
    }
    return pipe(
        cmd,
        Command.exitCode,
        Effect.tap((ec) => Effect.logTrace(`${program} ${args.join(' ')}`, { exitCode: Number(ec) })),
        Effect.map(Number),
    );
};

/** Run with default piped stdio; returns exit code only. */
export const exitCodeSilent = (
    cwd: string,
    program: string,
    args: ReadonlyArray<string>,
    env?: Record<string, string | undefined>,
): Effect.Effect<number, PlatformError, CommandExecutor> => {
    let cmd = pipe(Command.make(program, ...args), Command.workingDirectory(cwd));
    if (env) {
        cmd = pipe(cmd, Command.env(env));
    }
    return pipe(
        cmd,
        Command.exitCode,
        Effect.tap((ec) => Effect.logTrace(`${program} ${args.join(' ')}`, { exitCode: Number(ec) })),
        Effect.map(Number),
    );
};

/** Capture stdout as UTF-8 string (stderr default pipe). */
export const captureStdout = (
    cwd: string,
    program: string,
    args: ReadonlyArray<string>,
    env?: Record<string, string | undefined>,
): Effect.Effect<string, PlatformError, CommandExecutor> => {
    let cmd = pipe(Command.make(program, ...args), Command.workingDirectory(cwd));
    if (env) {
        cmd = pipe(cmd, Command.env(env));
    }
    return Command.string(cmd);
};
