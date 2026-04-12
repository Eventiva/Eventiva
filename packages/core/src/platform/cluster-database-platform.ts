import type { PlatformContext } from "./platform-context.js"
import { clusterPlatformApplicationLaunch } from "./cluster-platform-main.js"
import type { Context } from "effect"
import { Effect, Layer } from "effect"

/**
 * `Effect.Service` `sync` payload for SQL database platforms that expose {@link PlatformContext}.
 */
export function clusterPlatformContextSync(config: {
  readonly sqlLayer: Layer.Layer<any, any, never>
  readonly observabilityLayer: Layer.Layer<any, any, never>
  readonly hookSidecarLayers: Layer.Layer<any, any, any>
  readonly kafkaHookBootstrapLayer: Layer.Layer<never, unknown, unknown>
}): () => {
  readonly sqlLayer: Layer.Layer<any, any, never>
  readonly observabilityLayer: Layer.Layer<any, any, never>
  readonly extensionLayers: Layer.Layer<unknown, unknown, never>
  readonly kafkaHookBootstrapLayer: Layer.Layer<never, unknown, unknown>
} {
  return () => ({
    sqlLayer: config.sqlLayer,
    observabilityLayer: config.observabilityLayer,
    extensionLayers: config.hookSidecarLayers as Layer.Layer<unknown, unknown, never>,
    kafkaHookBootstrapLayer: config.kafkaHookBootstrapLayer,
  })
}

/**
 * `clusterPlatformApplicationLaunch` + `Effect.provide(Platform.Default)` for the common database platform entrypoint.
 */
export function clusterPlatformMainFor<Service extends PlatformContext>(
  platformTag: Context.Tag<Service, Service> & {
    readonly Default: Layer.Layer<Service, any, any>
  },
  applicationLayers: Layer.Layer<unknown, unknown, never>,
  options?: {
    /** Merged with `platformTag.Default` when provided (e.g. Drizzle schema bootstrap). */
    readonly platformLayer?: Layer.Layer<Service, any, any>
  },
): Effect.Effect<void, unknown, never> {
  const platformLayer = options?.platformLayer ?? platformTag.Default
  return clusterPlatformApplicationLaunch(
    platformTag as unknown as Parameters<typeof clusterPlatformApplicationLaunch>[0],
    applicationLayers,
  ).pipe(Effect.provide(platformLayer)) as Effect.Effect<void, unknown, never>
}
