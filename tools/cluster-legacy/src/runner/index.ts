import * as K from '@fpk/k8s';
import { pipe } from 'effect';
import { localClusterEncryptionKeyB64, postgresCredentials, clusterEnv } from '../shared/env';

const name = 'runner';
const image = process.env.EVENTIVA_RUNNER_IMAGE ?? process.env.EVENTIVA_RUNTIME_IMAGE ?? 'eventiva/runtime:local';
const replicas = Number(process.env.EVENTIVA_RUNNER_REPLICAS ?? '3');

const container = pipe(
    K.containerWithPorts(name, image, { tcp: 34431, http: Number(clusterEnv.EVENTIVA_HTTP_PORT) }),
    K.setImagePullPolicy('IfNotPresent'),
    K.concatEnv({
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
        SHARD_MANAGER_HOST: clusterEnv.SHARD_MANAGER_HOST,
        HOST: { fieldRef: { fieldPath: 'status.podIP' } },
        EVENTIVA_CLUSTER_RUNNER_RPC_PORT: clusterEnv.EVENTIVA_CLUSTER_RUNNER_RPC_PORT,
        EVENTIVA_CLUSTER_RUNNER_RPC_BIND_HOST: clusterEnv.EVENTIVA_CLUSTER_RUNNER_RPC_BIND_HOST,
        EVENTIVA_HTTP_PORT: clusterEnv.EVENTIVA_HTTP_PORT,
        EVENTIVA_CLUSTER_MODE: clusterEnv.EVENTIVA_CLUSTER_MODE,
    }),
    K.setResourceRequests({
        cpu: '150m',
        memory: '256Mi',
    }),
    K.setLivenessProbe({
        httpGet: undefined,
        tcpSocket: { port: 34431 },
        initialDelaySeconds: 5,
        periodSeconds: 10,
    }),
    K.setReadinessProbe({
        httpGet: undefined,
        tcpSocket: { port: 34431 },
        initialDelaySeconds: 5,
        periodSeconds: 10,
    })
);

const deployment = pipe(K.deploymentWithContainer(name, container), K.setReplicas(replicas));

export default K.withNamespace(name)({
    '10-deployment': deployment,
});
