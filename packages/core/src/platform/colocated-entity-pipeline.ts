import { runnerOnLoadHooksLayer, shardingRegistrationHooksLayer } from "../hooks/index.js"
import { Effect, Layer } from "effect"

/**
 * Colocated local cluster: entity/host layers, forked shooter loops, then runner hook + sharding registration.
 * Caller supplies `entityLayers` (e.g. from `@eventiva/extensions.runner`) and the shooter `Effect`s to fork.
 */
export function buildColocatedEntityPipeline(config: {
  readonly entityLayers: Layer.Layer<never, unknown, unknown>
  /** Long-running shooter / client loops to fork as scoped fibers (requirements vary by extension). */
  readonly shooterPrograms: ReadonlyArray<Effect.Effect<any, any, any>>
}): Layer.Layer<any, any, any> {
  const forkShooterFibers = Layer.scopedDiscard(
    Effect.gen(function* () {
      for (const program of config.shooterPrograms) {
        yield* Effect.forkScoped(program)
      }
    }),
  )
  return config.entityLayers.pipe(
    Layer.provideMerge(forkShooterFibers),
    Layer.provideMerge(runnerOnLoadHooksLayer),
    Layer.provideMerge(shardingRegistrationHooksLayer),
  ) as Layer.Layer<any, any, any>
}
