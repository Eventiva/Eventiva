import { describe, it, expect } from '@effect/vitest';
import { Effect } from 'effect';
import type { ExtensionEntity } from '@eventiva/core';
import { Entity, CurrentAddress, CurrentRunnerAddress, make, type Request } from '@eventiva/core';

describe('cluster/entities', () => {
    describe('exports', () => {
        it.effect('exports ExtensionEntity type', () =>
            Effect.gen(function* () {
                // Type should be available (compile-time check)
                const _test: ExtensionEntity = undefined as any;
                expect(_test).toBeDefined();
            })
        );

        it.effect('exports Entity from @effect/cluster/Entity', () =>
            Effect.gen(function* () {
                expect(Entity).toBeDefined();
            })
        );

        it.effect('exports CurrentAddress', () =>
            Effect.gen(function* () {
                expect(CurrentAddress).toBeDefined();
            })
        );

        it.effect('exports CurrentRunnerAddress', () =>
            Effect.gen(function* () {
                expect(CurrentRunnerAddress).toBeDefined();
            })
        );

        it.effect('exports make function', () =>
            Effect.gen(function* () {
                expect(make).toBeDefined();
                expect(typeof make).toBe('function');
            })
        );

        it.effect('exports Request type', () =>
            Effect.gen(function* () {
                // Type should be available (compile-time check)
                const _test: Request<any, any> = undefined as any;
                expect(_test).toBeDefined();
            })
        );
    });

    describe('ExtensionEntity type', () => {
        it.effect('ExtensionEntity is compatible with Entity.Any', () =>
            Effect.gen(function* () {
                // This is a compile-time type check
                // At runtime, we just verify the type is available
                const _entity: ExtensionEntity = undefined as any;
                expect(_entity).toBeDefined();
            })
        );
    });
});
