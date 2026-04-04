import {
  DemoEntity,
  type PlatformContext,
  clusterAppModeConfig,
  makeClusterSqlClientLayer,
  withSpanAndLog,
} from "@eventiva/core"
import { Config, Effect, Layer, Option } from "effect"

export const shooterProgram = withSpanAndLog("shooterProgram")(
  Effect.gen(function* () {
    const client = yield* DemoEntity.client
    const maxOpt = yield* Config.option(Config.integer("SHOOTER_MAX_SHOOTS"))

    let fired = 0
    while (true) {
      if (Option.isSome(maxOpt) && fired >= maxOpt.value) {
        yield* Effect.log(
          `shooter: reached SHOOTER_MAX_SHOOTS (${maxOpt.value}), idling`,
        )
        yield* Effect.never
      }
      const ship = `ship-${Math.floor(Math.random() * 1000)}`
      yield* Effect.log(`Shooting at ${ship}`)
      yield* client(ship).Shoot({ target: Math.floor(Math.random() * 1000) })
      fired++
      yield* Effect.sleep(1000)
    }
  }),
)

/** Basic shooter client loop when `CLUSTER_APP_MODE` is `shooter`. */
export function makeShooterEntry(
  ctx: PlatformContext,
): Effect.Effect<void, unknown, never> {
  return Effect.gen(function* () {
    const mode = yield* clusterAppModeConfig
    if (mode !== "shooter") {
      return
    }
    yield* Effect.provide(
      shooterProgram,
      Layer.mergeAll(makeClusterSqlClientLayer(ctx.sqlLayer), ctx.observabilityLayer),
    )
  })
}
