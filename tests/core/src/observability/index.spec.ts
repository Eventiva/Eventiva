import { describe, it, expect } from '@effect/vitest';
import { Effect } from 'effect';
import * as ObservabilityIndex from '@eventiva/core';

describe('observability/index', () => {
    describe('exports', () => {
        it.effect('exports observability layer', () =>
            Effect.gen(function* () {
                expect(ObservabilityIndex.ObservabilityLive).toBeDefined();
            })
        );

        it.effect('exports observability helpers', () =>
            Effect.gen(function* () {
                expect(ObservabilityIndex.withSpanAndLog).toBeDefined();
            })
        );
    });
});
