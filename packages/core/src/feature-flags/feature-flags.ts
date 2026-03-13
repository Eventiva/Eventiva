/**
 * Feature flag abstraction: PostHog + Effect Config fallback.
 * Use to toggle features for debugging or gradual rollout.
 *
 * Env:
 * - POSTHOG_API_KEY: when set, use PostHog for flags
 * - EVENTIVA_FEATURE_<KEY>: local override (true|false), e.g. EVENTIVA_FEATURE_OBSERVABILITY=false
 *
 * @see temp-debug-initial-tracking.md for debug usage
 */
import * as Config from "effect/Config"
import * as ConfigProvider from "effect/ConfigProvider"
import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Option from "effect/Option"
import { PostHog } from "posthog-node"

/** Flag keys used for platform feature toggles. */
export const FeatureFlagKeys = {
  OBSERVABILITY: "eventiva-observability",
  DEVTOOLS: "eventiva-devtools",
  CLUSTER: "eventiva-cluster",
  ENTITY_ENDPOINTS: "eventiva-entity-endpoints",
  SCHEMA_STACK: "eventiva-schema-stack",
  EXTENSIONS: "eventiva-extensions"
} as const

export type FeatureFlagKey = (typeof FeatureFlagKeys)[keyof typeof FeatureFlagKeys]

/** Override map for programmatic toggling (e.g. debug scripts). */
export type FeatureFlagOverrides = Partial<Record<FeatureFlagKey, boolean>>

export interface FeatureFlags {
  readonly isEnabled: (key: FeatureFlagKey) => Effect.Effect<boolean>
}

export const FeatureFlags = Context.GenericTag<FeatureFlags>("@eventiva/core/FeatureFlags")

const envProvider = ConfigProvider.fromEnv()

function loadConfigFlags(): Record<FeatureFlagKey, boolean> {
  const load = envProvider.load(
    Config.all({
      [FeatureFlagKeys.OBSERVABILITY]: Config.boolean("EVENTIVA_FEATURE_OBSERVABILITY").pipe(
        Config.withDefault(true)
      ),
      [FeatureFlagKeys.DEVTOOLS]: Config.boolean("EVENTIVA_FEATURE_DEVTOOLS").pipe(
        Config.withDefault(true)
      ),
      [FeatureFlagKeys.CLUSTER]: Config.boolean("EVENTIVA_FEATURE_CLUSTER").pipe(
        Config.withDefault(true)
      ),
      [FeatureFlagKeys.ENTITY_ENDPOINTS]: Config.boolean("EVENTIVA_FEATURE_ENTITY_ENDPOINTS").pipe(
        Config.withDefault(true)
      ),
      [FeatureFlagKeys.SCHEMA_STACK]: Config.boolean("EVENTIVA_FEATURE_SCHEMA_STACK").pipe(
        Config.withDefault(true)
      ),
      [FeatureFlagKeys.EXTENSIONS]: Config.boolean("EVENTIVA_FEATURE_EXTENSIONS").pipe(
        Config.withDefault(true)
      )
    })
  )
  return Effect.runSync(load)
}

function createPostHogClient(): Option.Option<PostHog> {
  const key = process.env.POSTHOG_API_KEY ?? process.env.POSTHOG_PROJECT_API_KEY
  if (!key || typeof key !== "string") return Option.none()
  return Option.some(
    new PostHog(key, {
      host: process.env.POSTHOG_HOST ?? "https://us.i.posthog.com"
    })
  )
}

/**
 * FeatureFlagsLive: uses PostHog when POSTHOG_API_KEY is set,
 * otherwise falls back to EVENTIVA_FEATURE_* env vars.
 * Use overrides to force values (e.g. for debug).
 */
export function FeatureFlagsLive(
  overrides?: FeatureFlagOverrides
): Layer.Layer<FeatureFlags> {
  return Layer.sync(FeatureFlags, () => {
    const configFlags = loadConfigFlags()
    const posthog = createPostHogClient()
    const distinctId = process.env.EVENTIVA_FEATURE_DISTINCT_ID ?? "server"

    return {
      isEnabled: (key: FeatureFlagKey) =>
        Effect.gen(function* () {
          if (overrides && key in overrides) return overrides[key] ?? true
          if (Option.isSome(posthog)) {
            const enabled = yield* Effect.tryPromise({
              try: () => posthog.value.isFeatureEnabled(key, distinctId),
              catch: () => new Error("PostHog isFeatureEnabled failed")
            }).pipe(Effect.catchAll(() => Effect.succeed(configFlags[key] ?? true)))
            if (enabled !== undefined) return enabled
          }
          return configFlags[key] ?? true
        })
    }
  })
}

/**
 * FeatureFlagsLiveConfigOnly: uses only Effect Config / env vars.
 * Use when PostHog is not configured (e.g. local debug).
 */
export function FeatureFlagsLiveConfigOnly(
  overrides?: FeatureFlagOverrides
): Layer.Layer<FeatureFlags> {
  return Layer.sync(FeatureFlags, () => {
    const configFlags = loadConfigFlags()
    return {
      isEnabled: (key: FeatureFlagKey) =>
        Effect.succeed(overrides && key in overrides ? (overrides[key] ?? true) : configFlags[key] ?? true)
    }
  })
}
