import type { PlatformError } from "@effect/platform/Error"
import { Layer, Logger, LogLevel } from "effect"
import { effectDevToolsLayerFromEnv } from "./devtools.js"
import { dualLoggerLayer } from "./logger.js"
import { tracingLayer } from "./tracing.js"

export {
  defaultEffectDevToolsWsUrl,
  effectDevToolsEnabledFromEnv,
  effectDevToolsLayer,
  effectDevToolsLayerFromEnv,
  effectDevToolsWsUrlFromEnv,
} from "./devtools.js"
export { dualLoggerLayer } from "./logger.js"
export { tracingLayer } from "./tracing.js"
export { type WithSpanAndLogOptions, withSpanAndLog } from "./helpers.js"

/**
 * Dual logger + OTEL resource + minimum log level (default All).
 * When `EVENTIVA_EFFECT_DEVTOOLS` is set, includes Effect DevTools **before** tracing
 * so OpenTelemetry + Sentry tracing is patched correctly.
 */
export function observabilityLayers(
  logLevel: LogLevel.LogLevel = LogLevel.All,
): Layer.Layer<unknown, PlatformError, never> {
  return Layer.mergeAll(
    effectDevToolsLayerFromEnv(),
    dualLoggerLayer(),
    tracingLayer,
    Logger.minimumLogLevel(logLevel),
  ) as Layer.Layer<unknown, PlatformError, never>
}
