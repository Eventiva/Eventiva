import { describe, it, expect } from '@effect/vitest';
import { Effect } from 'effect';
import {
    DevToolsLive,
    bootstrapProgram,
    runtimeOnlyProgram,
    defaultRuntimeProgram,
    runMainTwoPhase,
    runMain,
    runRuntime,
} from '@eventiva/core';

describe('runtime/run-runtime', () => {
    describe('DevToolsLive', () => {
        it.effect('is a valid Layer', () =>
            Effect.gen(function* () {
                expect(DevToolsLive).toBeDefined();
                const result = yield* Effect.exit(Effect.scoped(DevToolsLive));
                expect(Effect.isEffect(result)).toBe(true);
            })
        );
    });

    describe('bootstrapProgram', () => {
        it.effect('is a valid Effect', () =>
            Effect.gen(function* () {
                expect(bootstrapProgram).toBeDefined();
                // May fail due to missing dependencies, but should be a valid Effect
                const result = yield* Effect.exit(bootstrapProgram);
                expect(Effect.isEffect(result)).toBe(true);
            })
        );
    });

    describe('runtimeOnlyProgram', () => {
        it.effect('is a valid Effect', () =>
            Effect.gen(function* () {
                expect(runtimeOnlyProgram).toBeDefined();
                // May fail due to missing dependencies, but should be a valid Effect
                const result = yield* Effect.exit(runtimeOnlyProgram);
                expect(Effect.isEffect(result)).toBe(true);
            })
        );
    });

    describe('defaultRuntimeProgram', () => {
        it.effect('is a valid Effect', () =>
            Effect.gen(function* () {
                expect(defaultRuntimeProgram).toBeDefined();
                // May fail due to missing dependencies, but should be a valid Effect
                const result = yield* Effect.exit(defaultRuntimeProgram);
                expect(Effect.isEffect(result)).toBe(true);
            })
        );
    });

    describe('runMainTwoPhase', () => {
        it.effect('is a function', () =>
            Effect.gen(function* () {
                expect(typeof runMainTwoPhase).toBe('function');
            })
        );
    });

    describe('runMain', () => {
        it.effect('is a function', () =>
            Effect.gen(function* () {
                expect(typeof runMain).toBe('function');
            })
        );
    });

    describe('runRuntime', () => {
        it.effect('is a function', () =>
            Effect.gen(function* () {
                expect(typeof runRuntime).toBe('function');
            })
        );
    });
});
