import { describe } from 'vitest';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import { it as itEffect } from '@effect/vitest';
import { WorkflowRegistry, WorkflowRegistryLive } from '@eventiva/core';
import type { Workflow, WorkflowExecuteOptions } from '@eventiva/core';

describe('WorkflowRegistry', () => {
    describe('WorkflowRegistryLive', () => {
        itEffect('provides workflow registry service', () =>
            Effect.gen(function* () {
                const registry = yield* WorkflowRegistry;
                expect(registry).toBeDefined();
                expect(registry.register).toBeDefined();
                expect(registry.execute).toBeDefined();
            }).pipe(Effect.provide(WorkflowRegistryLive))
        );

        itEffect('registers and executes workflow', () =>
            Effect.gen(function* () {
                const registry = yield* WorkflowRegistry;
                const workflow: Workflow<'test', string, string> = {
                    name: 'test',
                };
                yield* registry.register(workflow, (opts: WorkflowExecuteOptions<string>) =>
                    Effect.succeed(`processed: ${opts.payload}`)
                );
                const result = yield* registry.execute(workflow, { payload: 'hello' });
                expect(result).toBe('processed: hello');
            }).pipe(Effect.provide(WorkflowRegistryLive))
        );

        itEffect('fails to execute unregistered workflow', () =>
            Effect.gen(function* () {
                const registry = yield* WorkflowRegistry;
                const workflow: Workflow<'missing', string, string> = {
                    name: 'missing',
                };
                const result = yield* Effect.exit(
                    registry.execute(workflow, { payload: 'test' })
                );
                expect(Effect.isFailure(result)).toBe(true);
            }).pipe(Effect.provide(WorkflowRegistryLive))
        );

        itEffect('handles workflow with error', () =>
            Effect.gen(function* () {
                const registry = yield* WorkflowRegistry;
                const workflow: Workflow<'error', string, string, string> = {
                    name: 'error',
                };
                yield* registry.register(workflow, () => Effect.fail('workflow error'));
                const result = yield* Effect.exit(
                    registry.execute(workflow, { payload: 'test' })
                );
                expect(Effect.isFailure(result)).toBe(true);
            }).pipe(Effect.provide(WorkflowRegistryLive))
        );

        itEffect('supports multiple workflows', () =>
            Effect.gen(function* () {
                const registry = yield* WorkflowRegistry;
                const w1: Workflow<'w1', number, number> = { name: 'w1' };
                const w2: Workflow<'w2', string, string> = { name: 'w2' };
                yield* registry.register(w1, (opts) => Effect.succeed(opts.payload * 2));
                yield* registry.register(w2, (opts) => Effect.succeed(opts.payload.toUpperCase()));
                const r1 = yield* registry.execute(w1, { payload: 5 });
                const r2 = yield* registry.execute(w2, { payload: 'hello' });
                expect(r1).toBe(10);
                expect(r2).toBe('HELLO');
            }).pipe(Effect.provide(WorkflowRegistryLive))
        );
    });
});
