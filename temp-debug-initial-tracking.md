# Temp: Debug "initial" crash – feature disable tracking

## Goal
Isolate exactly where the `Cannot read properties of undefined (reading 'initial')` crash occurs by disabling features bit-by-bit.

## Features to toggle (in platform startup order)
1. **ObservabilityLive** – NodeSdk (tracer, logger, metrics)
2. **clusterLayerDefault** – Sharding, Runner
3. **entityEndpoints** – HTTP server, makeEntityEndpointsLayer
4. **schemaStack** – TableColumnRegistry, FinalTableStore, SchemaFinalizer
5. **extensions** – hello-world, contact
6. **runCoreStartup** internals – integrity, CORE_LOADED, waitUntilFinalized, relations, EntityRegistry

## Runs

| # | Disabled | Result |
|---|----------|--------|
| 0 | (none – baseline) | CRASH |
| 1 | OBSERVABILITY (ObservabilityLive → NodeSdk.layerEmpty) | CRASH (tracer still used) |
| 2 | DEVTOOLS (skip DevToolsLive) | CRASH |
| 3 | OBSERVABILITY + DEVTOOLS | CRASH (tracer is in Effect runtime core) |
| 4 | ENTITY_ENDPOINTS (no HTTP server) | OK – no crash, runtime starts, extensions load |
| ... | | |

## Conclusion (so far)
- **Crash isolated to:** Running effects inside `makeEntityEndpointsLayer`'s scoped effect. Crash occurs in Effect tracer (fiberRuntime.ts:1397, tracer.ts:101) when `getFiberRef` receives undefined – likely a scope/fiber context issue when the entity endpoints layer is composed.
- **Workaround:** Set `EVENTIVA_FEATURE_ENTITY_ENDPOINTS=false` to run without the full HTTP API. Or `EVENTIVA_FEATURE_ENTITY_ENDPOINTS_FULL_INIT=false` to skip all init (server runs but no routes).
- **Granular flags added:** ENTITY_ENDPOINTS_CLIENT_FETCH, ENTITY_ENDPOINTS_SWAGGER, ENTITY_ENDPOINTS_FULL_LAYER_BUILD, ENTITY_ENDPOINTS_FULL_INIT, ENTITY_ENDPOINTS_SHARDING.

## Notes
- Feature flags: PostHog + Effect config fallback
- Env: `POSTHOG_API_KEY` for PostHog; `EVENTIVA_FEATURE_*` for local overrides
