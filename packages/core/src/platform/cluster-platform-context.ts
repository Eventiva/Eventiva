import { Context } from "effect"
import type { PlatformContext } from "./platform-context.js"

/**
 * Current process cluster wiring (`sqlLayer`, `observabilityLayer`, hook `extensionLayers`, Kafka bootstrap).
 * Provided around `Layer.launch` of application layers so extension `Effect.Service`s can `yield*` it
 * without depending on `@eventiva/platforms.*`.
 */
export const ClusterPlatformContext = Context.GenericTag<PlatformContext>(
  "eventiva/core/ClusterPlatformContext",
)
