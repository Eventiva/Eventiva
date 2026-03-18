/**
 * PgClient layer for PostgreSQL. Use with PgDatabaseLayer so the platform has a real DB.
 * Default config reads from env: HOST, PORT, USERNAME, PASSWORD, DATABASE, SSL (e.g. from devcontainer).
 *
 * @see https://effect-ts.github.io/effect/docs/sql-pg
 */
import { PgClient } from '@effect/sql-pg';
import * as Redacted from 'effect/Redacted';

export interface PgClientConfigFromEnv {
    host?: string;
    port?: number;
    database?: string;
    username?: string;
    password?: string;
    ssl?: boolean;
}

/**
 * Build PgClient config from process.env (e.g. devcontainer remoteEnv).
 * Uses DATABASE, HOST, PORT, USERNAME, PASSWORD, SSL.
 */
export function pgClientConfigFromEnv(env: NodeJS.ProcessEnv = process.env): PgClientConfigFromEnv {
    const port = env['PORT'];
    return {
        host: env['HOST'] ?? 'localhost',
        port: port ? parseInt(port, 10) : 5432,
        database: env['DATABASE'] ?? 'postgres',
        username: env['USERNAME'] ?? 'postgres',
        password: env['PASSWORD'] ?? 'postgres',
        ssl: env['SSL'] === 'true',
    };
}

/**
 * PgClient layer using config from process.env.
 * Use in platform: Layer.provide(PgClientLayerDefault) when running in devcontainer or with env set.
 */
export const PgClientLayerDefault = PgClient.layer({
    ...pgClientConfigFromEnv(process.env),
    password: Redacted.make(pgClientConfigFromEnv(process.env).password ?? 'postgres'),
});
