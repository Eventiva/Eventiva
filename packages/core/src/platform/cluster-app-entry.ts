import type { Effect } from "effect"
import type { PlatformContext } from "./platform-context.js"

/** One cluster app entry: reads `CLUSTER_APP_MODE` internally and no-ops if it does not apply. */
export type ClusterAppEntry = (
  ctx: PlatformContext,
) => Effect.Effect<void, unknown, never>
