# Strimzi Kafka in FPK (staging / production)

Strimzi installs **CustomResourceDefinitions** and an **operator** that reconciles `Kafka`, `KafkaTopic`, `KafkaUser`, and related CRs. `@fpk/k8s` helpers in this repo target core workload types (Deployment, Service, Job, …); they do **not** ship first-class constructors for Strimzi CRs.

## Approved pattern (still “FPK-only” apply)

1. **Vendor upstream YAML** (pinned operator version) into `tools/cluster/src/strimzi-operator/` (or similar) as one or more files, or as small TypeScript objects that match the CR shape if the `fpk` CLI accepts plain JSON/YAML objects.
2. **Export** them from `index.ts` using the same `default export` + `withNamespace` / resource pattern used elsewhere, or use **`resource()`** from `@fpk/k8s` if you add thin wrappers for `Kafka.strimzi.io/v1beta2` resources (verify against your Strimzi version).
3. **Render** with `node scripts/cluster/render-fpk-cluster.mjs` → `tools/cluster/out/strimzi-operator/` (and sibling modules for `Kafka`, `KafkaTopic`, `KafkaUser`).
4. **Apply** only via `scripts/cluster/apply-fpk-cluster.mjs` or Nx `cluster:apply` — **not** ad-hoc `kubectl apply -f https://…` as the primary install path in docs.

## What to check in reviews

- Operator install order: CRDs + RBAC + operator Deployment before `Kafka` CR.
- **TLS** listeners for clients; inter-broker TLS matches your network policy.
- **KafkaTopic** for `eventiva.hook.dispatch`: partitions, replication factor, `retention.ms` / `retention.bytes` per environment (see [Kafka hook dispatch](./kafka-hook-dispatch.md)).
- **KafkaUser** + **ACLs** (or Strimzi-managed ACLs) aligned with [kafka-hook-dispatch.md](./kafka-hook-dispatch.md) § ACLs.

## Local dev

The default Eventiva dev stack uses **Redpanda** in [`tools/cluster/src/kafka`](../../../tools/cluster/src/kafka/index.ts) to avoid running the full Strimzi operator on constrained machines. Keep Strimzi manifests **shape-compatible** where practical so staging/prod topic and listener settings map cleanly to dev.
