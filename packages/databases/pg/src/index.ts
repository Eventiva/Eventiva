/**
 * Database-pg extension: provides Database service implementation using Effect SQL PgClient.
 * No entity logic; merge PgDatabaseLayer in the platform when building the program.
 * @see docs/learnings/architecture.md
 */
export { createTable } from './create-table.js';
export { pgTable, buildTableInternal, testColumns, type AllBuilders, typeid } from './table-builder.js';
export { SchemaFinalizerPg } from './schema-finalizer-impl.js';
