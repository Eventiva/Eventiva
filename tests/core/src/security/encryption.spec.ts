import { describe, it } from 'vitest';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import { it as itEffect } from '@effect/vitest';
import { PiiEncryption, PiiEncryptionLive, EncryptionError } from '@eventiva/core';
import { RuntimeConfigLive } from '@eventiva/core';

describe('PiiEncryption', () => {
    describe('PiiEncryptionLive', () => {
        itEffect('provides encryption service', () =>
            Effect.gen(function* () {
                const encryption = yield* PiiEncryption;
                expect(encryption).toBeDefined();
                expect(encryption.encrypt).toBeDefined();
                expect(encryption.decrypt).toBeDefined();
            }).pipe(Effect.provide(PiiEncryptionLive), Effect.provide(RuntimeConfigLive))
        );

        itEffect('encrypts and decrypts plaintext', () =>
            Effect.gen(function* () {
                const encryption = yield* PiiEncryption;
                const plaintext = 'sensitive data';
                const ciphertext = yield* encryption.encrypt(plaintext);
                expect(ciphertext).toBeDefined();
                expect(ciphertext).not.toBe(plaintext);
                expect(ciphertext.split('.')).toHaveLength(3);
                const decrypted = yield* encryption.decrypt(ciphertext);
                expect(decrypted).toBe(plaintext);
            }).pipe(Effect.provide(PiiEncryptionLive), Effect.provide(RuntimeConfigLive))
        );

        itEffect('uses default dev key when encryption key not set', () =>
            Effect.gen(function* () {
                const encryption = yield* PiiEncryption;
                const plaintext = 'test data';
                const ciphertext = yield* encryption.encrypt(plaintext);
                const decrypted = yield* encryption.decrypt(ciphertext);
                expect(decrypted).toBe(plaintext);
            }).pipe(Effect.provide(PiiEncryptionLive), Effect.provide(RuntimeConfigLive))
        );

        itEffect('fails to decrypt invalid ciphertext format', () =>
            Effect.gen(function* () {
                const encryption = yield* PiiEncryption;
                const result = yield* Effect.exit(encryption.decrypt('invalid.format'));
                expect(Effect.isFailure(result)).toBe(true);
                if (Effect.isFailure(result)) {
                    const error = Effect.causeOption(result).pipe(Effect.runSync);
                    expect(error).toBeDefined();
                }
            }).pipe(Effect.provide(PiiEncryptionLive), Effect.provide(RuntimeConfigLive))
        );

        itEffect('fails to decrypt tampered ciphertext', () =>
            Effect.gen(function* () {
                const encryption = yield* PiiEncryption;
                const plaintext = 'test data';
                const ciphertext = yield* encryption.encrypt(plaintext);
                const parts = ciphertext.split('.');
                const tampered = [parts[0], parts[1], 'tampered'].join('.');
                const result = yield* Effect.exit(encryption.decrypt(tampered));
                expect(Effect.isFailure(result)).toBe(true);
            }).pipe(Effect.provide(PiiEncryptionLive), Effect.provide(RuntimeConfigLive))
        );
    });

    describe('EncryptionError', () => {
        it('creates error with message and cause', () => {
            const cause = new Error('underlying error');
            const error = new EncryptionError('encryption failed', cause);
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('encryption failed');
            expect(error.cause).toBe(cause);
            expect(error._tag).toBe('EncryptionError');
        });
    });
});
