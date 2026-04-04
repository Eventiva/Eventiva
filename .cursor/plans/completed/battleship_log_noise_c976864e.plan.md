---
name: Battleship log noise
overview: "\"Boom!\" is emitted once per successful `Shoot` RPC on the demo entity runner. Noise is dominated by the speed-shooter’s high-concurrency loop and, at the infrastructure layer, by Effect Cluster’s default of **300 shards per group** (configurable via env). You can enrich logs from the RPC envelope, cap shooter iterations via config/env, and lower `SHARDS_PER_GROUP` for local dev (consistently on every cluster process)."
todos:
  - id: enrich-boom-log
    content: Replace bare Effect.log("Boom!") in packages/extensions/runner/src/runner.ts with structured fields from envelope (tag, requestId, address, trace ids) + final target
    status: completed
  - id: shooter-limits
    content: Add Config/env max shots + optional tuning (speed-shooter concurrency/client count); wire vars in cluster-fpk shooter manifests and .env.example
    status: completed
  - id: shards-per-group-dev
    content: Document SHARDS_PER_GROUP; optionally set low value (e.g. 2) in FPK concatEnv for battleships, shard-manager, shooters for local dev with consistency warning
    status: completed
isProject: false
---

# Reduce battleship noise, enrich Boom!, tune shards

## Where `Boom!` comes from

The log is **not** in the Kubernetes “battleships” manifest; it is emitted on the **entity host** when the `Shoot` RPC runs:

```43:58:packages/extensions/runner/src/runner.ts
        yield* withSpanAndLog("DemoEntity.Shoot", {
          attributes: {
            address: String(address),
            target: payload.target,
            transformSteps: tctx.steps.length,
          },
        })(
          Effect.gen(function* () {
            if (tctx.steps.length > 0) {
              yield* Effect.logInfo("Shoot transform pipeline", {
                finalTarget: payload.target,
                steps: tctx.steps,
              })
            }
            yield* Effect.log("Boom!")
          }),
        )
```

So **every** completed `Shoot` produces one `Boom!`. Volume is driven by **clients**:


| Client        | File                                                                                                             | Why it is loud                                                                                                                                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Speed shooter | [packages/extensions/speed-shooter/src/speed-shooter.ts](packages/extensions/speed-shooter/src/speed-shooter.ts) | Pre-builds **500** `DemoEntity` clients (`ship-0`…`ship-499`), runs up to **30** concurrent `Shoot` calls in a tight loop — this alone can mean **tens–hundreds of `Shoot`s per second** → same order of `Boom!` lines. |
| Basic shooter | [packages/extensions/shooter/src/shooter.ts](packages/extensions/shooter/src/shooter.ts)                         | Infinite loop, **1s** between shots — moderate noise (× pod replicas if you scale shooters).                                                                                                                            |
| Slow shooter  | [packages/extensions/slow-shooter/src/slow-shooter.ts](packages/extensions/slow-shooter/src/slow-shooter.ts)     | Uses `**ShootWithDelay`**, not `Shoot` — different logs (`ShootWithDelay received/done`), not `Boom!`.                                                                                                                  |


The **battleships** deployment ([packages/cluster-fpk/src/battleships/index.ts](packages/cluster-fpk/src/battleships/index.ts)) is `CLUSTER_APP_MODE: primary` with **1 replica**; shooters are separate deployments ([shooter](packages/cluster-fpk/src/shooter/index.ts), [speed-shooter](packages/cluster-fpk/src/speed-shooter/index.ts)), also **1 replica** by default. If multiple shooter workloads are applied, noise adds up.

---

## 1) Richer context on `Boom!` (feasible)

Yes. The `Shoot` handler already receives the full RPC `**envelope`** (`Request<Shoot>`). In `@effect/cluster`, that includes at least:

- `envelope.tag` → RPC name (`"Shoot"`)
- `envelope.requestId` → correlate one invocation
- `envelope.address` → `EntityAddress` (`entityId`, `entityType`, `shardId`)
- `envelope.payload` → e.g. `{ target }` (you already use this after transforms)
- `envelope.traceId` / `envelope.spanId` / `envelope.sampled` → tie to tracing
- `envelope.headers` → optional client metadata **if** callers set headers (not set today by demo shooters)

