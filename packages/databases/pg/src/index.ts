/**
 * Database-pg extension: schema building, SchemaFinalizer, and Drizzle effect-postgres driver.
 * Use layers from drizzle-orm/effect-postgres (re-exported here) instead of custom postgres handlers.
 * @see docs/learnings/architecture.md
 */
export { createTable, defineExtensionTable } from './create-table.js';
export { pgDialect } from './dialect.js';
export {
    pgTable,
    buildTableInternal,
    createTableFinal,
    testColumns,
    status,
    type AllBuilders,
    type Status,
    type PgTableExtraConfigValue,
    type ValidateColumns,
} from './table-builder.js';
export { typeid } from './typeid.js';
export { SchemaFinalizerPg } from './schema-finalizer-impl.js';
export { platformDatabaseBackendDefinition } from './backend.js';

/** Use from extensions so Effect Schema table helpers share the same `drizzle-orm` instance as this package. */
export { createInsertSchema, createSelectSchema } from 'drizzle-orm/effect-schema';

/** Drizzle effect-postgres driver and migrator (use these layers instead of custom postgres handlers). */
export {
    DefaultServices,
    type EffectDrizzleConfig,
    EffectPgDatabase,
    make,
    makeWithDefaults,
    migrate,
} from './drizzle-pg.js';

/** PostgreSQL Database layer (requires PgClient + FinalTableStore). Use with PgClientLayerDefault + DefaultServices in platform. */
export { PgDatabaseLayer } from './pg-database-layer.js';
export {
    PgClientLayerDefault,
    pgClientConfigFromEnv,
    type PgClientConfigFromEnv,
} from './pg-client-layer.js';
export {
    transformPipelineTableBootstrapLayer,
    EVENTIVA_TRANSFORM_PIPELINE_TABLE as transformPipelineTableName,
} from './transform-pipeline-bootstrap.js';
export { postgresClusterDrizzleBootstrapLayers } from './cluster-schema-bootstrap.js';
