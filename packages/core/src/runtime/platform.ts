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
  const schemaConfigLayer = SchemaRegistryConfigLive(options.extensions.length)
  const schemaStack = TableColumnRegistryLive.pipe(
    Layer.provideMerge(FinalTableStoreLive),
    Layer.provideMerge(schemaConfigLayer),
    Layer.provideMerge(Layer.succeed(SchemaFinalizer, SchemaFinalizerNoOp))
  )
  const hooksStack = Layer.mergeAll(
    ExtensionHooksLive,
    WorkflowEngineLayerInMemory,
    WorkflowRegistryLive
  )
  const base = Layer.mergeAll(
    ObservabilityLive,
    clusterLayerDefault,
    PiiEncryptionLive,
    schemaStack,
    options.databaseLayer,
    hooksStack,
    scopeLayer
  )
  const entitiesLayer = mergeEntityLayers([
    ...options.extensions.map((e) => e.layer),
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
