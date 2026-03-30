# Debug: "Cannot read properties of undefined (reading 'initial')"

## Summary

When the Effect runtime crashes with `TypeError: Cannot read properties of undefined (reading 'initial')`, the crash occurs in `Effect.getFiberRef` when a FiberRef is undefined. This typically indicates a scope/fiber context mismatch when composing layers.

## Root cause (confirmed)

- **Location:** Effect runtime – `fiberRuntime.getFiberRef`, `fiberRefs.joinAs`, `fiberRefs/patch.diff`
- **Trigger:** Running effects inside the EntityEndpointsServer's scoped effect. The tracer callback accesses `getFiberRef(core.currentVersionMismatchErrorLogLevel)` but `core.currentVersionMismatchErrorLogLevel` is undefined (circular import or Effect instance mismatch). Later, `fiberRefs.joinAs` and `fiberRefs/patch.diff` iterate over FiberRefs maps that contain `undefined` as keys.
- **Cause:** FiberRefs maps can have `undefined` keys when fiber context is merged across layers (e.g. entity endpoints + platform stack). The Effect runtime does not guard against undefined FiberRefs.

## Feature flags for debugging

Use these env vars to isolate the crash:

| Env var                                              | Default | Effect                                                                                      |
| ---------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| `EVENTIVA_FEATURE_ENTITY_ENDPOINTS`                  | true    | Disable entire entity endpoints. **Workaround:** set to `false` to avoid crash.             |
| `EVENTIVA_FEATURE_ENTITY_ENDPOINTS_FULL_INIT`        | true    | Skip Sharding, entity.client, apiLayer, Layer.build. When false, server runs but no routes. |
| `EVENTIVA_FEATURE_ENTITY_ENDPOINTS_SHARDING`         | true    | Skip `yield* Sharding.Sharding`.                                                            |
| `EVENTIVA_FEATURE_ENTITY_ENDPOINTS_TRACING`          | true    | Skip `withSpanAndLog` wrapper (debug).                                                      |
| `EVENTIVA_FEATURE_ENTITY_ENDPOINTS_CLIENT_FETCH`     | true    | Skip `yield* entity.client` for each descriptor.                                            |
| `EVENTIVA_FEATURE_ENTITY_ENDPOINTS_SWAGGER`          | true    | Skip HttpApiSwagger at /api/docs.                                                           |
| `EVENTIVA_FEATURE_ENTITY_ENDPOINTS_FULL_LAYER_BUILD` | true    | Skip `Layer.build(fullServerLayer)`.                                                        |
| `EVENTIVA_FEATURE_DEVTOOLS`                          | true    | Skip DevTools layer.                                                                        |
| `EVENTIVA_FEATURE_OBSERVABILITY`                     | true    | Use NodeSdk.layerEmpty instead of ObservabilityLive.                                        |

## Debug process

1. **Disable entity endpoints entirely:** `EVENTIVA_FEATURE_ENTITY_ENDPOINTS=false` – confirms no crash.
2. **Disable full init:** `EVENTIVA_FEATURE_ENTITY_ENDPOINTS_FULL_INIT=false` – confirms crash is in the init code.
3. **Disable granular parts:** Sharding, client fetch, swagger, layer build – narrow down which part triggers the crash.
4. **Track runs:** Use `temp-debug-initial-tracking.md` to record each run and outcome.

## Dependency audit

Ensure a single Effect instance:

- `pnpm overrides: { "effect": "3.19.19" }`
- `.npmrc` with `public-hoist-pattern[]=effect` and `public-hoist-pattern[]=@effect/*`
- `find node_modules -path '*node_modules/effect'` should return only one path

## Fix (applied)

A pnpm patch to `effect@3.19.19` adds defensive guards for undefined FiberRefs:

1. **fiberRuntime.getFiberRef:** If `fiberRef == null`, return `Option.none()` (avoids crash when `core.currentVersionMismatchErrorLogLevel` is undefined).
2. **fiberRefs.joinAs:** Skip entries where `fiberRef == null` in `that.locals.forEach`.
3. **fiberRefs/patch.diff:** Skip entries where `fiberRef == null` in both `newValue.locals.entries()` and `missingLocals.entries()`.

The patch is in `patches/effect@3.19.19.patch`. Run `pnpm install` to apply it.

## Workaround (if patch is removed)

```bash
EVENTIVA_FEATURE_ENTITY_ENDPOINTS=false pnpm exec nx run platforms-postgresql:run
```

This runs the platform with a minimal HTTP server (plain "Eventiva runtime" response) and avoids the crash.

## References

- `temp-debug-initial-tracking.md` – run log
- `debug-initial-error.md` – earlier findings
- Effect FiberRef: `node_modules/effect/src/internal/fiberRuntime.ts` (getFiberRef)
- Effect tracer: `node_modules/effect/src/internal/tracer.ts`
