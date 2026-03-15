import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit } from 'effect';
import {
    registerEntityMethodExtension,
    getExtensions,
    runWithExtensions,
    type EntityMethodExtension,
    type EntityMethodExtensionContext,
} from '@eventiva/core';

describe('entity/entity-method-extensions', () => {
    describe('registerEntityMethodExtension', () => {
        it.effect('registers extension for entity and method', () =>
            Effect.gen(function* () {
                const extension: EntityMethodExtension<string, number> = {
                    priority: 1,
                    extensionId: 'test-ext',
                    run: () => Effect.void,
                };

                registerEntityMethodExtension('TestEntity', 'testMethod', extension);
                const extensions = getExtensions<string, number>('TestEntity', 'testMethod');

                expect(extensions.length).toBe(1);
                expect(extensions[0].extensionId).toBe('test-ext');
            })
        );

        it.effect('sorts extensions by priority', () =>
            Effect.gen(function* () {
                const ext1: EntityMethodExtension<string, number> = {
                    priority: 3,
                    extensionId: 'ext-1',
                    run: () => Effect.void,
                };
                const ext2: EntityMethodExtension<string, number> = {
                    priority: 1,
                    extensionId: 'ext-2',
                    run: () => Effect.void,
                };
                const ext3: EntityMethodExtension<string, number> = {
                    priority: 2,
                    extensionId: 'ext-3',
                    run: () => Effect.void,
                };

                registerEntityMethodExtension('TestEntity', 'sorted', ext1);
                registerEntityMethodExtension('TestEntity', 'sorted', ext2);
                registerEntityMethodExtension('TestEntity', 'sorted', ext3);

                const extensions = getExtensions<string, number>('TestEntity', 'sorted');

                expect(extensions.length).toBe(3);
                expect(extensions[0].extensionId).toBe('ext-2'); // priority 1
                expect(extensions[1].extensionId).toBe('ext-3'); // priority 2
                expect(extensions[2].extensionId).toBe('ext-1'); // priority 3
            })
        );

        it.effect('allows multiple extensions for same entity and method', () =>
            Effect.gen(function* () {
                const ext1: EntityMethodExtension<string, number> = {
                    priority: 1,
                    extensionId: 'ext-1',
                    run: () => Effect.void,
                };
                const ext2: EntityMethodExtension<string, number> = {
                    priority: 2,
                    extensionId: 'ext-2',
                    run: () => Effect.void,
                };

                registerEntityMethodExtension('TestEntity', 'multi', ext1);
                registerEntityMethodExtension('TestEntity', 'multi', ext2);

                const extensions = getExtensions<string, number>('TestEntity', 'multi');

                expect(extensions.length).toBe(2);
            })
        );
    });

    describe('getExtensions', () => {
        it.effect('returns empty array when no extensions registered', () =>
            Effect.gen(function* () {
                const extensions = getExtensions('NonExistent', 'method');
                expect(extensions).toEqual([]);
            })
        );

        it.effect('returns registered extensions', () =>
            Effect.gen(function* () {
                const extension: EntityMethodExtension<string, number> = {
                    priority: 1,
                    extensionId: 'test-ext',
                    run: () => Effect.void,
                };

                registerEntityMethodExtension('TestEntity', 'getMethod', extension);
                const extensions = getExtensions<string, number>('TestEntity', 'getMethod');

                expect(extensions.length).toBe(1);
                expect(extensions[0].extensionId).toBe('test-ext');
            })
        );
    });

    describe('runWithExtensions', () => {
        it.effect('runs base effect and returns result', () =>
            Effect.gen(function* () {
                const baseEffect = (req: { payload: string }) => Effect.succeed(req.payload.length);
                const request = {
                    address: { entityId: 'test-id' },
                    payload: 'test',
                };

                const result = yield* runWithExtensions('TestEntity', 'testMethod', baseEffect, request);

                expect(result).toBe(4);
            })
        );

        it.effect('runs registered extensions after base effect', () =>
            Effect.gen(function* () {
                let extensionRun = false;
                const extension: EntityMethodExtension<{ payload: string }, number> = {
                    priority: 1,
                    extensionId: 'test-ext',
                    run: (ctx) =>
                        Effect.gen(function* () {
                            extensionRun = true;
                            expect(ctx.baseResult).toBe(4);
                            expect(ctx.entityType).toBe('TestEntity');
                            expect(ctx.method).toBe('testMethod');
                        }),
                };

                registerEntityMethodExtension('TestEntity', 'withExt', extension);

                const baseEffect = (req: { payload: string }) => Effect.succeed(req.payload.length);
                const request = {
                    address: { entityId: 'test-id' },
                    payload: 'test',
                };

                const result = yield* runWithExtensions('TestEntity', 'withExt', baseEffect, request);

                expect(result).toBe(4);
                expect(extensionRun).toBe(true);
            })
        );

        it.effect('runs extensions in priority order', () =>
            Effect.gen(function* () {
                const runOrder: string[] = [];
                const ext1: EntityMethodExtension<{ payload: string }, number> = {
                    priority: 2,
                    extensionId: 'ext-1',
                    run: () =>
                        Effect.gen(function* () {
                            runOrder.push('ext-1');
                        }),
                };
                const ext2: EntityMethodExtension<{ payload: string }, number> = {
                    priority: 1,
                    extensionId: 'ext-2',
                    run: () =>
                        Effect.gen(function* () {
                            runOrder.push('ext-2');
                        }),
                };

                registerEntityMethodExtension('TestEntity', 'ordered', ext1);
                registerEntityMethodExtension('TestEntity', 'ordered', ext2);

                const baseEffect = (req: { payload: string }) => Effect.succeed(1);
                const request = {
                    address: { entityId: 'test-id' },
                    payload: 'test',
                };

                yield* runWithExtensions('TestEntity', 'ordered', baseEffect, request);

                expect(runOrder).toEqual(['ext-2', 'ext-1']);
            })
        );
    });
});
