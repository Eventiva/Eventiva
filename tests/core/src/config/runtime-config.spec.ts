import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Layer, Option } from 'effect';
import { RuntimeConfig, RuntimeConfigLive, type RuntimeConfigOptions } from '@eventiva/core';

describe('runtime-config', () => {
    describe('RuntimeConfigLive', () => {
        it.effect('creates layer with default NODE_ENV when not set', () =>
            Effect.gen(function* () {
                // Clear env vars for this test
                delete process.env.NODE_ENV;
                delete process.env.EVENTIVA_INTEGRITY_NONCE;
                delete process.env.EVENTIVA_ENCRYPTION_KEY;

                const options: RuntimeConfigOptions = { endpointsPort: 3000 };
                const layer = RuntimeConfigLive(options);
                const config = yield* Layer.build(layer);

                expect(config.nodeEnv).toBe('development');
                expect(config.endpointsPort).toBe(3000);
                expect(Option.isNone(config.integrityNonce)).toBe(true);
                expect(Option.isNone(config.encryptionKey)).toBe(true);
            })
        );

        it.effect('creates layer with custom NODE_ENV', () =>
            Effect.gen(function* () {
                process.env.NODE_ENV = 'production';
                delete process.env.EVENTIVA_INTEGRITY_NONCE;
                delete process.env.EVENTIVA_ENCRYPTION_KEY;

                const options: RuntimeConfigOptions = { endpointsPort: 8080 };
                const layer = RuntimeConfigLive(options);
                const config = yield* Layer.build(layer);

                expect(config.nodeEnv).toBe('production');
                expect(config.endpointsPort).toBe(8080);
            })
        );

        it.effect('creates layer with integrity nonce when set', () =>
            Effect.gen(function* () {
                process.env.NODE_ENV = 'test';
                process.env.EVENTIVA_INTEGRITY_NONCE = 'test-nonce-123';
                delete process.env.EVENTIVA_ENCRYPTION_KEY;

                const options: RuntimeConfigOptions = { endpointsPort: 4000 };
                const layer = RuntimeConfigLive(options);
                const config = yield* Layer.build(layer);

                expect(config.nodeEnv).toBe('test');
                expect(config.endpointsPort).toBe(4000);
                expect(Option.isSome(config.integrityNonce)).toBe(true);
                expect(Option.getOrUndefined(config.integrityNonce)).toBe('test-nonce-123');
                expect(Option.isNone(config.encryptionKey)).toBe(true);
            })
        );

        it.effect('creates layer with encryption key when set', () =>
            Effect.gen(function* () {
                process.env.NODE_ENV = 'development';
                delete process.env.EVENTIVA_INTEGRITY_NONCE;
                process.env.EVENTIVA_ENCRYPTION_KEY = 'test-key-456';

                const options: RuntimeConfigOptions = { endpointsPort: 5000 };
                const layer = RuntimeConfigLive(options);
                const config = yield* Layer.build(layer);

                expect(config.nodeEnv).toBe('development');
                expect(config.endpointsPort).toBe(5000);
                expect(Option.isNone(config.integrityNonce)).toBe(true);
                expect(Option.isSome(config.encryptionKey)).toBe(true);
                expect(Option.getOrUndefined(config.encryptionKey)).toBe('test-key-456');
            })
        );

        it.effect('creates layer with both integrity nonce and encryption key', () =>
            Effect.gen(function* () {
                process.env.NODE_ENV = 'production';
                process.env.EVENTIVA_INTEGRITY_NONCE = 'nonce-789';
                process.env.EVENTIVA_ENCRYPTION_KEY = 'key-789';

                const options: RuntimeConfigOptions = { endpointsPort: 6000 };
                const layer = RuntimeConfigLive(options);
                const config = yield* Layer.build(layer);

                expect(config.nodeEnv).toBe('production');
                expect(config.endpointsPort).toBe(6000);
                expect(Option.isSome(config.integrityNonce)).toBe(true);
                expect(Option.getOrUndefined(config.integrityNonce)).toBe('nonce-789');
                expect(Option.isSome(config.encryptionKey)).toBe(true);
                expect(Option.getOrUndefined(config.encryptionKey)).toBe('key-789');
            })
        );

        it.effect('uses endpointsPort from options parameter', () =>
            Effect.gen(function* () {
                process.env.NODE_ENV = 'development';
                delete process.env.EVENTIVA_INTEGRITY_NONCE;
                delete process.env.EVENTIVA_ENCRYPTION_KEY;

                const options1: RuntimeConfigOptions = { endpointsPort: 1234 };
                const layer1 = RuntimeConfigLive(options1);
                const config1 = yield* Layer.build(layer1);
                expect(config1.endpointsPort).toBe(1234);

                const options2: RuntimeConfigOptions = { endpointsPort: 9999 };
                const layer2 = RuntimeConfigLive(options2);
                const config2 = yield* Layer.build(layer2);
                expect(config2.endpointsPort).toBe(9999);
            })
        );

        it.effect('RuntimeConfig tag is properly defined', () =>
            Effect.gen(function* () {
                const tag = RuntimeConfig;
                expect(tag).toBeDefined();
                expect(tag.key).toBe('@eventiva/core/RuntimeConfig');
            })
        );
    });
});
