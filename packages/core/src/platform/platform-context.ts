import type { Layer } from "effect"

/**
 * SQL cluster socket wiring and observability provided by the platform
 * (e.g. Postgres or MySQL SqlLayer + observabilityLayers).
 * Extensions receive this and decide locally whether to run based on `CLUSTER_APP_MODE`.
 *
 * Optional `extensionLayers` are merged inside the cluster runner. Prefer building them with
 * `Effect.Service` `.Default` layers and `Layer.mergeAll` so platform authors get typed
 * dependency requirements (see Effect docs: Managing Layers, Effect.Service).
 */
export interface PlatformContext {
  readonly sqlLayer: Layer.Layer<any, any, never>
  readonly observabilityLayer: Layer.Layer<any, any, never>
  /**
   * Merged before demo RPC entities; typically `Effect.Service` registration layers merged via `Layer.mergeAll`.
   */
  readonly extensionLayers?: Layer.Layer<unknown, unknown, never> | undefined
  /**
   * Merged after the Kafka hook stack when present; use for bootstrap publishes that need
   * `Producer` (e.g. `@eventiva/extensions.hooks-kafka-demo` bootstrap layer).
   */
  readonly kafkaHookBootstrapLayer?: Layer.Layer<never, unknown, unknown> | undefined
}
