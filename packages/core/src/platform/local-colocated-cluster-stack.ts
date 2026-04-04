import { RunnerAddress } from "@effect/cluster"
import { makeClusterLocalRunnerLayer } from "../cluster/local-socket-layers.js"
import { HookRegistryLive, TransformRegistryLive } from "../hooks/index.js"
import { Layer } from "effect"
import * as Option from "effect/Option"

/**
 * Completes a local (in-memory) cluster stack: merges hook registration, registry layers, no-Kafka
 * placeholders, local runner socket, and observability.
 *
 * **`throughShardingPipeline`** is the stack through sharding registration (from
 * {@link buildColocatedEntityPipeline} or equivalent) — everything **before** the hook-registration tail below.
 */
export function localColocatedClusterStack(config: {
  readonly throughShardingPipeline: Layer.Layer<any, any, any>
  readonly hookRegistrationLayers: Layer.Layer<unknown, unknown, never>
  readonly observabilityLayer: Layer.Layer<any, any, never>
}): Layer.Layer<unknown, unknown, never> {
  const noKafkaStack = Layer.empty as unknown as Layer.Layer<unknown, never, never>
  const listenPort = Number(process.env.EVENTIVA_LOCAL_CLUSTER_PORT ?? "34431")
  const shardsPerGroup = Number(process.env.SHARDS_PER_GROUP ?? "2")

  return (config.throughShardingPipeline as Layer.Layer<unknown, unknown, never>).pipe(
    Layer.provideMerge(config.hookRegistrationLayers),
    Layer.provideMerge(TransformRegistryLive),
    Layer.provideMerge(HookRegistryLive),
    Layer.provideMerge(noKafkaStack),
    Layer.provideMerge(noKafkaStack),
    Layer.provideMerge(
      makeClusterLocalRunnerLayer({
        shardingConfig: {
          runnerAddress: Option.some(RunnerAddress.make("127.0.0.1", listenPort)),
          runnerListenAddress: Option.some(RunnerAddress.make("0.0.0.0", listenPort)),
          shardsPerGroup,
          simulateRemoteSerialization: true,
        },
      }),
    ),
    Layer.provide(config.observabilityLayer),
  )
}
