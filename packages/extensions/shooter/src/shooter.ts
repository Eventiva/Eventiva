import {
  DemoEntity,
  type PlatformContext,
  clusterAppModeConfig,
  makeClusterSqlClientLayer,
  withSpanAndLog,
} from "@eventiva/core"
import { Effect, Layer } from "effect"

const getShipId = () => `ship-${Math.floor(Math.random() * 1000)}`
const getTarget = () => Math.floor(Math.random() * 1000)

export const shooterProgram = withSpanAndLog("shooterProgram")(
  Effect.gen(function* () {
    const client = yield* DemoEntity.client

    while (true) {
      const ship = getShipId()
      yield* Effect.log(`Shooting at ${ship}`)
      yield* client(ship).Shoot({ target: getTarget() })
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
