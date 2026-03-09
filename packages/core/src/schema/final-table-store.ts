/**
 * FinalTableStore: holds the final built table (PgTable) per table name after finalization.
 * Populated by TableColumnRegistry during finalization; read-only thereafter.
 * Used by drizzle-kit integration and relationships later.
 * @see docs/learnings/architecture.md, schema/table-column-registry.ts
 */
import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Ref from "effect/Ref"
import { withSpanAndLog } from "../observability/helpers.js"

export interface FinalTableStore {
  /** Get a finalized table by name. Returns undefined if not found. */
  readonly getTable: (tableName: string) => Effect.Effect<unknown | undefined>
  /** Get all finalized tables as a record (tableName -> table). */
  readonly getAllTables: () => Effect.Effect<Record<string, unknown>>
  /** Set a table (used only by TableColumnRegistry during finalization). */
  readonly setTable: (tableName: string, table: unknown) => Effect.Effect<void>
  
  /** Get finalized relations by table name. Returns undefined if not found. */
  readonly getRelations: (tableName: string) => Effect.Effect<unknown | undefined>
  /** Get all finalized relations as a record (tableName -> relations). */
  readonly getAllRelations: () => Effect.Effect<Record<string, unknown>>
  /** Set relations (used during Phase 2 finalization). */
  readonly setRelations: (tableName: string, relations: unknown) => Effect.Effect<void>
}

export const FinalTableStore = Context.GenericTag<FinalTableStore>("@eventiva/core/FinalTableStore")

export const FinalTableStoreLive: Layer.Layer<FinalTableStore> = Layer.effect(
  FinalTableStore,
  Effect.gen(function* () {
    const tableRef = yield* Ref.make<Map<string, unknown>>(new Map())
    const relationsRef = yield* Ref.make<Map<string, unknown>>(new Map())

    const store: FinalTableStore = {
      getTable: (tableName) =>
        Ref.get(tableRef).pipe(
          Effect.map((m) => m.get(tableName)),
          withSpanAndLog("finalTableStore.getTable", { attributes: { tableName } })
        ),
      getAllTables: () =>
        Ref.get(tableRef).pipe(
          Effect.map((m) => Object.fromEntries(m)),
          withSpanAndLog("finalTableStore.getAllTables")
        ),
      setTable: (tableName, table) =>
        Ref.update(tableRef, (m) => {
          const next = new Map(m)
          next.set(tableName, table)
          return next
        }).pipe(
          withSpanAndLog("finalTableStore.setTable", { attributes: { tableName } })
        ),
      getRelations: (tableName) =>
        Ref.get(relationsRef).pipe(
          Effect.map((m) => m.get(tableName)),
          withSpanAndLog("finalTableStore.getRelations", { attributes: { tableName } })
        ),
      getAllRelations: () =>
        Ref.get(relationsRef).pipe(
          Effect.map((m) => Object.fromEntries(m)),
          withSpanAndLog("finalTableStore.getAllRelations")
        ),
      setRelations: (tableName, relations) =>
        Ref.update(relationsRef, (m) => {
          const next = new Map(m)
          next.set(tableName, relations)
          return next
        }).pipe(
          withSpanAndLog("finalTableStore.setRelations", { attributes: { tableName } })
        )
    }
    return store
  })
)
