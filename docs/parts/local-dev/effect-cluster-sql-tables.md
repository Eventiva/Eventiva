# Effect `@effect/cluster` SQL tables (Postgres / MySQL)

When using `NodeClusterSocket.layer({ storage: "sql" })`, `@effect/cluster` creates tables with the default prefix `cluster_` in the application database.

## Runner and shard metadata

| Table | Purpose |
|-------|---------|
| `cluster_runners` | Registered runners: `machine_id`, unique `address` (host:port), `runner` metadata JSON, `healthy`, `last_heartbeat`. |
| `cluster_locks` | Shard ownership: `shard_id` → `address` of the runner holding the lock. |

## Messaging (persisted RPC)

| Table | Purpose |
|-------|---------|
| `cluster_messages` | Envelopes: shard, entity type/id, kind, payload, trace fields, `deliver_at`, etc. |
| `cluster_replies` | Reply records correlated to requests. |
| `cluster_migrations` | Migrator bookkeeping for message storage. |

Source references: `node_modules/@effect/cluster/src/SqlRunnerStorage.ts`, `SqlMessageStorage.ts`.

## ShardingConfig parity

All processes that share the same `cluster_` prefix must use **consistent** `shardGroups` (same names and order) and `shardsPerGroup`, or advisory-lock numbering and shard ids will not align across runners.

## Shard manager vs runner workloads (local K8s)

In [`tools/cluster/src`](../../../tools/cluster/src):

- **Shard manager** (`shard-manager` / `shard-manager-mysql`): a **single** deployment that runs the platform’s shard-manager entry (`shardManager.ts`). It owns the RPC endpoint the cluster uses for shard coordination; env points it at Postgres/MySQL and exposes a stable **host/port** for runners (`SHARD_MANAGER_HOST` / service DNS).
- **Runner deployments** (`battleships` / `battleships-mysql` namespaces): one or more **Effect cluster runner** pods (`CLUSTER_APP_MODE=primary`) that register with SQL storage, connect to the shard manager, and run demo entities (demo RPC, hooks, optional Kafka hook consumers). Split deployments (e.g. different `CLUSTER_EXTENSION_ID` / `EVENTIVA_CLUSTER_EXTENSIONS`) are for **multi-extension** fan-out; they are still the same runner role, not a second shard manager.

Hook dispatch over Kafka does **not** require listing runner pod addresses in a registry; see [Kafka hook dispatch](./kafka-hook-dispatch.md).

## FPK cluster layout

Kubernetes workloads for local dev are defined under [`tools/cluster/src`](../../../tools/cluster/src) with `@fpk/k8s`, rendered to `tools/cluster/out` via `scripts/cluster/render-fpk-cluster.mjs`, and applied with `scripts/cluster/apply-fpk-cluster.mjs` (Nx `cluster:apply`).

## Optional extension participant registry

For **Kafka-based** cluster hook dispatch, a dynamic address list is not required. An optional Postgres table (or view) keyed by extension id can still be maintained for **observability** or admin UIs (e.g. JOIN with `cluster_runners`). See [Kafka hook dispatch](./kafka-hook-dispatch.md).
