/**
 * Embedding service: embed(text) => vector. Used for semantic search; optional embedding column on entities.
 * Implement with Effect AI (e.g. @effect/ai embeddings); this module defines the interface and a no-op/test layer.
 * @see docs/learnings/architecture.md
 */
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';

/**
 * Embedding service interface. embed(text) returns a vector (number array) for the text.
 */
export interface EmbeddingService {
    readonly embed: (text: string) => Effect.Effect<readonly number[]>;
}

export const EmbeddingService = Context.GenericTag<EmbeddingService>('@eventiva/core/EmbeddingService');

/**
 * No-op EmbeddingService: returns an empty vector. Use in tests or when embeddings are not configured.
 */
export const EmbeddingServiceLiveNoop: Layer.Layer<EmbeddingService> = Layer.succeed(EmbeddingService, {
    embed: () => Effect.succeed([] as readonly number[]),
});

/**
 * Build an EmbeddingService layer from an embed function. Use with Effect AI or any provider:
 * EmbeddingServiceLive((text) => embeddingModel.embed(text)) where embeddingModel is from @effect/ai.
 */
export function EmbeddingServiceLive(
    embed: (text: string) => Effect.Effect<readonly number[]>
): Layer.Layer<EmbeddingService> {
    return Layer.succeed(EmbeddingService, { embed });
}
