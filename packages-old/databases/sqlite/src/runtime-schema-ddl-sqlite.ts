/**
 * Applies finalized {@link FinalTableStore} tables to SQLite using generated CREATE statements
 * (see {@link buildSqliteDdlStatements}).
 *
 * Opens a short-lived better-sqlite3 connection to the same path as {@link SqliteClientLayerDefault}
 * so DDL runs even when the scoped `SqliteClient` tag is not visible to this layer.
 */
import { FinalTableStore, RuntimeSchemaDDL, type RuntimeSchemaDDLService, withSpanAndLog } from '@eventiva/core';
import BetterSqlite from 'better-sqlite3';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { buildSqliteDdlStatements } from './sqlite-ddl-create-statements.js';
import { sqlitePathFromEnv } from './sqlite-client-layer.js';

function openDatabaseForDdl(): InstanceType<typeof BetterSqlite> {
    const path = sqlitePathFromEnv();
    if (path === ':memory:') {
        return new BetterSqlite(path);
    }
    const full = resolve(path);
    mkdirSync(dirname(full), { recursive: true });
    return new BetterSqlite(full);
}

const service: RuntimeSchemaDDLService = {
    sync: () =>
        Effect.gen(function* () {
            const store = yield* FinalTableStore;
            const tables = yield* store.getAllTables();
            const statements = buildSqliteDdlStatements(tables as Record<string, unknown>);
            yield* Effect.acquireRelease(
                Effect.sync(() => openDatabaseForDdl()),
                (client) => Effect.sync(() => client.close())
            ).pipe(
                Effect.flatMap((client) =>
                    Effect.forEach(statements, (sqlText) =>
                        Effect.sync(() => {
                            const trimmed = sqlText.trim();
                            if (trimmed.length > 0) client.exec(trimmed);
                        })
                    )
                )
            );
        }).pipe(withSpanAndLog('runtimeSchemaDDL.sqlite')),
};

export const SqliteRuntimeSchemaDDLLayer: Layer.Layer<RuntimeSchemaDDLService> = Layer.succeed(RuntimeSchemaDDL, service);
