import { NodeClusterSocket, NodeRuntime } from "@effect/platform-node"
import { observabilityLayers } from "@eventiva/core"
import { Layer } from "effect"
import { SqlLayer } from "./sql.js"

NodeClusterSocket.layer({ storage: "sql" }).pipe(
  Layer.provide(SqlLayer),
  Layer.provide(observabilityLayers()),
  Layer.launch,
  NodeRuntime.runMain,
)
