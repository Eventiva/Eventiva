import type { DatabaseDialect } from './database-dialect.js';

let active: DatabaseDialect | undefined;

/**
 * Install the dialect for this process. The default platform calls this via
 * `activateDatabaseStackFromEnv()` / `activateDatabaseBackend()` before importing extensions.
 */
export function installDatabaseDialect(dialect: DatabaseDialect): void {
    active = dialect;
}

export function getDatabaseDialect(): DatabaseDialect {
    if (active === undefined) {
        throw new Error(
            'No database dialect installed. Use the platform database registry (e.g. activateDatabaseStackFromEnv) ' +
                'or call installDatabaseDialect before any extension that uses @eventiva/databases.shared table helpers.'
        );
    }
    return active;
}

/** For tooling or optional behaviour when dialect is not required yet. */
export function tryGetDatabaseDialect(): DatabaseDialect | undefined {
    return active;
}
