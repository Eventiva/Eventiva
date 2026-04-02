/** Postgres — matches `packages/platforms/postgresql` SqlLayer env. */
export const postgresCredentials = {
    DB_USER: process.env.PGUSER ?? 'postgres',
    DB_PASSWORD: process.env.PGPASSWORD ?? 'postgres',
    DB_DATABASE: process.env.PGDATABASE ?? process.env.DATABASE ?? 'postgres',
    DB_HOST: 'postgres.postgres.svc',
    DB_PORT: process.env.PGPORT ?? '5432',
}

/** MySQL — matches `packages/platforms/mysql` SqlLayer env. */
export const mysqlCredentials = {
    DB_USER: process.env.MYSQL_USER ?? 'cluster',
    DB_PASSWORD: process.env.MYSQL_PASSWORD ?? 'cluster',
    DB_DATABASE: process.env.MYSQL_DATABASE ?? 'effect_cluster',
    DB_HOST: 'mysql.mysql.svc',
    DB_PORT: '3306',
}

export const clusterEnv = {
    SHARD_MANAGER_HOST: process.env.SHARD_MANAGER_HOST ?? 'shard-manager.shard-manager.svc',
    EVENTIVA_CLUSTER_RUNNER_RPC_PORT: process.env.EVENTIVA_CLUSTER_RUNNER_RPC_PORT ?? '34431',
    EVENTIVA_CLUSTER_RUNNER_RPC_BIND_HOST: process.env.EVENTIVA_CLUSTER_RUNNER_RPC_BIND_HOST ?? '0.0.0.0',
    EVENTIVA_CLUSTER_MODE: process.env.EVENTIVA_CLUSTER_MODE ?? 'distributed',
}

/**
 * Dev-only key kept for compatibility if workload expects it; cluster demo does not require it.
 */
export const localClusterEncryptionKeyB64 =
    process.env.EVENTIVA_ENCRYPTION_KEY ?? 'ZGV2LWtleS0zMmJ5dGVzLWZvci1ldmVudGl2YS1waWk='
