import * as K from '@fpk/k8s';
import { pipe } from 'effect';
import { localClusterEncryptionKeyB64, mysqlCredentials } from '../shared/env';

/** Effect `@effect/cluster` ShardingConfig: advertised runner address (pod IP + RPC port). */
const shardManagerRpcPort = '8080';

const name = 'shard-manager-mysql';
const image =
    process.env.EVENTIVA_RUNTIME_IMAGE_MYSQL ?? 'docker.io/eventiva/runtime-mysql:local';

const container = pipe(
    K.containerWithPorts(name, image, { tcp: 8080 }),
    K.setArgs([
        'pnpm',
        'exec',
        'tsx',
        '--tsconfig',
        'packages/platforms/mysql/tsconfig.run.json',
        'packages/platforms/mysql/src/shardManager.ts',
    ]),
    K.setImagePullPolicy('IfNotPresent'),
    K.concatEnv({
        NODE_ENV: 'development',
        EVENTIVA_ENCRYPTION_KEY: localClusterEncryptionKeyB64,
        DB_USER: mysqlCredentials.DB_USER,
        DB_PASSWORD: mysqlCredentials.DB_PASSWORD,
        DB_DATABASE: mysqlCredentials.DB_DATABASE,
        DB_HOST: mysqlCredentials.DB_HOST,
        DB_PORT: mysqlCredentials.DB_PORT,
        SHARD_MANAGER_HOST: { fieldRef: { fieldPath: 'status.podIP' } },
        HOST: { fieldRef: { fieldPath: 'status.podIP' } },
        PORT: shardManagerRpcPort,
        LISTEN_HOST: '0.0.0.0',
        LISTEN_PORT: shardManagerRpcPort,
    }),
    K.setResourceRequests({
        cpu: '100m',
        memory: '256Mi',
    }),
    K.setLivenessProbe({
        httpGet: undefined,
        tcpSocket: { port: 8080 },
        initialDelaySeconds: 30,
        periodSeconds: 10,
    }),
    K.setReadinessProbe({
        httpGet: undefined,
        tcpSocket: { port: 8080 },
        initialDelaySeconds: 10,
        periodSeconds: 10,
    }),
);

/** Init must be attached to the Deployment (not the main Container) so FPK emits `initContainers`. */
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

const service = K.serviceFromPod(name, deployment, {
    spec: { clusterIP: 'None' },
});

export default K.withNamespace(name)({
    '10-deployment': deployment,
    '20-service': service,
});
