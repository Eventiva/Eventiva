import * as FetchHttpClient from "@effect/platform/FetchHttpClient"
import * as HttpBody from "@effect/platform/HttpBody"
import * as Context from "effect/Context"
import { HttpClient } from "@effect/platform/HttpClient"
import * as HttpClientRequest from "@effect/platform/HttpClientRequest"
import * as SqlClient from "@effect/sql/SqlClient"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Option from "effect/Option"
import { withSpanAndLog } from "../observability/helpers.js"
import { appendTransformStepsFromDiff, cloneTransformSnapshot } from "./transform-diff.js"
import {
  TransformExtensionRpcResolver,
  TransformExtensionRpcResolverLive,
} from "./transform-extension-rpc-resolver.js"
import { loadTransformPipelineRows } from "./transform-pipeline-table.js"
import type { TransformRpcExecuteRequest, TransformRpcExecuteResponse } from "./transform-rpc-protocol.js"
import { TransformRegistry } from "./transform-registry.js"
import type { TransformContext } from "./types.js"

const TRANSFORM_EXECUTE_PATH = "/v1/transforms/execute"

/**
 * Layers required by {@link TransformRegistryPipelineRpcLive} in addition to {@link SqlClient.SqlClient}:
 * default Fetch HTTP client + {@link TransformExtensionRpcResolverLive}.
 */
export const transformPipelineRpcSupportLayers = Layer.mergeAll(
  FetchHttpClient.layer,
  TransformExtensionRpcResolverLive,
)

type HttpClientService = Context.Tag.Service<typeof HttpClient>
type ResolverService = Context.Tag.Service<typeof TransformExtensionRpcResolver>

function buildRunPhase(
  sql: SqlClient.SqlClient,
  http: HttpClientService,
  resolver: ResolverService,
  phase: "pre" | "post",
) {
  return <T>(rpcName: string, ctx: TransformContext<T>): Effect.Effect<TransformContext<T>, never, never> =>
    Effect.gen(function* () {
      const rows = yield* loadTransformPipelineRows(sql, rpcName, phase)
      let out = ctx

      for (const row of rows) {
        const baseOpt = yield* resolver.resolveBaseUrl(row.extension_id)
        if (Option.isNone(baseOpt)) {
          yield* Effect.dieMessage(
            `Transform RPC: no base URL for extension "${row.extension_id}" (set env from transformExtensionRpcUrlEnvKey)`,
          )
        }
        const base = Option.getOrThrow(baseOpt)
        const url = new URL(TRANSFORM_EXECUTE_PATH, base.endsWith("/") ? base : `${base}/`)

        const snapshot = cloneTransformSnapshot(out.current)
        const reqBody: TransformRpcExecuteRequest = {
          extensionId: row.extension_id,
          transformId: row.transform_id,
          rpcName,
          phase,
          context: {
            original: out.original,
            current: out.current,
            steps: out.steps,
          },
        }

        const request = HttpClientRequest.post(url, {
          body: HttpBody.unsafeJson(reqBody),
        })

        const response = yield* withSpanAndLog("transform.rpc.execute", {
          attributes: {
            extensionId: row.extension_id,
            transformId: row.transform_id,
            rpcName,
            phase,
          },
        })(http.execute(request))
        if (response.status < 200 || response.status >= 300) {
          const text = yield* response.text
          yield* Effect.dieMessage(
            `Transform RPC HTTP ${String(response.status)} for ${row.extension_id}/${row.transform_id}: ${text}`,
          )
        }

        const json = (yield* response.json) as TransformRpcExecuteResponse
        if (json === null || typeof json !== "object" || !("current" in json)) {
          yield* Effect.dieMessage(
            `Transform RPC: response must be JSON object with "current" (${row.extension_id}/${row.transform_id})`,
          )
        }

        out = {
          ...out,
          current: json.current as T,
        }
        appendTransformStepsFromDiff(out, snapshot, row.extension_id, row.transform_id)
      }

      return out
    }).pipe(Effect.orDie) as Effect.Effect<TransformContext<T>, never, never>
}

/**
 * {@link TransformRegistry} backed by Postgres pipeline rows + HTTP RPC to extension microservices.
 *
 * - `registerPre` / `registerPost` are no-ops (pipeline rows replace in-process registration).
 * - Provide {@link SqlClient.SqlClient} and merge {@link transformPipelineRpcSupportLayers}
 *   (or equivalent Fetch HTTP + {@link TransformExtensionRpcResolver}).
 */
export const TransformRegistryPipelineRpcLive: Layer.Layer<
  TransformRegistry,
  never,
  SqlClient.SqlClient
> = Layer.provide(
  Layer.scoped(
    TransformRegistry,
    Effect.gen(function* () {
      const sql = yield* SqlClient.SqlClient
      const http = yield* HttpClient
      const resolver = yield* TransformExtensionRpcResolver

      const runPre = buildRunPhase(sql, http, resolver, "pre")
      const runPost = buildRunPhase(sql, http, resolver, "post")

    return {
      registerPre: (rpcName, extensionId, transformId, fn) => {
        void rpcName
        void extensionId
        void transformId
        void fn
        return Effect.void
      },
      registerPost: (rpcName, extensionId, transformId, fn) => {
        void rpcName
        void extensionId
        void transformId
        void fn
        return Effect.void
      },
        runPre,
        runPost,
      }
    }),
  ),
  transformPipelineRpcSupportLayers,
)
