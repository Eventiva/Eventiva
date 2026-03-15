import { describe } from 'vitest';
import * as Effect from 'effect/Effect';
import { it as itEffect } from '@effect/vitest';
import { runIntegrityChecks } from '@eventiva/core';
import { RuntimeConfigLive } from '@eventiva/core';

describe('runIntegrityChecks', () => {
    itEffect('passes with default dev seed in non-production', () =>
        Effect.gen(function* () {
            const result = yield* Effect.exit(runIntegrityChecks);
            expect(Effect.isSuccess(result)).toBe(true);
        }).pipe(Effect.provide(RuntimeConfigLive))
    );

    itEffect('passes with custom integrity nonce', () =>
        Effect.gen(function* () {
            const result = yield* Effect.exit(
                runIntegrityChecks.pipe(
                    Effect.provide(
                        RuntimeConfigLive.pipe(
                            Layer.provide(
                                Layer.succeed('EVENTIVA_INTEGRITY_NONCE', 'custom-nonce-value')
                            )
                        )
                    )
                )
            );
            expect(Effect.isSuccess(result)).toBe(true);
        })
    );

    itEffect('fails in production without integrity nonce', () =>
        Effect.gen(function* () {
            const result = yield* Effect.exit(
                runIntegrityChecks.pipe(
                    Effect.provide(
                        RuntimeConfigLive.pipe(
                            Layer.provide(
                                Layer.succeed('NODE_ENV', 'production')
                            )
                        )
                    )
                )
            );
            expect(Effect.isFailure(result)).toBe(true);
            if (Effect.isFailure(result)) {
                const cause = Effect.causeOption(result).pipe(Effect.runSync);
                expect(cause).toBeDefined();
            }
        })
    );
});
