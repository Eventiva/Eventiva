/**
 * Registers all built-in database backends (Postgres, SQLite). Import this module once before
 * {@link activateDatabaseStackFromEnv} or {@link activateDatabaseBackend}.
 */
import { registerDatabaseBackend } from '@eventiva/databases.shared';
import { platformDatabaseBackendDefinition as pgBackend } from '@eventiva/databases.pg';

registerDatabaseBackend(pgBackend);
