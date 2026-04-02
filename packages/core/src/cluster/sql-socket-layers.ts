import * as SqlClient from "@effect/sql/SqlClient"
import { NodeClusterSocket } from "@effect/platform-node"
import { Layer } from "effect"

/**
 * Cluster runner (server) socket with SQL-backed storage — same wiring for every platform `SqlLayer`.
 */
export function makeClusterSqlRunnerLayer<E, R>(
  sqlLayer: Layer.Layer<R, E, never>,
): Layer.Layer<R | SqlClient.SqlClient, E, never> {
  return NodeClusterSocket.layer({ storage: "sql" }).pipe(
    Layer.provide(sqlLayer),
  ) as unknown as Layer.Layer<R | SqlClient.SqlClient, E, never>
}

/**
 * Client-only cluster socket with SQL-backed storage (no entity host process).
 */
export function makeClusterSqlClientLayer<E, R>(
  sqlLayer: Layer.Layer<R, E, never>,
): Layer.Layer<R | SqlClient.SqlClient, E, never> {
  return NodeClusterSocket.layer({
    storage: "sql",
    clientOnly: true,
  }).pipe(Layer.provide(sqlLayer)) as unknown as Layer.Layer<
    R | SqlClient.SqlClient,
    E,
    never
  >
}
