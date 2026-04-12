import { HookRegistry } from "@eventiva/core"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"

/**
 * After a short delay, dispatches `hooksKafkaDemoPing` through {@link HookRegistry.run} so the
 * same hook bus path runs as for all other hooks (PubSub / Kafka / inline).
 * Runner `onLoad` is handled by `runnerOnLoadHooksLayer` only.
 * Merged after the hook + Kafka stack in the runner.
 */
export const hooksKafkaDemoBootstrapLayer = Layer.effectDiscard(
  Effect.gen(function* () {
    yield* Effect.forkDaemon(
      Effect.gen(function* () {
        yield* Effect.sleep("900 millis")
        const hooks = yield* HookRegistry
        yield* hooks.run({ _tag: "runner" }, "hooksKafkaDemoPing", { demo: true })
        yield* Effect.logInfo("[hooks-kafka-demo] dispatched hooksKafkaDemoPing through hook bus")
      }),
    )
  }),
)
