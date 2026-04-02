import {
  Battleship,
  type BattleshipPlatformContext,
  clusterAppModeConfig,
  makeClusterSqlClientLayer,
  withSpanAndLog,
} from "@eventiva/core"
import { Config, Effect, Iterable, Layer } from "effect"

export const slowShooterProgram = withSpanAndLog("slowShooterProgram")(
  Effect.gen(function* () {
    const client = yield* Battleship.client
    const start = yield* Config.integer("START_SHIP")

    yield* Effect.forEach(
      Iterable.range(start, start + 9),
      Effect.fnUntraced(function* (i) {
        yield* withSpanAndLog("slowShooter.ship", {
          attributes: { shipIndex: i },
        })(
          Effect.gen(function* () {
            const ship = `ship-${i}`
            yield* Effect.log(`Shooting at ${ship}`)
            yield* client(ship).ShootWithDelay({
              target: 123,
              delay: 20_000,
            })
            yield* Effect.log(`Shot at ${ship}!`)
          }),
        )
      }),
      { concurrency: "unbounded" },
    )

    yield* Effect.never
  }),
)

/** Layer stack for the slow shooter: observability + cluster client (no duplicate pretty logger). */
export function slowShooterProvided<E, R>(
  sqlLayer: Layer.Layer<R, E, never>,
  observabilityLayer: Layer.Layer<unknown, unknown, never>,
): Layer.Layer<unknown, E, never> {
  return Layer.mergeAll(
    makeClusterSqlClientLayer(sqlLayer),
    observabilityLayer,
  ) as Layer.Layer<unknown, E, never>
}

/**
 * Slow shooter when `CLUSTER_APP_MODE` is `slow-shooter`.
 * Forks the long-running program then blocks forever so the process does not fall through to “unknown mode”.
 */
export function makeSlowShooterEntry(
  ctx: BattleshipPlatformContext,
): Effect.Effect<void, unknown, never> {
  return Effect.gen(function* () {
    const mode = yield* clusterAppModeConfig
    if (mode !== "slow-shooter") {
      return
    }
    Effect.runFork(
      Effect.provide(
        slowShooterProgram,
        slowShooterProvided(ctx.sqlLayer, ctx.observabilityLayer),
      ) as Effect.Effect<never, never, never>,
    )
    yield* Effect.never
  })
}
