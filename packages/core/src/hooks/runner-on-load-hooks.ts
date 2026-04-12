import type { ConfigError } from "effect/ConfigError"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import { HookRegistry } from "./hook-registry.js"

/**
 * Dispatches `onLoad` for scope `runner` once when the runner scope starts via {@link HookRegistry.run}
 * (PubSub, Kafka, or inline per `CLUSTER_HOOK_BUS` / infrastructure defaults).
 * Requires `HookRegistry` (consumes).
 */
export const runnerOnLoadHooksLayer = Layer.effectDiscard(
  Effect.gen(function* () {
    const hooks = yield* HookRegistry
    yield* hooks.run({ _tag: "runner" }, "onLoad", {})
  }),
) as Layer.Layer<never, ConfigError, HookRegistry>
