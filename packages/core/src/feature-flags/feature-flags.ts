/**
 * Feature flag abstraction: PostHog + Effect Config fallback.
 * Use to toggle features for debugging or gradual rollout.
 *
 * Env (flat keys; see `loadConfigFlags` and repository `.env.example`):
 * - `POSTHOG_API_KEY` / `POSTHOG_PROJECT_API_KEY` — when set, resolve flags via PostHog
 * - `POSTHOG_HOST` — ingest host (default `https://us.i.posthog.com`)
 * - `EVENTIVA_FEATURE_DISTINCT_ID` — PostHog distinct id (default `server`)
 * - `EVENTIVA_FEATURE_OBSERVABILITY`, `EVENTIVA_FEATURE_DEVTOOLS`, `EVENTIVA_FEATURE_CLUSTER`, …
 *   (boolean strings; each maps to a `FeatureFlagKeys` entry)
 *
 * @see https://effect.website/docs/configuration/#loading-configuration-from-environment-variables
 */
import * as Config from 'effect/Config';
import * as ConfigProvider from 'effect/ConfigProvider';
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import * as Option from 'effect/Option';
import { PostHog } from 'posthog-node';

/** Flag keys used for platform feature toggles. */
export const FeatureFlagKeys = {
    OBSERVABILITY: 'eventiva-observability',
    DEVTOOLS: 'eventiva-devtools',
    CLUSTER: 'eventiva-cluster',
    ENTITY_ENDPOINTS: 'eventiva-entity-endpoints',
    /** Within entity endpoints: fetch entity.client for each descriptor (Sharding). */
    ENTITY_ENDPOINTS_CLIENT_FETCH: 'eventiva-entity-endpoints-client-fetch',
    /** Within entity endpoints: HttpApiSwagger at /api/docs. */
    ENTITY_ENDPOINTS_SWAGGER: 'eventiva-entity-endpoints-swagger',
    /** Within entity endpoints: HttpApiBuilder.serve (mount API routes). */
    ENTITY_ENDPOINTS_SERVE: 'eventiva-entity-endpoints-serve',
    /** Within entity endpoints: skip Layer.build(fullServerLayer) – use minimal server instead (debug). */
    ENTITY_ENDPOINTS_FULL_LAYER_BUILD: 'eventiva-entity-endpoints-full-layer-build',
    /** Within entity endpoints: skip Sharding + entity setup + apiLayer – minimal init (debug). */
    ENTITY_ENDPOINTS_FULL_INIT: 'eventiva-entity-endpoints-full-init',
    /** Within entity endpoints: skip yield* Sharding.Sharding (debug). */
    ENTITY_ENDPOINTS_SHARDING: 'eventiva-entity-endpoints-sharding',
    /** Within entity endpoints: skip withSpanAndLog wrapper (debug tracer). */
    ENTITY_ENDPOINTS_TRACING: 'eventiva-entity-endpoints-tracing',
    SCHEMA_STACK: 'eventiva-schema-stack',
    EXTENSIONS: 'eventiva-extensions',
} as const;

export type FeatureFlagKey = (typeof FeatureFlagKeys)[keyof typeof FeatureFlagKeys];

/** Override map for programmatic toggling (e.g. debug scripts). */
export type FeatureFlagOverrides = Partial<Record<FeatureFlagKey, boolean>>;

export interface FeatureFlags {
    readonly isEnabled: (key: FeatureFlagKey) => Effect.Effect<boolean>;
}

export const FeatureFlags = Context.GenericTag<FeatureFlags>('@eventiva/core/FeatureFlags');

const envProvider = ConfigProvider.fromEnv();

