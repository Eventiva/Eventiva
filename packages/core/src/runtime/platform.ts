/**
 * Platform template factory: single entry point to build a platform layer from
 * database + extensions + optional HTTP entity endpoints. Use this so platforms
 * (e.g. default) only set databaseLayer, extensions, and options instead of
 * composing many core layers by hand.
 * @see docs/learnings/architecture.md
 */
import * as Layer from "effect/Layer"
import * as Effect from "effect/Effect"
import * as Scope from "effect/Scope"
import { createServer } from "node:http"
import { ObservabilityLive } from "../observability/layer.js"
import { clusterLayerDefault } from "../cluster/config.js"
import { NodeHttpServer } from "@effect/platform-node"
import { makeEntityEndpointsLayer, EntityEndpointsServer, type EntityEndpointDescriptor } from "../cluster/entity-endpoints.js"
import { PiiEncryptionLive } from "../security/index.js"
import { Database } from "../database/database.js"
import { ExtensionHooksLive, WorkflowEngineLayerInMemory } from "../extensions/extension-hooks.js"
import {
  mergeConfigLayers,
  mergeEntityLayers,
  type ExtensionRegistration
} from "../extensions/extension-registry.js"
import { WorkflowRegistryLive } from "../workflow/engine.js"
import { RuntimeConfigLive } from "../config/runtime-config.js"
import {
  FinalTableStoreLive,
  SchemaFinalizer,
  SchemaFinalizerNoOp,
  SchemaRegistryConfigLive,
  TableColumnRegistryLive,
  TableRelationsRegistryLive
} from "../schema/index.js"

/**
 * Options for createPlatformTemplate. Provide a database layer and an array of
 * extension layers (each with an id for schema markReady); optionally register entity HTTP endpoints.
 */
export interface CreatePlatformTemplateOptions {
  /**
   * Database implementation. Use DatabaseLiveInMemory for dev/tests; replace with
   * a layer that includes SchemaFinalizer (e.g. SchemaFinalizerPg from @eventiva/databases.pg) for PostgreSQL.
   */
  readonly databaseLayer: Layer.Layer<Database>
  /** Extensions to load (id used for schema markReady and finalization count). */
  readonly extensions: ReadonlyArray<ExtensionRegistration>
  /** Schema finalizer for building Drizzle tables. Use SchemaFinalizerPg for real tables; SchemaFinalizerNoOp for in-memory placeholders. */
  readonly schemaFinalizerLayer?: Layer.Layer<SchemaFinalizer>
  /** When set, an HTTP server is started exposing RPC (and REST for CRUD entities) for these descriptors. */
  readonly entityEndpoints?: ReadonlyArray<EntityEndpointDescriptor>
  /** Port for the entity endpoints server (default 3000). */
  readonly endpointsPort?: number
}

/**
 * Builds a platform Layer that provides Observability + Cluster + Database +
 * ExtensionHooks + WorkflowEngine + WorkflowRegistry + merged extension layers,
 * and optionally an HTTP server for entity endpoints.
 */
export function createPlatformTemplate(
  options: CreatePlatformTemplateOptions
): Layer.Layer<never, any, unknown> {
  const endpointsPort = options.endpointsPort ?? 3000
  const scopeLayer = Layer.scoped(Scope.Scope, Scope.make())
  const runtimeConfigLayer = RuntimeConfigLive({ endpointsPort })
  const piiLayer = PiiEncryptionLive.pipe(
    Layer.provide(runtimeConfigLayer)
  )
  const extensionConfigLayer = mergeConfigLayers(
    options.extensions.flatMap((extension) =>
      extension.configLayer ? [extension.configLayer] : []
    )
  )
  const schemaConfigLayer = SchemaRegistryConfigLive(options.extensions.length)
  const schemaFinalizerLayer =
    options.schemaFinalizerLayer ?? Layer.succeed(SchemaFinalizer, SchemaFinalizerNoOp)
  const schemaStack = TableColumnRegistryLive.pipe(
    Layer.provideMerge(FinalTableStoreLive),
    Layer.provideMerge(TableRelationsRegistryLive),
    Layer.provideMerge(schemaConfigLayer),
    Layer.provideMerge(schemaFinalizerLayer)
  )
  const hooksStack = Layer.mergeAll(
    ExtensionHooksLive,
    WorkflowEngineLayerInMemory,
    WorkflowRegistryLive
  )
  const base = Layer.mergeAll(
    ObservabilityLive,
    runtimeConfigLayer,
    extensionConfigLayer,
    clusterLayerDefault,
    piiLayer,
    schemaStack,
    options.databaseLayer,
    hooksStack,
    scopeLayer
  )
  const entitiesLayer = mergeEntityLayers([
    ...options.extensions.map((e) => e.layer)
  ])
  let stack = entitiesLayer.pipe(Layer.provideMerge(base)) as Layer.Layer<never, any, unknown>
  const endpoints = options.entityEndpoints ?? []
  if (endpoints.length > 0) {
    // Start HTTP endpoints only when descriptors are provided.
    const serverLayer = NodeHttpServer.layer(() => createServer(), { port: endpointsPort, host: "0.0.0.0" })
    const platformContextLayer = NodeHttpServer.layerContext
    const endpointsLayer = makeEntityEndpointsLayer(endpoints, { port: endpointsPort })
    const providedEndpointsLayer = endpointsLayer.pipe(
      Layer.provide(stack),
      Layer.provide(serverLayer),
      Layer.provide(platformContextLayer)
    )
    stack = Layer.merge(stack, providedEndpointsLayer) as Layer.Layer<never, any, unknown>
  } else if (options.endpointsPort !== undefined) {
    // Keep port open even without endpoint descriptors.
    const serverLayer = Layer.scopedDiscard(
      Effect.acquireRelease(
        Effect.sync(() => {
          const server = createServer((_req, res) => {
            res.statusCode = 200
            res.end("Eventiva runtime")
          })
          server.listen(endpointsPort, "0.0.0.0")
          return server
        }),
        (server) =>
          Effect.promise(
            () =>
              new Promise<void>((resolve, reject) => {
                server.close((error) => {
                  if (error) {
                    reject(error)
                    return
                  }
                  resolve()
                })
              })
          ).pipe(Effect.catchAll(() => Effect.void))
      )
    )
    stack = Layer.merge(
      stack,
      Layer.merge(
        serverLayer,
        Layer.succeed(EntityEndpointsServer, { port: endpointsPort })
      )
    ) as Layer.Layer<never, any, unknown>
  } else {
    // No HTTP server: provide dummy so defaultRuntimeProgram's yield* EntityEndpointsServer succeeds
    stack = Layer.merge(stack, Layer.succeed(EntityEndpointsServer, { port: 0 })) as Layer.Layer<never, any, unknown>
  }
  return stack
}
