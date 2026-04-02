/**
 * SQLite schema helpers mirroring `@eventiva/databases.pg` so extensions can be validated against multiple dialects.
 */
export { createTable } from './create-table.js';
export {
    buildTableInternal,
    createTableFinal,
    sqliteTable,
    status,
    testColumns,
    type AllBuilders,
    type SQLiteTableExtraConfigValue,
    type Status,
} from './table-builder.js';
export { sqliteDialect } from './dialect.js';
export { typeid } from './typeid.js';
export { SchemaFinalizerSqlite } from './schema-finalizer-sqlite.js';
export {
    SqliteClient,
    SqliteClientLayerDefault,
    sqlitePathFromEnv,
} from './sqlite-client-layer.js';
export { SqliteDatabaseLayer } from './sqlite-database-layer.js';
export { platformDatabaseBackendDefinition } from './backend.js';