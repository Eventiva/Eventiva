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

| #   | Disabled                                               | Result                                         |
| --- | ------------------------------------------------------ | ---------------------------------------------- |
| 0   | (none – baseline)                                      | CRASH                                          |
| 1   | OBSERVABILITY (ObservabilityLive → NodeSdk.layerEmpty) | CRASH (tracer still used)                      |
| 2   | DEVTOOLS (skip DevToolsLive)                           | CRASH                                          |
| 3   | OBSERVABILITY + DEVTOOLS                               | CRASH (tracer is in Effect runtime core)       |
| 4   | ENTITY_ENDPOINTS (no HTTP server)                      | OK – no crash, runtime starts, extensions load |
| ... |                                                        |                                                |

## Conclusion

- **Crash isolated to:** Running effects inside `makeEntityEndpointsLayer`'s scoped effect. Crash occurs in Effect tracer when `getFiberRef(core.currentVersionMismatchErrorLogLevel)` receives undefined, then in `fiberRefs.joinAs` and `fiberRefs/patch.diff` when iterating over FiberRefs maps with undefined keys.
- **Fix applied:** pnpm patch to effect@3.19.19 adding defensive guards in getFiberRef, joinAs, and patch.diff. Server now runs with all features enabled.
- **Granular flags added:** ENTITY_ENDPOINTS_CLIENT_FETCH, ENTITY_ENDPOINTS_SWAGGER, ENTITY_ENDPOINTS_FULL_LAYER_BUILD, ENTITY_ENDPOINTS_FULL_INIT, ENTITY_ENDPOINTS_SHARDING, ENTITY_ENDPOINTS_TRACING.

## Notes

- Feature flags: PostHog + Effect config fallback
- Env: `POSTHOG_API_KEY` for PostHog; `EVENTIVA_FEATURE_*` for local overrides
