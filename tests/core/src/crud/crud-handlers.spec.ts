import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Ref, Layer } from 'effect';
import { Context } from 'effect';
import { makeCrudHandlers, makeCrudHandlersFromDatabase, type NotFound, type CrudHandlersOptions } from '@eventiva/core';
import { Database, DatabaseLiveInMemory } from '@eventiva/core';
import { Schema } from 'effect';

describe('crud/crud-handlers', () => {
    const testIdSchema = Schema.String;
    const testFieldsSchema = Schema.Struct({
        name: Schema.String,
        email: Schema.String,
    });

    type TestFields = { name: string; email: string };
    type TestStored = { id: string; name: string; email: string };

    describe('makeCrudHandlers', () => {
        it.effect('creates handlers with all CRUD operations', () =>
            Effect.gen(function* () {
                const storeTag = Context.GenericTag<{ ref: Ref.Ref<Map<string, TestStored>> }>('TestStore');
                const storeRef = yield* Ref.make<Map<string, TestStored>>(new Map());
                const store = { ref: storeRef };

                const options: CrudHandlersOptions<string, TestFields, TestStored, typeof store, any> = {
                    entityType: 'TestEntity',
                    storeTag: storeTag as any,
                    getRef: (s) => s.ref,
                    decode: (stored) => Effect.succeed({ name: stored.name, email: stored.email }),
                    encode: (fields) => Effect.succeed({ id: '', ...fields } as TestStored),
                    genId: () => 'test-id-1',
                    withDelete: false,
                };

                const handlers = makeCrudHandlers(options);

                expect(handlers).toBeDefined();
                expect(handlers.create).toBeDefined();
                expect(handlers.get).toBeDefined();
                expect(handlers.update).toBeDefined();
                expect(handlers.list).toBeDefined();
                expect(handlers.delete).toBeUndefined();
            })
        );

        it.effect('creates handlers with delete when withDelete is true', () =>
            Effect.gen(function* () {
                const storeTag = Context.GenericTag<{ ref: Ref.Ref<Map<string, TestStored>> }>('TestStore');
                const storeRef = yield* Ref.make<Map<string, TestStored>>(new Map());
                const store = { ref: storeRef };

                const options: CrudHandlersOptions<string, TestFields, TestStored, typeof store, any> = {
                    entityType: 'TestEntity',
                    storeTag: storeTag as any,
                    getRef: (s) => s.ref,
                    decode: (stored) => Effect.succeed({ name: stored.name, email: stored.email }),
                    encode: (fields) => Effect.succeed({ id: '', ...fields } as TestStored),
                    genId: () => 'test-id-1',
                    withDelete: true,
                };

                const handlers = makeCrudHandlers(options);

                expect(handlers.delete).toBeDefined();
            })
        );
    });

    describe('makeCrudHandlersFromDatabase', () => {
        it.effect('creates handlers that use Database service', () =>
            Effect.gen(function* () {
                const dbLayer = DatabaseLiveInMemory;
                const db = yield* Layer.build(dbLayer);

                const recordSchema = Schema.Struct({
                    id: Schema.String,
                    name: Schema.String,
                    email: Schema.String,
                });

                const handlers = makeCrudHandlersFromDatabase({
                    entityType: 'TestEntity',
                    tableName: 'test_entity',
                    idSchema: testIdSchema,
                    fieldsSchema: testFieldsSchema,
                    recordSchema: recordSchema as any,
                    genId: () => 'test-id-1',
                    withDelete: false,
                });

                expect(handlers).toBeDefined();
                expect(handlers.create).toBeDefined();
                expect(handlers.get).toBeDefined();
                expect(handlers.update).toBeDefined();
                expect(handlers.list).toBeDefined();
                expect(handlers.delete).toBeUndefined();
            })
        );

        it.effect('creates handlers with delete when withDelete is true', () =>
            Effect.gen(function* () {
                const dbLayer = DatabaseLiveInMemory;
                const db = yield* Layer.build(dbLayer);

                const recordSchema = Schema.Struct({
                    id: Schema.String,
                    name: Schema.String,
                    email: Schema.String,
                });

                const handlers = makeCrudHandlersFromDatabase({
                    entityType: 'TestEntity',
                    tableName: 'test_entity',
                    idSchema: testIdSchema,
                    fieldsSchema: testFieldsSchema,
                    recordSchema: recordSchema as any,
                    genId: () => 'test-id-1',
                    withDelete: true,
                });

                expect(handlers.delete).toBeDefined();
            })
        );
    });
});
