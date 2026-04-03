import { NodeClusterSocket, NodeRuntime } from "@effect/platform-node"
import { clusterObservabilityLayer, postgresClusterSqlLayer } from "@eventiva/core"
import { Layer } from "effect"

NodeClusterSocket.layer({ storage: "sql" }).pipe(
  Layer.provide(postgresClusterSqlLayer),
  Layer.provide(clusterObservabilityLayer),
  Layer.launch,
  NodeRuntime.runMain,
)
