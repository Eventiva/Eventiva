import { Sharding } from "@effect/cluster/Sharding"
import type { ShardingRegistrationEvent } from "@effect/cluster/ShardingRegistrationEvent"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Stream from "effect/Stream"
import { HookRegistry } from "./hook-registry.js"
import type { HookScope } from "./types.js"

/**
 * Subscribes to `Sharding.getRegistrationEvents` and dispatches `onRegister` hooks
 * with scopes `entityType` / `singleton` matching the cluster event.
 */
export const shardingRegistrationHooksLayer = Layer.scopedDiscard(
  Effect.gen(function* () {
    const sharding = yield* Sharding
    const hooks = yield* HookRegistry

    const handle = (ev: ShardingRegistrationEvent) => {
      if (ev._tag === "EntityRegistered") {
        const scope: HookScope = {
          _tag: "entityType",
          entityType: ev.entity.type as string,
        }
        return hooks.run(scope, "onRegister", ev)
      }
      const scope: HookScope = { _tag: "singleton", name: ev.address.name }
      return hooks.run(scope, "onRegister", ev)
    }

    yield* Effect.forkScoped(
      Stream.runForEach(sharding.getRegistrationEvents, handle),
    )
  }),
) as Layer.Layer<never, never, HookRegistry | Sharding>
