/**
 * Database-pg extension: provides Database service implementation using Effect SQL PgClient.
 * No entity logic; merge PgDatabaseLayer in the platform when building the program.
 * @see docs/learnings/architecture.md
 */
export { PgDatabaseLayer } from "./database-impl.js"
export { createEntityTable } from "./table-builder.js"
