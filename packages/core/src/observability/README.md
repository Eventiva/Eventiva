# Observability (Eventiva Core)

Observability is **priority #1**. Every function in the framework and in every extension must fully implement and use tracing, logging, and metrics.

## Every-function contract

Before considering any function complete, confirm:

1. **Tracing** — It runs inside a span or creates one (e.g. `Effect.withSpan("OperationName")(effect)` or `withSpanAndLog("OperationName")(effect)`).
2. **Logging** — It logs at least once with structured context (e.g. `Effect.log("message", { entityId, status })`). No `console.log`; no silent code paths.
3. **Metrics** — It records at least one metric where the operation is user-facing or performance-sensitive (e.g. counter for “RPC invoked”, timer for “RPC duration”).

No code path may omit observability.

## Layer

Use `ObservabilityLive` from `./layer.js` as the base for runtime and all entity handlers. It provides Effect `Logger`, `Tracer`, and `Metric` (and OTEL `Resource`) via `@effect/opentelemetry` NodeSdk (Console exporters for dev).

## Helpers

- **`withSpanAndLog(spanName, options?)(effect)`** — Wraps an effect with a span, entry/exit logs (with optional structured `attributes`), and a duration metric. Use so that a single call gives you span + log + metric.

Example:

```ts
import { withSpanAndLog } from "./observability/helpers.js"

const run = withSpanAndLog("HelloWorld.sayHello", {
  attributes: { entityId: "hello-1" }
})(sayHelloEffect)
```

## Checklist per function

- [ ] Runs inside a span or creates one
- [ ] Logs at least once with context
- [ ] Records at least one metric if the operation is user-facing or performance-sensitive

## Automatic instrumentation (extensions)

So that extension developers don't have to remember to add spans/logs/metrics everywhere:

- **Extension hook PubSub** — Every `publish(topic, ...)` and every listener run is wrapped with `withSpanAndLog` in core. Spans: `extension_hooks.publish`, `extension_hooks.listener`. Metrics: `extension_hooks.publish.duration`, `extension_hooks.listener.duration`. You get tracing, entry/exit logs, and duration even if the extension does nothing.
- **Activities** — Use `makeActivityWithObservability(opts)` from `@eventiva/core` instead of `Activity.make(opts)`. It wraps `opts.execute` with a span, log, and duration metric (`activity.{name}`, `activity.{name}.duration`) so every activity run is observable even when the extension doesn't add its own.
