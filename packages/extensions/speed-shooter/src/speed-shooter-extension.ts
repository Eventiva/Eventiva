import { ClusterPlatformContext } from "@eventiva/core"
import { Effect, Layer } from "effect"
import { makeSpeedShooterEntry, speedShooterProgram } from "./speed-shooter.js"

/** High-concurrency shooter when `CLUSTER_APP_MODE` is `speed-shooter`. */
export class SpeedShooterExtension extends Effect.Service<SpeedShooterExtension>()(
  "@eventiva/extensions/SpeedShooterExtension",
  {
    effect: Effect.gen(function* () {
      const ctx = yield* ClusterPlatformContext
      yield* makeSpeedShooterEntry(ctx)
      return { _tag: "@eventiva/extensions/SpeedShooterExtension" as const }
    }),
  },
) {
  /** Colocated local cluster: forked `speedShooterProgram` replaces mode-gated entry. */
  static Local = Layer.succeed(SpeedShooterExtension, {
    _tag: "@eventiva/extensions/SpeedShooterExtension" as const,
  })

  static Program = speedShooterProgram
}
