# Cluster hook dispatch (Kafka)

Multi-extension hook fan-out uses a single Kafka topic. Each extension deployment uses a **distinct consumer `groupId`** (`eventiva-hooks-<CLUSTER_EXTENSION_ID>`) so every extension type receives the full stream; replicas of the same extension share one group.

## Wire format

- Envelope: JSON from `@eventiva/core` (`HookDispatchEnvelope`, `encodeHookDispatchEnvelope` / `decodeHookDispatchEnvelope`).
- **Idempotency:** consumers dedupe on `eventId` (bounded in-memory LRU per pod; at-least-once Kafka may redeliver).
- **Emission policy:** when `CLUSTER_HOOK_BUS=kafka`, local `runner` `onLoad` is **not** run in-process (see `runnerOnLoadHooksLayer`) so the same lifecycle is not executed twice; publish cluster-wide dispatches via Kafka instead.

## Dev broker (FPK)

- Module: [`tools/cluster/src/kafka`](../../../tools/cluster/src/kafka/index.ts) — single-node **Redpanda** (Kafka API), namespace `kafka`.
- **Topic + retention:** a **Job** (`hook-dispatch-topic-init`) creates `eventiva.hook.dispatch` (or `EVENTIVA_HOOK_DISPATCH_TOPIC` at **render** time) and sets `retention.ms` from `EVENTIVA_HOOK_TOPIC_RETENTION_MS` (default **72h**). Prefer delete cleanup; compaction only if you explicitly need it.
- Render: `node scripts/cluster/render-fpk-cluster.mjs` → `tools/cluster/out/kafka/`.
- Apply: `EVENTIVA_CLUSTER_STACK=postgresql` (or `mysql`) includes `kafka` first in [`apply-fpk-cluster.mjs`](../../../scripts/cluster/apply-fpk-cluster.mjs).
- **Rollout wait:** [`wait-for-cluster-rollout.mjs`](../../../scripts/cluster/wait-for-cluster-rollout.mjs) waits on `kafka/redpanda` for the `postgresql` / `mysql` / `full` stacks.
- Default bootstrap for pods: `redpanda.kafka.svc.cluster.local:9092` (see `tools/cluster/src/shared/env.ts` → `kafkaBootstrapServers`).
- **Host debugging:** `EVENTIVA_PF_KAFKA=1 node scripts/cluster/port-forward-fpk-cluster.mjs` forwards `kafka/svc/redpanda` to `127.0.0.1:9094` (override with `EVENTIVA_PF_KAFKA_PORT`).

## TLS (Strimzi / staging–prod)

- Dev manifest uses **PLAINTEXT** on port 9092.
- Staging/production: use **Strimzi** listeners on **TLS** (e.g. 9093), mount CA / user certs from Secrets into Eventiva pods, set `KAFKA_TLS=true` and `KAFKA_SSL_CA_PATH` / cert paths per `.env.example`.
- Pin operator and Kafka versions; document upgrade tests on staging.
- **FPK + Strimzi:** see [kafka-strimzi-fpk-pattern.md](./kafka-strimzi-fpk-pattern.md) (vendor CRs / operator YAML into `tools/cluster/src`, render + apply only through the FPK pipeline).

## Retention

| Environment | Suggested `retention.ms` |
|-------------|---------------------------|
| Dev | 24–72h (short disk use); default **72h** in the dev topic Job unless `EVENTIVA_HOOK_TOPIC_RETENTION_MS` overrides at render time |
| Staging / prod | ~7d for incident replay — set on the `KafkaTopic` CR (Strimzi) or broker topic config |

Prefer **delete** cleanup unless compaction is explicitly required.

## ACLs (v1 checklist)

- Separate credentials for hook **publisher** vs **consumers** if blast radius matters.
- Producer: `WRITE` + `DESCRIBE` on `eventiva.hook.dispatch` (topic name configurable via `EVENTIVA_HOOK_DISPATCH_TOPIC`).
- Consumers: `READ` + `DESCRIBE` on topic; `READ` on consumer group prefix `eventiva-hooks-*`.
- No anonymous clients on staging/prod listeners.

## Two extension pods (copyright-notice vs example-transform)

