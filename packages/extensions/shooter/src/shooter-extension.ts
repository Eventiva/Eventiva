import { ClusterPlatformContext } from "@eventiva/core"
import { Effect } from "effect"
import { makeShooterEntry } from "./shooter.js"

/** Basic shooter client loop when `CLUSTER_APP_MODE` is `shooter`. */
export class ShooterExtension extends Effect.Service<ShooterExtension>()(
  "@eventiva/extensions/ShooterExtension",
  {
    effect: Effect.gen(function* () {
      const ctx = yield* ClusterPlatformContext
      yield* makeShooterEntry(ctx)
      return { _tag: "@eventiva/extensions/ShooterExtension" as const }
    }),
  },
) {}
