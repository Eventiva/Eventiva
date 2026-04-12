import { Config } from "effect"
import * as Option from "effect/Option"
import type { Option as OptionType } from "effect/Option"

/** Optional extension id for extension-only pods (consumer group suffix, registration). */
export const clusterExtensionIdConfig: Config.Config<OptionType<string>> = Config.string(
  "CLUSTER_EXTENSION_ID",
).pipe(Config.option)

export const clusterInfrastructureValues = ["distributed", "local"] as const
export type ClusterInfrastructure = (typeof clusterInfrastructureValues)[number]

/** SQL-backed cluster vs in-process colocated cluster (`local`). */
export const clusterInfrastructureConfig: Config.Config<ClusterInfrastructure> = Config.literal(
  ...clusterInfrastructureValues,
)("EVENTIVA_CLUSTER_INFRASTRUCTURE").pipe(Config.withDefault("distributed"))

export const clusterHookBusValues = ["kafka", "pubsub", "off"] as const
export type ClusterHookBus = (typeof clusterHookBusValues)[number]

const clusterHookBusExplicitConfig = Config.literal(...clusterHookBusValues)("CLUSTER_HOOK_BUS").pipe(
  Config.option,
)

/**
 * Hook dispatch transport: `kafka` (broker integration), `pubsub` (in-process Effect PubSub), `off` (inline handlers).
 * If `CLUSTER_HOOK_BUS` is unset: `local` infrastructure → `pubsub`, `distributed` → `kafka`.
 */
export const clusterHookBusConfig: Config.Config<ClusterHookBus> = Config.all({
  explicit: clusterHookBusExplicitConfig,
  infra: clusterInfrastructureConfig,
}).pipe(
  Config.map(({ explicit, infra }) =>
    Option.isSome(explicit) ? explicit.value : infra === "local" ? "pubsub" : "kafka",
  ),
)

/** Default hook dispatch topic name (Kafka). */
export const clusterHookDispatchTopicDefault = "eventiva.hook.dispatch" as const

export const clusterHookDispatchTopicConfig: Config.Config<string> = Config.string(
  "EVENTIVA_HOOK_DISPATCH_TOPIC",
).pipe(Config.withDefault(clusterHookDispatchTopicDefault))

/** `in-memory` — in-process TransformRegistry; `rpc` — DB pipeline + HTTP to extension services (TransformRegistryPipelineRpcLive). */
export const clusterTransformPipelineValues = ["in-memory", "rpc"] as const
export type ClusterTransformPipeline = (typeof clusterTransformPipelineValues)[number]

export const clusterTransformPipelineConfig: Config.Config<ClusterTransformPipeline> = Config.literal(
  ...clusterTransformPipelineValues,
)("EVENTIVA_TRANSFORM_PIPELINE").pipe(Config.withDefault("in-memory"))
