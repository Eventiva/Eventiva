# Three-tier platform runtime (local / Compose / Kubernetes)

Optional metadata: set `EVENTIVA_RUNTIME_TIER` to `local`, `compose`, or `kubernetes` for documentation and tooling alignment (see `@eventiva/core` `runtimeTierConfig`). For the PostgreSQL platform entry, **distributed vs in-process cluster** is selected with **`EVENTIVA_CLUSTER_INFRASTRUCTURE`** (`distributed` default, or `local`); `EVENTIVA_RUNTIME_TIER` remains informational unless tooling reads it.

**Prerequisites and install links:** see the repository root [`README.md`](../../../README.md) for Node.js, [pnpm](https://pnpm.io/installation) / [Corepack](https://nodejs.org/api/corepack.html), [Docker](https://docs.docker.com/get-docker/) + [Compose](https://docs.docker.com/compose/install/), [Podman](https://podman.io/getting-started/installation) + [Podman Compose](https://docs.podman.io/en/latest/markdown/podman-compose.1.html), [kubectl](https://kubernetes.io/docs/tasks/tools/), and [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/). Canonical **`pnpm platform:*`** aliases are listed there and wired to Nx targets on the root `eventiva` project.

## When to use which tier

| Tier | Audience | Prerequisites |
| --- | --- | --- |
| **Local** | Individuals, smallest setup, no container orchestrator | Node.js, pnpm; cold starts on slow disks can take tens of seconds while dependencies load. |
| **Docker Compose** | Medium setups, developers who want multi-process parity without Kubernetes | Docker or Podman with `docker compose` (or compatible); build `docker.io/eventiva/runtime:local` first. |
| **Kubernetes** | Production-like distribution, Strimzi/Kafka patterns, scale | `kubectl`, cluster (e.g. Kind on Podman), local images or registry. |

## Tier 1 — Local (single process, in-memory cluster storage)

Runs the Effect cluster **battleship** demo in **one OS process**: in-memory `@effect/cluster` storage (`NodeClusterSocket` `storage: "local"`), all shooter loops colocated, `CLUSTER_HOOK_BUS=off` (no Kafka). Child fibers are supervised via `Supervisor.track` around `Layer.launch` (same file as distributed mode: `packages/platforms/postgresql/src/platform.ts`, branch `EVENTIVA_CLUSTER_INFRASTRUCTURE=local`).

**Commands**

```bash
pnpm install
pnpm nx run platforms-postgresql:build
pnpm nx run platforms-postgresql:run:local-fiber
```

**Env (optional)**

- `EVENTIVA_CLUSTER_INFRASTRUCTURE=local` — set by `platforms-postgresql:run:local-fiber`; omit or `distributed` for SQL-backed cluster (`platforms-postgresql:run-local` / k8s images).
- `EVENTIVA_LOCAL_CLUSTER_PORT` — runner listen port (default `34431`).
- `SHARDS_PER_GROUP` — must stay consistent if you ever mix with other tiers (default `2`).
- `CLUSTER_HOOK_BUS` — must stay `off` for local infrastructure (Kafka stack is not wired there).

**Regression log patterns** (substring match; Effect may add levels/timestamps):

- `Boom!` — runner entity
- `Shooting at` — shooter / slow-shooter
- `Shot at` — slow-shooter (after each delayed shot; can take **~20s** per ship batch)
- `Shots fired:` — speed-shooter periodic summary

## Tier 2 — Docker Compose (PostgreSQL stack)

Mirrors the FPK **postgresql** stack: Postgres, Redpanda (Kafka API), shard-manager, `battleships` (runner `CLUSTER_APP_MODE=primary`), shooter, speed-shooter, slow-shooter. Service DNS replaces Kubernetes `*.svc` names (e.g. `SHARD_MANAGER_HOST=shard-manager`).

**Prerequisites**

```bash
pnpm nx run platforms-postgresql:build
pnpm exec nx run cluster-tooling:build-local-images
```

**Lifecycle**

```bash
pnpm exec nx run cluster-tooling:compose-up
pnpm exec nx run cluster-tooling:compose-logs
pnpm exec nx run cluster-tooling:compose-down
```

Compose file: `packages/cluster-compose/docker-compose.postgresql.yaml`. Use `docker compose` or Podman’s compatible CLI; set `COMPOSE_PROJECT_NAME=eventiva-pg` if you invoke compose manually (Nx targets already pass `--project-name eventiva-pg`).

**Verify demo logs (after workloads have run ~1–2 minutes)**

```bash
pnpm exec nx run cluster-tooling:compose-verify-demo-logs
```

This Nx target runs `sh -c '… | …'` (POSIX shell). On Windows, use Git Bash or WSL for that target, or run `docker compose … logs` and pipe manually into `pnpm exec tsx packages/cluster-tooling/cli/verify-cluster-demo-logs.ts`.

For slow-shooter, allow **at least ~25s** after startup before expecting `Shot at` in aggregated logs.

## Tier 3 — Kubernetes (FPK)

Uses `packages/cluster-tooling/fpk` manifests and existing Nx targets (`platforms-postgresql:cluster:*`). See [postgresql-cluster-runtime.md](./postgresql-cluster-runtime.md) and [local-cluster-ci.md](./local-cluster-ci.md).

**Logs**

```bash
pnpm cluster:logs:all
```

**Verify** — capture logs to a file or pipe:

```bash
pnpm cluster:logs:all 2>&1 | tee /tmp/k8s-cluster.log
# after sufficient runtime:
pnpm exec tsx packages/cluster-tooling/cli/verify-cluster-demo-logs.ts /tmp/k8s-cluster.log
```

## Hooks and `Sharding` (local tier)

`shardingRegistrationHooksLayer` is merged in the same order as the SQL runner path; with `storage: "local"`, `Sharding.getRegistrationEvents` still drives `onRegister` hooks for entity/singleton registrations. Kafka hook bus dispatches are **not** started in the local colocated entry (`CLUSTER_HOOK_BUS=off`).

## Implementation references

- Local layers: `packages/core/src/cluster/local-socket-layers.ts` (`makeClusterLocalRunnerLayer`, `makeClusterLocalClientLayer`).
- Single platform entry: `packages/platforms/postgresql/src/platform.ts` (`EVENTIVA_CLUSTER_INFRASTRUCTURE` switches `distributed` vs `local`).
- Compose: `packages/cluster-compose/docker-compose.postgresql.yaml`.
- Nx: `cluster-tooling:compose-*`, `platforms-postgresql:run:local-fiber`.
