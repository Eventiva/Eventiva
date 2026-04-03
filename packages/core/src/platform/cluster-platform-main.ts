import { NodeRuntime } from "@effect/platform-node"
import { clusterAppModeConfig } from "../config/cluster-app-mode.js"
import type { PlatformContext } from "./platform-context.js"
import type { ClusterAppEntry } from "./cluster-app-entry.js"
import { ClusterPlatformContext } from "./cluster-platform-context.js"
import { ConfigProvider, Effect, Layer, type Context } from "effect"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"

/**
 * Standard cluster process body: yield platform context, run each entry in order, then fail if no
 * `CLUSTER_APP_MODE` matched any entry.
 */
export function clusterPlatformMainEffect<Service extends PlatformContext>(
  serviceTag: Context.Tag<Service, Service>,
  entries: ReadonlyArray<ClusterAppEntry>,
): Effect.Effect<void, unknown, Service> {
  return Effect.gen(function* () {
    const ctx = yield* serviceTag
    for (const entry of entries) {
      yield* entry(ctx)
    }
    const mode = yield* clusterAppModeConfig
    yield* Effect.dieMessage(`Unknown CLUSTER_APP_MODE: ${String(mode)}`)
  }).pipe(Effect.withConfigProvider(ConfigProvider.fromEnv()))
}

/**
 * Acquire the platform service, provide {@link ClusterPlatformContext} for application layers, then
 * `Layer.launch` the merged extension / role `Effect.Service` graph.
 */
export function clusterPlatformApplicationLaunch<Service extends PlatformContext>(
  platformTag: Context.Tag<Service, Service>,
  applicationLayers: Layer.Layer<unknown, unknown, never>,
): Effect.Effect<void, unknown, Service> {
  return Effect.gen(function* () {
    const platform = yield* platformTag
    yield* Layer.launch(applicationLayers).pipe(
      Effect.provideService(ClusterPlatformContext, platform),
    )
  }).pipe(Effect.withConfigProvider(ConfigProvider.fromEnv()))
}

/**
 * When the given URL is the process entry (e.g. pass `import.meta.url` from `platform.ts`),
 * run the main effect. Resolves correctly when the helper lives in `@eventiva/core` (not the entry file).
 */
export function runClusterPlatformIfEsmMain(
  entryModuleUrl: string,
  main: Effect.Effect<void, unknown, never>,
): void {
  const isMain =
    typeof process !== "undefined" &&
    process.argv[1] !== undefined &&
    entryModuleUrl === pathToFileURL(resolve(process.argv[1])).href

  if (isMain) {
    NodeRuntime.runMain(main)
  }
}
