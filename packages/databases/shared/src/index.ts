/**
 * Shared database utilities: re-exports all dialect column facades plus `table`, `typeid`, and backend registry APIs.
 * Each runnable platform imports its own `register-database-backends.ts` (one `registerDatabaseBackend` per package) before `activateDatabaseStackFromEnv` / `activateDatabaseBackend`.
 */
export type {
    DatabaseDialect,
    DatabaseDialectKind,
    PgDatabaseDialect,
    PgDialectColumns,
    SqliteDatabaseDialect,
} from './dialect/database-dialect.js';
export { getDatabaseDialect, installDatabaseDialect, tryGetDatabaseDialect } from './dialect/dialect-registry.js';
export * from './dialect/facade.js';
export { runTypeidColumn } from './typeid/typeid-factory.js';

export {
    activateDatabaseBackend,
    activateDatabaseStackFromEnv,
    listRegisteredDatabaseBackendIds,
    registerDatabaseBackend,
    resolveActiveDatabaseBackendId,
    type DatabaseBackendDefinition,
    type DatabaseStack,
} from './backend/registry.js';
