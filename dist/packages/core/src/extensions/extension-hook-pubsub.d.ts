/**
 * Extension hook PubSub: central place to register workflows that listen to hook topics
 * and to publish messages. When a workflow is registered via listenTo(topic, run),
 * publishing to that topic runs all registered run effects (workflow.execute with payload + messageId).
 * Topic names are defined here; use extensionHookTopic(extensionId, phase) for consistency.
 *
 * Standard hooks (useful and safe to extend):
 * - core/loaded       — Runtime has finished loading. Extensions register a workflow to run and then publish their own extension/{id}/onLoad.
 * - core/extensions-loaded — Published after CORE_LOADED has been published and all its listeners have completed. Use for post-load actions (e.g. seeding demo data).
 * - extension/{id}/onLoad    — That extension has "loaded" (its workflow ran). Extenders listen to run their onLoad logic.
 * - extension/{id}/onRegister — Extension was registered with a runner profile (profileName, extensionIds). Use for discovery/audit.
 * - extension/{id}/beforeCall — Before an entity method runs. Payload: ExtensionCallContext. Use for validation, logging, metrics.
 * - extension/{id}/afterCall  — After an entity method ran. Payload: ExtensionCallContext. Use for side effects, logging, metrics.
 * - core/shutdown     — Runtime is shutting down. Extensions can listen to run cleanup (e.g. flush buffers).
 *
 * All publish and listener runs are automatically traced, logged, and measured (see instrumented makePubSub).
 * @see https://github.com/Effect-TS/effect/tree/main/packages/workflow
 */
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
export type HookPhase = 'onLoad' | 'onRegister' | 'beforeCall' | 'afterCall' | 'onShutdown' | string;
/** Context published to beforeCall/afterCall topics. */
export interface ExtensionCallContext {
    readonly entityType: string;
    readonly method: string;
    readonly entityId: string;
    readonly request?: unknown;
}
/** Context published to onRegister topic. */
export interface ExtensionRegisterContext {
    readonly profileName: string;
    readonly extensionIds: ReadonlyArray<string>;
}
/** Build the canonical topic for an extension + phase. Used by listenTo and by publish helpers. */
export declare function extensionHookTopic(extensionId: string, phase: HookPhase): string;
/** Topic published by core when the runtime has loaded. Extensions register workflows to listen to this (e.g. hello-world workflow runs and then publishes its own extension/hello-world/onLoad). */
export declare const CORE_LOADED_TOPIC = "core/loaded";
/** Topic published by core after CORE_LOADED has been published and all its listeners have completed. Use for post-load actions that do not need the HTTP server or cluster RPC. */
export declare const EXTENSIONS_LOADED_TOPIC = "core/extensions-loaded";
/** Topic published by core after the runtime phase has started (HTTP server and entity endpoints are up). Use for seeding or other work that runs within the cluster (entity client calls). Listeners run in the background; they do not block server readiness. */
export declare const RUNTIME_READY_TOPIC = "core/runtime-ready";
/** Topic published by core when the runtime is shutting down. Extensions can listen for cleanup (e.g. flush buffers). */
export declare const CORE_SHUTDOWN_TOPIC = "core/shutdown";
/** Run effect for a listener: (payload, messageId?) => Effect. Extensions pass workflow.execute(...) here. */
export type HookListenerRun = (payload: unknown, messageId?: string) => Effect.Effect<void, unknown, unknown>;
export interface ExtensionHookPubSub {
    /** Register a listener for a topic. When publish(topic, ...) is called, run is invoked for each listener. */
    readonly listenTo: (topic: string, run: HookListenerRun) => Effect.Effect<void>;
    /** Publish to a topic: run all registered listeners with (payload, messageId). Idempotency is the listener's responsibility (use messageId in workflow payload). */
    readonly publish: (topic: string, payload: unknown, messageId?: string) => Effect.Effect<void, unknown, unknown>;
    /** Return all topics that have at least one listener. */
    readonly getTopics: () => Effect.Effect<ReadonlyArray<string>>;
    /** Return topics that match a phase suffix (e.g. "/onLoad"). */
    readonly getTopicsForPhase: (phase: HookPhase) => Effect.Effect<ReadonlyArray<string>>;
}
export declare const ExtensionHookPubSub: Context.Tag<ExtensionHookPubSub, ExtensionHookPubSub>;
export declare const ExtensionHookPubSubLive: Layer.Layer<ExtensionHookPubSub>;
//# sourceMappingURL=extension-hook-pubsub.d.ts.map