import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Layer } from 'effect';
import {
    createPlatformTemplate,
    type CreatePlatformTemplateOptions,
    type PlatformTemplateTwoPhase,
} from '@eventiva/core';
import { DatabaseLiveInMemory } from '@eventiva/core';
import { SchemaFinalizerNoOp } from '@eventiva/core';

describe('runtime/platform', () => {
    describe('createPlatformTemplate', () => {
        it.effect('creates platform template with minimal options', () =>
            Effect.gen(function* () {
                const options: CreatePlatformTemplateOptions = {
                    databaseLayer: DatabaseLiveInMemory,
                    extensions: [],
                };

                const template = createPlatformTemplate(options);

                expect(template).toBeDefined();
                expect(template.getBootstrapLayer).toBeDefined();
                expect(template.getRuntimeLayer).toBeDefined();
            })
        );

        it.effect('creates template with extensions', () =>
            Effect.gen(function* () {
                const options: CreatePlatformTemplateOptions = {
                    databaseLayer: DatabaseLiveInMemory,
                    extensions: [
                        {
                            id: 'test-ext',
                            layer: Layer.empty,
                        },
                    ],
                };

                const template = createPlatformTemplate(options);

                expect(template).toBeDefined();
            })
        );

        it.effect('creates template with schema finalizer', () =>
            Effect.gen(function* () {
                const options: CreatePlatformTemplateOptions = {
                    databaseLayer: DatabaseLiveInMemory,
                    extensions: [],
                    schemaFinalizerLayer: SchemaFinalizerNoOp,
                };

                const template = createPlatformTemplate(options);

                expect(template).toBeDefined();
            })
        );

        it.effect('creates template with custom endpoints port', () =>
            Effect.gen(function* () {
                const options: CreatePlatformTemplateOptions = {
                    databaseLayer: DatabaseLiveInMemory,
                    extensions: [],
                    endpointsPort: 8080,
                };

                const template = createPlatformTemplate(options);

                expect(template).toBeDefined();
            })
        );

        it.effect('creates template with feature overrides', () =>
            Effect.gen(function* () {
                const options: CreatePlatformTemplateOptions = {
                    databaseLayer: DatabaseLiveInMemory,
                    extensions: [],
                    featureOverrides: {
                        'eventiva-observability': false,
                    },
                };

                const template = createPlatformTemplate(options);

                expect(template).toBeDefined();
            })
        );
    });

    describe('PlatformTemplateTwoPhase', () => {
        it.effect('getBootstrapLayer returns a Layer', () =>
            Effect.gen(function* () {
                const options: CreatePlatformTemplateOptions = {
                    databaseLayer: DatabaseLiveInMemory,
                    extensions: [],
                };

                const template = createPlatformTemplate(options);
                const bootstrapLayer = template.getBootstrapLayer();

                expect(bootstrapLayer).toBeDefined();
                const result = yield* Effect.exit(Layer.build(bootstrapLayer));
                expect(Exit.isExit(result)).toBe(true);
            })
        );

        it.effect('getRuntimeLayer returns a Layer', () =>
            Effect.gen(function* () {
                const options: CreatePlatformTemplateOptions = {
                    databaseLayer: DatabaseLiveInMemory,
                    extensions: [],
                };

                const template = createPlatformTemplate(options);
                const runtimeLayer = template.getRuntimeLayer();

                expect(runtimeLayer).toBeDefined();
                const result = yield* Effect.exit(Layer.build(runtimeLayer));
                expect(Exit.isExit(result)).toBe(true);
            })
        );
    });
});
