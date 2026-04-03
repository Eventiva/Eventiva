import type { Database } from '@eventiva/core';
import type { DatabaseBackendDefinition } from '@eventiva/databases.shared';
import * as Layer from 'effect/Layer';
import { SqliteDatabaseLayer } from './sqlite-database-layer.js';
import { SqliteClientLayerDefault } from './sqlite-client-layer.js';
import { sqliteDialect } from './dialect.js';
import { SchemaFinalizerSqlite } from './schema-finalizer-sqlite.js';
import { SqliteRuntimeSchemaDDLLayer } from './runtime-schema-ddl-sqlite.js';

/** Re-export `SqliteClient` in the merged graph so sibling layers (e.g. DDL) can resolve the tag. */
const sqliteClientLayer = SqliteClientLayerDefault;
const databaseLayer = Layer.merge(
    sqliteClientLayer,
    SqliteDatabaseLayer.pipe(Layer.provide(sqliteClientLayer))
) as Layer.Layer<Database>;

export const platformDatabaseBackendDefinition: DatabaseBackendDefinition = {
    id: 'sqlite',
    description: 'SQLite via better-sqlite3 + Drizzle',
    dialect: sqliteDialect,
    databaseLayer,
    schemaFinalizerLayer: SchemaFinalizerSqlite,
    runtimeSchemaDDLLayer: SqliteRuntimeSchemaDDLLayer,
};
