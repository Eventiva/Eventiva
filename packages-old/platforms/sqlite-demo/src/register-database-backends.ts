/**
 * Registers this platform’s SQLite backend. Import once before {@link activateDatabaseBackend}.
 */
import { registerDatabaseBackend } from '@eventiva/databases.shared';
import { platformDatabaseBackendDefinition as sqliteBackend } from '@eventiva/databases.sqlite';

registerDatabaseBackend(sqliteBackend);
