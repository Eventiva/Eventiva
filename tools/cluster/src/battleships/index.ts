import * as K from '@fpk/k8s';
import { pipe } from 'effect';
import { hostnameAffinity } from '../lib/affinity';
import {
    clusterEnv,
    kafkaBootstrapServers,
    localClusterEncryptionKeyB64,
    postgresCredentials,
} from '../shared/env';

const name = 'battleships';
const image = process.env.EVENTIVA_RUNTIME_IMAGE ?? 'docker.io/eventiva/runtime:local';

const container = pipe(
    K.containerWithPorts(name, image, { tcp: 34431 }),
    K.setImagePullPolicy('IfNotPresent'),
    K.concatEnv({
        NODE_ENV: 'development',
        CLUSTER_APP_MODE: 'primary',
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
        CLUSTER_HOOK_BUS: process.env.CLUSTER_HOOK_BUS ?? 'kafka',
        KAFKA_BOOTSTRAP_SERVERS: kafkaBootstrapServers,
        EVENTIVA_HOOK_DISPATCH_TOPIC: process.env.EVENTIVA_HOOK_DISPATCH_TOPIC ?? 'eventiva.hook.dispatch',
        CLUSTER_EXTENSION_ID: process.env.CLUSTER_EXTENSION_ID ?? '',
        EVENTIVA_CLUSTER_EXTENSIONS: process.env.EVENTIVA_CLUSTER_EXTENSIONS ?? 'all',
    }),
    K.setResourceRequests({
        cpu: '200m',
        memory: '512Mi',
    }),
    K.setLivenessProbe({
        httpGet: undefined,
        tcpSocket: { port: 34431 },
        initialDelaySeconds: 30,
        periodSeconds: 15,
    }),
    K.setReadinessProbe({
        httpGet: undefined,
        tcpSocket: { port: 34431 },
        initialDelaySeconds: 15,
        periodSeconds: 10,
    }),
);

const deploymentAfterPg = pipe(
    K.deploymentWithContainer(name, container, {
        spec: {
            template: {
                spec: {
                    affinity: hostnameAffinity(name),
                },
            },
        },
    }),
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

/** When rendering with `CLUSTER_HOOK_BUS=kafka`, wait for the in-cluster broker before starting the runner. */
const deployment =
    process.env.CLUSTER_HOOK_BUS === 'kafka'
        ? pipe(
              deploymentAfterPg,
              K.appendInitContainer({
                  name: 'wait-for-kafka',
                  image: process.env.EVENTIVA_KAFKA_WAIT_IMAGE ?? 'bash:5.2',
                  command: [
                      'bash',
                      '-c',
                      'for i in $(seq 1 90); do (echo >/dev/tcp/redpanda.kafka.svc/9092) >/dev/null 2>&1 && exit 0; sleep 2; done; echo "timeout kafka"; exit 1',
                  ],
              }),
          )
        : deploymentAfterPg;

export default K.withNamespace(name)({
    '10-deployment': deployment,
});
