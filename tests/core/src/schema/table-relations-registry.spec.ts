import { describe, it, expect } from '@effect/vitest';
import { Effect, Layer } from 'effect';
import {
    TableRelationsRegistry,
    TableRelationsRegistryLive,
    type RelationCallback,
} from '@eventiva/core';

describe('schema/table-relations-registry', () => {
    describe('TableRelationsRegistryLive', () => {
        it.effect('provides TableRelationsRegistry service', () =>
            Effect.gen(function* () {
                const registry = yield* Layer.build(TableRelationsRegistryLive);
                expect(registry).toBeDefined();
                expect(registry.registerRelations).toBeDefined();
                expect(registry.getAllCallbacks).toBeDefined();
            })
        );

        it.effect('registerRelations registers a callback', () =>
            Effect.gen(function* () {
                const registry = yield* Layer.build(TableRelationsRegistryLive);
                const callback: RelationCallback = () => ({});

                yield* registry.registerRelations('test_table', 'ext1', callback);
                // Should not throw
                expect(true).toBe(true);
            })
        );

        it.effect('getAllCallbacks returns registered callbacks', () =>
            Effect.gen(function* () {
                const registry = yield* Layer.build(TableRelationsRegistryLive);
                const callback: RelationCallback = () => ({});

                yield* registry.registerRelations('test_table', 'ext1', callback);
                const callbacks = yield* registry.getAllCallbacks();

                expect(callbacks.has('test_table')).toBe(true);
                expect(callbacks.get('test_table')?.length).toBe(1);
            })
        );

        it.effect('can register multiple callbacks for same table', () =>
            Effect.gen(function* () {
                const registry = yield* Layer.build(TableRelationsRegistryLive);
                const callback1: RelationCallback = () => ({ rel1: {} });
                const callback2: RelationCallback = () => ({ rel2: {} });

                yield* registry.registerRelations('test_table', 'ext1', callback1);
                yield* registry.registerRelations('test_table', 'ext2', callback2);

                const callbacks = yield* registry.getAllCallbacks();
                expect(callbacks.get('test_table')?.length).toBe(2);
            })
        );
    });

    describe('TableRelationsRegistry tag', () => {
        it.effect('TableRelationsRegistry tag is properly defined', () =>
            Effect.gen(function* () {
                const tag = TableRelationsRegistry;
                expect(tag).toBeDefined();
                expect(tag.key).toBe('@eventiva/core/TableRelationsRegistry');
            })
        );
    });
});
