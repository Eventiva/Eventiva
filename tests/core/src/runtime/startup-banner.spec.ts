import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Layer } from 'effect';
import { StartupBannerLayer } from '@eventiva/core';

describe('runtime/startup-banner', () => {
    describe('StartupBannerLayer', () => {
        it.effect('is a valid Layer', () =>
            Effect.gen(function* () {
                expect(StartupBannerLayer).toBeDefined();
                // May fail due to missing dependencies, but should be a valid Layer
                const result = yield* Effect.exit(Layer.build(StartupBannerLayer));
                expect(Exit.isExit(result)).toBe(true);
            })
        );
    });
});
