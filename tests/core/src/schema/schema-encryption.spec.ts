import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Layer } from 'effect';
import { encryptedString, encryptedStringSchema } from '@eventiva/core';
import { PiiEncryption, PiiEncryptionLiveNoop } from '@eventiva/core';

describe('schema/schema-encryption', () => {
    describe('encryptedString', () => {
        it.effect('is a Schema', () =>
            Effect.gen(function* () {
                expect(encryptedString).toBeDefined();
            })
        );

        it.effect('requires PiiEncryption in context', () =>
            Effect.gen(function* () {
                const result = yield* Effect.exit(Schema.decodeUnknown(encryptedString)('encrypted-value'));
                // Should fail without PiiEncryption
                expect(Exit.isFailure(result)).toBe(true);
            })
        );

        it.effect('decodes with PiiEncryption', () =>
            Effect.gen(function* () {
                const piiLayer = PiiEncryptionLiveNoop;
                const pii = yield* Layer.build(piiLayer);

                const result = yield* Schema.decodeUnknown(encryptedString)('encrypted-value').pipe(
                    Effect.provide(Layer.succeed(PiiEncryption, pii))
                );

                expect(typeof result).toBe('string');
            })
        );
    });

    describe('encryptedStringSchema', () => {
        it.effect('is an alias for encryptedString', () =>
            Effect.gen(function* () {
                expect(encryptedStringSchema).toBe(encryptedString);
            })
        );
    });
});
