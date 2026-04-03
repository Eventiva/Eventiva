# PostgreSQL cluster runtime (local)

This guide is for running the PostgreSQL platform in local development using the cluster stack. It is the default runtime path now, so local runs should behave like cluster deployments rather than a special single-process shortcut.

## What changed

- Default local runtime for the PostgreSQL platform is `platforms-postgresql:run`.
- That target now executes:
  1. `platforms-postgresql:cluster:apply`
  2. `platforms-postgresql:run-local`
- Cluster lifecycle targets are available on project `platforms-postgresql`:
  - `cluster:render`
  - `cluster:apply`
  - `cluster:delete`
  - `cluster:status`
  - `cluster:logs`
- Matching root scripts are available in `package.json` for the same lifecycle commands.
- The PostgreSQL (and MySQL) apply profile includes a **Kafka API broker** (`tools/cluster/src/kafka`, Redpanda) before database workloads so hook dispatch can use `CLUSTER_HOOK_BUS=kafka`. See [Kafka hook dispatch](./kafka-hook-dispatch.md).

## Prerequisites

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Ensure local tooling required by the stack is installed and accessible in your shell:
   - `pnpm`
   - `node`
   - cluster tooling used by the FPK scripts

3. Use repository root as your working directory.

## Start the default runtime

Run the default development command:

```bash
pnpm dev
```

Equivalent direct Nx command:

```bash
pnpm nx run platforms-postgresql:run
```

This applies the cluster stack first, then starts the local process with cluster-oriented settings.

## Cluster lifecycle commands

Use either root scripts or direct Nx targets.

### Root scripts

```bash
pnpm cluster:render
pnpm cluster:apply
pnpm cluster:status
pnpm cluster:logs
pnpm cluster:delete
```

### Direct Nx targets

```bash
pnpm nx run platforms-postgresql:cluster:render
pnpm nx run platforms-postgresql:cluster:apply
pnpm nx run platforms-postgresql:cluster:status
pnpm nx run platforms-postgresql:cluster:logs
pnpm nx run platforms-postgresql:cluster:delete
```

## Cluster manifests location

Cluster manifests are defined under:

- `tools/cluster/src/pg`
- `tools/cluster/src/shard-manager`
- `tools/cluster/src/runner`
- `tools/cluster/src/workload`

Shared environment helpers for these manifests live in:

- `tools/cluster/src/shared/env.ts`

## HTTP from your host (curl / browser)

Pods are not reachable on your LAN by default (ClusterIP). Use **port-forward** to map the workload’s HTTP port to localhost.

The platform listens on **`EVENTIVA_HTTP_PORT`** (default **3000**) inside the **`eventiva-workload`** deployment.

```bash
kubectl port-forward -n eventiva-workload deployment/eventiva-workload 3000:3000
```

In another shell:

```bash
curl -sS "http://127.0.0.1:3000/api/docs" | head
```

Stop the forward with Ctrl+C.

**One command for Postgres + HTTP + runner RPC:** `pnpm cluster:port-forward` (or `pnpm nx run platforms-postgresql:cluster:port-forward`) runs `scripts/cluster/port-forward-fpk-cluster.mjs`. Optional env: `EVENTIVA_PF_PG_PORT`, `EVENTIVA_PF_HTTP_PORT`, `EVENTIVA_PF_RUNNER_RPC_PORT`, `EVENTIVA_PF_SKIP_RUNNER_RPC=1`.

`pnpm dev` / `pnpm cluster:run` sets `EVENTIVA_CLUSTER_PORT_FORWARD=1` so `logs-cluster-all` starts the same forwards while tailing cluster logs. For logs only without forwards, use `pnpm nx run platforms-postgresql:cluster:logs:all` or `EVENTIVA_CLUSTER_PORT_FORWARD=0`.

To hit Postgres from your host (optional, e.g. `psql` or GUI clients):

```bash
kubectl port-forward -n postgres svc/postgres 5432:5432
# then PGHOST=127.0.0.1 PGPORT=5432 PGUSER=postgres PGPASSWORD=postgres psql -d postgres
```

## Regression gate for PostgreSQL platform

The regression gate is:

- `scripts/pg-e2e-via-nx.mjs`

Run it with:

```bash
node scripts/pg-e2e-via-nx.mjs
```

or through Nx:

```bash
pnpm nx run platforms-postgresql:verify-pg-e2e
```

By default this boots `platforms-postgresql:run` (cluster apply + log follow) and validates REST and RPC CRUD.

**Against a cluster that is already running** (with port-forward in place), skip starting Nx and point checks at localhost:

```bash
kubectl port-forward -n eventiva-workload deployment/eventiva-workload 3000:3000   # terminal 1
PG_E2E_SKIP_PLATFORM_START=1 SKIP_PSQL=1 node scripts/pg-e2e-via-nx.mjs               # terminal 2
```

Use `SKIP_PSQL=1` unless you have forwarded Postgres to localhost and want the script’s `psql` checks. Override `EVENTIVA_HTTP_PORT` if the workload uses a non-default port.

## Hooks and transforms guidance

Hooks and transforms should be treated as cluster-oriented execution concerns:

- write logic so it works with entity calls that may traverse cluster transport boundaries
- avoid assumptions that execution is local-only or in-memory-only
- keep payloads and side effects explicit so behavior remains stable across runner/shard boundaries

For architecture context on cluster and runtime composition, see:

- `docs/learnings/architecture.md`
