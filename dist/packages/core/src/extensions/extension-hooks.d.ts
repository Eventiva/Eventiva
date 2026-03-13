/**
 * Extension hooks: PubSub-based. Extensions use listenTo(topic, run) to register workflows
 * that run when a topic is published. Core publishes via publishOnLoad, publishBeforeCall, etc.
 * Topics are "extension/{extensionId}/{phase}"; use extensionHookTopic(extensionId, phase).
 * @see extension-hook-pubsub.ts
 * @see https://github.com/Effect-TS/effect/tree/main/packages/workflow
 */
import * as Activity from '@effect/workflow/Activity';
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import { ExtensionHookPubSub, ExtensionHookPubSubLive, extensionHookTopic, CORE_LOADED_TOPIC, EXTENSIONS_LOADED_TOPIC, PROCESS_RUNTIME_READY_TOPIC, CORE_SHUTDOWN_TOPIC, type ExtensionCallContext, type ExtensionRegisterContext, type HookListenerRun, type HookPhase } from './extension-hook-pubsub.js';
import { TableColumnRegistry } from '../schema/table-column-registry.js';
export { ExtensionHookPubSub, ExtensionHookPubSubLive, extensionHookTopic, CORE_LOADED_TOPIC, EXTENSIONS_LOADED_TOPIC, PROCESS_RUNTIME_READY_TOPIC, CORE_SHUTDOWN_TOPIC, type ExtensionCallContext, type ExtensionRegisterContext, type HookListenerRun, type HookPhase, };
/**
 * Returns a Layer that registers a listener on a hook topic. When the topic is published,
 * the given `run` effect is invoked with (payload, messageId). Use this to avoid repeating
 * the Layer.effectDiscard + pubsub.listenTo pattern in every extension.
 *
 * @param topic - Topic name (e.g. CORE_LOADED_TOPIC, EXTENSIONS_LOADED_TOPIC).
 * @param run - Effect to run for each message; typically workflow.execute({ messageId }).pipe(Effect.asVoid).
 * @returns Layer that requires ExtensionHookPubSub. Merge with your workflow layer.
 *
 * @example
 * const LoadListenerLayer = makeTopicListenerLayer(
 *   CORE_LOADED_TOPIC,
 *   (_payload, messageId) => MyWorkflow.execute({ messageId }).pipe(Effect.asVoid)
 * )
 */
export declare function makeTopicListenerLayer(topic: string, run: HookListenerRun): Layer.Layer<never, never, ExtensionHookPubSub>;
/**
 * Creates a generic workflow and listener layer for an extension hook.
 * When the specified topic is published, this workflow runs and:
 * 1. Publishes a `beforeCall` hook for the extension's phase.
 * 2. Executes the custom `effect` if provided.
 * 3. Publishes the standard `extension/{extensionId}/{phase}` topic.
 * 4. Publishes an `afterCall` hook.
 *
 * @param extensionId - The identifier of the extension.
 * @param phase - The phase name (e.g. "onLoad", "seed", "onShutdown").
 * @param topic - The topic to listen to that triggers this workflow.
 * @param effect - An optional Effect to run as part of the phase.
 * @returns A merged Layer containing the workflow registration and the topic listener.
 */
export declare function makeExtensionWorkflowLayer<R = never, E = never>(extensionId: string, phase: string, topic: string, effect?: Effect.Effect<void, E, R>): Layer.Layer<never, never, R | ExtensionHookPubSub>;
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
 * Like Activity.make but wraps the execute effect with span, log, and duration metric
 * so every activity run is traced, logged, and measured even if the extension doesn't add it.
 * Prefer this over ActivityMake for extension activities.
 */
export declare function makeActivityWithObservability<A, E, R>(opts: Parameters<typeof Activity.make>[0]): ReturnType<typeof Activity.make>;
/**
 * Creates a workflow and listener layer for a standard extension onLoad process.
 * When the CORE_LOADED_TOPIC is published, this workflow runs and:
 * 1. Executes the custom `load` effect if provided.
 * 2. Marks the extension as ready in the `TableColumnRegistry`.
 * It automatically handles `beforeCall`, `afterCall` and `onLoad` publishing
 * via `makeExtensionWorkflowLayer`.
 *
 * @param extensionId - The identifier of the extension.
 * @param load - An optional Effect to run as part of the load process.
 * @returns A merged Layer containing the workflow registration and the topic listener.
 */
export declare function makeExtensionOnLoadLayer<R = never, E = never>(extensionId: string, load?: Effect.Effect<void, E, R>): Layer.Layer<never, never, R | ExtensionHookPubSub | TableColumnRegistry>;
/** Backward-compat tag: same service as ExtensionHookPubSub. Use ExtensionHooksLive to provide both. */
export declare const ExtensionHooks: Context.Tag<ExtensionHookPubSub, ExtensionHookPubSub>;
/** Provides both ExtensionHookPubSub and ExtensionHooks (same service). */
export declare const ExtensionHooksLive: Layer.Layer<ExtensionHookPubSub, never, never>;
export { layerMemory as WorkflowEngineLayerInMemory } from '@effect/workflow/WorkflowEngine';
export { make as ActivityMake, retry as ActivityRetry, CurrentAttempt, idempotencyKey as ActivityIdempotencyKey, raceAll as ActivityRaceAll, } from '@effect/workflow/Activity';
export type { Activity } from '@effect/workflow/Activity';
//# sourceMappingURL=extension-hooks.d.ts.map