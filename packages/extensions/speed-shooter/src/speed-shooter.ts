import {
  Battleship,
  type BattleshipPlatformContext,
  clusterAppModeConfig,
  makeClusterSqlClientLayer,
  withSpanAndLog,
} from "@eventiva/core"
import { Array, Effect, Layer, Schedule } from "effect"

const getTarget = () => Math.floor(Math.random() * 1000)

export const speedShooterProgram = withSpanAndLog("speedShooterProgram")(
  Effect.gen(function* () {
    const client = yield* Battleship.client
    let counter = 0

    const semaphore = yield* Effect.makeSemaphore(30)
    const clients = Array.makeBy(500, (i) => client(`ship-${i}`))

    yield* Effect.suspend(() => {
      const count = counter
      counter = 0
      return Effect.log(`Shots fired: ${count}`)
    }).pipe(Effect.schedule(Schedule.spaced(1000)), Effect.fork)

    while (true) {
      const c = clients[Math.floor(Math.random() * clients.length)]

      yield* semaphore.take(1)
      yield* c.Shoot({ target: getTarget() }).pipe(
        Effect.tap(() => {
          counter++
          return semaphore.release(1)
        }),
        Effect.fork,
      )
    }
  }),
)

/** High-concurrency shooter when `CLUSTER_APP_MODE` is `speed-shooter`. */
export function makeSpeedShooterEntry(
  ctx: BattleshipPlatformContext,
): Effect.Effect<void, unknown, never> {
  return Effect.gen(function* () {
    const mode = yield* clusterAppModeConfig
    if (mode !== "speed-shooter") {
      return
    }
    yield* Effect.provide(
      speedShooterProgram,
      Layer.mergeAll(makeClusterSqlClientLayer(ctx.sqlLayer), ctx.observabilityLayer),
    )
  })
}
