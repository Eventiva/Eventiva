import { ClusterPlatformContext } from "@eventiva/core"
import { Effect } from "effect"
import { makeSlowShooterEntry } from "./slow-shooter.js"

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
) {}
