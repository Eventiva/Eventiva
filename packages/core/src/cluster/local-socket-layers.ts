import * as MessageStorage from "@effect/cluster/MessageStorage"
import * as RunnerStorage from "@effect/cluster/RunnerStorage"
import { NodeClusterSocket } from "@effect/platform-node"
import { Layer } from "effect"

type NodeClusterSocketOptions = NonNullable<Parameters<typeof NodeClusterSocket.layer>[0]>

/**
 * `NodeClusterSocket` `storage: "local"` wires `MessageStorage.layerNoop`, which breaks RPCs annotated
 * with `ClusterSchema.Persisted` (`Sharding.sendOutgoing` requires real storage). Use `storage: "byo"`
 * and in-memory drivers — same idea as `@effect/cluster` `TestRunner.layer`.
 */
function localClusterSocketLayer(
  options: NodeClusterSocketOptions | undefined,
): Layer.Layer<unknown, unknown, never> {
  return NodeClusterSocket.layer({
    storage: "byo",
    ...options,
  }).pipe(
    Layer.provideMerge(MessageStorage.layerMemory),
    Layer.provideMerge(RunnerStorage.layerMemory),
  ) as Layer.Layer<unknown, unknown, never>
}

/**
 * In-process cluster runner (`@effect/cluster` + in-memory runner/message storage).
 * Use for single-machine demo without Postgres-backed cluster tables.
 */
export function makeClusterLocalRunnerLayer(
  options?: Pick<NodeClusterSocketOptions, "shardingConfig">,
): Layer.Layer<unknown, unknown, never> {
  return localClusterSocketLayer(options)
}

/**
 * Client-only cluster socket against a remote or local coordinator (in-memory storage for persisted RPCs).
 */
export function makeClusterLocalClientLayer(
  options?: Pick<NodeClusterSocketOptions, "shardingConfig">,
): Layer.Layer<unknown, unknown, never> {
  return localClusterSocketLayer({
    ...options,
    clientOnly: true,
  })
}
