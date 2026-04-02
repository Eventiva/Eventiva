import * as K from '@fpk/k8s';
import { pipe } from 'effect';
import { clusterEnv, localClusterEncryptionKeyB64, mysqlCredentials } from '../shared/env';

const name = 'slow-shooter-mysql';
const image =
    process.env.EVENTIVA_RUNTIME_IMAGE_MYSQL ?? 'docker.io/eventiva/runtime-mysql:local';

const mysqlShardManagerHost =
    process.env.SHARD_MANAGER_MYSQL_HOST ?? 'shard-manager-mysql.shard-manager-mysql.svc';

const container = pipe(
    K.containerWithPorts(name, image, { tcp: 34431 }),
    K.setImagePullPolicy('IfNotPresent'),
    K.concatEnv({
        NODE_ENV: 'development',
        CLUSTER_APP_MODE: 'slow-shooter',
        START_SHIP: '0',
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
    }),
    K.setResourceRequests({
        cpu: '150m',
        memory: '384Mi',
    }),
);

const deployment = pipe(
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

export default K.withNamespace(name)({
    '10-deployment': deployment,
});
