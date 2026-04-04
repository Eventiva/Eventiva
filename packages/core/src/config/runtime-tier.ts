import { Config, type Option } from "effect"

/** Documented deployment matrix for platform runtime (see docs/parts/local-dev/three-tier-platform-runtime.md). */
export const runtimeTierValues = ["local", "compose", "kubernetes"] as const
export type RuntimeTier = (typeof runtimeTierValues)[number]

/** Optional: `EVENTIVA_RUNTIME_TIER=local|compose|kubernetes` for tooling and docs alignment (not required for behaviour). */
export const runtimeTierConfig: Config.Config<Option.Option<RuntimeTier>> = Config.literal(
  ...runtimeTierValues,
)("EVENTIVA_RUNTIME_TIER").pipe(Config.option)
