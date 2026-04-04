import {
  DemoEntity,
  type PlatformContext,
  clusterAppModeConfig,
  makeClusterSqlClientLayer,
  withSpanAndLog,
} from "@eventiva/core"
import { Array, Config, Effect, Layer, Option, Ref, Schedule } from "effect"

export const speedShooterProgram = withSpanAndLog("speedShooterProgram")(
  Effect.gen(function* () {
    const client = yield* DemoEntity.client
    const maxOpt = yield* Config.option(Config.integer("SHOOTER_MAX_SHOOTS"))
    const concurrency = yield* Config.integer("SPEED_SHOOTER_CONCURRENCY").pipe(
      Config.withDefault(30),
    )
    const entityCount = yield* Config.integer("SPEED_SHOOTER_ENTITY_COUNT").pipe(
      Config.withDefault(500),
    )

    let counter = 0
    const shotsFired = yield* Ref.make(0)

    const semaphore = yield* Effect.makeSemaphore(concurrency)
    const clients = Array.makeBy(entityCount, (i) => client(`ship-${i}`))

    yield* Effect.suspend(() => {
      const count = counter
      counter = 0
      return Effect.log(`Shots fired: ${count}`)
    }).pipe(Effect.schedule(Schedule.spaced(1000)), Effect.fork)

    while (true) {
      if (Option.isSome(maxOpt)) {
        const n = yield* Ref.get(shotsFired)
        if (n >= maxOpt.value) {
          yield* Effect.log(
            `speedShooter: reached SHOOTER_MAX_SHOOTS (${maxOpt.value}), idling`,
          )
          yield* Effect.never
        }
      }

      const c = clients[Math.floor(Math.random() * clients.length)]

      yield* semaphore.take(1)
      yield* c.Shoot({ target: Math.floor(Math.random() * 1000) }).pipe(
        Effect.tap(() =>
          Effect.gen(function* () {
            counter++
            yield* Ref.update(shotsFired, (x) => x + 1)
            yield* semaphore.release(1)
          }),
        ),
        Effect.fork,
      )
    }
  }),
)

/** High-concurrency shooter when `CLUSTER_APP_MODE` is `speed-shooter`. */
export function makeSpeedShooterEntry(
  ctx: PlatformContext,
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
