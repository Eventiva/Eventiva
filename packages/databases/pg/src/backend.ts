import type { Database } from '@eventiva/core';
import type { DatabaseBackendDefinition } from '@eventiva/databases.shared';
import * as Layer from 'effect/Layer';
import { PgDatabaseLayer } from './pg-database-layer.js';
import { PgClientLayerDefault } from './pg-client-layer.js';
import { SchemaFinalizerPg } from './schema-finalizer-impl.js';
import { pgDialect } from './dialect.js';
import { PgRuntimeSchemaDDLLayer } from './runtime-schema-ddl-pg.js';

/** Merged so `PgClient` stays in scope for {@link PgRuntimeSchemaDDLLayer} and {@link PgDatabaseLayer}. */
const databaseLayer = Layer.merge(PgClientLayerDefault, PgDatabaseLayer) as Layer.Layer<Database>;

export const platformDatabaseBackendDefinition: DatabaseBackendDefinition = {
    id: 'postgres',
    description: 'PostgreSQL via Effect SQL + Drizzle',
    dialect: pgDialect,
    databaseLayer,
    schemaFinalizerLayer: SchemaFinalizerPg,
    runtimeSchemaDDLLayer: PgRuntimeSchemaDDLLayer,
};
