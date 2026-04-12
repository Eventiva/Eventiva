/**
 * Extension hook PubSub: central place to register workflows that listen to hook topics
 * and to publish messages. When a workflow is registered via listenTo(topic, run),
 * publishing to that topic runs all registered run effects (workflow.execute with payload + messageId).
 * Topic names are defined here; use extensionHookTopic(extensionId, phase) for consistency.
 *
 * **Note on clustering:** This ExtensionHookPubSub is designed for in-process hook communication
 * (e.g., extension lifecycle hooks, beforeCall/afterCall). For cluster-wide messaging between
 * distributed entities, use `Message` and `MessageStorage` from `@effect/cluster` instead.
 * 
 * - **ExtensionHookPubSub**: Use for local, in-process hooks (onLoad, beforeCall, afterCall, etc.)
 * - **Message/MessageStorage**: Use for cross-process, cluster-wide messaging between entities
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
 * @see https://effect-ts.github.io/effect/docs/cluster for cluster-wide messaging with Message/MessageStorage
 */
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import * as Ref from 'effect/Ref';
import { withSpanAndLog } from '../observability/helpers.js';

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
export function extensionHookTopic(extensionId: string, phase: HookPhase): string {
    return `extension/${extensionId}/${phase}`;
}

/** Topic published by core when the runtime has loaded. Extensions register workflows to listen to this (e.g. hello-world workflow runs and then publishes its own extension/hello-world/onLoad). */
export const CORE_LOADED_TOPIC = 'core/loaded';

/** Topic published by core after CORE_LOADED has been published and all its listeners have completed. Use for post-load actions that do not need the HTTP server or cluster RPC. */
export const EXTENSIONS_LOADED_TOPIC = 'core/extensions-loaded';

/** Topic published by core after the runtime phase has started in this process (HTTP server and entity endpoints are up). Use for seeding or other work that runs within the cluster (entity client calls). Listeners run in the background; they do not block server readiness. Note: This is process-local, not cluster-wide. */
export const PROCESS_RUNTIME_READY_TOPIC = 'core/process-runtime-ready';

/** Topic published by core when the runtime is shutting down. Extensions can listen for cleanup (e.g. flush buffers). */
export const CORE_SHUTDOWN_TOPIC = 'core/shutdown';

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

export const ExtensionHookPubSub = Context.GenericTag<ExtensionHookPubSub>('@eventiva/core/ExtensionHookPubSub');

const defaultMessageId = (): string => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

/** Wraps a listener run with span, log, and duration metric so every hook execution is observable. */
function instrumentListenerRun(
    topic: string,
    messageId: string,
    run: HookListenerRun,
    payload: unknown
): Effect.Effect<void, unknown, unknown> {
    return withSpanAndLog('extension_hooks.listener', {
        attributes: { topic, messageId },
        metricName: 'extension_hooks.listener.duration',
    })(run(payload, messageId).pipe(Effect.catchAll(() => Effect.void))).pipe(Effect.asVoid);
}

function makePubSub(ref: Ref.Ref<Map<string, Array<HookListenerRun>>>): ExtensionHookPubSub {
    return {
        listenTo: (topic, run) =>
            Ref.update(ref, (m) => {
                const next = new Map(m);
                const list = next.get(topic) ?? [];
                next.set(topic, [...list, run]);
                return next;
            }),

        publish: (topic, payload, messageId) =>
            Ref.get(ref).pipe(
                Effect.flatMap((m) => {
                    const list = m.get(topic) ?? [];
                    if (list.length === 0) return Effect.void;
                    const id = messageId ?? defaultMessageId();
                    return withSpanAndLog('extension_hooks.publish', {
                        attributes: { topic, messageId: id },
                        metricName: 'extension_hooks.publish.duration',
                    })(
                        // Run listeners sequentially on the publishing fiber so FiberRefs (including Logger) stay aligned
                        // with workflows forked from these effects; unbounded concurrency forked children that could miss custom loggers.
                        list
                            .reduce(
                                (acc, run) =>
                                    acc.pipe(
                                        Effect.flatMap(() =>
                                            instrumentListenerRun(topic, id, run, payload)
                                        )
                                    ),
                                Effect.void as Effect.Effect<void, unknown, unknown>
                            )
                            .pipe(Effect.asVoid)
                    );
                })
            ),

        getTopics: () => Ref.get(ref).pipe(Effect.map((m) => Array.from(m.keys()))),

        getTopicsForPhase: (phase) =>
            Ref.get(ref).pipe(Effect.map((m) => Array.from(m.keys()).filter((t) => t.endsWith(`/${phase}`)))),
    };
}

/**
 * Registers a listener on a hook topic. Merge with {@link ExtensionHookPubSubLive}.
 */
export function makeTopicListenerLayer(
    topic: string,
    run: HookListenerRun,
): Layer.Layer<never, never, ExtensionHookPubSub> {
  return Layer.effectDiscard(
    Effect.gen(function* () {
      const pubsub = yield* ExtensionHookPubSub;
      yield* pubsub.listenTo(topic, (payload, messageId) =>
        run(payload, messageId).pipe(
          withSpanAndLog("topicListenerRun", { attributes: { topic, messageId: messageId ?? "none" } }),
          Effect.asVoid,
        ),
      );
    }).pipe(withSpanAndLog("makeTopicListenerLayer", { attributes: { topic } })),
  );
}

export const ExtensionHookPubSubLive: Layer.Layer<ExtensionHookPubSub> = Layer.effect(
    ExtensionHookPubSub,
    Effect.gen(function* () {
        const ref = yield* Ref.make<Map<string, Array<HookListenerRun>>>(new Map());
        return makePubSub(ref);
    })
);
