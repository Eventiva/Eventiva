import * as Schema from "effect/Schema";
/**
 * Global interface for module augmentation.
 * Extensions should augment this interface to register their entities.
 *
 * @example
 * declare module "@eventiva/core" {
 *   interface RegisteredEntities {
 *     Contact: typeof Contact
 *   }
 * }
 */
export interface RegisteredEntities {
}
/**
 * EntityRegistry provides a central container for dynamically generated entities.
 * This resolves circular dependency issues by allowing entities to be retrieved by name.
 */
export declare const EntityRegistry: {
    /**
     * Get a fully constructed entity by its registered name.
     * Throws an error if the entity hasn't been registered yet.
     */
    get: <K extends keyof RegisteredEntities>(name: K) => RegisteredEntities[K];
    /**
     * Register a fully constructed entity.
     */
    register: <K extends keyof RegisteredEntities>(name: K, entity: RegisteredEntities[K]) => void;
    /**
     * Get all registered entities.
     */
    getAll: () => ReadonlyMap<string, unknown>;
    /**
     * A helper for creating lazy Schema references to entities to avoid module import cycles.
     * Internally uses `Schema.suspend`.
     *
     * @example
     * aliases: Schema.optional(Schema.NullOr(
     *   Schema.Array(EntityRegistry.lazy<BrandAlias, BrandAliasEncoded>("BrandAlias"))
     * ))
     */
    lazy: <Type, Encoded = never>(name: keyof RegisteredEntities) => Schema.Schema<Type, Encoded>;
};
//# sourceMappingURL=entity-registry.d.ts.map