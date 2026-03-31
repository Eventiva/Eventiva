/**
 * Applies finalized {@link FinalTableStore} tables to PostgreSQL using generated DDL
 * (see {@link buildPgDdlStatements}) via the `postgres` client (same connection rules as
 * {@link pgClientConfigFromEnv}). Does not shell out to `psql`, so it works in slim container images.
 */
import { FinalTableStore, RuntimeSchemaDDL, type RuntimeSchemaDDLService, withSpanAndLog } from '@eventiva/core';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import postgres from 'postgres';
import { buildPgDdlStatements } from './pg-ddl-create-statements.js';
import { pgClientConfigFromEnv } from './pg-client-layer.js';

function runDdlStatements(statements: string[], cfg: ReturnType<typeof pgClientConfigFromEnv>): Promise<void> {
    const sql = postgres({
        host: cfg.host ?? 'localhost',
        port: cfg.port ?? 5432,
        database: cfg.database ?? 'postgres',
        username: cfg.username ?? 'postgres',
        password: cfg.password ?? 'postgres',
        max: 1,
        ...(cfg.ssl === true ? { ssl: 'require' as const } : {}),
    });
    return (async () => {
        try {
            for (const sqlText of statements) {
                const trimmed = sqlText.trim();
                if (trimmed.length > 0) {
                    await sql.unsafe(trimmed);
                }
            }
        } finally {
            await sql.end({ timeout: 5 });
        }
    })();
}

const service: RuntimeSchemaDDLService = {
    sync: () =>
        Effect.gen(function* () {
            const store = yield* FinalTableStore;
            const tables = yield* store.getAllTables();
            const statements = buildPgDdlStatements(tables as Record<string, unknown>);
            const cfg = pgClientConfigFromEnv(process.env);
            yield* Effect.tryPromise({
                try: () => runDdlStatements(statements, cfg),
                catch: (e) => (e instanceof Error ? e : new Error(String(e))),
            });
        }).pipe(withSpanAndLog('runtimeSchemaDDL.pg')),
};

export const PgRuntimeSchemaDDLLayer: Layer.Layer<RuntimeSchemaDDLService> = Layer.succeed(RuntimeSchemaDDL, service);
