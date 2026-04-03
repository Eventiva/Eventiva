# Hooks and transforms (cluster demo)

If you have ever wanted extension code to run at “the right moment” without hard-coding every call site, this page describes what Eventiva ships today for the cluster runner demo: named **hooks** for lifecycle and RPC edges, and **transforms** that rewrite RPC payloads with an audit trail. The names echo older extension-hook ideas; the wiring is Effect `Layer`s and registries in `@eventiva/core`.

## Glossary

| Term | Meaning |
| ---- | ------- |
| **HookScope** | Where a hook is registered so the runtime can match dispatch. Shipped variants: `runner` (whole runner), `entityType` (cluster entity type string), `singleton` (singleton address name), `rpc` (RPC name such as `Shoot`). |
| **HookPhase** | When a hook runs. Shipped values include `onLoad`, `onRegister`, `beforeCall`, `afterCall`, `onShutdown`; the type allows additional string phases for forward compatibility. |
| **Registration stream vs RPC path** | **Registration stream**: `@effect/cluster` `Sharding.getRegistrationEvents` is consumed by `shardingRegistrationHooksLayer`, which runs **`onRegister`** hooks when entities or singletons register—scoped by `entityType` or `singleton`. **RPC path**: entity RPC handlers (for example the demo `Shoot` handler) call **`beforeCall`** / **`afterCall`** on the `rpc` scope for that RPC name, independent of registration. |
| **TransformContext** | Mutable wrapper around an RPC payload: `original` (immutable snapshot), `current` (working value), and `steps` (audit rows). Built with `emptyTransformContext` from `@eventiva/core`. |
| **TransformStep** | One audit row: which extension and transform ran, a shallow `path` string, and `before` / `after` snapshots for that step. Append with `appendTransformStep`. |
| **MVP same-runner execution** | Hooks and transforms run **in the same process and Layer stack** as the demo entity code that handles the RPC. Registration order in the registries determines handler order. |
| **Future distributed** | A later design may run hooks or transforms across nodes or transports; today’s code should keep payloads explicit and avoid assuming a single address space. See [architecture](../../learnings/architecture.md) for composition context. |

## What `@eventiva/core` provides

- **`HookRegistry`**: `register(scope, phase, handler)` and `run(scope, phase, payload)`. Matching uses `hookScopeEquals` so only the intended scope receives the event.
- **`TransformRegistry`**: `registerPre` / `registerPost` per RPC name (`string` match, e.g. `"Shoot"`), `runPre` / `runPost` that fold transforms in registration order.
- **`HookRegistryLive` / `TransformRegistryLive`**: scoped Layers that provide the registries.
- **`shardingRegistrationHooksLayer`**: requires `HookRegistry` and `Sharding`; subscribes to registration events and dispatches **`onRegister`** with the appropriate scope.
- **`runnerOnLoadHooksLayer`**: runs **`onLoad`** once for scope `{ _tag: "runner" }` when the runner stack starts (after `HookRegistry` is available).
- **`PlatformContext.extensionLayers`**: optional `Layer` merged **before** demo RPC entities in the runner; typically `Effect.Service` `.Default` layers merged with `Layer.mergeAll`. See [`platform-context.ts`](../../../packages/core/src/platform/platform-context.ts) in the repo.

## Runner stack order (`primary` / `runner` mode)

The cluster runner builds a Layer stack similar to:

1. `HookRegistryLive`, `TransformRegistryLive`
2. **`extensionLayers`** from the platform (copyright + example-transform demos)
3. `shardingRegistrationHooksLayer`, `runnerOnLoadHooksLayer`
4. `DemoEntity` layer (RPC handlers)

RPC **`Shoot`** runs: **`beforeCall`** hooks → **pre-transforms** → handler body → **post-transforms** → **`afterCall`** hooks. Transforms receive a `TransformContext` and may append `TransformStep` rows for logging or auditing.

## Platform wiring (PostgreSQL and MySQL)

Both **`packages/platforms/postgresql`** and **`packages/platforms/mysql`** define **`extensionLayers`** in **`platform.ts`** (for example with `EVENTIVA_CLUSTER_EXTENSIONS=all`):

- **`CopyrightNoticeExtension.Default`** — registers **`onLoad`** (runner scope) to log wordart and copyright via `HookRegistry`.
- **`ExampleTransformExtension.Default`** — registers a **pre** transform on RPC **`Shoot`** that adjusts `target` and records a `TransformStep`.
- **`HooksKafkaDemoRegistrationExtension.Default`** — registers runner-scoped hooks for the Kafka hook-bus demo (see [kafka-hook-dispatch](../local-dev/kafka-hook-dispatch.md)).

**Cluster app entry order** (each entry checks `CLUSTER_APP_MODE` and no-ops when the mode does not apply):

1. `makeCopyrightNoticeEntry`
2. `makeExampleTransformEntry`
3. `makeRunnerEntry` (merges the stack above and launches the runner)
4. Shooter entries (`makeShooterEntry`, `makeSpeedShooterEntry`, `makeSlowShooterEntry`)

The copyright and example-transform **entries** are no-ops beyond mode checks; their behavior lives in the **`Effect.Service`** layers merged through `PlatformContext.extensionLayers`.

## Demo packages

| Package | Role |
| ------- | ---- |
| `@eventiva/extensions.copyright-notice` | Exports `CopyrightNoticeExtension`, `makeCopyrightNoticeEntry`, and wordart/copyright constants. |
| `@eventiva/extensions.example-transform` | Exports `ExampleTransformExtension`, `makeExampleTransformEntry`; demonstrates `registerPre` on `Shoot`. |
| `@eventiva/extensions.runner` | Builds the cluster runner stack, including hook/transform wiring around `Shoot`. |

## Module boundaries and tests

- **Package dependencies and tags** (what may depend on what) are defined in [module boundaries](../../learnings/module-boundaries.md); follow Nx tags and ESLint rules when adding extensions or core hooks.
- **TDD policy** (who writes tests, and that implementers do not add tests in the same change) is in [TDD and test creation](../../learnings/tdd-and-test-creation.md).

## Optional: validate the cluster before deep debugging

When the local Kind (or equivalent) cluster is healthy and you want to confirm rollouts finished before tailing logs or hitting port-forwards, run the wait target for your platform, for example:

```bash
pnpm nx run platforms-postgresql:cluster:wait
```

or for MySQL:

```bash
pnpm nx run platforms-mysql:cluster:wait
```

The root script `pnpm cluster:wait` runs the PostgreSQL platform’s wait target. Broader lifecycle and HTTP port-forward notes live in [PostgreSQL cluster runtime (local)](../local-dev/postgresql-cluster-runtime.md).
