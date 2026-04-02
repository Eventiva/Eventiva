import type { Layer } from "effect"

import type { HookRegistry } from "../hooks/hook-registry.js"
import type { TransformRegistry } from "../hooks/transform-registry.js"

/**
 * SQL cluster socket wiring and observability provided by the platform
 * (e.g. Postgres or MySQL SqlLayer + observabilityLayers).
 * Extensions receive this and decide locally whether to run based on `CLUSTER_APP_MODE`.
 *
 * Optional `extensionLayers` are merged inside the cluster runner (hooks/transforms demo extensions).
 * Layer outputs/errors are intentionally loose so concrete platform `SqlLayer` types assign.
 */
export interface PlatformContext {
  readonly sqlLayer: Layer.Layer<any, any, never>
  readonly observabilityLayer: Layer.Layer<any, any, never>
  /**
   * Merged before battleship entities; typically hook/transform registration layers.
   * `Layer` is `in ROut` — use `never` here so merged demo layers (`HookRegistry` / `TransformRegistry`) assign.
   */
  readonly extensionLayers?: Layer.Layer<
    never,
    never,
    HookRegistry | TransformRegistry
  > | undefined
}

/** @alias PlatformContext — shared name for battleship platforms and extensions. */
export type BattleshipPlatformContext = PlatformContext
