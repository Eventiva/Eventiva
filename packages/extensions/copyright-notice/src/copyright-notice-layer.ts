import {
  HookRegistry,
  HookRegistryLive,
  type PlatformContext,
  clusterAppModeConfig,
} from "@eventiva/core"
import { Effect } from "effect"
import {
  BY_RESNOVAS_WORDART,
  COPYRIGHT_STATEMENT,
  EVENTIVA_WORDART,
} from "./wordart.js"

/** Logs ASCII wordart + copyright (runner onLoad). Exported for unit coverage. */
export function logCopyrightNoticeBanner(): Effect.Effect<void, never, never> {
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
 * Demo extension: registers runner `onLoad` to print wordart + copyright.
 * Dependencies are declared so `Default` is self-contained for platform `Layer.mergeAll`.
 *
 * @see https://effect.website/docs/requirements-management/layers/#simplifying-service-definitions-with-effectservice
 */
export class CopyrightNoticeExtension extends Effect.Service<CopyrightNoticeExtension>()(
  "@eventiva/extensions/CopyrightNoticeExtension",
  {
    dependencies: [HookRegistryLive],
    effect: Effect.gen(function* () {
      const hooks = yield* HookRegistry
      yield* hooks.register({ _tag: "runner" }, "onLoad", (_payload) => logCopyrightNoticeBanner())
      return {
        _tag: "@eventiva/extensions/CopyrightNoticeExtension" as const,
      }
    }),
  },
) {}

/** No-op entry — real work is {@link CopyrightNoticeExtension} merged via `PlatformContext.extensionLayers`. */
export function makeCopyrightNoticeEntry(
  _ctx: PlatformContext,
): Effect.Effect<void, unknown, never> {
  return Effect.gen(function* () {
    const mode = yield* clusterAppModeConfig
    if (mode !== "primary" && mode !== "runner") {
      return
    }
  })
}
