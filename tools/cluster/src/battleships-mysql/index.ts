import * as K from '@fpk/k8s';
import { pipe } from 'effect';
import {
    clusterEnv,
    kafkaBootstrapServers,
    localClusterEncryptionKeyB64,
    mysqlCredentials,
} from '../shared/env';

const name = 'battleships-mysql';
const image =
    process.env.EVENTIVA_RUNTIME_IMAGE_MYSQL ?? 'docker.io/eventiva/runtime-mysql:local';

/** MySQL stack uses a dedicated shard manager service DNS. */
const mysqlShardManagerHost =
    process.env.SHARD_MANAGER_MYSQL_HOST ?? 'shard-manager-mysql.shard-manager-mysql.svc';

const container = pipe(
    K.containerWithPorts(name, image, { tcp: 34431 }),
    K.setImagePullPolicy('IfNotPresent'),
    K.concatEnv({
        NODE_ENV: 'development',
        CLUSTER_APP_MODE: 'primary',
        EVENTIVA_ENCRYPTION_KEY: localClusterEncryptionKeyB64,
        DB_USER: mysqlCredentials.DB_USER,
        DB_PASSWORD: mysqlCredentials.DB_PASSWORD,
        DB_DATABASE: mysqlCredentials.DB_DATABASE,
        DB_HOST: mysqlCredentials.DB_HOST,
        DB_PORT: mysqlCredentials.DB_PORT,
        SHARD_MANAGER_HOST: mysqlShardManagerHost,
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
        initialDelaySeconds: 45,
        periodSeconds: 15,
    }),
    K.setReadinessProbe({
        httpGet: undefined,
        tcpSocket: { port: 34431 },
        initialDelaySeconds: 20,
        periodSeconds: 10,
    }),
);

const deploymentAfterMysql = pipe(
    K.deploymentWithContainer(name, container),
    K.appendInitContainer({
        name: 'wait-for-mysql',
        image: process.env.EVENTIVA_MYSQL_IMAGE ?? 'mysql:9',
        command: [
            'sh',
            '-c',
            `for i in $(seq 1 180); do if mysql -h mysql.mysql.svc -u${mysqlCredentials.DB_USER} -p${mysqlCredentials.DB_PASSWORD} --connect-timeout=5 -e "SELECT 1" >/dev/null 2>&1; then exit 0; fi; sleep 2; done; echo "timeout mysql"; exit 1`,
        ],
    }),
    K.setReplicas(1),
);

const deployment =
    process.env.CLUSTER_HOOK_BUS === 'kafka'
        ? pipe(
              deploymentAfterMysql,
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
        : deploymentAfterMysql;

export default K.withNamespace(name)({
    '10-deployment': deployment,
});
