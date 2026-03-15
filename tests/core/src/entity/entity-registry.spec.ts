import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit } from 'effect';
import { EntityRegistry } from '@eventiva/core';

describe('entity/entity-registry', () => {
    describe('EntityRegistry.get', () => {
        it.effect('throws error when entity not registered', () =>
            Effect.gen(function* () {
                const result = yield* Effect.exit(
                    Effect.sync(() => EntityRegistry.get('NonExistentEntity' as any))
                );
                expect(Exit.isFailure(result)).toBe(true);
                if (Exit.isFailure(result)) {
                    const error = Exit.causeOption(result).pipe(
                        Effect.flatMap((cause) => Effect.fail(cause)),
                        Effect.runSync
                    );
                    expect(String(error)).toContain('not found in EntityRegistry');
                }
            })
        );

        it.effect('returns registered entity', () =>
            Effect.gen(function* () {
                const mockEntity = { type: 'TestEntity', protocol: {} };
                EntityRegistry.register('TestEntity' as any, mockEntity);

                const entity = EntityRegistry.get('TestEntity' as any);
                expect(entity).toBe(mockEntity);
            })
        );
    });

    describe('EntityRegistry.tryGet', () => {
        it.effect('returns undefined when entity not registered', () =>
            Effect.gen(function* () {
                const entity = EntityRegistry.tryGet('NonExistentEntity' as any);
                expect(entity).toBeUndefined();
            })
        );

        it.effect('returns registered entity', () =>
            Effect.gen(function* () {
                const mockEntity = { type: 'TestEntity', protocol: {} };
                EntityRegistry.register('TestEntity' as any, mockEntity);

                const entity = EntityRegistry.tryGet('TestEntity' as any);
                expect(entity).toBe(mockEntity);
            })
        );
    });

    describe('EntityRegistry.register', () => {
        it.effect('registers entity by name', () =>
            Effect.gen(function* () {
                const mockEntity = { type: 'NewEntity', protocol: {} };
                EntityRegistry.register('NewEntity' as any, mockEntity);

                const retrieved = EntityRegistry.get('NewEntity' as any);
                expect(retrieved).toBe(mockEntity);
            })
        );

        it.effect('can register multiple entities', () =>
            Effect.gen(function* () {
                const entity1 = { type: 'Entity1', protocol: {} };
                const entity2 = { type: 'Entity2', protocol: {} };

                EntityRegistry.register('Entity1' as any, entity1);
                EntityRegistry.register('Entity2' as any, entity2);

                expect(EntityRegistry.get('Entity1' as any)).toBe(entity1);
                expect(EntityRegistry.get('Entity2' as any)).toBe(entity2);
            })
        );
    });

    describe('EntityRegistry.getAll', () => {
        it.effect('returns all registered entities', () =>
            Effect.gen(function* () {
                const entity1 = { type: 'Entity1', protocol: {} };
                const entity2 = { type: 'Entity2', protocol: {} };

                EntityRegistry.register('Entity1' as any, entity1);
                EntityRegistry.register('Entity2' as any, entity2);

                const all = EntityRegistry.getAll();
                expect(all.size).toBeGreaterThanOrEqual(2);
                expect(all.get('Entity1')).toBe(entity1);
                expect(all.get('Entity2')).toBe(entity2);
            })
        );
    });

    describe('EntityRegistry.lazy', () => {
        it.effect('creates lazy schema reference', () =>
            Effect.gen(function* () {
                const mockEntity = { type: 'LazyEntity', protocol: {} };
                EntityRegistry.register('LazyEntity' as any, mockEntity);

                const lazySchema = EntityRegistry.lazy('LazyEntity' as any);
                expect(lazySchema).toBeDefined();
            })
        );
    });
});
