import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Ref from "effect/Ref"
import { withSpanAndLog } from "../observability/helpers.js"

export type RelationCallback = (helpers: any, schema: Record<string, any>) => Record<string, any>

export interface TableRelationsRegistryState {
  readonly pending: Map<string, Array<{ extensionId: string, callback: RelationCallback }>>
}

/**
 * Registry to collect Drizzle relation callbacks from extensions.
 * During Phase 2 of DB Initialization, these callbacks are executed, and their outputs
 * are merged into a single `relations()` call per table.
 */
export interface TableRelationsRegistry {
  readonly registerRelations: (
    tableName: string,
    extensionId: string,
    callback: RelationCallback
  ) => Effect.Effect<void>
  readonly getAllCallbacks: () => Effect.Effect<ReadonlyMap<string, ReadonlyArray<RelationCallback>>>
}

export const TableRelationsRegistry = Context.GenericTag<TableRelationsRegistry>(
  "@eventiva/core/TableRelationsRegistry"
)

export const TableRelationsRegistryLive = Layer.effect(
  TableRelationsRegistry,
  Effect.gen(function* () {
    const stateRef = yield* Ref.make<TableRelationsRegistryState>({
      pending: new Map()
    })

    return {
      registerRelations: (tableName, extensionId, callback) =>
        Effect.gen(function* () {
          yield* Effect.logInfo(`Registering relations for table ${tableName} from extension ${extensionId}`)
          yield* Ref.update(stateRef, (state) => {
            const nextPending = new Map(state.pending)
            const existing = nextPending.get(tableName) ?? []
            nextPending.set(tableName, [...existing, { extensionId, callback }])
            return { pending: nextPending }
          })
        }).pipe(withSpanAndLog("registerRelations", { attributes: { tableName, extensionId } })),

      getAllCallbacks: () =>
        Effect.gen(function* () {
          const state = yield* Ref.get(stateRef)
          const result = new Map<string, ReadonlyArray<RelationCallback>>()
          for (const [tableName, entries] of state.pending.entries()) {
            result.set(tableName, entries.map(e => e.callback))
          }
          return result
        })
    }
  })
)
