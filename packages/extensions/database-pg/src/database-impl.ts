/**
 * Database service implementation for PostgreSQL using Effect SQL PgClient.
 * Uses a single entity_store table (table_name, id, data JSONB) so one implementation serves all entities.
 * Connection config from PgClient.layer(config) or PgClient.layerConfig. Merge PgDatabaseLayer in the platform.
 * @see docs/learnings/architecture.md
 */
import { Database } from "@eventiva/core"
import { SqlClient } from "@effect/sql"
import { PgClient } from "@effect/sql-pg"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"

const ENTITY_STORE_TABLE = "entity_store"

/** Ensure entity_store exists. Call once when building the Database service. */
function ensureTable(sql: SqlClient.SqlClient): Effect.Effect<void> {
  return (sql as any)`CREATE TABLE IF NOT EXISTS entity_store (table_name TEXT NOT NULL, id TEXT NOT NULL, data JSONB NOT NULL, PRIMARY KEY (table_name, id))`.pipe(
    Effect.catchAll(() => Effect.void),
    Effect.asVoid
  )
}

function idStr(id: unknown): string {
  return typeof id === "string" ? id : String(id)
}

/**
 * Database implementation: get/set/delete/list using SqlClient.
 * Stores each record as (table_name, id, data) with data = JSON.stringify(record).
 */
function makeDatabase(sql: SqlClient.SqlClient): Database {
  return {
    get: (tableName, id) =>
      Effect.gen(function* () {
        const rows = yield* (sql as any)`SELECT data FROM entity_store WHERE table_name = ${tableName} AND id = ${idStr(id)}`
        const row = Array.isArray(rows) ? rows[0] : (rows as any)?.[0]
        if (!row || row.data == null) return null
        const data = typeof row.data === "string" ? JSON.parse(row.data) : row.data
        return { ...data, id } as any
      }),

    set: (tableName, id, record) =>
      Effect.gen(function* () {
        const data = JSON.stringify(record)
        yield* (sql as any)`INSERT INTO entity_store (table_name, id, data) VALUES (${tableName}, ${idStr(id)}, ${data}::jsonb) ON CONFLICT (table_name, id) DO UPDATE SET data = EXCLUDED.data`
      }),

    delete: (tableName, id) =>
      Effect.gen(function* () {
        yield* (sql as any)`DELETE FROM entity_store WHERE table_name = ${tableName} AND id = ${idStr(id)}`
      }),

    list: (tableName) =>
      Effect.gen(function* () {
        const rows = yield* (sql as any)`SELECT id, data FROM entity_store WHERE table_name = ${tableName}`
        const list = Array.isArray(rows) ? rows : (rows as any) ?? []
        return list.map((r: { id: string; data: unknown }) => {
          const data = typeof r.data === "string" ? JSON.parse(r.data as string) : r.data
          return { ...(data as object), id: r.id }
        }) as any
      })
  }
}

/**
 * Layer that provides the Database service using PgClient (which also provides SqlClient).
 * Merge PgClient.layer(config) or PgClient.layerConfig and this layer in the platform when building the program.
 */
export const PgDatabaseLayer: Layer.Layer<Database, never, PgClient> = Layer.effect(
  Database,
  Effect.gen(function* () {
    const sql = yield* SqlClient.SqlClient
    yield* ensureTable(sql)
    return makeDatabase(sql)
  })
)
