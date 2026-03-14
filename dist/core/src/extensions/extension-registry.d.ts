/**
 * Extension registry: merge entity layers and runner profiles.
 * Pure Layer merge—no Bit slots. A runner process is configured with a profile (named set of entity layers).
 */
import type * as Layer from 'effect/Layer';
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
export declare function mergeEntityLayers(layers: ReadonlyArray<ExtensionLayer>): Layer.Layer<never, never, unknown>;
/**
 * Merges extension config layers so they can be provided by the platform before
 * extension entities and startup hooks run.
 */
export declare function mergeConfigLayers(layers: ReadonlyArray<ExtensionConfigLayer>): Layer.Layer<never, never, unknown>;
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
export declare function profileToLayer(profile: RunnerProfile): Layer.Layer<never, never, unknown>;
/**
 * Register a runner profile. Later, a runner can be started with a profile name
 * and the corresponding entity layers will be merged.
 */
export declare function registerProfile(profile: RunnerProfile): void;
/**
 * Get a runner profile by name.
 */
export declare function getProfile(name: string): RunnerProfile | undefined;
//# sourceMappingURL=extension-registry.d.ts.map