**Implementation sketch:** replace `Effect.log("Boom!")` with a structured log, e.g. `Effect.logInfo("Boom!", { rpc: envelope.tag, requestId: String(envelope.requestId), entityAddress: envelope.address, target: payload.target, traceId: envelope.traceId, … })`, and keep or drop the human string. The existing `withSpanAndLog("DemoEntity.Shoot", …)` already adds span attributes; structured log avoids duplicate “mystery” lines.

**Caveat:** “Which pod sent this?” is usually **not** on the envelope unless you add **custom headers** from shooter code when calling the client API (worth a follow-up if you need caller identity in logs).

---

## 2) Limit shots during dev / testing

Reasonable approaches (can combine):

**A. Env-driven cap (recommended for cluster manifests)**  

- Add something like `DEMO_MAX_SHOOTS` / `SHOOTER_MAX_SHOTS` (integer, default “unlimited”) read via `Config` in shooter programs.
- In [shooter.ts](packages/extensions/shooter/src/shooter.ts): replace `while (true)` with a counted loop or `Effect.repeat` with `Schedule.recurs(n)` when configured.
- In [speed-shooter.ts](packages/extensions/speed-shooter/src/speed-shooter.ts): same cap on total forks or a global counter; optionally **lower** default concurrency (`Semaphore(30)`), **fewer** pre-created clients (`500`), and/or **longer** pacing for local clusters.

**B. Wire env in FPK**  

- Add the new var(s) to `K.concatEnv` in [packages/cluster-fpk/src/shooter/index.ts](packages/cluster-fpk/src/shooter/index.ts) and [packages/cluster-fpk/src/speed-shooter/index.ts](packages/cluster-fpk/src/speed-shooter/index.ts) (and MySQL variants if you use them), and document in [.env.example](.env.example).

**C. Log level**  

- Downgrade or remove the bare `Boom!` and rely on `logInfo` + traces — reduces terminal clutter without changing shot rate (good for observability, less for load).

---

## 3) How many “shards” exist, and reducing them for dev

**Effect Cluster default:** `shardsPerGroup` defaults to **300** in `@effect/cluster`’s `ShardingConfig` ([effect/packages/cluster/src/ShardingConfig.ts](file:///run/media/tgtgamer/Dev/effect/packages/cluster/src/ShardingConfig.ts)). It is loaded from the environment via `ShardingConfig.layerFromEnv` (used by `NodeClusterSocket.layer` in [effect/packages/platform-node/src/NodeClusterSocket.ts](file:///run/media/tgtgamer/Dev/effect/packages/platform-node/src/NodeClusterSocket.ts)).

**Env name:** `SHARDS_PER_GROUP` (Config provider uses constant case; value must be an **integer**).

**Important constraints:**

- `**shardsPerGroup` must be the same on every process** that participates in the same cluster storage (battleships **primary**, any **runner** workloads, **shard-manager**, and **client** pods if they embed the same config). Mismatch causes incorrect routing/assignment behavior.
- Lowering shards is a **good dev ergonomics** move (fewer shard rows/locks, less assignment churn). It does **not** directly divide `Boom!` count 1:1 — shot volume is still mostly shooter loops — but it simplifies local cluster behavior.
- If you change this against an **existing** SQL-backed cluster state, you may need a **fresh DB** or documented migration; treat it like changing topology.

**Kubernetes replicas vs shards:**  

- **Replicas** (`K.setReplicas(1)` on battleships/shooters) = pod count.  
- **Shards** = logical partitions for entity assignment (default 300 per shard group), not the same as “500 ships” in speed-shooter (those are **entity ids** routed **onto** shards).

To use e.g. **2** shards locally: set `SHARDS_PER_GROUP=2` on **all** relevant deployments’ env (battleships, shard-manager, shooters, etc.).

---

## Suggested implementation order

1. **Quick win:** Structured `Boom!` (or replace with one `logInfo` carrying envelope + payload metadata).
2. **Largest noise cut:** Tune speed-shooter defaults and/or add `SHOOTER_MAX_SHOTS` + FPK env.
3. **Dev cluster hygiene:** Document and set `SHARDS_PER_GROUP=2` (or similar) consistently across FPK manifests for local renders.

No new tests are required by your workspace strict rule for implementers if you only change implementation; the test-creator can add coverage later. If you adopt the relaxed “may update tests” policy, add Vitest cases for capped shooter behavior behind config.