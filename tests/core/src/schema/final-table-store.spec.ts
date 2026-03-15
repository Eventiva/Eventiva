import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Layer } from 'effect';
import {
    FinalTableStore,
    FinalTableStoreLive,
    type RelationMetadata,
} from '@eventiva/core';

describe('schema/final-table-store', () => {
    describe('FinalTableStoreLive', () => {
        it.effect('provides FinalTableStore service', () =>
            Effect.gen(function* () {
                const store = yield* Layer.build(FinalTableStoreLive);
                expect(store).toBeDefined();
                expect(store.getTable).toBeDefined();
                expect(store.getAllTables).toBeDefined();
                expect(store.setTable).toBeDefined();
                expect(store.getRelations).toBeDefined();
                expect(store.setRelations).toBeDefined();
                expect(store.getRelationMetadata).toBeDefined();
                expect(store.setRelationMetadata).toBeDefined();
            })
        );

        it.effect('getTable returns undefined for non-existent table', () =>
            Effect.gen(function* () {
                const store = yield* Layer.build(FinalTableStoreLive);
                const table = yield* store.getTable('non-existent');
                expect(table).toBeUndefined();
            })
        );

        it.effect('setTable and getTable work correctly', () =>
            Effect.gen(function* () {
                const store = yield* Layer.build(FinalTableStoreLive);
                const mockTable = { name: 'test_table', columns: {} };

                yield* store.setTable('test_table', mockTable);
                const retrieved = yield* store.getTable('test_table');

                expect(retrieved).toBe(mockTable);
            })
        );

        it.effect('getAllTables returns all tables', () =>
            Effect.gen(function* () {
                const store = yield* Layer.build(FinalTableStoreLive);
                const table1 = { name: 'table1' };
                const table2 = { name: 'table2' };

                yield* store.setTable('table1', table1);
                yield* store.setTable('table2', table2);

                const all = yield* store.getAllTables();

                expect(all.table1).toBe(table1);
                expect(all.table2).toBe(table2);
            })
        );

        it.effect('setRelations and getRelations work correctly', () =>
            Effect.gen(function* () {
                const store = yield* Layer.build(FinalTableStoreLive);
                const relations = { relation1: {} };

                yield* store.setRelations('test_table', relations);
                const retrieved = yield* store.getRelations('test_table');

                expect(retrieved).toBe(relations);
            })
        );

        it.effect('setRelationMetadata and getRelationMetadata work correctly', () =>
            Effect.gen(function* () {
                const store = yield* Layer.build(FinalTableStoreLive);
                const metadata: RelationMetadata[] = [
                    {
                        relationName: 'relation1',
                        cardinality: 'one',
                        relatedTableName: 'related_table',
                    },
                ];

                yield* store.setRelationMetadata('test_table', metadata);
                const retrieved = yield* store.getRelationMetadata('test_table');

                expect(retrieved).toEqual(metadata);
            })
        );

        it.effect('getRelationMetadata returns empty array for non-existent table', () =>
            Effect.gen(function* () {
                const store = yield* Layer.build(FinalTableStoreLive);
                const metadata = yield* store.getRelationMetadata('non-existent');
                expect(metadata).toEqual([]);
            })
        );
    });

    describe('FinalTableStore tag', () => {
        it.effect('FinalTableStore tag is properly defined', () =>
            Effect.gen(function* () {
                const tag = FinalTableStore;
                expect(tag).toBeDefined();
                expect(tag.key).toBe('@eventiva/core/FinalTableStore');
            })
        );
    });
});
