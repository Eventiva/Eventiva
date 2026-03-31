export const postgresCredentials = {
    DB_USER: process.env.PGUSER ?? 'postgres',
    DB_PASSWORD: process.env.PGPASSWORD ?? 'postgres',
    DB_DATABASE: process.env.PGDATABASE ?? process.env.DATABASE ?? 'postgres',
};

export const clusterEnv = {
    SHARD_MANAGER_HOST: process.env.SHARD_MANAGER_HOST ?? 'shard-manager.shard-manager.svc',
    HOST: process.env.HOST ?? '127.0.0.1',
    EVENTIVA_HTTP_PORT: process.env.EVENTIVA_HTTP_PORT ?? '3000',
    EVENTIVA_CLUSTER_MODE: process.env.EVENTIVA_CLUSTER_MODE ?? 'distributed',
};

/**
 * Base64 32-byte dev key; matches `DEV_KEY_B64` in `packages/core/src/security/encryption.ts`.
 * Baked into local fpk manifests so runners stay valid if `NODE_ENV` is effectively `production`
 * (e.g. image default) despite the manifest.
 */
export const localClusterEncryptionKeyB64 =
    process.env.EVENTIVA_ENCRYPTION_KEY ?? 'ZGV2LWtleS0zMmJ5dGVzLWZvci1ldmVudGl2YS1waWk=';
