import * as K from '@fpk/k8s';
import { pipe } from 'effect';
import { postgresCredentials } from '../shared/env';

const name = 'shard-manager';
const image = process.env.EVENTIVA_SHARD_MANAGER_IMAGE ?? 'timsmart/effect-cluster:shard-manager';

const container = pipe(
    K.containerWithPorts(name, image, { tcp: 8080 }),
    K.setImagePullPolicy('IfNotPresent'),
    K.concatEnv({
        PGUSER: postgresCredentials.DB_USER,
        PGPASSWORD: postgresCredentials.DB_PASSWORD,
        PGDATABASE: postgresCredentials.DB_DATABASE,
        PGHOST: 'postgres.postgres.svc',
        PGPORT: process.env.PGPORT ?? '5432',
        DB_USER: postgresCredentials.DB_USER,
        DB_PASSWORD: postgresCredentials.DB_PASSWORD,
        DB_DATABASE: postgresCredentials.DB_DATABASE,
        DB_HOST: 'postgres.postgres.svc',
        SHARD_MANAGER_HOST: { fieldRef: { fieldPath: 'status.podIP' } },
    }),
    K.setResourceRequests({
        cpu: '100m',
        memory: '128Mi',
    }),
    K.setLivenessProbe({
        httpGet: undefined,
        tcpSocket: { port: 8080 },
        initialDelaySeconds: 5,
        periodSeconds: 10,
    }),
    K.setReadinessProbe({
        httpGet: undefined,
        tcpSocket: { port: 8080 },
        initialDelaySeconds: 5,
        periodSeconds: 10,
    })
);

const deployment = K.deploymentWithContainer(name, container);
const service = K.serviceFromPod(name, deployment, {
    spec: { clusterIP: 'None' },
});

export default K.withNamespace(name)({
    '10-deployment': deployment,
    '20-service': service,
});
