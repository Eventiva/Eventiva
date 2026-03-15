import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Layer } from 'effect';
import {
    SchemaRegistryConfig,
    SchemaRegistryConfigLive,
} from '@eventiva/core';

describe('schema/schema-registry-config', () => {
    describe('SchemaRegistryConfigLive', () => {
        it.effect('provides SchemaRegistryConfig service', () =>
            Effect.gen(function* () {
                const config = yield* Layer.build(SchemaRegistryConfigLive(5));
                expect(config).toBeDefined();
                expect(config.expectedReadyCount).toBe(5);
            })
        );

        it.effect('uses provided expectedReadyCount', () =>
            Effect.gen(function* () {
                const config1 = yield* Layer.build(SchemaRegistryConfigLive(3));
                const config2 = yield* Layer.build(SchemaRegistryConfigLive(10));

                expect(config1.expectedReadyCount).toBe(3);
                expect(config2.expectedReadyCount).toBe(10);
            })
        );

        it.effect('defaults creatorTableName to contact', () =>
            Effect.gen(function* () {
                const config = yield* Layer.build(SchemaRegistryConfigLive(1));
                expect(config.creatorTableName).toBe('contact');
            })
        );

        it.effect('uses custom creatorTableName when provided', () =>
            Effect.gen(function* () {
                const config = yield* Layer.build(
                    SchemaRegistryConfigLive(1, { creatorTableName: 'custom_table' })
                );
                expect(config.creatorTableName).toBe('custom_table');
            })
        );
    });

    describe('SchemaRegistryConfig tag', () => {
        it.effect('SchemaRegistryConfig tag is properly defined', () =>
            Effect.gen(function* () {
                const tag = SchemaRegistryConfig;
                expect(tag).toBeDefined();
                expect(tag.key).toBe('@eventiva/core/SchemaRegistryConfig');
            })
        );
    });
});
