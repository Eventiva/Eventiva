import * as Schema from "effect/Schema";
// Internal mutable map to hold fully constructed entities.
// Populated during the core startup phase.
const entityMap = new Map();
/**
 * EntityRegistry provides a central container for dynamically generated entities.
 * This resolves circular dependency issues by allowing entities to be retrieved by name.
 */
export const EntityRegistry = {
    /**
     * Get a fully constructed entity by its registered name.
     * Throws an error if the entity hasn't been registered yet.
     */
    get: (name) => {
        const entity = entityMap.get(name);
        if (!entity) {
            throw new Error(`Entity ${name} not found in EntityRegistry. Make sure it is registered during core startup.`);
        }
        return entity;
    },
    /**
     * Try to get an entity by name. Returns undefined if not registered (e.g. placeholder table skipped).
     */
    tryGet: (name) => {
        return entityMap.get(name);
    },
    /**
     * Register a fully constructed entity.
     */
    register: (name, entity) => {
        entityMap.set(name, entity);
    },
    /**
     * Get all registered entities.
     */
    getAll: () => {
        return entityMap;
    },
    /**
     * A helper for creating lazy Schema references to entities to avoid module import cycles.
     * Internally uses `Schema.suspend`.
     *
     * @example
     * aliases: Schema.optional(Schema.NullOr(
     *   Schema.Array(EntityRegistry.lazy<BrandAlias, BrandAliasEncoded>("BrandAlias"))
     * ))
     */
    lazy: (name) => {
        return Schema.suspend(() => {
            const entity = EntityRegistry.get(name);
            // Assuming the entity itself acts as a Schema (which is true for our Base() classes)
            return entity;
        }).annotations({ identifier: name });
    }
};
