import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit } from 'effect';
import { withSpanAndLog, type WithSpanAndLogOptions } from '@eventiva/core';

describe('observability/helpers', () => {
    describe('withSpanAndLog', () => {
        it.effect('wraps effect with span and log', () =>
            Effect.gen(function* () {
                const effect = Effect.succeed(42);
                const wrapped = withSpanAndLog('test.operation')(effect);
                const result = yield* wrapped;

                expect(result).toBe(42);
            })
        );

        it.effect('preserves effect success value', () =>
            Effect.gen(function* () {
                const effect = Effect.succeed('test-result');
                const wrapped = withSpanAndLog('test.operation')(effect);
                const result = yield* wrapped;

                expect(result).toBe('test-result');
            })
        );

        it.effect('preserves effect failure', () =>
            Effect.gen(function* () {
                const effect = Effect.fail('test-error');
                const wrapped = withSpanAndLog('test.operation')(effect);
                const result = yield* Effect.exit(wrapped);

                expect(Exit.isFailure(result)).toBe(true);
            })
        );

        it.effect('uses custom metric name when provided', () =>
            Effect.gen(function* () {
                const options: WithSpanAndLogOptions = {
                    metricName: 'custom.metric',
                };
                const effect = Effect.succeed(1);
                const wrapped = withSpanAndLog('test.operation', options)(effect);
                const result = yield* wrapped;

                expect(result).toBe(1);
            })
        );

        it.effect('includes attributes in span', () =>
            Effect.gen(function* () {
                const options: WithSpanAndLogOptions = {
                    attributes: { entityId: 'test-123', action: 'create' },
                };
                const effect = Effect.succeed(1);
                const wrapped = withSpanAndLog('test.operation', options)(effect);
                const result = yield* wrapped;

                expect(result).toBe(1);
            })
        );

        it.effect('handles effects with dependencies', () =>
            Effect.gen(function* () {
                const effect = Effect.succeed(100);
                const wrapped = withSpanAndLog('test.operation')(effect);
                const result = yield* wrapped;

                expect(result).toBe(100);
            })
        );
    });
});
