import { Config } from "effect"
import type { Option } from "effect/Option"

/** Optional extension id for extension-only pods (consumer group suffix, registration). */
export const clusterExtensionIdConfig: Config.Config<Option<string>> = Config.string(
  "CLUSTER_EXTENSION_ID",
).pipe(Config.option)

export const clusterHookBusValues = ["kafka", "off"] as const
export type ClusterHookBus = (typeof clusterHookBusValues)[number]

/** When `kafka`, runners subscribe to hook dispatch topic; `off` disables the bus. Default: kafka. */
export const clusterHookBusConfig: Config.Config<ClusterHookBus> = Config.literal(
  ...clusterHookBusValues,
)("CLUSTER_HOOK_BUS").pipe(Config.withDefault("kafka"))

/** Default hook dispatch topic name (Kafka). */
export const clusterHookDispatchTopicDefault = "eventiva.hook.dispatch" as const

export const clusterHookDispatchTopicConfig: Config.Config<string> = Config.string(
  "EVENTIVA_HOOK_DISPATCH_TOPIC",
).pipe(Config.withDefault(clusterHookDispatchTopicDefault))
