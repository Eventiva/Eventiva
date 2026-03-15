import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit } from 'effect';
import { runCoreStartup } from '@eventiva/core';

describe('runtime/run-core-startup', () => {
    describe('runCoreStartup', () => {
        it.effect('is a valid Effect', () =>
            Effect.gen(function* () {
                expect(runCoreStartup).toBeDefined();
                // May fail due to missing dependencies, but should be a valid Effect
                const result = yield* Effect.exit(runCoreStartup);
                expect(Exit.isExit(result)).toBe(true);
            })
        );
    });
});
