/**
 * @eventiva/core — cluster demo schema + observability + shared platform context types.
 * Battleship runners/shooters live in `@eventiva/extensions.*`; process entrypoints in `@eventiva/platforms.*`.
 */
export {
  clusterAppModeConfig,
  clusterAppModes,
  type ClusterAppMode,
} from "./config/cluster-app-mode.js"
export { Battleship, DelayedBullet, DeliverAtBullet } from "./schema.js"
export {
  type BattleshipPlatformContext,
  type PlatformContext,
} from "./platform/battleship-platform-context.js"
export {
  HookRegistry,
  HookRegistryLive,
  TransformRegistry,
  TransformRegistryLive,
  appendTransformStep,
  appendTransformStepsFromDiff,
  cloneTransformSnapshot,
  collectDeepDiffs,
  emptyTransformContext,
  hookScopeEquals,
  joinTransformPath,
  type LeafDiff,
  runnerOnLoadHooksLayer,
  shardingRegistrationHooksLayer,
  type HookHandler,
  type HookPhase,
  type HookScope,
  type TransformContext,
  type TransformFn,
  type TransformStep,
} from "./hooks/index.js"
export {
  makeClusterSqlClientLayer,
  makeClusterSqlRunnerLayer,
} from "./cluster/sql-socket-layers.js"
export {
  defaultEffectDevToolsWsUrl,
  dualLoggerLayer,
  effectDevToolsEnabledFromEnv,
  effectDevToolsLayer,
  effectDevToolsLayerFromEnv,
  effectDevToolsWsUrlFromEnv,
  observabilityLayers,
  tracingLayer,
  type WithSpanAndLogOptions,
  withSpanAndLog,
} from "./observability/index.js"
