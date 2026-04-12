import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import type { HookDispatchEnvelope } from "./cluster-hook-dispatch.js"

/**
 * Integration-provided remote hook bus (Kafka, future brokers). Core routes broadcast dispatches here.
 */
export class HookRemotePublisher extends Context.Tag("@eventiva/core/HookRemotePublisher")<
  HookRemotePublisher,
  {
    /** Integration-specific errors/requirements (e.g. Kafka `Producer`) stay on the returned effect. */
    readonly publish: (envelope: HookDispatchEnvelope) => Effect.Effect<void, unknown, unknown>
  }
>() {}

/** Satisfies {@link HookRegistryLive} when no broker integration is merged (e.g. local colocated stack). */
export const hookRemotePublisherNoopLive = Layer.succeed(HookRemotePublisher, {
  publish: () => Effect.void,
})
