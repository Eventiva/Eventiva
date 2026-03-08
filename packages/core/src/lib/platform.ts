/**
 * Platform template factory: single entry point to build a platform layer from
 * database + extensions + optional HTTP entity endpoints. Use this so platforms
 * (e.g. default) only set databaseLayer, extensions, and options instead of
 * composing many core layers by hand.
 * @see docs/learnings/architecture.md
 */
import * as Layer from "effect/Layer"
import * as Scope from "effect/Scope"
import { ObservabilityLive } from "../observability/layer.js"
import { clusterLayerDefault } from "../cluster/config.js"
import { makeEntityEndpointsLayer, type EntityEndpointDescriptor } from "../cluster/entity-endpoints.js"
import { PiiEncryptionLive } from "../security/index.js"
import { Database } from "./database.js"
import { ExtensionHooksLive, WorkflowEngineLayerInMemory } from "./extension-hooks.js"
import { mergeEntityLayers, type ExtensionLayer } from "./extension-registry.js"
import { WorkflowRegistryLive } from "../workflow/engine.js"
import { StartupBannerLayer } from "./startup-banner.js"

/**
 * Options for createPlatformTemplate. Provide a database layer and an array of
 * extension layers; optionally register entity HTTP endpoints.
 */
export interface CreatePlatformTemplateOptions {
  /**
   * Database implementation. Use DatabaseLiveInMemory for dev/tests; replace with
   * PgDatabaseLayer from @eventiva/extensions.database-pg for PostgreSQL.
   */
  readonly databaseLayer: Layer.Layer<Database>
  /** Extension layers to merge (e.g. HelloWorldLayer, ContactLayer). */
  readonly extensions: ReadonlyArray<ExtensionLayer>
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
): Layer.Layer<never, never, unknown> {
  const scopeLayer = Layer.scoped(Scope.Scope, Scope.make())
  const hooksStack = Layer.mergeAll(
    ExtensionHooksLive,
    WorkflowEngineLayerInMemory,
    WorkflowRegistryLive
  )
  const base = Layer.mergeAll(
    ObservabilityLive,
    clusterLayerDefault,
    PiiEncryptionLive,
    options.databaseLayer,
    hooksStack,
    scopeLayer
  )
  const entitiesLayer = mergeEntityLayers([
    ...options.extensions,
    StartupBannerLayer as unknown as ExtensionLayer
  ])
  let stack = entitiesLayer.pipe(Layer.provideMerge(base)) as Layer.Layer<never, never, unknown>
  const endpoints = options.entityEndpoints ?? []
  if (endpoints.length > 0) {
    const port = options.endpointsPort ?? 3000
    const endpointsLayer = makeEntityEndpointsLayer(endpoints, { port })
    stack = Layer.merge(stack, endpointsLayer.pipe(Layer.provide(stack))) as Layer.Layer<
      never,
      never,
      unknown
    >
  }
  return stack
}
