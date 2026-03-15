import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Layer } from 'effect';
import { Database, DatabaseLiveInMemory } from '@eventiva/core';

describe('database/database', () => {
    describe('DatabaseLiveInMemory', () => {
        it.effect('provides Database service', () =>
            Effect.gen(function* () {
                const db = yield* Layer.build(DatabaseLiveInMemory);
                expect(db).toBeDefined();
                expect(db.get).toBeDefined();
                expect(db.set).toBeDefined();
                expect(db.delete).toBeDefined();
                expect(db.list).toBeDefined();
            })
        );

        it.effect('get returns null for non-existent record', () =>
            Effect.gen(function* () {
                const db = yield* Layer.build(DatabaseLiveInMemory);
                const result = yield* db.get('test_table', 'non-existent-id');
                expect(result).toBeNull();
            })
        );

        it.effect('set and get work correctly', () =>
            Effect.gen(function* () {
                const db = yield* Layer.build(DatabaseLiveInMemory);
                const record = { id: 'test-id', name: 'Test', email: 'test@example.com' };

                yield* db.set('test_table', 'test-id', record);
                const retrieved = yield* db.get('test_table', 'test-id');

                expect(retrieved).toBeDefined();
                expect(retrieved?.id).toBe('test-id');
                expect(retrieved?.name).toBe('Test');
            })
        );

        it.effect('set replaces existing record', () =>
            Effect.gen(function* () {
                const db = yield* Layer.build(DatabaseLiveInMemory);
                const record1 = { id: 'test-id', name: 'Original' };
                const record2 = { id: 'test-id', name: 'Updated' };

                yield* db.set('test_table', 'test-id', record1);
                yield* db.set('test_table', 'test-id', record2);
                const retrieved = yield* db.get('test_table', 'test-id');

                expect(retrieved?.name).toBe('Updated');
            })
        );

        it.effect('delete removes record', () =>
            Effect.gen(function* () {
                const db = yield* Layer.build(DatabaseLiveInMemory);
                const record = { id: 'test-id', name: 'Test' };

                yield* db.set('test_table', 'test-id', record);
                yield* db.delete('test_table', 'test-id');
                const retrieved = yield* db.get('test_table', 'test-id');

                expect(retrieved).toBeNull();
            })
        );

        it.effect('delete is idempotent', () =>
            Effect.gen(function* () {
                const db = yield* Layer.build(DatabaseLiveInMemory);
                const result = yield* Effect.exit(db.delete('test_table', 'non-existent-id'));
                expect(Exit.isSuccess(result)).toBe(true);
            })
        );

        it.effect('list returns all records for a table', () =>
            Effect.gen(function* () {
                const db = yield* Layer.build(DatabaseLiveInMemory);
                const record1 = { id: 'id-1', name: 'Test 1' };
                const record2 = { id: 'id-2', name: 'Test 2' };

                yield* db.set('test_table', 'id-1', record1);
                yield* db.set('test_table', 'id-2', record2);
                const list = yield* db.list('test_table');

                expect(list.length).toBe(2);
                expect(list.some((r) => r.id === 'id-1')).toBe(true);
                expect(list.some((r) => r.id === 'id-2')).toBe(true);
            })
        );

        it.effect('list returns empty array for empty table', () =>
            Effect.gen(function* () {
                const db = yield* Layer.build(DatabaseLiveInMemory);
                const list = yield* db.list('empty_table');
                expect(list).toEqual([]);
            })
        );

        it.effect('tables are isolated', () =>
            Effect.gen(function* () {
                const db = yield* Layer.build(DatabaseLiveInMemory);
                const record1 = { id: 'same-id', name: 'Table 1' };
                const record2 = { id: 'same-id', name: 'Table 2' };

                yield* db.set('table1', 'same-id', record1);
                yield* db.set('table2', 'same-id', record2);

                const fromTable1 = yield* db.get('table1', 'same-id');
                const fromTable2 = yield* db.get('table2', 'same-id');

                expect(fromTable1?.name).toBe('Table 1');
                expect(fromTable2?.name).toBe('Table 2');
            })
        );
    });

    describe('Database tag', () => {
        it.effect('Database tag is properly defined', () =>
            Effect.gen(function* () {
                const tag = Database;
                expect(tag).toBeDefined();
                expect(tag.key).toBe('@eventiva/core/Database');
            })
        );
    });
});
