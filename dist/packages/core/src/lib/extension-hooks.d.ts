/**
 * Extension hooks: PubSub-based. Extensions use listenTo(topic, run) to register workflows
 * that run when a topic is published. Core publishes via publishOnLoad, publishBeforeCall, etc.
 * Topics are "extension/{extensionId}/{phase}"; use extensionHookTopic(extensionId, phase).
 * @see extension-hook-pubsub.ts
 * @see https://github.com/Effect-TS/effect/tree/main/packages/workflow
 */
import * as Activity from "@effect/workflow/Activity";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { ExtensionHookPubSub, ExtensionHookPubSubLive, extensionHookTopic, CORE_LOADED_TOPIC, EXTENSIONS_LOADED_TOPIC, CORE_SHUTDOWN_TOPIC, type ExtensionCallContext, type ExtensionRegisterContext, type HookListenerRun, type HookPhase } from "./extension-hook-pubsub.js";
export { ExtensionHookPubSub, ExtensionHookPubSubLive, extensionHookTopic, CORE_LOADED_TOPIC, EXTENSIONS_LOADED_TOPIC, CORE_SHUTDOWN_TOPIC, type ExtensionCallContext, type ExtensionRegisterContext, type HookListenerRun, type HookPhase };
/** Backward-compat tag: same service as ExtensionHookPubSub. Use ExtensionHooksLive to provide both. */
export declare const ExtensionHooks: Context.Tag<ExtensionHookPubSub, ExtensionHookPubSub>;
/** Provides both ExtensionHookPubSub and ExtensionHooks (same service). */
export declare const ExtensionHooksLive: Layer.Layer<ExtensionHookPubSub, never, never>;
/**
 * Wraps an entity RPC handler so that beforeCall and afterCall publish to this extension's
 * hook topics (extensionId/beforeCall, extensionId/afterCall). Other extensions listen to
 * those topics (e.g. core startup banner listens to hello-world/afterCall).
 */
export declare function withExtensionHooksWith<A, E, R, Req extends {
    address: {
        entityId: string;
    };
    payload: unknown;
}>(hooks: ExtensionHookPubSub, extensionId: string, entityType: string, method: string, handler: (request: Req) => Effect.Effect<A, E, R>): (request: Req) => Effect.Effect<A, E, R>;
/**
 * Wraps an entity RPC handler with beforeCall/afterCall publishing for the given extension.
 * Requires ExtensionHookPubSub in context.
 */
export declare function withExtensionHooks<A, E, R, Req extends {
    address: {
        entityId: string;
    };
    payload: unknown;
}>(extensionId: string, entityType: string, method: string, handler: (request: Req) => Effect.Effect<A, E, R>): (request: Req) => Effect.Effect<A, E, R | ExtensionHookPubSub>;
export { layerMemory as WorkflowEngineLayerInMemory } from "@effect/workflow/WorkflowEngine";
export { make as ActivityMake, retry as ActivityRetry, CurrentAttempt, idempotencyKey as ActivityIdempotencyKey, raceAll as ActivityRaceAll } from "@effect/workflow/Activity";
export type { Activity } from "@effect/workflow/Activity";
/**
 * Like Activity.make but wraps the execute effect with span, log, and duration metric
 * so every activity run is traced, logged, and measured even if the extension doesn't add it.
 * Prefer this over ActivityMake for extension activities.
 */
export declare function makeActivityWithObservability<A, E, R>(opts: Parameters<typeof Activity.make>[0]): ReturnType<typeof Activity.make>;
/**
 * Core startup sequence: run integrity checks, publish CORE_LOADED_TOPIC (so extension
 * listeners run), then publish EXTENSIONS_LOADED_TOPIC. Requires ExtensionHookPubSub in context.
 * Call this from the runtime entrypoint after building the platform layer; then keep the process alive (e.g. Effect.never).
 */
export declare const runCoreStartup: Effect.Effect<void, {
    _tag: "IntegrityCheckFailed";
    reason: string;
}, ExtensionHookPubSub>;
//# sourceMappingURL=extension-hooks.d.ts.map