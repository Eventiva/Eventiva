import { Config } from "effect"

export const clusterAppModes = [
  "primary",
  "runner",
  "shooter",
  "speed-shooter",
  "slow-shooter",
] as const

export type ClusterAppMode = (typeof clusterAppModes)[number]

/** Reads `CLUSTER_APP_MODE` from the environment; defaults to `primary`. */
export const clusterAppModeConfig: Config.Config<ClusterAppMode> = Config.literal(
  ...clusterAppModes,
)("CLUSTER_APP_MODE").pipe(Config.withDefault("primary"))
