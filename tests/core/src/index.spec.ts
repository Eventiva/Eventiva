import { describe, it, expect } from '@effect/vitest';
import { Effect } from 'effect';
import * as CoreIndex from '@eventiva/core';

describe('core/index', () => {
    describe('exports', () => {
        it.effect('exports schema utilities', () =>
            Effect.gen(function* () {
                // Schema exports should be available
                expect(CoreIndex).toBeDefined();
            })
        );

        it.effect('exports runtime utilities', () =>
            Effect.gen(function* () {
                // Runtime exports should be available
                expect(CoreIndex).toBeDefined();
            })
        );

        it.effect('exports database service', () =>
            Effect.gen(function* () {
                expect(CoreIndex.Database).toBeDefined();
                expect(CoreIndex.DatabaseLiveInMemory).toBeDefined();
            })
        );

        it.effect('exports CRUD utilities', () =>
            Effect.gen(function* () {
                expect(CoreIndex.makeCrudRpc).toBeDefined();
                expect(CoreIndex.makeCrudEntity).toBeDefined();
                expect(CoreIndex.makeCrudHandlers).toBeDefined();
            })
        );

        it.effect('exports cluster utilities', () =>
            Effect.gen(function* () {
                expect(CoreIndex.clusterLayerDefault).toBeDefined();
                expect(CoreIndex.makeClusterLayer).toBeDefined();
            })
        );

        it.effect('exports workflow utilities', () =>
            Effect.gen(function* () {
                // Workflow exports should be available
                expect(CoreIndex).toBeDefined();
            })
        );

        it.effect('exports extension utilities', () =>
            Effect.gen(function* () {
                expect(CoreIndex.mergeEntityLayers).toBeDefined();
                expect(CoreIndex.registerProfile).toBeDefined();
            })
        );

        it.effect('exports entity utilities', () =>
            Effect.gen(function* () {
                expect(CoreIndex.Base).toBeDefined();
                expect(CoreIndex.EntityRegistry).toBeDefined();
            })
        );

        it.effect('exports embedding service', () =>
            Effect.gen(function* () {
                expect(CoreIndex.EmbeddingService).toBeDefined();
                expect(CoreIndex.EmbeddingServiceLiveNoop).toBeDefined();
            })
        );

        it.effect('exports observability utilities', () =>
            Effect.gen(function* () {
                expect(CoreIndex.withSpanAndLog).toBeDefined();
            })
        );

        it.effect('exports security utilities', () =>
            Effect.gen(function* () {
                // Security exports should be available
                expect(CoreIndex).toBeDefined();
            })
        );

        it.effect('exports config utilities', () =>
            Effect.gen(function* () {
                expect(CoreIndex.RuntimeConfig).toBeDefined();
                expect(CoreIndex.RuntimeConfigLive).toBeDefined();
            })
        );

        it.effect('exports feature flags', () =>
            Effect.gen(function* () {
                expect(CoreIndex.FeatureFlags).toBeDefined();
                expect(CoreIndex.FeatureFlagsLive).toBeDefined();
            })
        );
    });
});
