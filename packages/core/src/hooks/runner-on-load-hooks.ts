import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import { HookRegistry } from "./hook-registry.js"

/**
 * Dispatches `onLoad` for scope `runner` once when the runner scope starts.
 * Requires `HookRegistry` (consumes).
 */
export const runnerOnLoadHooksLayer: Layer.Layer<never, never, HookRegistry> = Layer.effectDiscard(
  Effect.gen(function* () {
    const hooks = yield* HookRegistry
    yield* hooks.run({ _tag: "runner" }, "onLoad", {})
  }),
)
