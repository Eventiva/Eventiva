#!/usr/bin/env node
/**
 * kubectl port-forward for local FPK cluster: Postgres + workload HTTP + runner RPC.
 *
 * Standalone:
 *   node scripts/cluster/port-forward-fpk-cluster.mjs
 *
 * Env (optional):
 *   EVENTIVA_PF_PG_NAMESPACE      default postgres
 *   EVENTIVA_PF_PG_SERVICE        default postgres
 *   EVENTIVA_PF_PG_PORT           local port for Postgres (default 5432)
 *   EVENTIVA_PF_WORKLOAD_NS       default eventiva-workload
 *   EVENTIVA_PF_WORKLOAD_DEPLOY   default eventiva-workload
 *   EVENTIVA_PF_HTTP_PORT         local port for EVENTIVA_HTTP_PORT in pod (default 3000)
 *   EVENTIVA_PF_RUNNER_RPC_PORT        local port for runner RPC (default 34431)
 *   EVENTIVA_PF_RUNNER_RPC_REMOTE_PORT container port (default EVENTIVA_CLUSTER_RUNNER_RPC_PORT or 34431)
 *   EVENTIVA_PF_SKIP_RUNNER_RPC=1      skip forwarding runner RPC
 *   EVENTIVA_PF_KAFKA=1                also forward Redpanda/Kafka (svc/redpanda in namespace kafka, default local 9094)
 *   EVENTIVA_PF_KAFKA_NAMESPACE        default kafka
 *   EVENTIVA_PF_KAFKA_SERVICE          default redpanda
 *   EVENTIVA_PF_KAFKA_PORT             local port (default 9094)
 */
import { spawn, spawnSync } from 'node:child_process';

const cwd = process.cwd();

const hasKubectl = spawnSync('which', ['kubectl'], { stdio: 'ignore', cwd }).status === 0;
const hasCluster =
    hasKubectl && spawnSync('kubectl', ['cluster-info'], { stdio: 'ignore', cwd }).status === 0;
if (!hasKubectl) {
    console.error('kubectl not found; port-forward requires kubectl.');
    process.exit(1);
}
if (!hasCluster) {
    console.error('No Kubernetes cluster reachable (kubectl cluster-info failed).');
    process.exit(1);
}

const pgNs = process.env.EVENTIVA_PF_PG_NAMESPACE ?? 'postgres';
const pgSvc = process.env.EVENTIVA_PF_PG_SERVICE ?? 'postgres';
const pgLocal = process.env.EVENTIVA_PF_PG_PORT ?? '5432';

const wlNs = process.env.EVENTIVA_PF_WORKLOAD_NS ?? 'eventiva-workload';
const wlDep = process.env.EVENTIVA_PF_WORKLOAD_DEPLOY ?? 'eventiva-workload';
const httpLocal = process.env.EVENTIVA_PF_HTTP_PORT ?? process.env.EVENTIVA_HTTP_PORT ?? '3000';
const rpcLocal = process.env.EVENTIVA_PF_RUNNER_RPC_PORT ?? '34431';
const rpcRemote = process.env.EVENTIVA_PF_RUNNER_RPC_REMOTE_PORT ?? process.env.EVENTIVA_CLUSTER_RUNNER_RPC_PORT ?? '34431';
const skipRpc = process.env.EVENTIVA_PF_SKIP_RUNNER_RPC === '1';
const pfKafka = process.env.EVENTIVA_PF_KAFKA === '1';
const kafkaNs = process.env.EVENTIVA_PF_KAFKA_NAMESPACE ?? 'kafka';
const kafkaSvc = process.env.EVENTIVA_PF_KAFKA_SERVICE ?? 'redpanda';
const kafkaLocal = process.env.EVENTIVA_PF_KAFKA_PORT ?? '9094';

const children = [];

function forward(args, label) {
    const child = spawn('kubectl', args, {
        stdio: ['ignore', 'pipe', 'pipe'],
        cwd,
    });
    const prefix = `[${label}] `;
    child.stdout?.on('data', (c) => process.stdout.write(prefix + c.toString()));
    child.stderr?.on('data', (c) => process.stderr.write(prefix + c.toString()));
    child.on('exit', (code, signal) => {
        if (code !== 0 && code !== null) {
            process.stderr.write(`${prefix}kubectl exited ${code}${signal ? ` (${signal})` : ''}\n`);
        }
    });
    children.push(child);
    return child;
}

forward(['port-forward', '-n', pgNs, `svc/${pgSvc}`, `${pgLocal}:5432`], 'postgres');

const workloadArgs = [
    'port-forward',
    '-n',
    wlNs,
    `deployment/${wlDep}`,
    `${httpLocal}:3000`,
];
if (!skipRpc) {
    workloadArgs.push(`${rpcLocal}:${rpcRemote}`);
}
forward(workloadArgs, 'workload');

if (pfKafka) {
    forward(['port-forward', '-n', kafkaNs, `svc/${kafkaSvc}`, `${kafkaLocal}:9092`], 'kafka');
}

console.log(
    [
        'Port forwards (Ctrl+C to stop):',
        `  Postgres:     127.0.0.1:${pgLocal}  -> ${pgNs}/svc/${pgSvc}:5432`,
        `  HTTP API:     127.0.0.1:${httpLocal}  -> ${wlNs}/deployment/${wlDep}:3000`,
        ...(skipRpc ? [] : [`  Runner RPC:   127.0.0.1:${rpcLocal}  -> pod:${rpcRemote}`]),
        ...(pfKafka
            ? [`  Kafka API:    127.0.0.1:${kafkaLocal}  -> ${kafkaNs}/svc/${kafkaSvc}:9092`]
            : []),
    ].join('\n')
);

const shutdown = () => {
    for (const c of children) {
        try {
            c.kill('SIGTERM');
        } catch {
            /* ignore */
        }
    }
    process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
