/**
 * Core startup sequence: run integrity checks, set schema expected ready count, publish CORE_LOADED_TOPIC
 * (so extension listeners run and call markReady), wait until schema finalization, then publish EXTENSIONS_LOADED_TOPIC.
 * Requires ExtensionHookPubSub, SchemaRegistryConfig, and TableColumnRegistry in context.
 */
import * as Effect from "effect/Effect"
import { defineRelations } from "drizzle-orm/relations"
import { createSelectSchema } from "drizzle-orm/effect-schema"
import { CORE_LOADED_TOPIC, EXTENSIONS_LOADED_TOPIC, ExtensionHookPubSub } from "../extensions/extension-hook-pubsub.js"
import { runIntegrityChecks } from "../security/integrity.js"
import { SchemaRegistryConfig } from "../schema/schema-registry-config.js"
import { TableColumnRegistry } from "../schema/table-column-registry.js"
import { FinalTableStore } from "../schema/final-table-store.js"
import { TableRelationsRegistry } from "../schema/table-relations-registry.js"
import { EntityRegistry } from "../entity/entity-registry.js"
import { Base } from "../entity/entity-base.js"
import { withSpanAndLog } from "../observability/helpers.js"

export const runCoreStartupRaw = Effect.gen(function* () {
  yield* Effect.logInfo("Running core startup...")
  yield* runIntegrityChecks

  const config = yield* SchemaRegistryConfig
  const registry = yield* TableColumnRegistry
  
  yield* registry.setExpectedReadyCount(config.expectedReadyCount)
  
  const hooks = yield* ExtensionHookPubSub
  
  // Phase 1: Fire CORE_LOADED_TOPIC, extensions register columns and relations, then mark ready
  yield* hooks.publish(CORE_LOADED_TOPIC, {}).pipe(Effect.catchAll(() => Effect.void))
  
  yield* registry.waitUntilFinalized()
  yield* Effect.logInfo("Phase 1: Base DB tables finalized.")

  // Phase 2: Resolve DB relations and populate EntityRegistry
  const finalTableStore = yield* FinalTableStore
  const relationsRegistry = yield* TableRelationsRegistry
  const allTables = yield* finalTableStore.getAllTables()
  // Drizzle defineRelations/extractTablesFromSchema expect table objects with .constructor; filter out null/undefined
  const safeTables = Object.fromEntries(
    Object.entries(allTables).filter((entry): entry is [string, object] =>
      entry[1] != null && typeof entry[1] === "object"
    )
  ) as Record<string, unknown>
  const allCallbacksMap = yield* relationsRegistry.getAllCallbacks()

  const hasAnyCallbacks = Array.from(allCallbacksMap.values()).some(callbacks => callbacks.length > 0)
  
  if (hasAnyCallbacks) {
    let mergedRelationsConfig: Record<string, { relations?: unknown }>
    try {
      mergedRelationsConfig = defineRelations(safeTables as any, (helpers: any) => {
        const config: Record<string, any> = {}
        for (const [tableName, callbacks] of allCallbacksMap.entries()) {
          if (callbacks.length > 0) {
            let merged = {}
            for (const cb of callbacks) {
              merged = { ...merged, ...cb(helpers, safeTables) }
            }
            config[tableName] = merged
          }
        }
        return config
      })
    } catch (e) {
      // Drizzle defineRelations can throw if a table has null in schema (e.g. "Cannot read properties of null (reading 'constructor')")
      yield* Effect.logWarning(
        `Skipping relation resolution due to: ${e instanceof Error ? e.message : String(e)}. Tables: ${Object.keys(safeTables).join(", ")}.`
      )
      mergedRelationsConfig = {}
    }
    
    for (const [tableName, conf] of Object.entries(mergedRelationsConfig)) {
      if (conf?.relations != null) {
        yield* finalTableStore.setRelations(tableName, conf.relations)
      }
    }
  }

  for (const [tableName, table] of Object.entries(safeTables)) {
    // Generate schema and populate EntityRegistry (skip placeholders, e.g. SchemaFinalizerNoOp with in-memory DB)
    try {
      const schema = createSelectSchema(table as any)
      const entityName = tableName.charAt(0).toUpperCase() + tableName.slice(1)
      class DynamicEntity extends Base<any>()(entityName, schema as any, { tableName }) {}
      (EntityRegistry.register as any)(entityName, DynamicEntity)
    } catch (e) {
      yield* Effect.logWarning(
        `Skipping entity for table "${tableName}" (not a Drizzle table? use a DB extension with SchemaFinalizer): ${e instanceof Error ? e.message : String(e)}`
      )
    }
  }
  yield* Effect.logInfo("Phase 2: DB relations finalized and EntityRegistry populated.")
  
  yield* hooks.publish(EXTENSIONS_LOADED_TOPIC, {}).pipe(Effect.catchAll(() => Effect.void))
  
  yield* Effect.logInfo("Core startup completed successfully.")
})

export const runCoreStartup = runCoreStartupRaw.pipe(
  withSpanAndLog("runCoreStartup")
)