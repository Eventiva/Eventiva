# Local full-cluster CI (E2E parity)

Until GitHub Actions can provision a Kubernetes cluster and run the same checks, use this **single local entrypoint** to mirror the intended full CI job.

## Prerequisites

- A reachable `kubectl` context (Kind, k3d, Podman machine, cloud dev cluster, etc.).
- **Podman** or **Docker** for building runtime images (`pnpm exec nx run cluster-tooling:build-local-images` or `packages/cluster-tooling/cli/build-local-images.ts`).
- **pnpm** and workspace dependencies installed (`pnpm install`).

## Command

```bash
pnpm local-ci:cluster
```

Equivalent Nx target:

```bash
pnpm nx run eventiva:local-ci:cluster
```

## What it does

1. Runs `platforms-postgresql:cluster:wait` (which chains render → build images → apply manifests → wait for rollouts), unless `LOCAL_CI_SKIP_CLUSTER=1` (cluster already deployed).
2. Starts `packages/cluster-tooling/cli/port-forward-fpk-cluster.ts` with `EVENTIVA_PF_KAFKA=1` so Postgres, workload HTTP, runner RPC, and Redpanda are forwarded to localhost.
3. Runs **`nx run-many -t test:e2e --all --exclude=eventiva`** with `EVENTIVA_CLUSTER_E2E=1` and `PG_E2E_SKIP_PLATFORM_START=1` (aggregate `tests-cluster-e2e` plus each `tests/**` mirror package; API reached via port-forward). Same post-wait assumption as `nx run platforms-postgresql:run` after `cluster:wait`; this pipeline substitutes port-forward + Vitest for log streaming.

## Environment notes

- `SKIP_PSQL=1` avoids `psql` checks if Postgres is not forwarded to localhost or `psql` is not installed.
- Tune `EVENTIVA_HTTP_PORT`, `EVENTIVA_CLUSTER_RUNNER_RPC_PORT`, and `EVENTIVA_PF_*` to match your port-forward script.

## Docker Compose parity (optional)

For the same demo workloads **without** Kubernetes, build `docker.io/eventiva/runtime:local` and use `pnpm exec nx run cluster-tooling:compose-up` (see [three-tier-platform-runtime.md](./three-tier-platform-runtime.md)). You can validate demo log substrings with `cluster-tooling:compose-verify-demo-logs` after the stack has run briefly.

## Future GitHub Actions

When CI infrastructure exists, duplicate this sequence in a workflow job (cluster setup → same Nx commands and env). No redesign required.
