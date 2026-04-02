import type { BattleshipPlatformContext } from "@eventiva/core"
import {
  copyrightNoticeLayer,
  makeCopyrightNoticeEntry,
} from "@eventiva/extensions.copyright-notice"
import {
  exampleTransformLayer,
  makeExampleTransformEntry,
} from "@eventiva/extensions.example-transform"
import { makeRunnerBattleshipEntry } from "@eventiva/extensions.runner"
import { makeShooterEntry } from "@eventiva/extensions.shooter"
import { makeSlowShooterEntry } from "@eventiva/extensions.slow-shooter"
import { makeSpeedShooterEntry } from "@eventiva/extensions.speed-shooter"
import type { Effect } from "effect"
import { Layer } from "effect"

/** Merged hook/transform demo layers (merged into runner via `PlatformContext.extensionLayers`). */
export const battleshipExtensionLayers = Layer.mergeAll(
  copyrightNoticeLayer,
  exampleTransformLayer,
)

/** One battleship demo entry: reads `CLUSTER_APP_MODE` internally and no-ops if it does not apply. */
export type BattleshipClusterAppEntry = (
  ctx: BattleshipPlatformContext,
) => Effect.Effect<void, unknown, never>

/**
 * Ordered list of cluster app entries. Each yields `clusterAppModeConfig` and runs only when its mode matches.
 * If none match, `platform.ts` fails with an unknown mode after this list completes.
 */
export const battleshipClusterAppEntries: ReadonlyArray<BattleshipClusterAppEntry> = [
  makeCopyrightNoticeEntry,
  makeExampleTransformEntry,
  makeRunnerBattleshipEntry,
  makeShooterEntry,
  makeSpeedShooterEntry,
  makeSlowShooterEntry,
]
