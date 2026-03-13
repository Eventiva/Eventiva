# Debug: "Cannot read properties of undefined (reading 'initial')"

## Goal
Identify which core process or extension causes the error, then fix it. Suspect: registry actions (recently implemented for database features).

## Plan
1. Deactivate all extensions and core processes (where possible)
2. Step through core processes one-by-one
3. Then step through extensions
4. Fix root cause

## Progress

### Step 1: Run platform as-is to capture full error
(To be filled after run)

### Step 2: Disable all extensions
- Platform lists extensions in `packages/platforms/default/src/index.ts`: contact, hello-world
- Empty extensions array = only StartupBannerLayer from core

### Step 3: Core processes (from platform.ts / run-core-startup)
- ObservabilityLive, clusterLayerDefault, PiiEncryptionLive
- schemaStack: TableColumnRegistryLive, FinalTableStoreLive, SchemaRegistryConfigLive, SchemaFinalizerNoOp
- databaseLayer, hooksStack (ExtensionHooksLive, WorkflowEngineLayerInMemory, WorkflowRegistryLive)
- runCoreStartup: integrity, CORE_LOADED_TOPIC, waitUntilFinalized, relations, createSelectSchema + EntityRegistry, EXTENSIONS_LOADED_TOPIC
- EntityEndpointsServer

## Findings
- Error was "Cannot read properties of undefined (reading 'initial')" in Effect's getFiberRef / fiberRefs.joinAs when a FiberRef from a different/partial Effect module instance was in the refs map.
- **Root cause:** `fiberRefGet(undefined)` is called when FiberRefs from different Effect instances are merged (e.g. in FiberRefsPatch.patch, Blocked handler, or tracer callback). The FiberRef parameter can be undefined when the refs map has keys from a different module instance.
- **pnpm patch applied:** `patches/effect@3.19.19.patch` adds:
  1. **getFiberRef:** Guards for undefined/invalid fiberRef; throws clearer error.
  2. **joinAs:** Skips entries where fiberRef is null/undefined or has no .initial.
  3. **tracer callback:** Try-catch around currentVersionMismatchErrorLogLevel getFiberRef; uses Option.none() on failure.
- **Remaining crash:** After the tracer fix, the crash can still occur from other code paths (e.g. core.fiberRefGet in Blocked handler / FiberRefsPatch). Full fix would require patching core.fiberRefGet or ensuring single Effect instance (e.g. Effect v4 unified versioning).
- pnpm overrides for effect@3.19.19 applied; patchedDependencies uses the patch.

### Fixes applied (platform running)
- **TableRelationsRegistry missing:** runCoreStartup requires TableRelationsRegistry; it was not in the platform schema stack. Added `TableRelationsRegistryLive` to schemaStack in `packages/core/src/runtime/platform.ts` (import + Layer.provideMerge(TableRelationsRegistryLive)).
- **EntityEndpointsServer missing when no endpoints:** When entityEndpoints is empty we no longer add the HTTP endpoints layer, so EntityEndpointsServer was never provided and defaultRuntimeProgram failed with "Service not found: @eventiva/core/EntityEndpointsServer". Fixed by providing a dummy when no endpoints: `Layer.succeed(EntityEndpointsServer, { port: 0 })` in the else branch in platform.ts.
- **Result:** Platform runs successfully when Observability/HTTP endpoints are not exercised; with full stack the FiberRef crash can still occur.

### Extensions re-enabled (in-memory DB)
- With extensions (hello-world, contact) and DatabaseLiveInMemory, SchemaFinalizerNoOp stores placeholder tables (`Object.create(null)`), so drizzle's defineRelations and createSelectSchema threw "Cannot read properties of null (reading 'constructor')".
- **Fixes:** (1) In run-core-startup: wrap defineRelations in try/catch, skip relation resolution on failure and log warning. (2) Filter allTables to safeTables (non-null object values). (3) Wrap createSelectSchema/EntityRegistry.register per table in try/catch; skip and log when table is not a real Drizzle table. (4) EntityRegistry.tryGet added; contact seed workflow uses tryGet and skips seeding when Contact is not registered.
- **Result:** Platform runs with extensions; contact entity is skipped for in-memory (placeholder table); "Core startup completed successfully", "runtime ready; server serving until interrupt".

### Next step (separate from "initial" fix)
- Consider upgrading to Effect v4 beta for unified versioning (eliminates duplicate instance issues).
- Or extend the patch to wrap core.fiberRefGet / FiberRefsPatch to handle undefined refs.
