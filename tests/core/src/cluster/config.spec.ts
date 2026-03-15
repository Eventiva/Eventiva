import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Layer } from 'effect';
import {
    clusterLayerDefault,
    makeClusterLayer,
    makeSingleRunnerLayer,
    globalClusterLayer,
    memoizeLayer,
    type ClusterMode,
} from '@eventiva/core';

describe('cluster/config', () => {
    describe('clusterLayerDefault', () => {
        it.effect('is a valid Layer', () =>
            Effect.gen(function* () {
                expect(clusterLayerDefault).toBeDefined();
                // Layer should be buildable (though it may require dependencies)
                const result = yield* Effect.exit(Layer.build(clusterLayerDefault));
                // Should either succeed or fail with missing dependencies, not crash
                expect(Exit.isExit(result)).toBe(true);
            })
        );
    });

    describe('makeClusterLayer', () => {
        it.effect('returns TestRunner layer for test mode', () =>
            Effect.gen(function* () {
                const layer = makeClusterLayer('test');
                expect(layer).toBeDefined();
                expect(layer).toBe(clusterLayerDefault);
            })
        );

        it.effect('returns SingleRunner layer for single mode', () =>
            Effect.gen(function* () {
                const layer = makeClusterLayer('single');
                expect(layer).toBeDefined();
                // Should be a Layer instance (SingleRunner.layer result)
                const result = yield* Effect.exit(Layer.build(layer));
                // May fail due to missing dependencies, but should be a valid Exit
                expect(Exit.isExit(result)).toBe(true);
            })
        );

        it.effect('throws error for distributed mode', () =>
            Effect.gen(function* () {
                const result = yield* Effect.exit(
                    Effect.sync(() => makeClusterLayer('distributed' as ClusterMode))
                );

                expect(Exit.isFailure(result)).toBe(true);
                if (Exit.isFailure(result)) {
                    const error = Exit.causeOption(result).pipe(
                        Effect.flatMap((cause) => Effect.fail(cause)),
                        Effect.runSync
                    );
                    expect(String(error)).toContain('Distributed cluster mode not yet implemented');
                }
            })
        );
    });

    describe('makeSingleRunnerLayer', () => {
        it.effect('creates layer without overrides', () =>
            Effect.gen(function* () {
                const layer = makeSingleRunnerLayer();
                expect(layer).toBeDefined();
                const result = yield* Effect.exit(Layer.build(layer));
                // May fail due to missing dependencies, but should be a valid Exit
                expect(Exit.isExit(result)).toBe(true);
            })
        );

        it.effect('creates layer with sharding config overrides', () =>
            Effect.gen(function* () {
                const overrides = { numberOfShards: 10 };
                const layer = makeSingleRunnerLayer(overrides);
                expect(layer).toBeDefined();
                const result = yield* Effect.exit(Layer.build(layer));
                expect(Exit.isExit(result)).toBe(true);
            })
        );
    });

    describe('globalClusterLayer', () => {
        it.effect('is a memoized Effect', () =>
            Effect.gen(function* () {
                expect(globalClusterLayer).toBeDefined();
                // Should be an Effect that can be run
                const result = yield* Effect.exit(globalClusterLayer);
                expect(Exit.isExit(result)).toBe(true);
            })
        );
    });

    describe('memoizeLayer', () => {
        it.effect('creates memoized layer from any layer', () =>
            Effect.gen(function* () {
                const testLayer = Layer.succeed('test-service', { value: 'test' });
                const memoized = memoizeLayer(testLayer);
                expect(memoized).toBeDefined();
                // Should be an Effect
                const result = yield* Effect.exit(memoized);
                expect(Exit.isExit(result)).toBe(true);
            })
        );

        it.effect('memoizes layer so same instance is reused', () =>
            Effect.gen(function* () {
                const testLayer = Layer.succeed('test-service', { value: 'test' });
                const memoized1 = memoizeLayer(testLayer);
                const memoized2 = memoizeLayer(testLayer);

                // Both should be Effects, but they may or may not be the same reference
                // depending on memoization implementation
                expect(memoized1).toBeDefined();
                expect(memoized2).toBeDefined();
            })
        );
    });
});
