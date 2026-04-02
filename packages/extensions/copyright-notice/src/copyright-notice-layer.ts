import { HookRegistry, type BattleshipPlatformContext, clusterAppModeConfig } from "@eventiva/core"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import {
  BY_RESNOVAS_WORDART,
  COPYRIGHT_STATEMENT,
  EVENTIVA_WORDART,
} from "./wordart.js"

function logBanner(): Effect.Effect<void, never, never> {
  return Effect.gen(function* () {
    yield* Effect.logInfo(EVENTIVA_WORDART).pipe(
      Effect.annotateLogs({ service: "eventiva", banner: "eventiva-wordart" }),
    )
    yield* Effect.logInfo(BY_RESNOVAS_WORDART).pipe(
      Effect.annotateLogs({ service: "eventiva", banner: "by-resnovas-wordart" }),
    )
    yield* Effect.logInfo(COPYRIGHT_STATEMENT).pipe(
      Effect.annotateLogs({ service: "eventiva", banner: "copyright" }),
    )
  })
}

/**
 * Registers `onLoad` (runner scope) to print wordart + copyright.
 */
export const copyrightNoticeLayer: Layer.Layer<never, never, HookRegistry> = Layer.effectDiscard(
  Effect.gen(function* () {
    const hooks = yield* HookRegistry
    yield* hooks.register({ _tag: "runner" }, "onLoad", (_payload) => logBanner())
  }),
)

/** No-op entry — real work is `copyrightNoticeLayer` merged via `PlatformContext.extensionLayers`. */
export function makeCopyrightNoticeEntry(
  _ctx: BattleshipPlatformContext,
): Effect.Effect<void, unknown, never> {
  return Effect.gen(function* () {
    const mode = yield* clusterAppModeConfig
    if (mode !== "battleship" && mode !== "runner") {
      return
    }
  })
}
