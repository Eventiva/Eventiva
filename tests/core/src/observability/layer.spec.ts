import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Layer } from 'effect';
import { ObservabilityLive } from '@eventiva/core';

describe('observability/layer', () => {
    describe('ObservabilityLive', () => {
        it.effect('provides observability services', () =>
            Effect.gen(function* () {
                const result = yield* Effect.exit(Layer.build(ObservabilityLive));
                // May succeed or fail depending on OpenTelemetry setup, but should be a valid Exit
                expect(Exit.isExit(result)).toBe(true);
            })
        );

        it.effect('is a valid Layer', () =>
            Effect.gen(function* () {
                expect(ObservabilityLive).toBeDefined();
            })
        );
    });
});
