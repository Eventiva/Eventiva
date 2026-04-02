import * as Ref from "effect/Ref"
import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import type { HookPhase, HookScope } from "./types.js"
import { hookScopeEquals } from "./types.js"

export type HookPayload = unknown

export type HookHandler = (payload: HookPayload) => Effect.Effect<void, never, never>

interface RegisteredHook {
  readonly scope: HookScope
  readonly phase: HookPhase
  readonly handler: HookHandler
}

export class HookRegistry extends Context.Tag("@eventiva/core/HookRegistry")<
  HookRegistry,
  {
    readonly register: (
      scope: HookScope,
      phase: HookPhase,
      handler: HookHandler,
    ) => Effect.Effect<void, never, never>
    readonly run: (
      scope: HookScope,
      phase: HookPhase,
      payload: HookPayload,
    ) => Effect.Effect<void, never, never>
  }
>() {}

export const HookRegistryLive: Layer.Layer<HookRegistry> = Layer.scoped(
  HookRegistry,
  Effect.gen(function* () {
    const ref = yield* Ref.make<ReadonlyArray<RegisteredHook>>([])
    return {
      register: (scope, phase, handler) =>
        Ref.update(ref, (xs) => [...xs, { scope, phase, handler }]),
      run: (scope, phase, payload) =>
        Effect.gen(function* () {
          const xs = yield* Ref.get(ref)
          for (const h of xs) {
            if (h.phase === phase && hookScopeEquals(h.scope, scope)) {
              yield* h.handler(payload)
            }
          }
        }),
    }
  }),
)
