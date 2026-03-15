import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Layer } from 'effect';
import {
    EmbeddingService,
    EmbeddingServiceLiveNoop,
    EmbeddingServiceLive,
} from '@eventiva/core';

describe('embedding/embedding-service', () => {
    describe('EmbeddingServiceLiveNoop', () => {
        it.effect('provides EmbeddingService that returns empty vector', () =>
            Effect.gen(function* () {
                const service = yield* Layer.build(EmbeddingServiceLiveNoop);
                const vector = yield* service.embed('test text');
                expect(vector).toBeDefined();
                expect(Array.isArray(vector)).toBe(true);
                expect(vector.length).toBe(0);
            })
        );

        it.effect('returns empty vector for any input', () =>
            Effect.gen(function* () {
                const service = yield* Layer.build(EmbeddingServiceLiveNoop);
                const vector1 = yield* service.embed('text 1');
                const vector2 = yield* service.embed('text 2');
                const vector3 = yield* service.embed('');

                expect(vector1).toEqual([]);
                expect(vector2).toEqual([]);
                expect(vector3).toEqual([]);
            })
        );
    });

    describe('EmbeddingServiceLive', () => {
        it.effect('creates service from embed function', () =>
            Effect.gen(function* () {
                const embedFn = (text: string) => Effect.succeed([1, 2, 3] as readonly number[]);
                const layer = EmbeddingServiceLive(embedFn);
                const service = yield* Layer.build(layer);

                const vector = yield* service.embed('test');
                expect(vector).toEqual([1, 2, 3]);
            })
        );

        it.effect('uses provided embed function', () =>
            Effect.gen(function* () {
                const embedFn = (text: string) => Effect.succeed([text.length] as readonly number[]);
                const layer = EmbeddingServiceLive(embedFn);
                const service = yield* Layer.build(layer);

                const vector1 = yield* service.embed('short');
                const vector2 = yield* service.embed('much longer text');

                expect(vector1).toEqual([5]);
                expect(vector2).toEqual([17]);
            })
        );
    });

    describe('EmbeddingService tag', () => {
        it.effect('EmbeddingService tag is properly defined', () =>
            Effect.gen(function* () {
                const tag = EmbeddingService;
                expect(tag).toBeDefined();
                expect(tag.key).toBe('@eventiva/core/EmbeddingService');
            })
        );
    });
});
