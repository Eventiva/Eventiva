/**
 * Layers for {@link runCoreStartup}: schema registry, Drizzle finalizer, DDL, and transform-pipeline table registration.
 * Reuses the platform `PgClient` layer (e.g. {@link postgresClusterSqlLayer}) so cluster and app DDL share one pool config.
 */
import {
  ExtensionHookPubSubLive,
  FinalTableStoreLive,
  PiiEncryptionLive,
  RuntimeConfigLive,
  SchemaRegistryConfigLive,
  TableColumnRegistryLive,
  TableRelationsRegistryLive,
} from "@eventiva/core"
import * as Layer from "effect/Layer"
import { PgDatabaseLayer } from "./pg-database-layer.js"
import { PgRuntimeSchemaDDLLayer } from "./runtime-schema-ddl-pg.js"
import { SchemaFinalizerPg } from "./schema-finalizer-impl.js"
import { transformPipelineTableBootstrapLayer } from "./transform-pipeline-bootstrap.js"

/**
 * @param expectedReadyCount — Extensions (including `eventiva-core`) that call {@link TableColumnRegistry.markReady}.
 */
export function postgresClusterDrizzleBootstrapLayers(config: {
  /** Same shape as {@link postgresqlDatabase}.sqlLayer / {@link postgresClusterSqlLayer}. */
  readonly sqlLayer: Layer.Layer<any, any, never>
  readonly expectedReadyCount: number
  /** e.g. extension layers that subscribe to `CORE_LOADED` and call `markReady`. */
  readonly extraLayers?: ReadonlyArray<Layer.Layer<never, unknown, any>>
}): Layer.Layer<any, unknown, any> {
  const runtimeConfigLayer = RuntimeConfigLive({ endpointsPort: Number(process.env.EVENTIVA_HTTP_PORT ?? 3000) })
  const schemaConfigLayer = SchemaRegistryConfigLive(config.expectedReadyCount)
  const schemaStack = TableColumnRegistryLive.pipe(
    Layer.provideMerge(FinalTableStoreLive),
    Layer.provideMerge(TableRelationsRegistryLive),
    Layer.provideMerge(schemaConfigLayer),
    Layer.provideMerge(SchemaFinalizerPg),
  )
  const extraTopicLayers = (config.extraLayers ?? []).map((l) =>
    l.pipe(Layer.provideMerge(ExtensionHookPubSubLive)),
  )
  return Layer.mergeAll(
    runtimeConfigLayer,
    PiiEncryptionLive.pipe(Layer.provide(runtimeConfigLayer)),
    schemaStack,
    config.sqlLayer,
    PgDatabaseLayer,
    PgRuntimeSchemaDDLLayer,
    ExtensionHookPubSubLive,
    transformPipelineTableBootstrapLayer.pipe(Layer.provideMerge(ExtensionHookPubSubLive)),
    ...extraTopicLayers,
  ) as Layer.Layer<any, unknown, any>
}
