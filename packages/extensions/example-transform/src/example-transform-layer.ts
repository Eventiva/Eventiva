import {
  TransformRegistry,
  TransformRegistryLive,
  type PlatformContext,
  clusterAppModeConfig,
} from "@eventiva/core"
import { Effect, Layer } from "effect"

const EXTENSION_ID = "eventiva.example-transform"
const TRANSFORM_ID = "retarget-shoot-target"

type ShootPayload = { readonly target: number }

/**
 * Demo pre-transform: maps `target` into a deterministic band so logs show transform audit.
 * Dependencies are declared so `Default` is self-contained for platform `Layer.mergeAll`.
 *
 * `accessors: true` exposes {@link ExampleTransformExtension.transformDescriptor} as
 * `yield* ExampleTransformExtension.transformDescriptor` when this service is in context.
 *
 * @see https://effect.website/docs/requirements-management/layers/#enabling-direct-method-access
 */
export class ExampleTransformExtension extends Effect.Service<ExampleTransformExtension>()(
  "@eventiva/extensions/ExampleTransformExtension",
  {
    dependencies: [TransformRegistryLive],
    accessors: true,
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
        transformDescriptor: Effect.succeed(`${EXTENSION_ID}/${TRANSFORM_ID}` as const),
      }
    }),
  },
) {
  static readonly clusterExtensionRole = "registration" as const

  static Local = Layer.succeed(ExampleTransformExtension, {
    _tag: "@eventiva/extensions/ExampleTransformExtension" as const,
    transformDescriptor: Effect.succeed(`${EXTENSION_ID}/${TRANSFORM_ID}` as const),
  })
}

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
