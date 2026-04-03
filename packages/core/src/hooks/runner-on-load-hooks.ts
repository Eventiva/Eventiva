import { clusterHookBusConfig } from "../config/cluster-hook-config.js"
import type { ConfigError } from "effect/ConfigError"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import { HookRegistry } from "./hook-registry.js"

/**
 * Dispatches `onLoad` for scope `runner` once when the runner scope starts.
 * When `CLUSTER_HOOK_BUS=kafka`, skips local dispatch so the same lifecycle is not run twice
 * (cluster-wide `onLoad` should be published to the hook topic instead).
 * Requires `HookRegistry` (consumes).
 */
export const runnerOnLoadHooksLayer: Layer.Layer<never, ConfigError, HookRegistry> = Layer.effectDiscard(
  Effect.gen(function* () {
    const bus = yield* clusterHookBusConfig
    if (bus === "kafka") {
      return
    }
    const hooks = yield* HookRegistry
    yield* hooks.run({ _tag: "runner" }, "onLoad", {})
  }),
)
