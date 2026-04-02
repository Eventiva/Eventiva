import * as K from '@fpk/k8s';
import { pipe } from 'effect';
import { localClusterEncryptionKeyB64, postgresCredentials } from '../shared/env';

const name = 'shard-manager';

/** Effect `@effect/cluster` ShardingConfig: must match container probes / service port. */
const shardManagerRpcPort = '8080';
const image = process.env.EVENTIVA_RUNTIME_IMAGE ?? 'docker.io/eventiva/runtime:local';

const container = pipe(
    K.containerWithPorts(name, image, { tcp: 8080 }),
    K.setArgs([
        'pnpm',
        'exec',
        'tsx',
        '--tsconfig',
        'packages/platforms/postgresql/tsconfig.run.json',
        'packages/platforms/postgresql/src/shardManager.ts',
    ]),
    K.setImagePullPolicy('IfNotPresent'),
    K.concatEnv({
        NODE_ENV: 'development',
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
        initialDelaySeconds: 15,
        periodSeconds: 10,
    }),
    K.setReadinessProbe({
        httpGet: undefined,
        tcpSocket: { port: 8080 },
        initialDelaySeconds: 5,
        periodSeconds: 10,
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

const service = K.serviceFromPod(name, deployment, {
    spec: { clusterIP: 'None' },
});

export default K.withNamespace(name)({
    '10-deployment': deployment,
    '20-service': service,
});
