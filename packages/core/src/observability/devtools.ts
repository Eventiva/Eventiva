import { DevTools } from "@effect/experimental"
import { Layer } from "effect"

const defaultDevToolsWsUrl = "ws://localhost:34437"

function envTruthy(v: string | undefined): boolean {
  if (v === undefined) return false
  const t = v.trim().toLowerCase()
  return t === "1" || t === "true" || t === "yes"
}

/**
 * Whether Effect DevTools (editor tracer / metrics WebSocket client) is enabled.
 * Set `EVENTIVA_EFFECT_DEVTOOLS=true` when the VS Code / Cursor Effect extension
 * or another DevTools backend is reachable (default URL {@link defaultEffectDevToolsWsUrl}).
 */
export function effectDevToolsEnabledFromEnv(): boolean {
  return envTruthy(process.env.EVENTIVA_EFFECT_DEVTOOLS)
}

/**
 * WebSocket URL for the Effect DevTools server. Override when the client runs on
 * another host (e.g. port-forward from a cluster pod): `ws://127.0.0.1:34437` or
 * a forwarded URL. Defaults to `ws://localhost:34437` per Effect docs.
 */
export function effectDevToolsWsUrlFromEnv(): string {
  const u = process.env.EVENTIVA_EFFECT_DEVTOOLS_WS_URL?.trim()
  return u && u.length > 0 ? u : defaultDevToolsWsUrl
}

export { defaultDevToolsWsUrl as defaultEffectDevToolsWsUrl }

/**
 * DevTools layer for the built-in tracer and metrics view. Must be provided
 * **before** `@effect/opentelemetry` tracing layers so the tracer is patched correctly.
 *
 * @see https://effect.website/docs/getting-started/devtools/#built-in-tracer-and-metrics
 */
export function effectDevToolsLayer(
  url: string = defaultDevToolsWsUrl,
): Layer.Layer<never> {
  return DevTools.layer(url)
}

/**
 * `DevTools.layer` when {@link effectDevToolsEnabledFromEnv} is true; otherwise `Layer.empty`.
 */
export function effectDevToolsLayerFromEnv(): Layer.Layer<never> {
  return effectDevToolsEnabledFromEnv()
    ? effectDevToolsLayer(effectDevToolsWsUrlFromEnv())
    : Layer.empty
}
