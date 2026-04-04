import { ConfigProvider, Effect, Layer, Supervisor } from "effect"

/**
 * Supervised `Layer.launch` for a **complete** local cluster stack (in-memory storage, colocated workloads).
 * Sets `CLUSTER_APP_MODE=primary` and `CLUSTER_HOOK_BUS` from env (default `off`).
 */
export function localColocatedSupervisedLaunch(
  stack: Layer.Layer<unknown, unknown, never>,
): Effect.Effect<void, unknown, never> {
  return Effect.gen(function* () {
    const supervisor = yield* Supervisor.track
    yield* Layer.launch(stack).pipe(Effect.supervised(supervisor))
  }).pipe(
    Effect.withConfigProvider(
      ConfigProvider.fromMap(
        new Map<string, string>([
          ["CLUSTER_APP_MODE", "primary"],
          ["CLUSTER_HOOK_BUS", process.env.CLUSTER_HOOK_BUS ?? "off"],
        ]),
      ),
    ),
  )
}
