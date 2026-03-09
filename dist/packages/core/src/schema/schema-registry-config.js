/**
 * SchemaRegistryConfig: expected extension count for schema finalization.
 * Provided by the platform so runCoreStartup can call setExpectedReadyCount before CORE_LOADED.
 * @see docs/learnings/architecture.md, runtime/platform.ts
 */
import * as Context from "effect/Context";
import * as Layer from "effect/Layer";
export const SchemaRegistryConfig = Context.GenericTag("@eventiva/core/SchemaRegistryConfig");
export function SchemaRegistryConfigLive(expectedReadyCount) {
    return Layer.succeed(SchemaRegistryConfig, { expectedReadyCount });
}
