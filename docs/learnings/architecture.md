# Architecture Learnings

## Backend composition

### Gateway and servers

- **Gateway** – Single entry point; runs on a configurable port (e.g. 5000–5010). Proxies to backend services. See `projects/backend/gateway/gateway-types.ts`: `Gateway` interface with `run(context: GatewayContext)`.
- **Backend servers** – Each server is a separate service (GraphQL, REST, etc.) with its own port. Gateway aggregates them. See `projects/backend/server/server-types.ts`: `Server`, `BackendContext` with `name`, `port`, `routes`, `gql`, `middlewares`, `parsers`.

### Slot pattern

- **BackendSlot** – Registers multiple `BackendServerDefinition[]`. Platform collects all backends from the slot and runs them. See `platform.node.runtime.ts`: `backendSlot.register(backends)`, `listBackendServers()`.
- **PlatformDeployerSlot** – Registers deployers (e.g. Terraform/CDK). Used in `deploy()` to deploy each runtime. See `platformDeployer.flatValues()`, `registerDeployers(deployers)`.

### Platform runtime

- **PlatformNode** – Main runtime. Holds `BackendSlot`, `PlatformDeployerSlot`, gateway, default server. Actions: `run` (default: run services), `run service`, `run gateway`, `deploy`. See `projects/backend/platform/platform.node.runtime.ts`.
- **runServices()** – Gets a port for the gateway, runs all backend servers via `runBackendServers()`, passes them to `gateway.run()`, returns `{ port, stop }`.
- **runService(name, port)** – Runs a single backend by name; builds `BackendContext` from server definition and calls `server.run(context)`.

### Context-driven assembly

- **BackendContext** – `name`, `port`, `routes`, `gql` (GraphQL schema), `parsers`, `middlewares`, `middlewaresPostRouting`. Servers receive this and return an `ApplicationInstance` (e.g. Express app).
- **GatewayContext** – `port`, `services` (array of `ApplicationInstance`), optional `cors`.

## Key files

| Path                                                 | Purpose                                                                                   |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `projects/backend/platform/platform.node.runtime.ts` | PlatformNode, slots, run/deploy                                                           |
| `projects/platforms/default/default.bit-app.ts`      | Aspect list: DatabaseAspect, GraphqlAspect, RestAspect (LoggerAspect, etc. commented out) |
| `projects/backend/server/server-types.ts`            | Server, BackendContext, DeployOptions                                                     |
| `projects/backend/gateway/gateway-types.ts`          | Gateway, GatewayContext                                                                   |

## Rebuild requirements

- Replace Bit Aspect/Slot with **Effect Layer/Service**. One Layer per “backend server” or gateway; composition via Layer merge.
- Cluster: use **@effect/cluster** for sharding, runners, entities so the same architecture can run in a distributed way.
- Keep the split: one gateway, many backends; backends register and are discovered at runtime (or via config).

## Effect cluster extensions (CRM framework)

