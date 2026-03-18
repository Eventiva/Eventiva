/**
 * Database-pg extension: schema building, SchemaFinalizer, and Drizzle effect-postgres driver.
 * Use layers from drizzle-orm/effect-postgres (re-exported here) instead of custom postgres handlers.
 * @see docs/learnings/architecture.md
 */
export { createTable } from './create-table.js';
export { pgTable, buildTableInternal, testColumns, type AllBuilders } from './table-builder.js';
export { typeid } from '@eventiva/databases.shared';
export { SchemaFinalizerPg } from './schema-finalizer-impl.js';

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
