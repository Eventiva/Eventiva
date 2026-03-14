import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
/** Flag keys used for platform feature toggles. */
export declare const FeatureFlagKeys: {
    readonly OBSERVABILITY: "eventiva-observability";
    readonly DEVTOOLS: "eventiva-devtools";
    readonly CLUSTER: "eventiva-cluster";
    readonly ENTITY_ENDPOINTS: "eventiva-entity-endpoints";
    /** Within entity endpoints: fetch entity.client for each descriptor (Sharding). */
    readonly ENTITY_ENDPOINTS_CLIENT_FETCH: "eventiva-entity-endpoints-client-fetch";
    /** Within entity endpoints: HttpApiSwagger at /api/docs. */
    readonly ENTITY_ENDPOINTS_SWAGGER: "eventiva-entity-endpoints-swagger";
    /** Within entity endpoints: HttpApiBuilder.serve (mount API routes). */
    readonly ENTITY_ENDPOINTS_SERVE: "eventiva-entity-endpoints-serve";
    /** Within entity endpoints: skip Layer.build(fullServerLayer) – use minimal server instead (debug). */
    readonly ENTITY_ENDPOINTS_FULL_LAYER_BUILD: "eventiva-entity-endpoints-full-layer-build";
    /** Within entity endpoints: skip Sharding + entity setup + apiLayer – minimal init (debug). */
    readonly ENTITY_ENDPOINTS_FULL_INIT: "eventiva-entity-endpoints-full-init";
    /** Within entity endpoints: skip yield* Sharding.Sharding (debug). */
    readonly ENTITY_ENDPOINTS_SHARDING: "eventiva-entity-endpoints-sharding";
    /** Within entity endpoints: skip withSpanAndLog wrapper (debug tracer). */
    readonly ENTITY_ENDPOINTS_TRACING: "eventiva-entity-endpoints-tracing";
    readonly SCHEMA_STACK: "eventiva-schema-stack";
    readonly EXTENSIONS: "eventiva-extensions";
};
export type FeatureFlagKey = (typeof FeatureFlagKeys)[keyof typeof FeatureFlagKeys];
/** Override map for programmatic toggling (e.g. debug scripts). */
export type FeatureFlagOverrides = Partial<Record<FeatureFlagKey, boolean>>;
export interface FeatureFlags {
    readonly isEnabled: (key: FeatureFlagKey) => Effect.Effect<boolean>;
}
export declare const FeatureFlags: Context.Tag<FeatureFlags, FeatureFlags>;
/**
 * FeatureFlagsLive: uses PostHog when POSTHOG_API_KEY is set,
 * otherwise falls back to EVENTIVA_FEATURE_* env vars.
 * Use overrides to force values (e.g. for debug).
 */
export declare function FeatureFlagsLive(overrides?: FeatureFlagOverrides): Layer.Layer<FeatureFlags>;
/**
 * FeatureFlagsLiveConfigOnly: uses only Effect Config / env vars.
 * Use when PostHog is not configured (e.g. local debug).
 */
export declare function FeatureFlagsLiveConfigOnly(overrides?: FeatureFlagOverrides): Layer.Layer<FeatureFlags>;
//# sourceMappingURL=feature-flags.d.ts.map