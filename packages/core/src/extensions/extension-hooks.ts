/**
 * Extension hooks: PubSub-based. Extensions use listenTo(topic, run) to register workflows
 * that run when a topic is published. Core publishes via publishOnLoad, publishBeforeCall, etc.
 * Topics are "extension/{extensionId}/{phase}"; use extensionHookTopic(extensionId, phase).
 * @see extension-hook-pubsub.ts
 * @see https://github.com/Effect-TS/effect/tree/main/packages/workflow
 */
import * as Activity from '@effect/workflow/Activity';
import * as Workflow from '@effect/workflow/Workflow';
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import * as Schema from 'effect/Schema';
import {
    ExtensionHookPubSub,
    ExtensionHookPubSubLive,
    extensionHookTopic,
    CORE_LOADED_TOPIC,
    EXTENSIONS_LOADED_TOPIC,
    CORE_SHUTDOWN_TOPIC,
    type ExtensionCallContext,
    type ExtensionRegisterContext,
    type HookListenerRun,
    type HookPhase,
} from './extension-hook-pubsub.js';
import { withSpanAndLog } from '../observability/helpers.js';
import { TableColumnRegistry } from '../schema/table-column-registry.js';

export {
    ExtensionHookPubSub,
    ExtensionHookPubSubLive,
    extensionHookTopic,
    CORE_LOADED_TOPIC,
    EXTENSIONS_LOADED_TOPIC,
    CORE_SHUTDOWN_TOPIC,
    type ExtensionCallContext,
    type ExtensionRegisterContext,
    type HookListenerRun,
    type HookPhase,
};

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
export function makeTopicListenerLayer(
    topic: string,
    run: HookListenerRun
): Layer.Layer<never, never, ExtensionHookPubSub> {
    return Layer.effectDiscard(
        Effect.gen(function* () {
            yield* Effect.logDebug(`Setting up topic listener for ${topic}`);
            const pubsub = yield* ExtensionHookPubSub;
            yield* pubsub.listenTo(topic, (payload, messageId) =>
                run(payload, messageId).pipe(
                    withSpanAndLog('topicListenerRun', { attributes: { topic, messageId: messageId ?? 'none' } }),
                    Effect.asVoid
                )
            );
        }).pipe(withSpanAndLog('makeTopicListenerLayer', { attributes: { topic } }))
    );
}

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
export function makeExtensionWorkflowLayer<R = never, E = never>(
    extensionId: string,
    phase: string,
    topic: string,
    effect?: Effect.Effect<void, E, R>
): Layer.Layer<never, never, R | ExtensionHookPubSub> {
    const PayloadSchema = Schema.Struct({
        messageId: Schema.optional(Schema.String),
        context: Schema.optional(Schema.Unknown),
    });
    type Payload = Schema.Schema.Type<typeof PayloadSchema>;

    const workflow = Workflow.make({
        name: `${extensionId}/${phase}`,
        payload: PayloadSchema,
        idempotencyKey: (p) => p.messageId ?? `${extensionId}-${phase}`,
        success: Schema.Void,
        error: Schema.Never,
    });

    const workflowLayer = workflow.toLayer(
        Effect.fn((_payload: Payload, _executionId: string) =>
            Effect.gen(function* () {
                const hooks = yield* ExtensionHookPubSub;

                const ctx: ExtensionCallContext = {
                    entityType: 'Extension',
                    method: phase,
                    entityId: extensionId,
                    request: _payload.context,
                };

                yield* Effect.logInfo(`Executing workflow layer for extension ${extensionId} phase ${phase}`);

                yield* hooks
                    .publish(extensionHookTopic(extensionId, 'beforeCall'), ctx)
                    .pipe(Effect.catchAll(() => Effect.void));

                if (effect) {
                    yield* effect.pipe(Effect.catchAll(() => Effect.void));
                }

                yield* hooks
                    .publish(extensionHookTopic(extensionId, phase as HookPhase), _payload.context)
                    .pipe(Effect.catchAll(() => Effect.void));

                yield* hooks
                    .publish(extensionHookTopic(extensionId, 'afterCall'), ctx)
                    .pipe(Effect.catchAll(() => Effect.void));
            }).pipe(withSpanAndLog('extensionWorkflowLayer', { attributes: { extensionId, phase, topic } }))
        )
    );

    const listenerLayer = makeTopicListenerLayer(topic, (payload, messageId) =>
        workflow.execute({ messageId, context: payload }).pipe(Effect.asVoid)
    );

    return Layer.mergeAll(workflowLayer as Layer.Layer<never, never, any>, listenerLayer);
}

