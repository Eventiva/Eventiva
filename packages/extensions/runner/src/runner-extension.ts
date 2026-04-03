import { ClusterPlatformContext } from "@eventiva/core"
import { Effect } from "effect"
import { makeRunnerEntry } from "./runner.js"

/**
 * Cluster RPC runner + demo entities when `CLUSTER_APP_MODE` is `primary` or `runner`.
 * Delegates to {@link makeRunnerEntry}; requires {@link ClusterPlatformContext} during `Layer.launch`.
 */
export class RunnerExtension extends Effect.Service<RunnerExtension>()(
  "@eventiva/extensions/RunnerExtension",
  {
    effect: Effect.gen(function* () {
      const ctx = yield* ClusterPlatformContext
      yield* makeRunnerEntry(ctx)
      return { _tag: "@eventiva/extensions/RunnerExtension" as const }
    }),
  },
) {}
