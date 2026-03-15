import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit } from 'effect';
import { Schema } from 'effect';
import { typeIdSchema, typeId } from '@eventiva/core';

describe('schema/typeid-schema', () => {
    describe('typeIdSchema', () => {
        it.effect('creates schema for TypeID with prefix', () =>
            Effect.gen(function* () {
                const schema = typeIdSchema('contact');
                expect(schema).toBeDefined();
            })
        );

        it.effect('validates TypeID format on decode', () =>
            Effect.gen(function* () {
                const schema = typeIdSchema('contact');
                const validId = 'contact_01h2xcejqtf2nbrexx3vqjhp41';

                const result = yield* Schema.decodeUnknown(schema)(validId);
                expect(result).toBe(validId);
            })
        );

        it.effect('rejects invalid TypeID format', () =>
            Effect.gen(function* () {
                const schema = typeIdSchema('contact');
                const invalidId = 'not-a-typeid';

                const result = yield* Effect.exit(Schema.decodeUnknown(schema)(invalidId));
                expect(Exit.isFailure(result)).toBe(true);
            })
        );

        it.effect('rejects TypeID with wrong prefix', () =>
            Effect.gen(function* () {
                const schema = typeIdSchema('contact');
                const wrongPrefix = 'user_01h2xcejqtf2nbrexx3vqjhp41';

                const result = yield* Effect.exit(Schema.decodeUnknown(schema)(wrongPrefix));
                expect(Exit.isFailure(result)).toBe(true);
            })
        );
    });

    describe('typeId', () => {
        it.effect('generates TypeID with correct prefix', () =>
            Effect.gen(function* () {
                const id = typeId('contact');
                expect(id).toMatch(/^contact_/);
                expect(typeof id).toBe('string');
            })
        );

        it.effect('generates different IDs on each call', () =>
            Effect.gen(function* () {
                const id1 = typeId('contact');
                const id2 = typeId('contact');
                expect(id1).not.toBe(id2);
            })
        );

        it.effect('generates IDs for different prefixes', () =>
            Effect.gen(function* () {
                const contactId = typeId('contact');
                const userId = typeId('user');

                expect(contactId).toMatch(/^contact_/);
                expect(userId).toMatch(/^user_/);
            })
        );
    });
});
