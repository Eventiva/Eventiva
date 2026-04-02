import {
  TransformRegistry,
  type BattleshipPlatformContext,
  clusterAppModeConfig,
} from "@eventiva/core"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"

const EXTENSION_ID = "eventiva.example-transform"
const TRANSFORM_ID = "retarget-shoot-target"

type ShootPayload = { readonly target: number }

/**
 * Demo pre-transform: maps `target` into a deterministic band so logs show transform audit.
 */
export const exampleTransformLayer: Layer.Layer<never, never, TransformRegistry> =
  Layer.effectDiscard(
    Effect.gen(function* () {
      const registry = yield* TransformRegistry
      yield* registry.registerPre<ShootPayload>(
        "Shoot",
        EXTENSION_ID,
        TRANSFORM_ID,
        (ctx) =>
          Effect.sync(() => {
            const next = (ctx.current.target % 100) + 900
            ctx.current = { ...ctx.current, target: next }
            return ctx
          }),
      )
    }),
  )

export function makeExampleTransformEntry(
  _ctx: BattleshipPlatformContext,
): Effect.Effect<void, unknown, never> {
  return Effect.gen(function* () {
    const mode = yield* clusterAppModeConfig
    if (mode !== "battleship" && mode !== "runner") {
      return
    }
  })
}
