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

/**
 * Effect `@effect/cluster` ShardingConfig `shardsPerGroup`.
 * Must be identical on every runner, shard-manager, and client in the same cluster.
 * Override with `SHARDS_PER_GROUP` when rendering; use a fresh DB if you change an existing cluster.
 */
export const shardsPerGroup = process.env.SHARDS_PER_GROUP ?? '2'

/**
 * Demo shooter env at FPK render time.
 * Default `SHOOTER_MAX_SHOOTS=5` for quieter local logs; set `SHOOTER_MAX_SHOOTS=0` to omit (unlimited).
 */
export const shooterClusterEnv: Record<string, string> = {
    ...(process.env.SHOOTER_MAX_SHOOTS === '0'
        ? {}
        : process.env.SHOOTER_MAX_SHOOTS !== undefined && process.env.SHOOTER_MAX_SHOOTS !== ''
          ? { SHOOTER_MAX_SHOOTS: process.env.SHOOTER_MAX_SHOOTS }
          : { SHOOTER_MAX_SHOOTS: '5' }),
    ...(process.env.SPEED_SHOOTER_CONCURRENCY !== undefined &&
    process.env.SPEED_SHOOTER_CONCURRENCY !== ''
        ? { SPEED_SHOOTER_CONCURRENCY: process.env.SPEED_SHOOTER_CONCURRENCY }
        : {}),
    ...(process.env.SPEED_SHOOTER_ENTITY_COUNT !== undefined &&
    process.env.SPEED_SHOOTER_ENTITY_COUNT !== ''
        ? { SPEED_SHOOTER_ENTITY_COUNT: process.env.SPEED_SHOOTER_ENTITY_COUNT }
        : {}),
}

export const clusterEnv = {
    SHARD_MANAGER_HOST: process.env.SHARD_MANAGER_HOST ?? 'shard-manager.shard-manager.svc',
    EVENTIVA_CLUSTER_RUNNER_RPC_PORT: process.env.EVENTIVA_CLUSTER_RUNNER_RPC_PORT ?? '34431',
    EVENTIVA_CLUSTER_RUNNER_RPC_BIND_HOST: process.env.EVENTIVA_CLUSTER_RUNNER_RPC_BIND_HOST ?? '0.0.0.0',
    EVENTIVA_CLUSTER_MODE: process.env.EVENTIVA_CLUSTER_MODE ?? 'distributed',
    SHARDS_PER_GROUP: shardsPerGroup,
}

/** In-cluster Kafka API (Redpanda dev broker); override for Strimzi bootstrap in other envs. */
export const kafkaBootstrapServers =
    process.env.KAFKA_BOOTSTRAP_SERVERS ?? 'redpanda.kafka.svc.cluster.local:9092'

/**
 * Dev-only key kept for compatibility if workload expects it; cluster demo does not require it.
 */
export const localClusterEncryptionKeyB64 =
    process.env.EVENTIVA_ENCRYPTION_KEY ?? 'ZGV2LWtleS0zMmJ5dGVzLWZvci1ldmVudGl2YS1waWk='
