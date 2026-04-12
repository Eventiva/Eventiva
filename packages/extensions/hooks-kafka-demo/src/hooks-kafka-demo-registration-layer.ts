import { HookRegistry, HookRegistryLive } from "@eventiva/core"
import { Effect, Layer } from "effect"

/**
 * Registers runner-scoped handlers for local `onLoad` (bus off) or Kafka consumer (bus kafka).
 *
 * @see https://effect.website/docs/requirements-management/layers/#enabling-direct-method-access
 */
export class HooksKafkaDemoRegistrationExtension extends Effect.Service<HooksKafkaDemoRegistrationExtension>()(
  "@eventiva/extensions/HooksKafkaDemoRegistrationExtension",
  {
    dependencies: [HookRegistryLive],
    accessors: true,
    effect: Effect.gen(function* () {
      const hooks = yield* HookRegistry
      yield* hooks.register({ _tag: "runner" }, "onLoad", () =>
        Effect.logInfo(
          "[hooks-kafka-demo] runner onLoad handler executed (local runnerOnLoadHooks or Kafka consumer)",
        ),
      )
      yield* hooks.register(
        { _tag: "runner" },
        "hooksKafkaDemoPing",
        (payload: unknown) =>
          Effect.logInfo("[hooks-kafka-demo] hooksKafkaDemoPing phase (Kafka-only path)", {
            payload,
          }),
      )
      return {
        _tag: "@eventiva/extensions/HooksKafkaDemoRegistrationExtension" as const,
      }
    }),
  },
) {
  static readonly clusterExtensionRole = "registration" as const

  static Local = Layer.succeed(HooksKafkaDemoRegistrationExtension, {
    _tag: "@eventiva/extensions/HooksKafkaDemoRegistrationExtension" as const,
  })
}
