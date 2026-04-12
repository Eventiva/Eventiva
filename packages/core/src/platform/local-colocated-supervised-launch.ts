import { ConfigProvider, Effect, Layer, Supervisor } from "effect"

/**
 * Supervised `Layer.launch` for a **complete** local cluster stack (in-memory storage, colocated workloads).
 * Sets `CLUSTER_APP_MODE=primary`, `EVENTIVA_CLUSTER_INFRASTRUCTURE=local`, and optional `CLUSTER_HOOK_BUS`
 * from env (defaults to in-process PubSub hook bus when unset).
 */
export function localColocatedSupervisedLaunch(
  stack: Layer.Layer<unknown, unknown, never>,
): Effect.Effect<void, unknown, never> {
  const base = new Map<string, string>([
    ["CLUSTER_APP_MODE", "primary"],
    ["EVENTIVA_CLUSTER_INFRASTRUCTURE", "local"],
  ])
  if (process.env.CLUSTER_HOOK_BUS !== undefined) {
    base.set("CLUSTER_HOOK_BUS", process.env.CLUSTER_HOOK_BUS)
  }
  return Effect.gen(function* () {
    const supervisor = yield* Supervisor.track
    yield* Layer.launch(stack).pipe(Effect.supervised(supervisor))
  }).pipe(
    Effect.withConfigProvider(
      ConfigProvider.fromMap(base).pipe(ConfigProvider.orElse(() => ConfigProvider.fromEnv())),
    ),
  )
}
