import * as K from '@fpk/k8s';
import { pipe } from 'effect';
import { localClusterEncryptionKeyB64, postgresCredentials } from '../shared/env';

const name = 'eventiva-workload';
const image = process.env.EVENTIVA_WORKLOAD_IMAGE ?? process.env.EVENTIVA_RUNTIME_IMAGE ?? 'eventiva/runtime:local';

const container = pipe(
    K.containerWithPorts(name, image, { tcp: 34431 }),
    K.setArgs([
        'pnpm',
        'exec',
        'tsx',
        '--tsconfig',
        'packages/platforms/postgresql/tsconfig.run.json',
        'packages/platforms/postgresql/src/index.ts',
    ]),
    K.setImagePullPolicy('IfNotPresent'),
    K.concatEnv({
        // Local fpk stack: avoid image NODE_ENV=production + missing encryption key; do not bake host NODE_ENV.
        NODE_ENV: 'development',
        EVENTIVA_ENCRYPTION_KEY: localClusterEncryptionKeyB64,
        PGUSER: postgresCredentials.DB_USER,
        PGPASSWORD: postgresCredentials.DB_PASSWORD,
        PGDATABASE: postgresCredentials.DB_DATABASE,
        PGHOST: 'postgres.postgres.svc',
        PGPORT: process.env.PGPORT ?? '5432',
        DB_USER: postgresCredentials.DB_USER,
        DB_PASSWORD: postgresCredentials.DB_PASSWORD,
        DB_DATABASE: postgresCredentials.DB_DATABASE,
        DB_HOST: 'postgres.postgres.svc',
        SHARD_MANAGER_HOST: process.env.SHARD_MANAGER_HOST ?? 'shard-manager.shard-manager.svc',
        HOST: { fieldRef: { fieldPath: 'status.podIP' } },
        EVENTIVA_CLUSTER_MODE: process.env.EVENTIVA_CLUSTER_MODE ?? 'distributed',
        // Keep heap below cgroup memory limit (see setResourceLimits below).
        NODE_OPTIONS: '--max-old-space-size=448',
    }),
    K.setResourceRequests({
        cpu: '200m',
        memory: '512Mi',
    }),
    K.setResourceLimits({
        memory: '768Mi',
    })
);

const deployment = pipe(
    K.deploymentWithContainer(name, container),
    K.setReplicas(1),
    K.appendInitContainer({
        name: 'wait-for-postgres',
        image: process.env.EVENTIVA_PG_IMAGE ?? 'postgres:16-alpine',
        command: [
            'sh',
            '-c',
            `for i in $(seq 1 90); do if pg_isready -h postgres.postgres.svc -p 5432 -U ${postgresCredentials.DB_USER}; then exit 0; fi; sleep 2; done; echo "timeout waiting for postgres"; exit 1`,
        ],
    })
);

export default K.withNamespace(name)({
    '10-deployment': deployment,
});