/**
 * Wraps an entity RPC handler so that beforeCall and afterCall publish to this extension's
 * hook topics (extensionId/beforeCall, extensionId/afterCall). Other extensions listen to
 * those topics (e.g. core startup banner listens to hello-world/afterCall).
 */
export function withExtensionHooksWith<A, E, R, Req extends { address: { entityId: string }; payload: unknown }>(
    hooks: ExtensionHookPubSub,
    extensionId: string,
    entityType: string,
    method: string,
    handler: (request: Req) => Effect.Effect<A, E, R>
): (request: Req) => Effect.Effect<A, E, R> {
    return (request) => {
        const eff = Effect.gen(function* () {
            yield* Effect.logInfo(`Executing handler with extension hooks: ${extensionId}/${entityType}/${method}`);
            const ctx: ExtensionCallContext = {
                entityType,
                method,
                entityId: request.address.entityId,
                request,
            };
            yield* Effect.catchAll(
                hooks.publish(extensionHookTopic(extensionId, 'beforeCall'), ctx),
                () => Effect.void
            );
            const result = yield* handler(request);
            yield* Effect.catchAll(hooks.publish(extensionHookTopic(extensionId, 'afterCall'), ctx), () => Effect.void);
            return result;
        });
        return eff.pipe(
            withSpanAndLog('withExtensionHooksWith', { attributes: { extensionId, entityType, method } })
        ) as Effect.Effect<A, E, R>;
    };
}

/**
 * Like Activity.make but wraps the execute effect with span, log, and duration metric
 * so every activity run is traced, logged, and measured even if the extension doesn't add it.
 * Prefer this over ActivityMake for extension activities.
 */
export function makeActivityWithObservability<A, E, R>(
    opts: Parameters<typeof Activity.make>[0]
): ReturnType<typeof Activity.make> {
    const name = opts.name;
    return Activity.make({
        ...opts,
        execute: withSpanAndLog(`activity.${name}`, {
            attributes: { activity: name },
            metricName: `activity.${name}.duration`,
        })(opts.execute as Effect.Effect<A, E, R>),
    }) as ReturnType<typeof Activity.make>;
}

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
export function makeExtensionOnLoadLayer<R = never, E = never>(
    extensionId: string,
    load?: Effect.Effect<void, E, R>
): Layer.Layer<never, never, R | ExtensionHookPubSub | TableColumnRegistry> {
    return makeExtensionWorkflowLayer(
        extensionId,
        'onLoad',
        CORE_LOADED_TOPIC,
        Effect.gen(function* () {
            yield* Effect.logInfo(`Running onLoad layer for extension ${extensionId}`);
            if (load) {
                yield* load.pipe(Effect.catchAll(() => Effect.void));
            }
            const registry = yield* TableColumnRegistry;
            yield* registry.markReady(extensionId);
        }).pipe(withSpanAndLog('makeExtensionOnLoadLayer', { attributes: { extensionId } }))
    );
}

/** Backward-compat tag: same service as ExtensionHookPubSub. Use ExtensionHooksLive to provide both. */
export const ExtensionHooks = Context.GenericTag<ExtensionHookPubSub>('@eventiva/core/ExtensionHooks');

/** Provides both ExtensionHookPubSub and ExtensionHooks (same service). */
export const ExtensionHooksLive: Layer.Layer<ExtensionHookPubSub, never, never> = Layer.merge(
    ExtensionHookPubSubLive,
    Layer.effect(
        ExtensionHooks,
        Effect.gen(function* () {
            return yield* ExtensionHookPubSub;
        })
    ).pipe(Layer.provide(ExtensionHookPubSubLive))
);

export { layerMemory as WorkflowEngineLayerInMemory } from '@effect/workflow/WorkflowEngine';
export {
    make as ActivityMake,
    retry as ActivityRetry,
    CurrentAttempt,
    idempotencyKey as ActivityIdempotencyKey,
    raceAll as ActivityRaceAll,
} from '@effect/workflow/Activity';
export type { Activity } from '@effect/workflow/Activity';
