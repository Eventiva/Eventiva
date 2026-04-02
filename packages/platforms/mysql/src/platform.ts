import { NodeRuntime } from "@effect/platform-node"
import {
  clusterAppModeConfig,
  observabilityLayers,
} from "@eventiva/core"
import { ConfigProvider, Effect } from "effect"
import {
  battleshipClusterAppEntries,
  battleshipExtensionLayers,
} from "./extensions.js"
import { SqlLayer } from "./sql.js"

const observabilityLive = observabilityLayers()

const program = Effect.gen(function* () {
  const ctx = {
    sqlLayer: SqlLayer,
    observabilityLayer: observabilityLive,
    extensionLayers: battleshipExtensionLayers,
  }
  for (const entry of battleshipClusterAppEntries) {
    yield* entry(ctx)
  }
  const mode = yield* clusterAppModeConfig
  yield* Effect.dieMessage(`Unknown CLUSTER_APP_MODE: ${String(mode)}`)
}).pipe(Effect.withConfigProvider(ConfigProvider.fromEnv()))

NodeRuntime.runMain(program)
