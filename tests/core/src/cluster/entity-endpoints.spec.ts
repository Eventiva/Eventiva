import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit } from 'effect';
import {
    ENTITY_GROUP_REQUIRED_HANDLER_KEYS,
    validateEntityGroupHandlers,
} from '@eventiva/core';

describe('cluster/entity-endpoints', () => {
    describe('ENTITY_GROUP_REQUIRED_HANDLER_KEYS', () => {
        it.effect('defines all required handler keys', () =>
            Effect.gen(function* () {
                expect(ENTITY_GROUP_REQUIRED_HANDLER_KEYS).toBeDefined();
                expect(Array.isArray(ENTITY_GROUP_REQUIRED_HANDLER_KEYS)).toBe(true);
                expect(ENTITY_GROUP_REQUIRED_HANDLER_KEYS.length).toBe(6);
                expect(ENTITY_GROUP_REQUIRED_HANDLER_KEYS).toContain('invoke');
                expect(ENTITY_GROUP_REQUIRED_HANDLER_KEYS).toContain('list');
                expect(ENTITY_GROUP_REQUIRED_HANDLER_KEYS).toContain('get');
                expect(ENTITY_GROUP_REQUIRED_HANDLER_KEYS).toContain('create');
                expect(ENTITY_GROUP_REQUIRED_HANDLER_KEYS).toContain('update');
                expect(ENTITY_GROUP_REQUIRED_HANDLER_KEYS).toContain('delete');
            })
        );
    });

    describe('validateEntityGroupHandlers', () => {
        it.effect('throws when built is null', () =>
            Effect.gen(function* () {
                const result = yield* Effect.exit(
                    Effect.sync(() => validateEntityGroupHandlers(null, 'test-group'))
                );
                expect(Exit.isFailure(result)).toBe(true);
            })
        );

        it.effect('throws when built is not an object', () =>
            Effect.gen(function* () {
                const result1 = yield* Effect.exit(
                    Effect.sync(() => validateEntityGroupHandlers('string', 'test-group'))
                );
                expect(Exit.isFailure(result1)).toBe(true);

                const result2 = yield* Effect.exit(
                    Effect.sync(() => validateEntityGroupHandlers(123, 'test-group'))
                );
                expect(Exit.isFailure(result2)).toBe(true);
            })
        );

        it.effect('throws when built has no handle property', () =>
            Effect.gen(function* () {
                const built = { handlers: [] };
                const result = yield* Effect.exit(
                    Effect.sync(() => validateEntityGroupHandlers(built, 'test-group'))
                );
                expect(Exit.isFailure(result)).toBe(true);
            })
        );

        it.effect('throws when built has no handlers iterable', () =>
            Effect.gen(function* () {
                const built = { handle: {} };
                const result = yield* Effect.exit(
                    Effect.sync(() => validateEntityGroupHandlers(built, 'test-group'))
                );
                expect(Exit.isFailure(result)).toBe(true);
            })
        );

        it.effect('throws when required key is missing', () =>
            Effect.gen(function* () {
                const built = {
                    handle: {},
                    handlers: {
                        invoke: () => {},
                        list: () => {},
                        // Missing get, create, update, delete
                    },
                };
                const result = yield* Effect.exit(
                    Effect.sync(() => validateEntityGroupHandlers(built, 'test-group'))
                );
                expect(Exit.isFailure(result)).toBe(true);
            })
        );

        it.effect('throws when required key is not a function', () =>
            Effect.gen(function* () {
                const built = {
                    handle: {},
                    handlers: {
                        invoke: () => {},
                        list: () => {},
                        get: 'not a function',
                        create: () => {},
                        update: () => {},
                        delete: () => {},
                    },
                };
                const result = yield* Effect.exit(
                    Effect.sync(() => validateEntityGroupHandlers(built, 'test-group'))
                );
                expect(Exit.isFailure(result)).toBe(true);
            })
        );

        it.effect('passes when all required handlers are present and are functions', () =>
            Effect.gen(function* () {
                const built = {
                    handle: {},
                    handlers: {
                        invoke: () => {},
                        list: () => {},
                        get: () => {},
                        create: () => {},
                        update: () => {},
                        delete: () => {},
                    },
                };
                const result = yield* Effect.exit(
                    Effect.sync(() => validateEntityGroupHandlers(built, 'test-group'))
                );
                expect(Exit.isSuccess(result)).toBe(true);
            })
        );
    });
});
