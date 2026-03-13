/**
 * Core startup sequence: run integrity checks, set schema expected ready count, publish CORE_LOADED_TOPIC
 * (so extension listeners run and call markReady), wait until schema finalization, then publish EXTENSIONS_LOADED_TOPIC.
 * Requires ExtensionHookPubSub, SchemaRegistryConfig, and TableColumnRegistry in context.
 */
import * as Effect from 'effect/Effect';
export declare const runCoreStartupRaw: Effect.Effect<void, {
    _tag: "IntegrityCheckFailed";
    reason: string;
}, unknown>;
export declare const runCoreStartup: Effect.Effect<void, {
    _tag: "IntegrityCheckFailed";
    reason: string;
}, unknown>;
//# sourceMappingURL=run-core-startup.d.ts.map