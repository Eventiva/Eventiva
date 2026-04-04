import { NodeClusterSocket } from "@effect/platform-node"
import { Layer } from "effect"

type NodeClusterSocketOptions = NonNullable<Parameters<typeof NodeClusterSocket.layer>[0]>

/**
 * In-process cluster runner (`@effect/cluster` + in-memory runner/message storage).
 * Use for single-machine demo without Postgres-backed cluster tables.
 */
export function makeClusterLocalRunnerLayer(
  options?: Pick<NodeClusterSocketOptions, "shardingConfig">,
): Layer.Layer<unknown, unknown, never> {
  return NodeClusterSocket.layer({
    storage: "local",
    ...options,
  }) as Layer.Layer<unknown, unknown, never>
}

/**
 * Client-only cluster socket against a remote or local coordinator (same as SQL client path, but `storage: "local"`).
 */
export function makeClusterLocalClientLayer(
  options?: Pick<NodeClusterSocketOptions, "shardingConfig">,
): Layer.Layer<unknown, unknown, never> {
  return NodeClusterSocket.layer({
    storage: "local",
    clientOnly: true,
    ...options,
  }) as Layer.Layer<unknown, unknown, never>
}
