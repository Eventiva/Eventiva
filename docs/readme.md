---
revnumber: "1.7"
revdate: "2026-04-03"
revremark: "Kafka hook dispatch part: hooks-kafka-demo extension, platform bootstrap layer, log grep."
---

# Eventiva documentation hub

This folder holds **Markdown** guides and reusable **parts** for day-to-day work. Long-lived architecture and convention decisions stay in **[`docs/learnings/README.md`](learnings/README.md)**—use that index rather than copying those decisions here.

## Audience

- Contributors running or extending the monorepo.
- Readers who need step-by-step procedures without assuming prior Eventiva knowledge.

## Table of contents

### Procedural parts (`docs/parts/`)

| Topic | Document |
| ----- | -------- |
| Local dev: Postgres vs SQLite, env vars, postgresql vs sqlite-demo platform | [`parts/local-dev/database-backends-and-platforms.md`](parts/local-dev/database-backends-and-platforms.md) |
| Local runtime in cluster mode: start, lifecycle targets, manifests, and regression gate | [`parts/local-dev/postgresql-cluster-runtime.md`](parts/local-dev/postgresql-cluster-runtime.md) |
| Cluster hook fan-out (Kafka): topic, consumer groups, FPK dev broker, demo extension (`hooks-kafka-demo`), TLS/ACLs/retention, fallbacks | [`parts/local-dev/kafka-hook-dispatch.md`](parts/local-dev/kafka-hook-dispatch.md) |
| Strimzi Kafka: FPK vendor/apply pattern for staging–prod (no ad-hoc kubectl as primary) | [`parts/local-dev/kafka-strimzi-fpk-pattern.md`](parts/local-dev/kafka-strimzi-fpk-pattern.md) |
| Effect cluster SQL tables (`cluster_*`), sharding parity, optional participant registry | [`parts/local-dev/effect-cluster-sql-tables.md`](parts/local-dev/effect-cluster-sql-tables.md) |
| Hooks and transforms (cluster demo): glossary, registries, platform wiring, demo extensions | [`parts/backend/hooks-and-transforms-battleship.md`](parts/backend/hooks-and-transforms-battleship.md) |
| Contact REST + RPC curl examples (default HTTP **3000**, override with `EVENTIVA_HTTP_PORT`) | [`testing-entity-http-endpoints.md`](testing-entity-http-endpoints.md) |

### Learnings (architecture and conventions)

- **[`learnings/README.md`](learnings/README.md)** — Index of themed learnings.
- **[`learnings/module-boundaries.md`](learnings/module-boundaries.md)** — Nx tags, which packages may depend on which, ESLint enforcement (use this instead of restating the matrix in how-to guides).

### Other material under `docs/`

Plans, drafts, and legacy notes may appear alongside this hub. Prefer this **readme** and **`docs/parts/`** for maintained procedures; follow links into **`docs/learnings/`** for design rationale.

## How this hub relates to repository roots

- **`README.adoc`** at the repo root remains the AsciiDoc-oriented project overview (see learnings on docs workflow if you change publishing).
- **`docs/readme.md`** (this file) is the entry point for Markdown under **`docs/`**.
