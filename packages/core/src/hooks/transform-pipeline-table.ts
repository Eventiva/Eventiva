import * as SqlClient from "@effect/sql/SqlClient"
import type { SqlError } from "@effect/sql/SqlError"
import * as Effect from "effect/Effect"

/** Postgres table storing ordered transform steps for RPC dispatch. */
export const EVENTIVA_TRANSFORM_PIPELINE_TABLE = "eventiva_transform_pipeline" as const

export type TransformPipelineRow = {
  readonly extension_id: string
  readonly transform_id: string
  readonly rpc_name: string
  readonly phase: "pre" | "post"
  readonly ordering: number
}

/**
 * Physical DDL is applied by {@link RuntimeSchemaDDL} during {@link runCoreStartup} (Drizzle registry).
 * Kept as a no-op for callers that still expect a pre-flight hook.
 */
export const ensureTransformPipelineTable = (
  _sql: SqlClient.SqlClient,
): Effect.Effect<void, SqlError, never> => Effect.void

/** Load enabled transform rows for an RPC + phase, ascending by `ordering`. */
export const loadTransformPipelineRows = (
  sql: SqlClient.SqlClient,
  rpcName: string,
  phase: "pre" | "post",
): Effect.Effect<ReadonlyArray<TransformPipelineRow>, SqlError, never> =>
  Effect.gen(function* () {
    const rows = yield* sql<TransformPipelineRow>`
      SELECT extension_id, transform_id, rpc_name, phase, ordering
      FROM ${sql(EVENTIVA_TRANSFORM_PIPELINE_TABLE)}
      WHERE rpc_name = ${rpcName}
        AND phase = ${phase}
        AND enabled = TRUE
      ORDER BY ordering ASC
    `
    return rows
  })
