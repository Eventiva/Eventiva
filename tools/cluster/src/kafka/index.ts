import * as K from '@fpk/k8s';
import { pipe } from 'effect';

/**
 * Single-node Redpanda (Kafka API) for local / dev hook dispatch.
 * Staging–prod should use Strimzi (see docs/parts/local-dev/kafka-hook-dispatch.md).
 */
const name = 'redpanda';
const image = process.env.EVENTIVA_KAFKA_DEV_IMAGE ?? 'docker.redpanda.com/redpandadata/redpanda:v24.2.11';

const hookDispatchTopic =
    process.env.EVENTIVA_HOOK_DISPATCH_TOPIC ?? 'eventiva.hook.dispatch';
/** Dev default: 72h in ms; override at render time via env. */
const hookTopicRetentionMs = process.env.EVENTIVA_HOOK_TOPIC_RETENTION_MS ?? '259200000';

const advertiseHost = process.env.EVENTIVA_KAFKA_ADVERTISE_HOST ?? `${name}.kafka.svc.cluster.local`;

/** One-shot Job: create topic + set retention (delete cleanup). */
const hookTopicInitScript = [
    'set -e',
    'brokers=redpanda.kafka.svc:9092',
    `topic=${JSON.stringify(hookDispatchTopic)}`,
    `ret_ms=${hookTopicRetentionMs}`,
    'for i in $(seq 1 90); do',
    '  if rpk topic list --brokers "$brokers" >/dev/null 2>&1; then break; fi',
    '  sleep 2',
    'done',
    'rpk topic create "$topic" --partitions 3 --brokers "$brokers" 2>/dev/null || true',
    'rpk topic alter-config "$topic" --set "retention.ms=$ret_ms" --brokers "$brokers" 2>/dev/null || true',
].join('\n');

const topicInitContainer = K.container('hook-topic-init', image, {
    command: ['sh', '-c', hookTopicInitScript],
    resources: {
        requests: { cpu: '50m', memory: '128Mi' },
        limits: { memory: '256Mi' },
    },
});

const hookTopicJob = K.jobWithContainer('hook-dispatch-topic-init', topicInitContainer, {
    spec: {
        ttlSecondsAfterFinished: 600,
        backoffLimit: 5,
        activeDeadlineSeconds: 600,
    },
});

const container = pipe(
    K.containerWithPorts(name, image, { kafka: 9092 }),
    K.setImagePullPolicy('IfNotPresent'),
    K.setArgs([
        'redpanda',
        'start',
        '--smp=1',
        '--memory=768M',
        '--reserve-memory=0M',
        '--overprovisioned',
        '--node-id=0',
        '--check=false',
        '--kafka-addr',
        'PLAINTEXT://0.0.0.0:9092',
        '--advertise-kafka-addr',
        `PLAINTEXT://${advertiseHost}:9092`,
    ]),
    K.setResourceRequests({
        cpu: '250m',
        memory: '896Mi',
    }),
);

const deployment = pipe(
    K.deploymentWithContainer(name, container),
    K.setReplicas(1),
    K.setDeploymentRollingUpdate({ maxSurge: 1, maxUnavailable: 0 }),
);

const service = K.serviceFromPod(name, deployment);

export default K.withNamespace('kafka')({
    '10-deployment': deployment,
    '20-service': service,
    '30-hook-topic-job': hookTopicJob,
});
