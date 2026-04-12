import { clusterHookBusConfig } from "../config/cluster-hook-config.js"
import type { ConfigError } from "effect/ConfigError"
import { Context, Deferred, Layer, PubSub, Queue, Ref } from "effect"
import * as Effect from "effect/Effect"
import { randomUUID } from "node:crypto"
import type { HookDispatchEnvelope } from "./cluster-hook-dispatch.js"
import { makeHookDispatchEnvelope } from "./cluster-hook-dispatch.js"
import { HookHandlerExecutor } from "./hook-handler-executor.js"
import type { HookHandler } from "./hook-registry.js"
import { HookRegistry } from "./hook-registry.js"
import { HookRemotePublisher } from "./hook-remote-publisher.js"
import type { HookPhase, HookScope } from "./types.js"
import { hookScopeEquals } from "./types.js"

interface RegisteredHook {
  readonly scope: HookScope
  readonly phase: HookPhase
  readonly handler: HookHandler
}

function executeRegisteredHooks(
  ref: Ref.Ref<ReadonlyArray<RegisteredHook>>,
  envelope: HookDispatchEnvelope,
): Effect.Effect<void, never, never> {
  return Effect.gen(function* () {
    const xs = yield* Ref.get(ref)
    for (const h of xs) {
      if (h.phase === envelope.phase && hookScopeEquals(h.scope, envelope.scope)) {
        yield* h.handler(envelope.payload)
      }
    }
  }).pipe(
    Effect.withSpan("eventiva.hooks.executeRegisteredHandlers", {
      attributes: {
        hookPhase: envelope.phase,
        hookScopeTag: envelope.scope._tag,
        eventId: envelope.eventId,
      },
    }),
  )
}

const hookInfrastructureInlineLive = Layer.scopedContext(
  Effect.gen(function* () {
    const ref = yield* Ref.make<ReadonlyArray<RegisteredHook>>([])
    const executor = {
      executeEnvelope: (envelope: HookDispatchEnvelope) => executeRegisteredHooks(ref, envelope),
    }
    const registry = {
      register: (scope: HookScope, phase: HookPhase, handler: HookHandler) =>
        Ref.update(ref, (xs) => [...xs, { scope, phase, handler }]),
      run: (scope: HookScope, phase: HookPhase, payload: unknown) =>
        executeRegisteredHooks(ref, makeHookDispatchEnvelope(randomUUID(), phase, scope, payload)),
    }
    return Context.empty().pipe(
      Context.add(HookHandlerExecutor, executor),
      Context.add(HookRegistry, registry),
    )
  }),
)

const hookInfrastructurePubSubLive = Layer.scopedContext(
  Effect.gen(function* () {
    const ref = yield* Ref.make<ReadonlyArray<RegisteredHook>>([])
    const waitersRef = yield* Ref.make(new Map<string, Deferred.Deferred<void, never>>())
    const hub = yield* PubSub.unbounded<HookDispatchEnvelope>()
    const dequeue = yield* PubSub.subscribe(hub)

    const executor = {
      executeEnvelope: (envelope: HookDispatchEnvelope) => executeRegisteredHooks(ref, envelope),
    }

    yield* Effect.forkScoped(
      Effect.forever(
        Queue.take(dequeue).pipe(
          Effect.flatMap((env) =>
            Effect.gen(function* () {
              yield* executeRegisteredHooks(ref, env)
              const m = yield* Ref.get(waitersRef)
              const d = m.get(env.eventId)
              if (d) {
                yield* Deferred.succeed(d, undefined)
              }
            }),
          ),
        ),
      ),
    )

    const deliver = (env: HookDispatchEnvelope) =>
      Effect.gen(function* () {
        const d = yield* Deferred.make<void>()
        yield* Ref.update(waitersRef, (m) => {
          const next = new Map(m)
          next.set(env.eventId, d)
          return next
        })
        yield* PubSub.publish(hub, env)
        yield* Deferred.await(d)
        yield* Ref.update(waitersRef, (m) => {
          const next = new Map(m)
          next.delete(env.eventId)
          return next
        })
      })

    const registry = {
      register: (scope: HookScope, phase: HookPhase, handler: HookHandler) =>
        Ref.update(ref, (xs) => [...xs, { scope, phase, handler }]),
      run: (scope: HookScope, phase: HookPhase, payload: unknown) =>
        deliver(makeHookDispatchEnvelope(randomUUID(), phase, scope, payload)),
    }

    return Context.empty().pipe(
      Context.add(HookHandlerExecutor, executor),
      Context.add(HookRegistry, registry),
    )
  }),
)

const hookInfrastructureKafkaRouterLive = Layer.scopedContext(
  Effect.gen(function* () {
    const ref = yield* Ref.make<ReadonlyArray<RegisteredHook>>([])
    const remote = yield* HookRemotePublisher
    const executor = {
      executeEnvelope: (envelope: HookDispatchEnvelope) => executeRegisteredHooks(ref, envelope),
    }
    /** Every phase uses the integration; consumers call {@link HookHandlerExecutor.executeEnvelope}. */
    const deliver = (env: HookDispatchEnvelope) =>
      remote.publish(env).pipe(
        Effect.tapError((e) => Effect.logWarning("hook remote publish failed", { cause: e })),
        Effect.catchAll(() => Effect.void),
      ) as Effect.Effect<void, never, never>
    const registry = {
      register: (scope: HookScope, phase: HookPhase, handler: HookHandler) =>
        Ref.update(ref, (xs) => [...xs, { scope, phase, handler }]),
      run: (scope: HookScope, phase: HookPhase, payload: unknown) =>
        deliver(makeHookDispatchEnvelope(randomUUID(), phase, scope, payload)),
    }
    return Context.empty().pipe(
      Context.add(HookHandlerExecutor, executor),
      Context.add(HookRegistry, registry),
    )
  }),
)

/**
 * Hook registry + handler executor. Uses `CLUSTER_HOOK_BUS` / infrastructure defaults:
 * `pubsub` (local), `kafka` (requires {@link HookRemotePublisher} from an integration), `off` (inline).
 */
export const HookRegistryLive = Layer.unwrapEffect(
  Effect.gen(function* () {
    const bus = yield* clusterHookBusConfig
    switch (bus) {
      case "off":
        return hookInfrastructureInlineLive
      case "pubsub":
        return hookInfrastructurePubSubLive
      case "kafka":
        return hookInfrastructureKafkaRouterLive
    }
  }),
) as Layer.Layer<HookRegistry | HookHandlerExecutor, ConfigError, HookRemotePublisher>
