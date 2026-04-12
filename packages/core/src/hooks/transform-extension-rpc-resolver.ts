import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Option from "effect/Option"

/**
 * Resolves the HTTP base URL for an extension microservice that serves transform RPC.
 * Implementations typically read env, service discovery, or a config map.
 */
export class TransformExtensionRpcResolver extends Context.Tag(
  "@eventiva/core/TransformExtensionRpcResolver",
)<
  TransformExtensionRpcResolver,
  {
    /**
     * Base URL for the extension HTTP API (no trailing slash), e.g. `https://example-transform:8080`.
     * The runner POSTs to `{baseUrl}/v1/transforms/execute`.
     */
    readonly resolveBaseUrl: (
      extensionId: string,
    ) => Effect.Effect<Option.Option<string>, never, never>
  }
>() {}

/** Env key: `EVENTIVA_TRANSFORM_RPC_URL_<EXTENSION_ID_NORMALIZED>` (non-alphanumerics → `_`, uppercased). */
export function transformExtensionRpcUrlEnvKey(extensionId: string): string {
  const normalized = extensionId.replace(/[^a-zA-Z0-9]+/g, "_").toUpperCase()
  return `EVENTIVA_TRANSFORM_RPC_URL_${normalized}`
}

/**
 * Default resolver: one env var per extension id (see {@link transformExtensionRpcUrlEnvKey}).
 */
export const TransformExtensionRpcResolverLive: Layer.Layer<TransformExtensionRpcResolver> =
  Layer.succeed(TransformExtensionRpcResolver, {
    resolveBaseUrl: (extensionId) =>
      Effect.sync(() => {
        const v = process.env[transformExtensionRpcUrlEnvKey(extensionId)]
        return v !== undefined && v !== "" ? Option.some(v) : Option.none()
      }),
  })
