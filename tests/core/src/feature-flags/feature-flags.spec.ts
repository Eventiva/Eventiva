import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Layer } from 'effect';
import {
    FeatureFlags,
    FeatureFlagsLive,
    FeatureFlagsLiveConfigOnly,
    FeatureFlagKeys,
    type FeatureFlagKey,
    type FeatureFlagOverrides,
} from '@eventiva/core';

describe('feature-flags/feature-flags', () => {
    describe('FeatureFlagKeys', () => {
        it.effect('defines all feature flag keys', () =>
            Effect.gen(function* () {
                expect(FeatureFlagKeys.OBSERVABILITY).toBe('eventiva-observability');
                expect(FeatureFlagKeys.DEVTOOLS).toBe('eventiva-devtools');
                expect(FeatureFlagKeys.CLUSTER).toBe('eventiva-cluster');
                expect(FeatureFlagKeys.ENTITY_ENDPOINTS).toBe('eventiva-entity-endpoints');
                expect(FeatureFlagKeys.SCHEMA_STACK).toBe('eventiva-schema-stack');
                expect(FeatureFlagKeys.EXTENSIONS).toBe('eventiva-extensions');
            })
        );
    });

    describe('FeatureFlagsLiveConfigOnly', () => {
        it.effect('provides FeatureFlags service', () =>
            Effect.gen(function* () {
                const flags = yield* Layer.build(FeatureFlagsLiveConfigOnly());
                expect(flags).toBeDefined();
                expect(flags.isEnabled).toBeDefined();
            })
        );

        it.effect('returns true by default when env var not set', () =>
            Effect.gen(function* () {
                const original = process.env.EVENTIVA_FEATURE_OBSERVABILITY;
                delete process.env.EVENTIVA_FEATURE_OBSERVABILITY;

                const flags = yield* Layer.build(FeatureFlagsLiveConfigOnly());
                const enabled = yield* flags.isEnabled(FeatureFlagKeys.OBSERVABILITY);

                expect(enabled).toBe(true);

                if (original !== undefined) {
                    process.env.EVENTIVA_FEATURE_OBSERVABILITY = original;
                }
            })
        );

        it.effect('respects env var when set', () =>
            Effect.gen(function* () {
                const original = process.env.EVENTIVA_FEATURE_OBSERVABILITY;
                process.env.EVENTIVA_FEATURE_OBSERVABILITY = 'false';

                const flags = yield* Layer.build(FeatureFlagsLiveConfigOnly());
                const enabled = yield* flags.isEnabled(FeatureFlagKeys.OBSERVABILITY);

                expect(enabled).toBe(false);

                if (original !== undefined) {
                    process.env.EVENTIVA_FEATURE_OBSERVABILITY = original;
                } else {
                    delete process.env.EVENTIVA_FEATURE_OBSERVABILITY;
                }
            })
        );

        it.effect('respects overrides', () =>
            Effect.gen(function* () {
                const overrides: FeatureFlagOverrides = {
                    [FeatureFlagKeys.OBSERVABILITY]: false,
                };

                const flags = yield* Layer.build(FeatureFlagsLiveConfigOnly(overrides));
                const enabled = yield* flags.isEnabled(FeatureFlagKeys.OBSERVABILITY);

                expect(enabled).toBe(false);
            })
        );

        it.effect('overrides take precedence over env vars', () =>
            Effect.gen(function* () {
                const original = process.env.EVENTIVA_FEATURE_OBSERVABILITY;
                process.env.EVENTIVA_FEATURE_OBSERVABILITY = 'true';

                const overrides: FeatureFlagOverrides = {
                    [FeatureFlagKeys.OBSERVABILITY]: false,
                };

                const flags = yield* Layer.build(FeatureFlagsLiveConfigOnly(overrides));
                const enabled = yield* flags.isEnabled(FeatureFlagKeys.OBSERVABILITY);

                expect(enabled).toBe(false);

                if (original !== undefined) {
                    process.env.EVENTIVA_FEATURE_OBSERVABILITY = original;
                } else {
                    delete process.env.EVENTIVA_FEATURE_OBSERVABILITY;
                }
            })
        );
    });

    describe('FeatureFlagsLive', () => {
        it.effect('provides FeatureFlags service', () =>
            Effect.gen(function* () {
                const flags = yield* Layer.build(FeatureFlagsLive());
                expect(flags).toBeDefined();
                expect(flags.isEnabled).toBeDefined();
            })
        );

        it.effect('falls back to config when PostHog not configured', () =>
            Effect.gen(function* () {
                const original = process.env.POSTHOG_API_KEY;
                delete process.env.POSTHOG_API_KEY;
                delete process.env.POSTHOG_PROJECT_API_KEY;

                const flags = yield* Layer.build(FeatureFlagsLive());
                const enabled = yield* flags.isEnabled(FeatureFlagKeys.OBSERVABILITY);

                expect(enabled).toBe(true);

                if (original !== undefined) {
                    process.env.POSTHOG_API_KEY = original;
                }
            })
        );

        it.effect('respects overrides', () =>
            Effect.gen(function* () {
                const overrides: FeatureFlagOverrides = {
                    [FeatureFlagKeys.DEVTOOLS]: false,
                };

                const flags = yield* Layer.build(FeatureFlagsLive(overrides));
                const enabled = yield* flags.isEnabled(FeatureFlagKeys.DEVTOOLS);

                expect(enabled).toBe(false);
            })
        );
    });

    describe('FeatureFlags tag', () => {
        it.effect('FeatureFlags tag is properly defined', () =>
            Effect.gen(function* () {
                const tag = FeatureFlags;
                expect(tag).toBeDefined();
                expect(tag.key).toBe('@eventiva/core/FeatureFlags');
            })
        );
    });
});
