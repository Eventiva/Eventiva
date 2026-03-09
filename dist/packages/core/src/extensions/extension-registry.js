import * as LayerMerge from "effect/Layer";
/**
 * Merges an array of entity/extension layers into a single Layer.
 * Use this to compose the set of extensions that a runner process hosts.
 */
export function mergeEntityLayers(layers) {
    if (layers.length === 0)
        return LayerMerge.empty;
    if (layers.length === 1)
        return layers[0];
    return LayerMerge.mergeAll(layers[0], layers[1], ...layers.slice(2));
}
/**
 * Build a single Layer from a runner profile (merge of its entity layers).
 */
export function profileToLayer(profile) {
    return mergeEntityLayers(profile.entityLayers);
}
/** Registry of known profiles by name. */
const profiles = new Map();
/**
 * Register a runner profile. Later, a runner can be started with a profile name
 * and the corresponding entity layers will be merged.
 */
export function registerProfile(profile) {
    profiles.set(profile.name, profile);
}
/**
 * Get a runner profile by name.
 */
export function getProfile(name) {
    return profiles.get(name);
}