Run **two** runner deployments (or two clusters) with:

- `CLUSTER_HOOK_BUS=kafka`
- **Different** `CLUSTER_EXTENSION_ID` (e.g. `copyright-notice` and `example-transform`) → different consumer groups.
- `EVENTIVA_CLUSTER_EXTENSIONS=copyright-notice` on one deployment and `EVENTIVA_CLUSTER_EXTENSIONS=example-transform` on the other (see `platform.ts` in each platform package).

Re-render FPK with the desired env when generating manifests. The default single `battleships` deployment uses `EVENTIVA_CLUSTER_EXTENSIONS=all` and one consumer group unless you split deployments.

## effect-kafka spike (two consumer groups)

1. Run a broker (dev cluster Redpanda or local Compose).
2. Create topic `eventiva.hook.dispatch` (or allow auto-creation).
3. Run two processes with `CLUSTER_HOOK_BUS=kafka`, same `KAFKA_BOOTSTRAP_SERVERS`, **different** `CLUSTER_EXTENSION_ID` (e.g. `a` and `b`) so groupIds differ.
4. Produce one JSON envelope (e.g. with `kcat`, Redpanda Console, or `publishClusterHookDispatch` from `@eventiva/integrations.kafka` with `clusterHookKafkaPublishLayers`).
5. Both consumers should log/handle the same record; each uses its own committed offset.

## Fallback transports (no Kafka)

1. **Postgres `NOTIFY` / `LISTEN`** — small payloads (~8KB); optional outbox table for larger bodies.
2. **Parallel RPC** — `Runners.send` to addresses from a participant registry (higher coupling; no broker).

## Integration package

- **`@eventiva/integrations.kafka`**: `effect-kafka` + **KafkaJS** engine, `clusterHookKafkaStackFromEnv`, `publishClusterHookDispatch`.
- **`@eventiva/core`**: types, config, envelope schema only (no Kafka dependency).

## Demo extension (`@eventiva/extensions.hooks-kafka-demo`)

This package shows the full hook bus path end-to-end: **handlers** plus **bootstrap publishes** to the dispatch topic (default name `eventiva.hook.dispatch`).

1. **`HooksKafkaDemoRegistrationExtension.Default`** — Registers runner-scoped hooks: `onLoad` and `hooksKafkaDemoPing`. With `CLUSTER_HOOK_BUS=off`, local `runnerOnLoadHooks` still runs `onLoad` in-process; with `CLUSTER_HOOK_BUS=kafka`, the Kafka consumer invokes the same registrations from topic records (see emission policy above).
2. **`hooksKafkaDemoBootstrapLayer`** — When `CLUSTER_HOOK_BUS=kafka`, forks a short delayed sequence that calls `publishClusterHookDispatch` twice (runner `onLoad`, then `hooksKafkaDemoPing`) so you can see consumer-side logs without a separate producer.

**Platform wiring:** PostgreSQL and MySQL platforms set `PlatformContext.kafkaHookBootstrapLayer` to `hooksKafkaDemoBootstrapLayer` (see `packages/platforms/postgresql/src/platform.ts` and `packages/platforms/mysql/src/platform.ts`). The runner merges that layer after the Kafka stack so a `Producer` is available.

**Defaults:** `CLUSTER_HOOK_BUS` defaults to **`kafka`** in application config ([`cluster-hook-config.ts`](../../../packages/core/src/config/cluster-hook-config.ts)) and in FPK runner render defaults ([`tools/cluster/src/battleships/index.ts`](../../../tools/cluster/src/battleships/index.ts), [`battleships-mysql`](../../../tools/cluster/src/battleships-mysql/index.ts)). Override with `CLUSTER_HOOK_BUS=off` to disable the bus.

**Logs to grep:** demo code prefixes messages with **`[hooks-kafka-demo]`** (registration handlers and bootstrap publish confirmations). Example: `grep '\[hooks-kafka-demo\]'` on runner logs.

## Optional participant registry

A Postgres table of extension runners is **optional** for routing when using Kafka; it can still help ops dashboards (JOIN with `cluster_runners`). See [Effect cluster SQL tables](./effect-cluster-sql-tables.md).
