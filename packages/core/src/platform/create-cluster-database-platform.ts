import {
  collectColocatedShooterPrograms,
  mergeApplicationLayerVariants,
  type ApplicationLayerInput,
} from "./application-layer-variants.js"
import { buildColocatedEntityPipeline } from "./colocated-entity-pipeline.js"
import { clusterPlatformContextSync, clusterPlatformMainFor } from "./cluster-database-platform.js"
import { localColocatedClusterStack } from "./local-colocated-cluster-stack.js"
import { localColocatedSupervisedLaunch } from "./local-colocated-supervised-launch.js"
import { runClusterPlatformIfEsmMain } from "./cluster-platform-main.js"
import { postgresClusterSqlLayer } from "./cluster-sql-layers.js"
import { clusterObservabilityLayer } from "../observability/index.js"
import { Effect, Layer } from "effect"

/**
 * Preset: Postgres-backed `@effect/sql` layer for cluster storage (distributed mode).
 */
export function postgresqlDatabase(): { readonly sqlLayer: Layer.Layer<any, any, never> } {
  return { sqlLayer: postgresClusterSqlLayer }
}

/**
 * Preset: default cluster observability (logging, tracing, etc.).
 */
export function defaultClusterObservability(): {
  readonly layer: Layer.Layer<any, any, never>
} {
  return { layer: clusterObservabilityLayer }
}

export type CreateClusterDatabasePlatformConfig = {
  readonly serviceId: string
  readonly database: { readonly sqlLayer: Layer.Layer<any, any, never> }
  readonly observability: { readonly layer: Layer.Layer<any, any, never> }
  readonly hookRegistrationLayers: Layer.Layer<unknown, unknown, never>
  /**
   * Extension layers per deployment: `Default` for distributed SQL-backed cluster;
   * `Local` for colocated in-memory cluster (often no-op where forked colocated programs replace mode-gated entries).
   *
   * Each item may be an `Effect.Service` **class** (`RunnerExtension`, …) or an explicit
   * `{ Default, Local }` override object.
   */
  readonly applicationLayers: ReadonlyArray<ApplicationLayerInput>
  readonly kafkaHookBootstrapLayer: Layer.Layer<never, unknown, unknown>
  /**
   * When set, `EVENTIVA_CLUSTER_INFRASTRUCTURE=local` builds the colocated pipeline from
   * `entityLayers` + forked shooter effects, then completes the local cluster stack in core.
   *
   * `shooterPrograms` defaults to {@link collectColocatedShooterPrograms}(`applicationLayers`)
   * (each extension may define optional static `Program`). Override explicitly when needed.
   */
  readonly localColocated?: {
    readonly entityLayers: Layer.Layer<any, any, any>
    readonly shooterPrograms?: ReadonlyArray<Effect.Effect<any, any, any>>
  }
}

/** Result of {@link createClusterDatabasePlatform}. */
export type ClusterDatabasePlatformHandle = {
  readonly Platform: { readonly Default: Layer.Layer<any, any, any> }
  /** Runnable effect: reads `EVENTIVA_CLUSTER_INFRASTRUCTURE` at execution time, then runs the matching main. */
  readonly program: Effect.Effect<void, unknown, never>
  readonly runIfMain: (importMetaUrl: string) => void
}

/**
 * Cluster DB platform: wires SQL context, extension layers, and `EVENTIVA_CLUSTER_INFRASTRUCTURE`
 * (`distributed` vs `local`).
 */
export function createClusterDatabasePlatform(
  config: CreateClusterDatabasePlatformConfig,
): ClusterDatabasePlatformHandle {
  const syncPayload = clusterPlatformContextSync({
    sqlLayer: config.database.sqlLayer,
    observabilityLayer: config.observability.layer,
    hookSidecarLayers: config.hookRegistrationLayers as Layer.Layer<any, any, any>,
    kafkaHookBootstrapLayer: config.kafkaHookBootstrapLayer,
  })

  class PlatformDefinition extends Effect.Service<PlatformDefinition>()(config.serviceId, {
    sync: syncPayload,
  }) {}

  const distributedApplicationLayers = mergeApplicationLayerVariants(config.applicationLayers, "Default")

  const distributedMain = clusterPlatformMainFor(PlatformDefinition, distributedApplicationLayers)

  const throughShardingPipeline =
    config.localColocated === undefined
      ? undefined
      : buildColocatedEntityPipeline({
          entityLayers: config.localColocated.entityLayers,
          shooterPrograms:
            config.localColocated.shooterPrograms ??
            collectColocatedShooterPrograms(config.applicationLayers),
        })

  const localApplicationLayers = mergeApplicationLayerVariants(config.applicationLayers, "Local")

  const localMain =
    throughShardingPipeline === undefined
      ? undefined
      : localColocatedSupervisedLaunch(
          localColocatedClusterStack({
            throughShardingPipeline,
            applicationLayers: localApplicationLayers,
            hookRegistrationLayers: config.hookRegistrationLayers,
            observabilityLayer: config.observability.layer,
          }),
        )

  const program: Effect.Effect<void, unknown, never> = Effect.gen(function* () {
    const clusterInfrastructure = process.env.EVENTIVA_CLUSTER_INFRASTRUCTURE ?? "distributed"
    if (clusterInfrastructure === "local") {
      if (localMain === undefined) {
        throw new Error(
          "EVENTIVA_CLUSTER_INFRASTRUCTURE=local requires `localColocated.entityLayers` in createClusterDatabasePlatform",
        )
      }
      yield* localMain
    } else {
      yield* distributedMain
    }
  })

  const runIfMain = (importMetaUrl: string) => {
    runClusterPlatformIfEsmMain(importMetaUrl, program)
  }

  return { Platform: PlatformDefinition, program, runIfMain }
}

/** Alias for {@link createClusterDatabasePlatform}. */
export const createPlatform = createClusterDatabasePlatform
