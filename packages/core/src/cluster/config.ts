/**
 * Effect/Cluster configuration: default layers and modes for Sharding and Runner.
 * Use TestRunner for in-process development and tests; swap for SingleRunner or
 * distributed Sharding + Pods when moving to multi-process.
 * @see docs/plans/2026-03-07-effect-crm-framework-infrastructure.md
 * @see docs/learnings/architecture.md
 * @see https://effect-ts.github.io/effect/docs/cluster
 */
import type * as Layer from 'effect/Layer';
import * as Layer_ from 'effect/Layer';
import * as TestRunner from '@effect/cluster/TestRunner';
import * as SingleRunner from '@effect/cluster/SingleRunner';
import * as ShardingConfig from '@effect/cluster/ShardingConfig';

/**
 * Cluster execution mode. Default platform uses "test" (in-memory).
 * - test: TestRunner – single process, in-memory sharding and runner (dev/tests).
 * - single: SingleRunner – single process with real Sharding config (single process, real sharding).
 * - distributed: Sharding + Pods + RunnerStorage – multi-process (future).
 */
export type ClusterMode = 'test' | 'single' | 'distributed';

/**
 * Default cluster layer for the platform. Provides Sharding and Runner in one process
 * using @effect/cluster TestRunner (in-memory). Entity layers merged on top get
 * registered with this runner.
 * Use this in platform templates (e.g. defaultPlatform) so cluster setup is centralized.
 */
export const clusterLayerDefault: Layer.Layer<never, never, never> = TestRunner.layer;

/**
 * Single runner layer with real sharding configuration. Use for single-process
 * development with real sharding behavior (useful for testing sharding logic).
 * Requires database layer for sharding state persistence.
 *
 * Observability: The underlying SingleRunner, Sharding, and ShardingConfig layers
 * provide their own observability (logging, metrics, tracing) when built.
 *
 * @returns Layer that provides Sharding, Runners, and MessageStorage.
 * Requires SqlClient and may fail with ConfigError if sharding config is invalid.
 */
export function makeSingleRunnerLayer(
    shardingConfigOverrides?: Partial<ShardingConfig.ShardingConfig['Type']>
): ReturnType<typeof SingleRunner.layer> {
    return SingleRunner.layer({ shardingConfig: shardingConfigOverrides });
}

/**
 * Create a cluster layer based on the specified mode.
 * - 'test': Uses TestRunner (in-memory, single process)
 * - 'single': Uses SingleRunner with real Sharding (single process, real sharding)
 * - 'distributed': Not yet implemented (requires Pods + RunnerStorage)
 * 
 * Observability: All cluster layers (TestRunner, SingleRunner) provide their own
 * observability (logging, metrics, tracing) when built. Ensure ObservabilityLive
 * is provided in the layer composition for full observability support.
 */
export function makeClusterLayer(mode: ClusterMode): Layer.Layer<never, never, never> {
    switch (mode) {
        case 'test':
            return clusterLayerDefault;
        case 'single':
            return makeSingleRunnerLayer();
        case 'distributed':
            throw new Error('Distributed cluster mode not yet implemented. Requires Pods + RunnerStorage.');
    }
}

/**
 * Memoized global cluster layer. Use this when you need the same cluster layer
 * instance across multiple platform templates or test scenarios.
 * The layer is built once and reused, ensuring consistent Sharding state.
 * 
 * Note: This returns an Effect that must be run in a scoped context.
 * Use Layer.unwrapScoped(globalClusterLayer) to get a Layer instance.
 * 
 * @example
 * ```typescript
 * // Use memoized layer to ensure same Sharding instance across multiple platforms
 * const memoizedEffect = globalClusterLayer;
 * const globalBase = Layer.unwrapScoped(memoizedEffect);
 * const platform1 = globalBase.pipe(Layer.provideMerge(entityLayer1));
 * const platform2 = globalBase.pipe(Layer.provideMerge(entityLayer2));
 * ```
 */
export const globalClusterLayer = Layer_.memoize(clusterLayerDefault);

/**
 * Create a memoized layer from any layer. Useful for creating global singletons
 * that should be built once and reused across the application.
 * 
 * Note: Returns an Effect that must be unwrapped with Layer.unwrapScoped.
 * 
 * @example
 * ```typescript
 * const memoizedEffect = memoizeLayer(ObservabilityLive);
 * const globalObservabilityLayer = Layer.unwrapScoped(memoizedEffect);
 * ```
 */
export const memoizeLayer = Layer_.memoize;

/** Re-export for platforms that need to reference TestRunner directly. */
export { TestRunner };