- **Extensions = entities.** Each extension is one `Entity` (e.g. `Entity.make(type, [ Rpc.make(...) ])`). Registration = `entity.toLayer(handlers)`; composition = merging these layers. One extension = one entity type = one Layer (for independent scaling and sharding).
- **CRUD in core.** Core provides `makeCrudRpc(options)` (RPC definitions) and `makeCrudHandlers(options)` (create, get, update, list, delete logic). Extensions supply: entity type name, id/fields schemas, a store (Ref<Map<Id, StoredRecord>> or equivalent), encode/decode (e.g. for PII at rest), and genId. No hand-written handler bodies in extensions; keep complex logic in core.
- **Extension lifecycle hooks.** Core provides `ExtensionHooks` service (`ExtensionHooksLive` layer): **onLoad** (runner has composed layers), **onRegister** (profile applied with extension ids), **beforeCall** / **afterCall** (per entity RPC). Handlers run via a single workflow-style path (`runHandlersForPayload`); for durable execution add WorkflowEngine + ExtensionHooksWorkflowLayer from core.
- **Layer merge.** Entity layers are merged via `mergeEntityLayers([...])`; no Bit slots. Platform composes Observability + Cluster + merged entity layers.
- **Platform template.** Default platform lives in `packages/platforms/default`: `defaultPlatform(entityLayers)` composes ObservabilityLive + **clusterLayerDefault** (from core cluster config) + ExtensionHooks + merged entity layers. Runner profiles (e.g. `defaultProfile = [HelloWorldLayer]`) name a set of entity layers for one runner process.
- **Workflow engine.** Transform-manager/transforms are represented by a workflow registry (see `workflow/types.ts`, `workflow/engine.ts`): register workflows, execute with payload; in-memory for phase 1, extendable to ClusterWorkflowEngine later. **Central callable:** Extensions that want a workflow to be invocable by name should call `WorkflowRegistry.register(workflow, executeFn)` during layer setup; the default platform provides `WorkflowRegistryLive`. Then any code with `WorkflowRegistry` in context can run `WorkflowRegistry.execute(workflow, { payload })`. Extension hooks use the same workflow definition (`ExtensionHooksWorkflow`); in-process runs `runHandlersForPayload`; for durable runs add `WorkflowEngine` (e.g. `WorkflowEngineLayerInMemory` or ClusterWorkflowEngine) and `ExtensionHooksWorkflowLayer`.
- **Observability priority #1.** Every function in the framework and in extensions must use **Tracer** (span), **Logger** (structured log at entry/exit or key events), and **Metric** (counter, timer, or gauge) where appropriate. Use `withSpanAndLog` from `observability/helpers`; no code path without observability.

### Effect/Cluster and workflow configuration

- **Cluster.** Configuration is centralized in `packages/core/src/cluster/config.ts`: `clusterLayerDefault` = TestRunner.layer (in-memory Sharding + Runner for single-process dev/tests). `ClusterMode` type documents future modes: `"single"` (SingleRunner), `"distributed"` (Sharding + Pods + RunnerStorage). Platforms import `clusterLayerDefault` from `@eventiva/core` so switching to real cluster is a single change.
- **Workflow.** Extension hooks: one implementation (`runHandlersForPayload`); in-process by default. For durable, add from core: `WorkflowEngineLayerInMemory` or ClusterWorkflowEngine and `ExtensionHooksWorkflowLayer`. Generic workflows: `WorkflowRegistry` + `WorkflowRegistryLive` in `workflow/engine.ts`; replace with @effect/workflow ClusterWorkflowEngine when persistence is required.

### Schema registry and createTable flow

- **createTable (databases/pg).** Extensions that contribute table columns call `createTable(tableName, extensionId, columns, extraConfig?)` as an **Effect** during layer build. This validates columns via `testColumns` then registers them with **TableColumnRegistry** (merge per table; duplicate column names fail with **DuplicateColumnError**).
- **markReady.** Each extension in the platform’s `extensions` list must call **TableColumnRegistry.markReady(extensionId)** once, typically in its CORE_LOADED listener (e.g. in the same workflow that publishes `extension/{id}/onLoad`). Idempotent per extension.
- **Finalization.** The platform sets **expectedReadyCount** (e.g. `extensions.length`) before publishing CORE_LOADED. When the number of `markReady` calls matches **expectedReadyCount**, the registry runs **finalization**: for each registered table it calls **SchemaFinalizer.buildTable** (implemented in databases/pg), stores the result in **FinalTableStore**, then completes **waitUntilFinalized**.
- **Startup order.** **runCoreStartup** runs integrity checks → **setExpectedReadyCount** → publish CORE_LOADED (listeners run, extensions call markReady) → **waitUntilFinalized()** → publish EXTENSIONS_LOADED. So schema is finalized before EXTENSIONS_LOADED.
- **Out of scope (follow-up).** drizzle-kit generate/migrate and relationships (FK / relations) consume **FinalTableStore.getAllTables()** later; not part of the initial schema-registry flow.
- **Key paths:** `packages/core/src/schema/` (TableColumnRegistry, FinalTableStore, SchemaFinalizer, SchemaRegistryConfig), `packages/databases/pg/src/create-table.ts`, `packages/databases/pg/src/schema-finalizer-impl.ts`, `packages/core/src/extensions/extension-hooks.ts` (runCoreStartup), `packages/core/src/runtime/platform.ts` (createPlatformTemplate with extensions as `{ id, layer }[]`).
