import { NodeClusterSocket, NodeRuntime } from "@effect/platform-node"
import { clusterObservabilityLayer, mysqlClusterSqlLayer } from "@eventiva/core"
import { Layer } from "effect"

NodeClusterSocket.layer({ storage: "sql" }).pipe(
  Layer.provide(mysqlClusterSqlLayer),
  Layer.provide(clusterObservabilityLayer),
  Layer.launch,
  NodeRuntime.runMain,
)
