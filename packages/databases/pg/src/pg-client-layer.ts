/**
 * PgClient layer for PostgreSQL. Use with PgDatabaseLayer so the platform has a real DB.
 * Default config reads from env: HOST, PGPORT (preferred) or PORT, PGUSER (preferred) or USERNAME, PGPASSWORD (preferred) or PASSWORD, DATABASE, SSL.
 * Use PGPORT when generic PORT is reserved for HTTP. Use PGUSER when USERNAME is set to the OS login (common on Linux) and is not a Postgres role.
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
 * Uses DATABASE, HOST, PGPORT (else PORT), PGUSER (else USERNAME), PASSWORD, SSL.
 */
export function pgClientConfigFromEnv(env: NodeJS.ProcessEnv = process.env): PgClientConfigFromEnv {
    const portRaw = env['PGPORT'] ?? env['PORT'];
    return {
        host: env['HOST'] ?? 'localhost',
        port: portRaw ? parseInt(portRaw, 10) : 5432,
        database: env['DATABASE'] ?? 'postgres',
        username: env['PGUSER'] ?? env['USERNAME'] ?? 'postgres',
        password: env['PGPASSWORD'] ?? env['PASSWORD'] ?? 'postgres',
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
