/**
 * SchemaRegistryConfig: expected extension count for schema finalization.
 * Provided by the platform so runCoreStartup can call setExpectedReadyCount before CORE_LOADED.
 * @see docs/learnings/architecture.md, runtime/platform.ts
 */
import * as Context from "effect/Context"
import * as Layer from "effect/Layer"

export interface SchemaRegistryConfig {
  /** Number of extensions that must call markReady before finalization runs. */
  readonly expectedReadyCount: number
  /** Table name that owns createdBy FK (built first so others can reference it). Default 'contact'. */
  readonly creatorTableName?: string
}

export const SchemaRegistryConfig = Context.GenericTag<SchemaRegistryConfig>(
  "@eventiva/core/SchemaRegistryConfig"
)

export function SchemaRegistryConfigLive(
  expectedReadyCount: number,
  options?: { creatorTableName?: string }
): Layer.Layer<SchemaRegistryConfig> {
  return Layer.succeed(SchemaRegistryConfig, {
    expectedReadyCount,
    creatorTableName: options?.creatorTableName ?? "contact"
  })
}
