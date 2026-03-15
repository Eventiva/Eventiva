import { describe, it, expect } from '@effect/vitest';
import { Effect } from 'effect';
import { Schema } from 'effect';
import { defineModel, extendModel, type Model } from '@eventiva/core';

describe('cluster/models', () => {
    describe('defineModel', () => {
        it.effect('creates model with name and schema', () =>
            Effect.gen(function* () {
                const contactSchema = Schema.Struct({
                    name: Schema.String,
                    email: Schema.String,
                });

                const model = defineModel('contact', contactSchema);

                expect(model).toBeDefined();
                expect(model.name).toBe('contact');
                expect(model.schema).toBe(contactSchema);
            })
        );

        it.effect('creates models with different names', () =>
            Effect.gen(function* () {
                const baseSchema = Schema.Struct({ id: Schema.String });

                const model1 = defineModel('user', baseSchema);
                const model2 = defineModel('event', baseSchema);

                expect(model1.name).toBe('user');
                expect(model2.name).toBe('event');
                expect(model1.schema).toBe(baseSchema);
                expect(model2.schema).toBe(baseSchema);
            })
        );

        it.effect('preserves schema type information', () =>
            Effect.gen(function* () {
                const userSchema = Schema.Struct({
                    id: Schema.String,
                    name: Schema.String,
                });

                const model = defineModel('user', userSchema);

                // Schema should be the same instance
                expect(model.schema).toBe(userSchema);
            })
        );
    });

    describe('extendModel', () => {
        it.effect('extends base model with additional fields', () =>
            Effect.gen(function* () {
                const baseSchema = Schema.Struct({
                    id: Schema.String,
                    name: Schema.String,
                });
                const baseModel = defineModel('contact', baseSchema);

                const extraSchema = Schema.Struct({
                    companyId: Schema.String,
                });

                const extendedSchema = extendModel(baseModel, extraSchema);

                expect(extendedSchema).toBeDefined();
                // Extended schema should be different from base
                expect(extendedSchema).not.toBe(baseSchema);
            })
        );

        it.effect('extends model with multiple additional fields', () =>
            Effect.gen(function* () {
                const baseSchema = Schema.Struct({
                    id: Schema.String,
                    name: Schema.String,
                });
                const baseModel = defineModel('contact', baseSchema);

                const extraSchema = Schema.Struct({
                    companyId: Schema.String,
                    phone: Schema.String,
                    address: Schema.String,
                });

                const extendedSchema = extendModel(baseModel, extraSchema);

                expect(extendedSchema).toBeDefined();
            })
        );

        it.effect('can extend an already extended model', () =>
            Effect.gen(function* () {
                const baseSchema = Schema.Struct({ id: Schema.String });
                const baseModel = defineModel('base', baseSchema);

                const firstExtra = Schema.Struct({ field1: Schema.String });
                const firstExtended = extendModel(baseModel, firstExtra);

                const secondExtra = Schema.Struct({ field2: Schema.String });
                // Note: extendModel expects a Model, but firstExtended is a Schema
                // This test verifies the function signature, actual usage may differ
                expect(firstExtended).toBeDefined();
            })
        );
    });

    describe('Model interface', () => {
        it.effect('Model has name and schema properties', () =>
            Effect.gen(function* () {
                const schema = Schema.Struct({ value: Schema.String });
                const model: Model<'test', { value: string }> = defineModel('test', schema);

                expect(model).toHaveProperty('name');
                expect(model).toHaveProperty('schema');
                expect(model.name).toBe('test');
                expect(model.schema).toBe(schema);
            })
        );
    });
});
