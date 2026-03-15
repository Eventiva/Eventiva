import { describe, it, expect } from '@effect/vitest';
import { Effect } from 'effect';
import { Schema } from 'effect';
import { Base, type BaseEncoded, type EntityRpc, type BaseEntityOptions, type EntityFields } from '@eventiva/core';

describe('entity/entity-base', () => {
    describe('Base function', () => {
        it.effect('creates entity class with Base', () =>
            Effect.gen(function* () {
                const fieldsSchema = Schema.Struct({
                    name: Schema.String,
                    email: Schema.String,
                });

                class TestEntity extends Base<TestEntity>()('TestEntity', fieldsSchema) {}

                expect(TestEntity).toBeDefined();
                expect(TestEntity.name).toBe('TestEntity');
                expect(TestEntity.fieldsSchema).toBeDefined();
                expect(TestEntity.idSchema).toBeDefined();
            })
        );

        it.effect('creates entity with custom table name', () =>
            Effect.gen(function* () {
                const fieldsSchema = Schema.Struct({ value: Schema.String });
                const options: BaseEntityOptions = { tableName: 'custom_table' };

                class TestEntity extends Base<TestEntity>()('TestEntity', fieldsSchema, options) {}

                expect(TestEntity.tableName).toBe('custom_table');
            })
        );

        it.effect('defaults table name to entity name', () =>
            Effect.gen(function* () {
                const fieldsSchema = Schema.Struct({ value: Schema.String });

                class TestEntity extends Base<TestEntity>()('TestEntity', fieldsSchema) {}

                expect(TestEntity.tableName).toBe('TestEntity');
            })
        );

        it.effect('creates entity with delete when withDelete is true', () =>
            Effect.gen(function* () {
                const fieldsSchema = Schema.Struct({ value: Schema.String });
                const options: BaseEntityOptions = { withDelete: true };

                class TestEntity extends Base<TestEntity>()('TestEntity', fieldsSchema, options) {}

                expect(TestEntity.withDelete).toBe(true);
            })
        );

        it.effect('defaults withDelete to false', () =>
            Effect.gen(function* () {
                const fieldsSchema = Schema.Struct({ value: Schema.String });

                class TestEntity extends Base<TestEntity>()('TestEntity', fieldsSchema) {}

                expect(TestEntity.withDelete).toBe(false);
            })
        );

        it.effect('provides entity and layer', () =>
            Effect.gen(function* () {
                const fieldsSchema = Schema.Struct({ value: Schema.String });

                class TestEntity extends Base<TestEntity>()('TestEntity', fieldsSchema) {}

                expect(TestEntity.entity).toBeDefined();
                expect(TestEntity.layer).toBeDefined();
            })
        );
    });

    describe('BaseEncoded type', () => {
        it.effect('BaseEncoded has id field', () =>
            Effect.gen(function* () {
                const encoded: BaseEncoded<'test'> = { id: 'test_123' };
                expect(encoded.id).toBeDefined();
            })
        );
    });

    describe('EntityRpc type', () => {
        it.effect('EntityRpc type is available', () =>
            Effect.gen(function* () {
                // Type check - EntityRpc is a type utility
                const _test: EntityRpc<any> = undefined as any;
                expect(_test).toBeDefined();
            })
        );
    });
});
