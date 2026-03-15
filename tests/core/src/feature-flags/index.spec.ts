import { describe, it, expect } from '@effect/vitest';
import { Effect } from 'effect';
import * as FeatureFlagsIndex from '@eventiva/core';

describe('feature-flags/index', () => {
    describe('exports', () => {
        it.effect('exports FeatureFlags and related functions', () =>
            Effect.gen(function* () {
                expect(FeatureFlagsIndex.FeatureFlags).toBeDefined();
                expect(FeatureFlagsIndex.FeatureFlagsLive).toBeDefined();
                expect(FeatureFlagsIndex.FeatureFlagsLiveConfigOnly).toBeDefined();
                expect(FeatureFlagsIndex.FeatureFlagKeys).toBeDefined();
            })
        );
    });
});
