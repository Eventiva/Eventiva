import {
  TransformRegistry,
  TransformRegistryLive,
  type PlatformContext,
  clusterAppModeConfig,
} from "@eventiva/core"
import { Effect } from "effect"

const EXTENSION_ID = "eventiva.example-transform"
const TRANSFORM_ID = "retarget-shoot-target"

type ShootPayload = { readonly target: number }

/**
 * Demo pre-transform: maps `target` into a deterministic band so logs show transform audit.
 * Dependencies are declared so `Default` is self-contained for platform `Layer.mergeAll`.
 *
 * @see https://effect.website/docs/requirements-management/layers/#simplifying-service-definitions-with-effectservice
 */
export class ExampleTransformExtension extends Effect.Service<ExampleTransformExtension>()(
  "@eventiva/extensions/ExampleTransformExtension",
  {
    dependencies: [TransformRegistryLive],
    effect: Effect.gen(function* () {
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
      return {
        _tag: "@eventiva/extensions/ExampleTransformExtension" as const,
      }
    }),
  },
) {}

export function makeExampleTransformEntry(
  _ctx: PlatformContext,
): Effect.Effect<void, unknown, never> {
  return Effect.gen(function* () {
    const mode = yield* clusterAppModeConfig
    if (mode !== "primary" && mode !== "runner") {
      return
    }
  })
}
