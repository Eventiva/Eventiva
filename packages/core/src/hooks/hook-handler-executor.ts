import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import type { HookDispatchEnvelope } from "./cluster-hook-dispatch.js"

/**
 * Runs registered hook handlers for a decoded envelope. Used by hook-bus consumers so work is not re-published.
 */
export class HookHandlerExecutor extends Context.Tag("@eventiva/core/HookHandlerExecutor")<
  HookHandlerExecutor,
  {
    readonly executeEnvelope: (envelope: HookDispatchEnvelope) => Effect.Effect<void>
  }
>() {}
