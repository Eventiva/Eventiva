import * as Layer from 'effect/Layer';
import type { Database } from '../database.js';
import type { SchemaFinalizer } from '../../schema-registry/schema-finalizer.js';
import type { RuntimeSchemaDDLService } from '../../schema-registry/runtime-schema-ddl.js';
import type { DatabaseDialect } from '../dialect/database-dialect.js';
import { installDatabaseDialect } from '../dialect/dialect-registry.js';

/**
 * Layers returned after activating a backend (single call from the platform entry).
 */
export interface DatabaseStack {
    readonly databaseLayer: Layer.Layer<Database>;
    readonly schemaFinalizerLayer: Layer.Layer<SchemaFinalizer>;
    /** When set, merged into the platform bootstrap to run drizzle-kit push / migrations after table finalization. */
    readonly runtimeSchemaDDLLayer?: Layer.Layer<RuntimeSchemaDDLService>;
}

/**
 * One row in the database backend registry. Contributors add backends by calling
 * {@link registerDatabaseBackend} from a module imported before {@link activateDatabaseStackFromEnv}.
 *
 * - Set `dialect` when extensions use `@eventiva/core` database column facades for that engine.
 *   {@link activateDatabaseBackend} will call {@link installDatabaseDialect} for you.
 * - Omit `dialect` only for special backends that do not drive those facades.
 */
export interface DatabaseBackendDefinition {
    readonly id: string;
    /** For error messages and docs */
    readonly description?: string;
    readonly dialect?: DatabaseDialect;
    readonly databaseLayer: Layer.Layer<Database>;
    readonly schemaFinalizerLayer: Layer.Layer<SchemaFinalizer>;
    readonly runtimeSchemaDDLLayer?: Layer.Layer<RuntimeSchemaDDLService>;
}

const registry = new Map<string, DatabaseBackendDefinition>();

/**
 * Register a database backend. Later entries with the same `id` replace earlier ones (handy for forks/tests).
 *
 * @example
 * ```ts
 * import { registerDatabaseBackend } from '@eventiva/core';
 * import { mysqlDialect, MysqlDatabaseLayer, SchemaFinalizerMysql } from '@eventiva/databases.mysql';
 *
 * registerDatabaseBackend({
 *   id: 'mysql',
 *   description: 'MySQL',
 *   dialect: mysqlDialect,
 *   databaseLayer: MysqlDatabaseLayer,
 *   schemaFinalizerLayer: SchemaFinalizerMysql,
 * });
 * ```
 */
export function registerDatabaseBackend(def: DatabaseBackendDefinition): void {
    registry.set(def.id, def);
}

export function listRegisteredDatabaseBackendIds(): string[] {
    return [...registry.keys()].sort();
}

function getBackendOrThrow(id: string): DatabaseBackendDefinition {
    const def = registry.get(id);
    if (def === undefined) {
        const known = listRegisteredDatabaseBackendIds().join(', ') || '(none)';
        throw new Error(`Unknown database backend "${id}". Registered ids: ${known}`);
    }
    return def;
}

/**
 * Installs the shared Drizzle dialect (when defined) and returns both Effect layers.
 * This is the single integration point: use instead of calling `installDatabaseDialect` separately.
 */
export function activateDatabaseBackend(id: string): DatabaseStack {
    const def = getBackendOrThrow(id);
    if (def.dialect !== undefined) {
        installDatabaseDialect(def.dialect);
    }
    return {
        databaseLayer: def.databaseLayer,
        schemaFinalizerLayer: def.schemaFinalizerLayer,
        runtimeSchemaDDLLayer: def.runtimeSchemaDDLLayer,
    };
}

/**
 * Resolves which backend id to use from the environment, then activates it.
 *
 * Precedence:
 * 1. `EVENTIVA_DATABASE` — `postgres` | `sqlite` (aliases: `postgresql`, `pg`)
 * 2. `EVENTIVA_DATABASE_DIALECT=sqlite` (legacy)
 * 3. `DATABASE=postgres` (legacy)
 * 4. `postgres`
 *
 * Catalog: repository root `.env.example`.
 */
export function resolveActiveDatabaseBackendId(): string {
    const raw = process.env.EVENTIVA_DATABASE?.trim().toLowerCase();
    if (raw === 'postgres' || raw === 'postgresql' || raw === 'pg') {
        return 'postgres';
    }
    if (raw === 'sqlite') {
        return 'sqlite';
    }

    if (process.env.EVENTIVA_DATABASE_DIALECT === 'sqlite') {
        return 'sqlite';
    }

    if (process.env.DATABASE === 'postgres') {
        return 'postgres';
    }

    return 'postgres';
}

export function activateDatabaseStackFromEnv(): DatabaseStack {
    return activateDatabaseBackend(resolveActiveDatabaseBackendId());
}
