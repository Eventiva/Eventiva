import { ClusterPlatformContext } from "@eventiva/core"
import { Effect, Layer } from "effect"
import { makeSlowShooterEntry, slowShooterProgram } from "./slow-shooter.js"

/** Slow shooter when `CLUSTER_APP_MODE` is `slow-shooter`. */
export class SlowShooterExtension extends Effect.Service<SlowShooterExtension>()(
  "@eventiva/extensions/SlowShooterExtension",
  {
    effect: Effect.gen(function* () {
      const ctx = yield* ClusterPlatformContext
      yield* makeSlowShooterEntry(ctx)
      return { _tag: "@eventiva/extensions/SlowShooterExtension" as const }
    }),
  },
) {
  /** Colocated local cluster: forked `slowShooterProgram` replaces mode-gated entry. */
  static Local = Layer.succeed(SlowShooterExtension, {
    _tag: "@eventiva/extensions/SlowShooterExtension" as const,
  })

  static Program = slowShooterProgram
}
