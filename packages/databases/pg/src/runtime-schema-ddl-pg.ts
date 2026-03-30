/**
 * Applies finalized {@link FinalTableStore} tables to PostgreSQL using generated DDL
 * (see {@link buildPgDdlStatements}) via the `psql` CLI and libpq-style environment variables
 * (same as {@link pgClientConfigFromEnv}). Requires `psql` on `PATH` when using this backend.
 */
import { FinalTableStore, RuntimeSchemaDDL, type RuntimeSchemaDDLService, withSpanAndLog } from '@eventiva/core';
import { execFileSync } from 'node:child_process';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import { buildPgDdlStatements } from './pg-ddl-create-statements.js';
import { pgClientConfigFromEnv } from './pg-client-layer.js';

function runPsqlScript(sqlText: string, cfg: ReturnType<typeof pgClientConfigFromEnv>): void {
    const env: NodeJS.ProcessEnv = { ...process.env };
    env.PGHOST = cfg.host ?? 'localhost';
    env.PGPORT = String(cfg.port ?? 5432);
    env.PGUSER = cfg.username ?? 'postgres';
    env.PGPASSWORD = cfg.password ?? 'postgres';
    env.PGDATABASE = cfg.database ?? 'postgres';
    if (cfg.ssl === true) {
        env.PGSSLMODE = 'require';
    }
    execFileSync('psql', ['-v', 'ON_ERROR_STOP=1', '-c', sqlText], {
        env,
        stdio: ['ignore', 'pipe', 'pipe'],
        encoding: 'utf-8',
    });
}

const service: RuntimeSchemaDDLService = {
    sync: () =>
        Effect.gen(function* () {
            const store = yield* FinalTableStore;
            const tables = yield* store.getAllTables();
            const statements = buildPgDdlStatements(tables as Record<string, unknown>);
            const cfg = pgClientConfigFromEnv(process.env);
            yield* Effect.forEach(statements, (sqlText) =>
                Effect.try({
                    try: () => {
                        const trimmed = sqlText.trim();
                        if (trimmed.length > 0) runPsqlScript(trimmed, cfg);
                    },
                    catch: (e) => (e instanceof Error ? e : new Error(String(e))),
                })
            );
        }).pipe(withSpanAndLog('runtimeSchemaDDL.pg')),
};

export const PgRuntimeSchemaDDLLayer: Layer.Layer<RuntimeSchemaDDLService> = Layer.succeed(RuntimeSchemaDDL, service);
