import { describe, it, expect } from '@effect/vitest';
import { Effect } from 'effect';
import * as ClusterIndex from '@eventiva/core';

describe('cluster/index', () => {
    describe('exports', () => {
        it.effect('exports cluster config functions', () =>
            Effect.gen(function* () {
                expect(ClusterIndex.clusterLayerDefault).toBeDefined();
                expect(ClusterIndex.makeClusterLayer).toBeDefined();
                expect(ClusterIndex.makeSingleRunnerLayer).toBeDefined();
            })
        );

        it.effect('exports entity utilities', () =>
            Effect.gen(function* () {
                expect(ClusterIndex.Entity).toBeDefined();
                expect(ClusterIndex.make).toBeDefined();
            })
        );

        it.effect('exports entity endpoints', () =>
            Effect.gen(function* () {
                expect(ClusterIndex.ENTITY_GROUP_REQUIRED_HANDLER_KEYS).toBeDefined();
                expect(ClusterIndex.validateEntityGroupHandlers).toBeDefined();
            })
        );

        it.effect('exports model functions', () =>
            Effect.gen(function* () {
                expect(ClusterIndex.defineModel).toBeDefined();
                expect(ClusterIndex.extendModel).toBeDefined();
            })
        );
    });
});
