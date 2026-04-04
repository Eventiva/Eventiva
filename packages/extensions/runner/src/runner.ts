import { Entity, Singleton } from "@effect/cluster"
import {
  DemoEntity,
  HookRegistry,
  HookRegistryLive,
  TransformRegistry,
  TransformRegistryLive,
  clusterAppModeConfig,
  emptyTransformContext,
  makeClusterSqlRunnerLayer,
  runnerOnLoadHooksLayer,
  shardingRegistrationHooksLayer,
  type PlatformContext,
  withSpanAndLog,
} from "@eventiva/core"
import { clusterHookKafkaStackFromEnv } from "@eventiva/integrations.kafka"
import { Effect, Layer, Schedule } from "effect"

const DemoEntityLive = DemoEntity.toLayer(
  Effect.gen(function* () {
    const address = yield* Entity.CurrentAddress

    return {
      Shoot: Effect.fnUntraced(function* (envelope) {
        const hooks = yield* HookRegistry
        const transforms = yield* TransformRegistry
        const raw = envelope.payload as { target: number }

        yield* hooks.run(
          { _tag: "rpc", rpcName: "Shoot" },
          "beforeCall",
          {
            rpcName: "Shoot",
            payload: raw,
            address: String(address),
          },
        )

        let tctx = emptyTransformContext(raw)
        tctx = yield* transforms.runPre("Shoot", tctx)
        const payload = tctx.current

        yield* withSpanAndLog("DemoEntity.Shoot", {
          attributes: {
            address: String(address),
            target: payload.target,
            transformSteps: tctx.steps.length,
          },
        })(
          Effect.gen(function* () {
            if (tctx.steps.length > 0) {
              yield* Effect.logInfo("Shoot transform pipeline", {
                finalTarget: payload.target,
                steps: tctx.steps,
              })
            }
            yield* Effect.logInfo("Boom!", {
              rpc: envelope.tag,
              requestId: String(envelope.requestId),
              entityAddress: String(envelope.address),
              entityId: envelope.address.entityId,
              shardId: String(envelope.address.shardId),
              entityType: envelope.address.entityType,
              target: payload.target,
              traceId: envelope.traceId,
              spanId: envelope.spanId,
              sampled: envelope.sampled,
            })
          }),
        )

        tctx = yield* transforms.runPost("Shoot", tctx)

        yield* hooks.run(
          { _tag: "rpc", rpcName: "Shoot" },
          "afterCall",
          {
            rpcName: "Shoot",
            payload,
            address: String(address),
          },
        )
      }),

      ShootWithDelay: Effect.fnUntraced(function* (envelope) {
        yield* withSpanAndLog("DemoEntity.ShootWithDelay", {
          attributes: {
            address: String(address),
            target: envelope.payload.target,
          },
        })(
          Effect.gen(function* () {
            yield* Effect.log("ShootWithDelay received")
            yield* Effect.sleep(envelope.payload.delay)
            yield* Effect.log("ShootWithDelay done")
          }),
        )
      }),

      ShootAt: Effect.fnUntraced(function* (envelope) {
        yield* withSpanAndLog("DemoEntity.ShootAt", {
          attributes: {
            address: String(address),
            target: envelope.payload.target,
          },
        })(
          Effect.gen(function* () {
            yield* Effect.log("ShootAt done")
          }),
        )
      }),
    }
  }),
)

const CronShip = Singleton.make(
  "CronShip",
  withSpanAndLog("CronShip")(
    Effect.gen(function* () {
      yield* Effect.log("The CronShip is sailing")
      yield* Effect.addFinalizer(() => Effect.log("The CronShip is sinking"))

      yield* Effect.log("The CronShip is cronning").pipe(
        Effect.repeat(Schedule.cron("* * * * *")),
      )
    }),
  ),
)

/** Demo RPC entity layers (cluster runner provides Sharding, registries, etc.). */
export const demoEntityLayers = Layer.mergeAll(DemoEntityLive, CronShip)

/**
 * Cluster server + demo entities when `CLUSTER_APP_MODE` is `primary` or `runner`.
 */
export function makeRunnerEntry(
  ctx: PlatformContext,
): Effect.Effect<void, unknown, never> {
  return Effect.gen(function* () {
    const mode = yield* clusterAppModeConfig
    if (mode !== "primary" && mode !== "runner") {
      return
    }
    const ext = ctx.extensionLayers ?? Layer.empty
    const kafkaBootstrap = ctx.kafkaHookBootstrapLayer ?? Layer.empty
    /**
     * `Layer.mergeAll` can build siblings in an order where extension layers
     * (`CopyrightNoticeExtension`, `ExampleTransformExtension`) run before `HookRegistryLive`
     * is available, causing "Service not found: HookRegistry" at runtime.
     * Chain with `provideMerge` so registries wrap dependents deterministically.
     */
    const stack = demoEntityLayers.pipe(
      Layer.provideMerge(runnerOnLoadHooksLayer),
      Layer.provideMerge(shardingRegistrationHooksLayer),
      Layer.provideMerge(ext),
      Layer.provideMerge(TransformRegistryLive),
      Layer.provideMerge(HookRegistryLive),
      Layer.provideMerge(clusterHookKafkaStackFromEnv()),
      Layer.provideMerge(kafkaBootstrap),
    ).pipe(
      Layer.provideMerge(makeClusterSqlRunnerLayer(ctx.sqlLayer)),
      Layer.provide(ctx.observabilityLayer),
    )
    yield* Layer.launch(stack)
  })
}
