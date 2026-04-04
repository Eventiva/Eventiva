# Compose stack (PostgreSQL cluster demo)

- **File:** `docker-compose.postgresql.yaml` — Postgres, Redpanda, shard-manager, battleships, shooters.
- **Build images first:** `pnpm exec nx run cluster-tooling:build-local-images`
- **Nx:** `cluster-tooling:compose-up`, `compose-down`, `compose-logs`, `compose-verify-demo-logs`

See [docs/parts/local-dev/three-tier-platform-runtime.md](../../docs/parts/local-dev/three-tier-platform-runtime.md).
