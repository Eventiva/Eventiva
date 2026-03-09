/**
 * Platform template factory: single entry point to build a platform layer from
 * database + extensions + optional HTTP entity endpoints. Use this so platforms
 * (e.g. default) only set databaseLayer, extensions, and options instead of
 * composing many core layers by hand.
 * @see docs/learnings/architecture.md
 */
import * as Layer from "effect/Layer"
import * as Scope from "effect/Scope"
import { createServer } from "node:http"
import { ObservabilityLive } from "../observability/layer.js"
import { clusterLayerDefault } from "../cluster/config.js"
import { NodeHttpServer } from "@effect/platform-node"
import { makeEntityEndpointsLayer, type EntityEndpointDescriptor } from "../cluster/entity-endpoints.js"
import { PiiEncryptionLive } from "../security/index.js"
import { Database } from "../database/database.js"
import { ExtensionHooksLive, WorkflowEngineLayerInMemory } from "../extensions/extension-hooks.js"
import { mergeEntityLayers, type ExtensionLayer } from "../extensions/extension-registry.js"
import { WorkflowRegistryLive } from "../workflow/engine.js"
import { StartupBannerLayer } from "./startup-banner.js"
import {
  FinalTableStoreLive,
  SchemaFinalizer,
  SchemaFinalizerNoOp,
  SchemaRegistryConfigLive,
  TableColumnRegistryLive
} from "../schema/index.js"

/**
 * Debug options for isolating issues by disabling core processes.
 */
export interface PlatformDebugOptions {
  /** Disable ObservabilityLive (Logger, Tracer, Metrics) */
  readonly disableObservability?: boolean
  /** Disable clusterLayerDefault (TestRunner) */
  readonly disableCluster?: boolean
  /** Disable PiiEncryptionLive */
  readonly disablePiiEncryption?: boolean
  /** Disable schemaStack (TableColumnRegistry, FinalTableStore, SchemaRegistryConfig, SchemaFinalizer) */
  readonly disableSchema?: boolean
  /** Disable databaseLayer */
  readonly disableDatabase?: boolean
  /** Disable hooksStack (ExtensionHooksLive, WorkflowEngineLayerInMemory, WorkflowRegistryLive) */
  readonly disableHooks?: boolean
  /** Disable StartupBannerLayer */
  readonly disableStartupBanner?: boolean
  /** Disable EntityEndpointsServer */
  readonly disableEntityEndpoints?: boolean
}

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
  readonly extensions: ReadonlyArray<{ readonly id: string; readonly layer: ExtensionLayer }>
  /** When set, an HTTP server is started exposing RPC (and REST for CRUD entities) for these descriptors. */
  readonly entityEndpoints?: ReadonlyArray<EntityEndpointDescriptor>
  /** Port for the entity endpoints server (default 3000). */
  readonly endpointsPort?: number
  /** Debug options for isolating issues by disabling core processes. */
  readonly debug?: PlatformDebugOptions
}

/**
 * Builds a platform Layer that provides Observability + Cluster + Database +
 * ExtensionHooks + WorkflowEngine + WorkflowRegistry + merged extension layers,
 * and optionally an HTTP server for entity endpoints.
 */
export function createPlatformTemplate(
  options: CreatePlatformTemplateOptions
): Layer.Layer<never, any, unknown> {
  const debug = options.debug ?? {}
  const scopeLayer = Layer.scoped(Scope.Scope, Scope.make())
  
  // Build schema stack conditionally
  const schemaConfigLayer = SchemaRegistryConfigLive(options.extensions.length)
  const schemaStack = debug.disableSchema
    ? Layer.empty
    : TableColumnRegistryLive.pipe(
        Layer.provideMerge(FinalTableStoreLive),
        Layer.provideMerge(schemaConfigLayer),
        Layer.provideMerge(Layer.succeed(SchemaFinalizer, SchemaFinalizerNoOp))
      )
  
  // Build hooks stack conditionally
  const hooksStack = debug.disableHooks
    ? Layer.empty
    : Layer.mergeAll(
        ExtensionHooksLive,
        WorkflowEngineLayerInMemory,
        WorkflowRegistryLive
      )
  
  // Build base layer with conditional components
  const baseComponents: Array<Layer.Layer<unknown, unknown, unknown>> = []
  
  if (!debug.disableObservability) {
    baseComponents.push(ObservabilityLive)
  }
  if (!debug.disableCluster) {
    baseComponents.push(clusterLayerDefault)
  }
  if (!debug.disablePiiEncryption) {
    baseComponents.push(PiiEncryptionLive)
  }
  if (!debug.disableSchema) {
    baseComponents.push(schemaStack)
  }
  if (!debug.disableDatabase) {
    baseComponents.push(options.databaseLayer)
  }
  if (!debug.disableHooks) {
    baseComponents.push(hooksStack)
  }
  baseComponents.push(scopeLayer)
  
  const base = baseComponents.length > 0
    ? Layer.mergeAll(...baseComponents)
    : scopeLayer
  
  // Build entities layer conditionally
  const entityLayers: ExtensionLayer[] = []
  if (!debug.disableStartupBanner) {
    entityLayers.push(StartupBannerLayer as unknown as ExtensionLayer)
  }
  entityLayers.push(...options.extensions.map((e) => e.layer))
  
  const entitiesLayer = mergeEntityLayers(entityLayers)
  // If entitiesLayer is empty, just use base; otherwise provide base to entitiesLayer
  let stack = entityLayers.length === 0
    ? base
    : entitiesLayer.pipe(Layer.provideMerge(base)) as Layer.Layer<never, any, unknown>
  
  // Add entity endpoints conditionally
  const endpoints = options.entityEndpoints ?? []
  if (!debug.disableEntityEndpoints && (endpoints.length > 0 || options.endpointsPort !== undefined)) {
    const port = options.endpointsPort ?? 3000
    // Provide Node HTTP server and platform context. HttpApi.Api and Swagger are provided inside makeEntityEndpointsLayer.
    const serverLayer = NodeHttpServer.layer(() => createServer(), { port, host: "0.0.0.0" })
    const platformContextLayer = NodeHttpServer.layerContext

    const endpointsLayer = makeEntityEndpointsLayer(endpoints, { port })
    stack = Layer.merge(
      stack,
      endpointsLayer.pipe(
        Layer.provide(stack),
        Layer.provide(serverLayer),
        Layer.provide(platformContextLayer)
      )
    ) as Layer.Layer<never, any, unknown>
  }
  return stack
}