function loadConfigFlags(): Record<FeatureFlagKey, boolean> {
    const load = envProvider.load(
        Config.all({
            [FeatureFlagKeys.OBSERVABILITY]: Config.boolean('EVENTIVA_FEATURE_OBSERVABILITY').pipe(
                Config.withDefault(true)
            ),
            [FeatureFlagKeys.DEVTOOLS]: Config.boolean('EVENTIVA_FEATURE_DEVTOOLS').pipe(Config.withDefault(true)),
            [FeatureFlagKeys.CLUSTER]: Config.boolean('EVENTIVA_FEATURE_CLUSTER').pipe(Config.withDefault(true)),
            [FeatureFlagKeys.ENTITY_ENDPOINTS]: Config.boolean('EVENTIVA_FEATURE_ENTITY_ENDPOINTS').pipe(
                Config.withDefault(true)
            ),
            [FeatureFlagKeys.ENTITY_ENDPOINTS_CLIENT_FETCH]: Config.boolean(
                'EVENTIVA_FEATURE_ENTITY_ENDPOINTS_CLIENT_FETCH'
            ).pipe(Config.withDefault(true)),
            [FeatureFlagKeys.ENTITY_ENDPOINTS_SWAGGER]: Config.boolean(
                'EVENTIVA_FEATURE_ENTITY_ENDPOINTS_SWAGGER'
            ).pipe(Config.withDefault(true)),
            [FeatureFlagKeys.ENTITY_ENDPOINTS_SERVE]: Config.boolean('EVENTIVA_FEATURE_ENTITY_ENDPOINTS_SERVE').pipe(
                Config.withDefault(true)
            ),
            [FeatureFlagKeys.ENTITY_ENDPOINTS_FULL_LAYER_BUILD]: Config.boolean(
                'EVENTIVA_FEATURE_ENTITY_ENDPOINTS_FULL_LAYER_BUILD'
            ).pipe(Config.withDefault(true)),
            [FeatureFlagKeys.ENTITY_ENDPOINTS_FULL_INIT]: Config.boolean(
                'EVENTIVA_FEATURE_ENTITY_ENDPOINTS_FULL_INIT'
            ).pipe(Config.withDefault(true)),
            [FeatureFlagKeys.ENTITY_ENDPOINTS_SHARDING]: Config.boolean(
                'EVENTIVA_FEATURE_ENTITY_ENDPOINTS_SHARDING'
            ).pipe(Config.withDefault(true)),
            [FeatureFlagKeys.ENTITY_ENDPOINTS_TRACING]: Config.boolean(
                'EVENTIVA_FEATURE_ENTITY_ENDPOINTS_TRACING'
            ).pipe(Config.withDefault(true)),
            [FeatureFlagKeys.SCHEMA_STACK]: Config.boolean('EVENTIVA_FEATURE_SCHEMA_STACK').pipe(
                Config.withDefault(true)
            ),
            [FeatureFlagKeys.EXTENSIONS]: Config.boolean('EVENTIVA_FEATURE_EXTENSIONS').pipe(Config.withDefault(true)),
        })
    );
    return Effect.runSync(load);
}

function createPostHogClient(): Option.Option<PostHog> {
    const key = process.env.POSTHOG_API_KEY ?? process.env.POSTHOG_PROJECT_API_KEY;
    if (!key || typeof key !== 'string') return Option.none();
    return Option.some(
        new PostHog(key, {
            host: process.env.POSTHOG_HOST ?? 'https://us.i.posthog.com',
        })
    );
}

/**
 * FeatureFlagsLive: uses PostHog when POSTHOG_API_KEY is set,
 * otherwise falls back to EVENTIVA_FEATURE_* env vars.
 * Use overrides to force values (e.g. for debug).
 */
export function FeatureFlagsLive(overrides?: FeatureFlagOverrides): Layer.Layer<FeatureFlags> {
    return Layer.sync(FeatureFlags, () => {
        const configFlags = loadConfigFlags();
        const posthog = createPostHogClient();
        const distinctId = process.env.EVENTIVA_FEATURE_DISTINCT_ID ?? 'server';

        return {
            isEnabled: (key: FeatureFlagKey) =>
                Effect.gen(function* () {
                    if (overrides && key in overrides) return overrides[key] ?? true;
                    if (Option.isSome(posthog)) {
                        const enabled = yield* Effect.tryPromise({
                            try: () => posthog.value.isFeatureEnabled(key, distinctId),
                            catch: () => new Error('PostHog isFeatureEnabled failed'),
                        }).pipe(Effect.catchAll(() => Effect.succeed(configFlags[key] ?? true)));
                        if (enabled !== undefined) return enabled;
                    }
                    return configFlags[key] ?? true;
                }),
        };
    });
}

/**
 * FeatureFlagsLiveConfigOnly: uses only Effect Config / env vars.
 * Use when PostHog is not configured (e.g. local debug).
 */
export function FeatureFlagsLiveConfigOnly(overrides?: FeatureFlagOverrides): Layer.Layer<FeatureFlags> {
    return Layer.sync(FeatureFlags, () => {
        const configFlags = loadConfigFlags();
        return {
            isEnabled: (key: FeatureFlagKey) =>
                Effect.succeed(overrides && key in overrides ? (overrides[key] ?? true) : (configFlags[key] ?? true)),
        };
    });
}
