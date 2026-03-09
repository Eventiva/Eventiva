/**
 * Core startup sequence: run integrity checks, set schema expected ready count, publish CORE_LOADED_TOPIC
 * (so extension listeners run and call markReady), wait until schema finalization, then publish EXTENSIONS_LOADED_TOPIC.
 * Requires ExtensionHookPubSub, SchemaRegistryConfig, and TableColumnRegistry in context.
 */
import * as Effect from "effect/Effect"
import { CORE_LOADED_TOPIC, EXTENSIONS_LOADED_TOPIC, ExtensionHookPubSub } from "../extensions/extension-hook-pubsub.js"
import { runIntegrityChecks } from "../security/integrity.js"
import { SchemaRegistryConfig } from "../schema/schema-registry-config.js"
import { TableColumnRegistry } from "../schema/table-column-registry.js"
import { withSpanAndLog } from "../observability/helpers.js"

export const runCoreStartupRaw = Effect.gen(function* () {
  yield* Effect.logInfo("Running core startup...")
  yield* runIntegrityChecks

  const config = yield* SchemaRegistryConfig
  const registry = yield* TableColumnRegistry
  
  yield* registry.setExpectedReadyCount(config.expectedReadyCount)
  
  const hooks = yield* ExtensionHookPubSub
  
  yield* hooks.publish(CORE_LOADED_TOPIC, {}).pipe(Effect.catchAll(() => Effect.void))
  
  yield* registry.waitUntilFinalized()
  
  yield* hooks.publish(EXTENSIONS_LOADED_TOPIC, {}).pipe(Effect.catchAll(() => Effect.void))
  
  yield* Effect.logInfo("Core startup completed successfully.")
})

export const runCoreStartup = runCoreStartupRaw.pipe(
  withSpanAndLog("runCoreStartup")
)