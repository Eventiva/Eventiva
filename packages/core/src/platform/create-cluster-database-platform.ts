import {
  collectColocatedShooterPrograms,
  mergeApplicationLayerVariants,
  mergeRegistrationLayers,
  partitionApplicationLayersByRole,
  type ApplicationLayerInput,
} from "./application-layer-variants.js"
import { buildColocatedEntityPipeline } from "./colocated-entity-pipeline.js"
import { clusterPlatformContextSync, clusterPlatformMainFor } from "./cluster-database-platform.js"
import { localColocatedClusterStack } from "./local-colocated-cluster-stack.js"
import { localColocatedSupervisedLaunch } from "./local-colocated-supervised-launch.js"
import { runClusterPlatformIfEsmMain } from "./cluster-platform-main.js"
import { postgresClusterSqlLayer } from "./cluster-sql-layers.js"
import { clusterObservabilityLayer } from "../observability/index.js"
import { runCoreStartup } from "../runtime/run-core-startup.js"
import { clusterPlatformApplicationLaunch } from "./cluster-platform-main.js"
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
  /**
   * All cluster extensions in declaration order: **entry** (`clusterExtensionRole` omitted or `"entry"`)
   * for `Layer.launch` with platform context, and **registration** (`clusterExtensionRole: "registration"`)
   * for hook/transform layers merged into the runner `extensionLayers` graph.
   *
   * Each item may be an `Effect.Service` **class** (`RunnerExtension`, …) or an explicit
   * `{ Default, Local }` override object.
   */
  readonly applicationLayers: ReadonlyArray<ApplicationLayerInput>
  readonly HookImplementationLayer: Layer.Layer<never, unknown, unknown>
  /**
   * When set, `EVENTIVA_CLUSTER_INFRASTRUCTURE=local` builds the colocated pipeline from
   * `entityLayers` + forked shooter effects, then completes the local cluster stack in core.
   *
   * `shooterPrograms` defaults to {@link collectColocatedShooterPrograms}(`applicationLayers`)
   * (each extension may define optional static `Program`). Override explicitly when needed.
   */
  readonly localColocated?: {
    /** Contravariant `ROut` uses `never` so concrete entity stacks (e.g. `demoEntityLayers`) type-check. */
    readonly entityLayers: Layer.Layer<never, unknown, unknown>
    readonly shooterPrograms?: ReadonlyArray<Effect.Effect<any, any, any>>
  }
  /**
   * When set, merges with `PlatformDefinition.Default` and runs {@link runCoreStartup} before cluster `Layer.launch`
   * (Drizzle table registry, DDL, EntityRegistry).
   */
  readonly drizzleSchemaBootstrap?: {
    readonly layers: Layer.Layer<any, unknown, any>
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
  const { entry, registration } = partitionApplicationLayersByRole(config.applicationLayers)
  const hookRegistrationLayers = mergeRegistrationLayers(registration)

  const syncPayload = clusterPlatformContextSync({
    sqlLayer: config.database.sqlLayer,
    observabilityLayer: config.observability.layer,
    hookSidecarLayers: hookRegistrationLayers as Layer.Layer<any, any, any>,
    kafkaHookBootstrapLayer: config.HookImplementationLayer,
  })

  class PlatformDefinition extends Effect.Service<PlatformDefinition>()(config.serviceId, {
    sync: syncPayload,
  }) {}

  const mergedPlatformDefault = config.drizzleSchemaBootstrap
    ? Layer.merge(
        PlatformDefinition.Default as Layer.Layer<unknown, unknown, never>,
        config.drizzleSchemaBootstrap.layers,
      )
    : PlatformDefinition.Default

  const distributedApplicationLayers = mergeApplicationLayerVariants(entry, "Default")

  const distributedLaunch = clusterPlatformApplicationLaunch(
    PlatformDefinition,
    distributedApplicationLayers,
  )

  const throughShardingPipeline =
    config.localColocated === undefined
      ? undefined
      : buildColocatedEntityPipeline({
          entityLayers: config.localColocated.entityLayers,
          shooterPrograms:
            config.localColocated.shooterPrograms ?? collectColocatedShooterPrograms(config.applicationLayers),
        })

  const localApplicationLayers = mergeApplicationLayerVariants(entry, "Local")

  const localMainBase =
    throughShardingPipeline === undefined
      ? undefined
      : localColocatedSupervisedLaunch(
          localColocatedClusterStack({
            throughShardingPipeline,
            applicationLayers: localApplicationLayers,
            hookRegistrationLayers,
            observabilityLayer: config.observability.layer,
          }),
        )

  const program = (
    config.drizzleSchemaBootstrap
      ? Effect.gen(function* () {
          yield* runCoreStartup
          const clusterInfrastructure = process.env.EVENTIVA_CLUSTER_INFRASTRUCTURE ?? "distributed"
          if (clusterInfrastructure === "local") {
            if (localMainBase === undefined) {
              throw new Error(
                "EVENTIVA_CLUSTER_INFRASTRUCTURE=local requires `localColocated.entityLayers` in createClusterDatabasePlatform",
              )
            }
            yield* localMainBase
          } else {
            yield* distributedLaunch
          }
        }).pipe(Effect.provide(mergedPlatformDefault as Layer.Layer<any, any, any>))
      : Effect.gen(function* () {
          const clusterInfrastructure = process.env.EVENTIVA_CLUSTER_INFRASTRUCTURE ?? "distributed"
          if (clusterInfrastructure === "local") {
            if (localMainBase === undefined) {
              throw new Error(
                "EVENTIVA_CLUSTER_INFRASTRUCTURE=local requires `localColocated.entityLayers` in createClusterDatabasePlatform",
              )
            }
            yield* localMainBase
          } else {
            yield* clusterPlatformMainFor(PlatformDefinition, distributedApplicationLayers)
          }
        })
  ) as Effect.Effect<void, unknown, never>

  const runIfMain = (importMetaUrl: string) => {
    runClusterPlatformIfEsmMain(importMetaUrl, program)
  }

  return { Platform: PlatformDefinition, program, runIfMain }
}

/** Alias for {@link createClusterDatabasePlatform}. */
export const createPlatform = createClusterDatabasePlatform
