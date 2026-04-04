import * as K from '@fpk/k8s';
import { pipe } from 'effect';
import {
    clusterEnv,
    localClusterEncryptionKeyB64,
    postgresCredentials,
    shooterClusterEnv,
} from '../shared/env';

const name = 'speed-shooter';
const image = process.env.EVENTIVA_RUNTIME_IMAGE ?? 'docker.io/eventiva/runtime:local';

const container = pipe(
    K.containerWithPorts(name, image, { tcp: 34431 }),
    K.setImagePullPolicy('IfNotPresent'),
    K.concatEnv({
        NODE_ENV: 'development',
        CLUSTER_APP_MODE: 'speed-shooter',
        EVENTIVA_ENCRYPTION_KEY: localClusterEncryptionKeyB64,
        PGUSER: postgresCredentials.DB_USER,
        PGPASSWORD: postgresCredentials.DB_PASSWORD,
        PGDATABASE: postgresCredentials.DB_DATABASE,
        PGHOST: 'postgres.postgres.svc',
        PGPORT: postgresCredentials.DB_PORT,
        DB_USER: postgresCredentials.DB_USER,
        DB_PASSWORD: postgresCredentials.DB_PASSWORD,
        DB_DATABASE: postgresCredentials.DB_DATABASE,
        DB_HOST: postgresCredentials.DB_HOST,
        DB_PORT: postgresCredentials.DB_PORT,
        SHARD_MANAGER_HOST: clusterEnv.SHARD_MANAGER_HOST,
        HOST: { fieldRef: { fieldPath: 'status.podIP' } },
        EVENTIVA_CLUSTER_RUNNER_RPC_PORT: clusterEnv.EVENTIVA_CLUSTER_RUNNER_RPC_PORT,
        EVENTIVA_CLUSTER_RUNNER_RPC_BIND_HOST: clusterEnv.EVENTIVA_CLUSTER_RUNNER_RPC_BIND_HOST,
        EVENTIVA_CLUSTER_MODE: clusterEnv.EVENTIVA_CLUSTER_MODE,
        SHARDS_PER_GROUP: clusterEnv.SHARDS_PER_GROUP,
        ...shooterClusterEnv,
    }),
    K.setResourceRequests({
        cpu: '300m',
        memory: '768Mi',
    }),
);

const deployment = pipe(
    K.deploymentWithContainer(name, container),
    K.appendInitContainer({
        name: 'wait-for-postgres',
        image: process.env.EVENTIVA_PG_IMAGE ?? 'postgres:16-alpine',
        command: [
            'sh',
            '-c',
            `for i in $(seq 1 90); do if pg_isready -h postgres.postgres.svc -p 5432 -U ${postgresCredentials.DB_USER}; then exit 0; fi; sleep 2; done; echo "timeout postgres"; exit 1`,
        ],
    }),
    K.setReplicas(1),
);

export default K.withNamespace(name)({
    '10-deployment': deployment,
});
