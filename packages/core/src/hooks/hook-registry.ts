import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import type { HookPhase, HookScope } from "./types.js"

export type HookPayload = unknown

export type HookHandler = (payload: HookPayload) => Effect.Effect<void, never, never>

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
