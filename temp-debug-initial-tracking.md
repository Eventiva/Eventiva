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
- **Crash isolated to:** `makeEntityEndpointsLayer` – when entity endpoints are enabled and the HTTP server with HttpApiBuilder/Swagger is built.
- **Workaround:** Set `EVENTIVA_FEATURE_ENTITY_ENDPOINTS=false` to run without the full HTTP API (uses simple "Eventiva runtime" server on endpointsPort).
- **Next:** Debug inside makeEntityEndpointsLayer – Layer.build, HttpApiBuilder.serve, HttpApiSwagger, or Sharding/entity client setup.

## Notes
- Feature flags: PostHog + Effect config fallback
- Env: `POSTHOG_API_KEY` for PostHog; `EVENTIVA_FEATURE_*` for local overrides
