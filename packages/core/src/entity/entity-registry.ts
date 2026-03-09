import * as Schema from "effect/Schema"

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
export interface RegisteredEntities {}

// Internal mutable map to hold fully constructed entities.
// Populated during the core startup phase.
const entityMap = new Map<string, unknown>()

/**
 * EntityRegistry provides a central container for dynamically generated entities.
 * This resolves circular dependency issues by allowing entities to be retrieved by name.
 */
export const EntityRegistry = {
  /**
   * Get a fully constructed entity by its registered name.
   * Throws an error if the entity hasn't been registered yet.
   */
  get: <K extends keyof RegisteredEntities>(name: K): RegisteredEntities[K] => {
    const entity = entityMap.get(name as string)
    if (!entity) {
      throw new Error(`Entity ${name as string} not found in EntityRegistry. Make sure it is registered during core startup.`)
    }
    return entity as RegisteredEntities[K]
  },

  /**
   * Try to get an entity by name. Returns undefined if not registered (e.g. placeholder table skipped).
   */
  tryGet: <K extends keyof RegisteredEntities>(name: K): RegisteredEntities[K] | undefined => {
    return entityMap.get(name as string) as RegisteredEntities[K] | undefined
  },

  /**
   * Register a fully constructed entity.
   */
  register: <K extends keyof RegisteredEntities>(name: K, entity: RegisteredEntities[K]): void => {
    entityMap.set(name as string, entity)
  },

  /**
   * Get all registered entities.
   */
  getAll: (): ReadonlyMap<string, unknown> => {
    return entityMap
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
  lazy: <Type, Encoded = never>(name: keyof RegisteredEntities): Schema.Schema<Type, Encoded> => {
    return Schema.suspend(() => {
      const entity = EntityRegistry.get(name) as any
      // Assuming the entity itself acts as a Schema (which is true for our Base() classes)
      return entity as Schema.Schema<Type, Encoded>
    }).annotations({ identifier: name as string })
  }
}
