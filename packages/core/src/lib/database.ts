/**
 * Database service interface for entity persistence.
 * Core store/CRUD logic calls this service; the platform provides the implementation via Effect Layers
 * (e.g. PgDrizzle from database-pg, or in-memory for tests). Core never imports a specific driver.
 * @see docs/learnings/architecture.md
 */
import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Ref from "effect/Ref"

/**
 * Stored record shape: must have an id field. Used for get/set/list.
 */
export type StoredRecord<Id = unknown> = { readonly id: Id } & Record<string, unknown>

/**
 * Driver-agnostic interface for entity table storage.
 * Implementations use Effect SQL + Drizzle (or in-memory Ref) to persist records keyed by table name and id.
 */
export interface Database {
  /** Get a record by table name and id. Returns null if not found. */
  readonly get: <Id, R extends StoredRecord<Id>>(
    tableName: string,
    id: Id
  ) => Effect.Effect<R | null>

  /** Set (insert or replace) a record. Record must include id. */
  readonly set: <Id, R extends StoredRecord<Id>>(
    tableName: string,
    id: Id,
    record: R
  ) => Effect.Effect<void>

  /** Delete a record by table name and id. */
  readonly delete: <Id>(tableName: string, id: Id) => Effect.Effect<void>

  /** List all records for a table. */
  readonly list: <Id, R extends StoredRecord<Id>>(
    tableName: string
  ) => Effect.Effect<ReadonlyArray<R>>
}

export const Database = Context.GenericTag<Database>("@eventiva/core/Database")

/** Key for the in-memory map: tableName -> id string -> record */
function idKey(id: unknown): string {
  return typeof id === "string" ? id : String(id)
}

/**
 * In-memory Database layer. Uses a single Ref<Map<tableName, Map<idKey, record>>>.
 * Use in tests or when no persistent DB is configured; platform can merge this instead of PgDrizzle.
 */
export const DatabaseLiveInMemory: Layer.Layer<Database> = Layer.scoped(
  Database,
  Effect.gen(function* () {
    const ref = yield* Ref.make<
      Map<string, Map<string, StoredRecord<unknown>>>
    >(new Map())
    const database: Database = {
      get: <Id, R extends StoredRecord<Id>>(tableName: string, id: Id) =>
        Ref.get(ref).pipe(
          Effect.map((tables) => {
            const table = tables.get(tableName)
            if (!table) return null
            const record = table.get(idKey(id))
            return record != null ? (record as R) : null
          })
        ),
      set: (tableName, id, record) =>
        Ref.update(ref, (tables) => {
          const next = new Map(tables)
          const table = next.get(tableName) ?? new Map()
          const nextTable = new Map(table)
          nextTable.set(idKey(id), record as StoredRecord<unknown>)
          next.set(tableName, nextTable)
          return next
        }),
      delete: (tableName, id) =>
        Ref.update(ref, (tables) => {
          const next = new Map(tables)
          const table = next.get(tableName)
          if (table) {
            const nextTable = new Map(table)
            nextTable.delete(idKey(id))
            next.set(tableName, nextTable)
          }
          return next
        }),
      list: <Id, R extends StoredRecord<Id>>(tableName: string) =>
        Ref.get(ref).pipe(
          Effect.map((tables) => {
            const table = tables.get(tableName)
            const arr = table ? Array.from(table.values()) : []
            return arr as unknown as ReadonlyArray<R>
          })
        )
    }
    return database
  })
)
