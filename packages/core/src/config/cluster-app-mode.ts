import { Config } from "effect"

export const clusterAppModes = [
  "battleship",
  "runner",
  "shooter",
  "speed-shooter",
  "slow-shooter",
] as const

export type ClusterAppMode = (typeof clusterAppModes)[number]

/** Reads `CLUSTER_APP_MODE` from the environment; defaults to `battleship`. */
export const clusterAppModeConfig: Config.Config<ClusterAppMode> = Config.literal(
  ...clusterAppModes,
)("CLUSTER_APP_MODE").pipe(Config.withDefault("battleship"))
