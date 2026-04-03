import { clusterHookBusConfig } from "@eventiva/core"
import { publishClusterHookDispatch } from "@eventiva/integrations.kafka"
import { randomUUID } from "node:crypto"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"

/**
 * When `CLUSTER_HOOK_BUS=kafka`, publishes two records to the hook dispatch topic so the
 * in-process consumer runs registered handlers (replaces skipped local `onLoad` for runner scope).
 * Merged after the Kafka hook stack in the runner so `Producer` is in scope.
 */
export const hooksKafkaDemoBootstrapLayer = Layer.effectDiscard(
  Effect.gen(function* () {
    const bus = yield* clusterHookBusConfig
    if (bus !== "kafka") {
      return
    }
    yield* Effect.forkDaemon(
      Effect.gen(function* () {
        yield* Effect.sleep("750 millis")
        yield* publishClusterHookDispatch(randomUUID(), "onLoad", { _tag: "runner" }, {})
        yield* Effect.logInfo("[hooks-kafka-demo] published runner onLoad to hook dispatch topic")
        yield* Effect.sleep("150 millis")
        yield* publishClusterHookDispatch(
          randomUUID(),
          "hooksKafkaDemoPing",
          { _tag: "runner" },
          { demo: true },
        )
        yield* Effect.logInfo("[hooks-kafka-demo] published hooksKafkaDemoPing to hook dispatch topic")
      }),
    )
  }),
)
