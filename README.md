# Eventiva — developer guide (PostgreSQL cluster platform)

This repository’s primary **AsciiDoc** overview is [`README.adoc`](./README.adoc) (product context, contributing, Codespaces). **This file** is the Markdown entry for **tooling prerequisites** and the **three supported ways** to run the packaged **Effect cluster / battleship demo** (`packages/platforms/postgresql` entry).

Deeper procedures (env vars, log regression checks, CI) live in the docs hub: [`docs/readme.md`](./docs/readme.md) and [`docs/parts/local-dev/three-tier-platform-runtime.md`](./docs/parts/local-dev/three-tier-platform-runtime.md).

---

## Prerequisites (install once)

### Node.js and pnpm (required for all local commands)

1. **Node.js** — use an **LTS** version (see [Node.js download](https://nodejs.org/en/download)). The repo expects a modern LTS (see `.nvmrc` / CI if present).
2. **pnpm** — this repo pins **`packageManager`** in `package.json`. Install pnpm per [pnpm installation](https://pnpm.io/installation) (recommended: enable [Corepack](https://nodejs.org/api/corepack.html), which ships with Node.js: `corepack enable` then `corepack prepare pnpm@9.14.2 --activate` or match the version in `package.json`).
3. **Workspace dependencies** — from the repo root:
   ```bash
   pnpm install
   ```

### Container engines (for Docker Compose or standalone `docker run` / `podman run`)

- **Docker Engine + Docker Compose V2** — [Get Docker](https://docs.docker.com/get-docker/), [Compose install](https://docs.docker.com/compose/install/) (Compose is often bundled as the `docker compose` plugin).
- **Podman** — [Podman installation](https://podman.io/getting-started/installation) (Linux packages, macOS installer, etc.). For Compose-like workflows, use [Podman Compose](https://docs.podman.io/en/latest/markdown/podman-compose.1.html) or `podman compose` where your Podman build supports it.

This repo’s Compose stack for the PostgreSQL cluster demo is documented in [`packages/cluster-compose/README.md`](./packages/cluster-compose/README.md) (file: `packages/cluster-compose/docker-compose.postgresql.yaml`).

### Kubernetes (local or remote)

- **kubectl** — [Install kubectl](https://kubernetes.io/docs/tasks/tools/).
- **Kind** (Kubernetes in Docker/Podman) — common for local clusters: [Kind quick start](https://kind.sigs.k8s.io/docs/user/quick-start/). Alternative: minikube, k3d, etc.

Cluster-specific steps (FPK render/apply, wait, logs) are in [`docs/parts/local-dev/postgresql-cluster-runtime.md`](./docs/parts/local-dev/postgresql-cluster-runtime.md).

---

## Three ways to run the platform (demo)

| Mode | What it is | Root npm scripts | Nx (same effect) |
| --- | --- | --- | --- |
| **1 — Local (Node)** | Single process on your machine: either **in-memory** cluster (`EVENTIVA_CLUSTER_INFRASTRUCTURE=local`) or **PostgreSQL on localhost**. | See below | `pnpm exec nx run eventiva:platform:…` (see `project.json`) |
| **2 — Container (Compose)** | Multi-service stack (Postgres, Redpanda, shard-manager, workloads) via **Docker Compose** / Podman Compose — **not** Kubernetes. | `pnpm platform:container:compose-up` | `nx run eventiva:platform:container:compose-up` |
| **3 — Kubernetes** | FPK manifests applied with `kubectl` (e.g. Kind). | `pnpm platform:kubernetes:apply` then `pnpm platform:kubernetes:wait` | `nx run eventiva:platform:kubernetes:apply` |

### 1a — Local, in-memory cluster (no Postgres)

Uses `CLUSTER_HOOK_BUS=off` and colocated shooters (no Kafka hook bus).

```bash
pnpm platform:run:local-fiber
# equivalent: pnpm exec nx run platforms-postgresql:run:local-fiber
```

### 1b — Local, distributed mode against PostgreSQL on `localhost`

Requires Postgres listening on **`localhost:5432`** with DB/user/password matching the target (see `platforms-postgresql:run-local` env in `packages/platforms/postgresql/project.json`). Hook bus is off for this dev preset (`CLUSTER_HOOK_BUS=off`).

```bash
pnpm platform:run:local
# equivalent: pnpm exec nx run platforms-postgresql:run-local
```

### 2 — Docker Compose (container stack, not Kubernetes)

Build the runtime image(s), then bring up the stack:

```bash
pnpm platform:container:images-build
pnpm platform:container:compose-up
# logs: pnpm platform:container:compose-logs
# down: pnpm platform:container:compose-down
```

Verify demo log patterns when workloads have warmed up:

```bash
pnpm cluster:compose:verify-demo-logs
```

### 2b — Standalone runtime image (Podman or Docker, no Compose)

After `pnpm platform:container:images-build`, the image is tagged **`docker.io/eventiva/runtime:local`**. You can run it directly (example: **local** infrastructure, no Kubernetes):

```bash
podman run --rm \
  -e NODE_ENV=development \
  -e CLUSTER_HOOK_BUS=off \
  -e EVENTIVA_CLUSTER_INFRASTRUCTURE=local \
  -e EVENTIVA_RUNTIME_TIER=local \
  docker.io/eventiva/runtime:local
```

For **distributed** mode against Postgres on the host, use host networking and DB env vars (see `docs/parts/local-dev/three-tier-platform-runtime.md`).

### 3 — Kubernetes (FPK)

```bash
pnpm platform:kubernetes:images-build   # or reuse pnpm platform:container:images-build
pnpm platform:kubernetes:apply
pnpm platform:kubernetes:wait
pnpm cluster:logs:all
```

See [`docs/parts/local-dev/postgresql-cluster-runtime.md`](./docs/parts/local-dev/postgresql-cluster-runtime.md) for Kind image load, namespaces, and troubleshooting.

---

## Regression signals (demo)

Aggregated logs should eventually contain substrings such as `Boom!`, `Shooting at`, `Shot at`, and `Shots fired:` (see the three-tier doc for details). Allow extra time for slow-shooter (`Shot at` is delayed).

---

## Related documentation

- [`docs/readme.md`](./docs/readme.md) — documentation hub  
- [`docs/parts/local-dev/three-tier-platform-runtime.md`](./docs/parts/local-dev/three-tier-platform-runtime.md) — full tier-by-tier reference  
- [`README.adoc`](./README.adoc) — repository overview (AsciiDoc)
