/**
 * Extension registry: merge entity layers and runner profiles.
 * Pure Layer merge—no Bit slots. A runner process is configured with a profile (named set of entity layers).
 */
import type * as Layer from 'effect/Layer';
import * as LayerMerge from 'effect/Layer';

/**
 * An extension layer is a Layer that provides entity handlers (and typically requires
 * ExtensionHooks, Scope, Sharding, Logger, Tracer, Metric). Each extension exports one such layer.
 * Requirements (R) and error (E) are often unknown when layers use subscribe-style hooks.
 */
export type ExtensionLayer = Layer.Layer<never, unknown, unknown>;
/** Optional config layer exported by an extension and loaded at platform startup. */
export type ExtensionConfigLayer = Layer.Layer<never, unknown, unknown>;

/** Extension registration used by platform templates. */
export interface ExtensionRegistration {
    readonly id: string;
    readonly layer: ExtensionLayer;
    readonly configLayer?: ExtensionConfigLayer;
}

/**
 * Type for a list of extension layers (runner profile). Use with createPlatformTemplate options.
 */
export type DefaultRunnerProfile = ReadonlyArray<ExtensionLayer>;

/**
 * Merges an array of entity/extension layers into a single Layer.
 * Use this to compose the set of extensions that a runner process hosts.
 */
export function mergeEntityLayers(layers: ReadonlyArray<ExtensionLayer>): Layer.Layer<never, never, unknown> {
    if (layers.length === 0) return LayerMerge.empty;
    if (layers.length === 1) return layers[0] as unknown as Layer.Layer<never, never, unknown>;
    return LayerMerge.mergeAll(layers[0], layers[1], ...layers.slice(2)) as unknown as Layer.Layer<
        never,
        never,
        unknown
    >;
}

/**
 * Merges extension config layers so they can be provided by the platform before
 * extension entities and startup hooks run.
 */
export function mergeConfigLayers(layers: ReadonlyArray<ExtensionConfigLayer>): Layer.Layer<never, never, unknown> {
    if (layers.length === 0) return LayerMerge.empty;
    if (layers.length === 1) return layers[0] as unknown as Layer.Layer<never, never, unknown>;
    return LayerMerge.mergeAll(layers[0], layers[1], ...layers.slice(2)) as unknown as Layer.Layer<
        never,
        never,
        unknown
    >;
}

/**
 * A runner profile is a named set of entity layers. A runner process is configured
 * with a profile and only loads those extensions (e.g. "default", "transforms-only").
 */
export interface RunnerProfile {
    readonly name: string;
    readonly entityLayers: ReadonlyArray<ExtensionLayer>;
}

/**
 * Build a single Layer from a runner profile (merge of its entity layers).
 */
export function profileToLayer(profile: RunnerProfile): Layer.Layer<never, never, unknown> {
    return mergeEntityLayers(profile.entityLayers);
}

/** Registry of known profiles by name. */
const profiles = new Map<string, RunnerProfile>();

/**
 * Register a runner profile. Later, a runner can be started with a profile name
 * and the corresponding entity layers will be merged.
 */
export function registerProfile(profile: RunnerProfile): void {
    profiles.set(profile.name, profile);
}

/**
 * Get a runner profile by name.
 */
export function getProfile(name: string): RunnerProfile | undefined {
    return profiles.get(name);
}
