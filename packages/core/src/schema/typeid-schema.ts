/**
 * TypeID schema for Effect: type-safe, K-sortable identifiers with a type prefix.
 * Uses typeid-js; decode validates format and prefix, encode is identity (string).
 * Use typeIdSchema(prefix) in model fields and typeId(prefix) to generate new IDs.
 * @see https://github.com/jetify-com/typeid-js
 */
import * as Schema from "effect/Schema"
import { TypeID, typeid } from "typeid-js"

/**
 * Returns an Effect Schema for a TypeID string with the given prefix.
 * Decode: validates that the string is a valid TypeID and has the expected prefix.
 * Encode: identity (TypeID strings are already JSON-safe).
 *
 * Type: `${Prefix}_${string}` so you get type safety when passing IDs between
 * entities (e.g. contact_01h2xcejqtf2nbrexx3vqjhp41 cannot be used where user_... is expected).
 *
 * @param prefix - The type prefix (e.g. "contact", "user"). Lowercase letters only, max 63 chars per TypeID spec.
 */
export function typeIdSchema<Prefix extends string>(
  prefix: Prefix
): Schema.Schema<`${Prefix}_${string}`, string> {
  function isValid(s: string): s is `${Prefix}_${string}` {
    if (s.length === 0) return false
    try {
      const t = TypeID.fromString(s, prefix)
      return t.getType() === prefix
    } catch {
      return false
    }
  }
  return Schema.String.pipe(
    Schema.filter((s: string, _opts, _ast): s is `${Prefix}_${string}` => isValid(s), {
      message: () =>
        `Expected TypeID with prefix '${prefix}' (e.g. ${prefix}_01h2xcejqtf2nbrexx3vqjhp41)`
    })
  )
}

/**
 * Generate a new TypeID string for the given prefix.
 * Use when creating entities (e.g. contact create handler).
 */
export function typeId<Prefix extends string>(prefix: Prefix): `${Prefix}_${string}` {
  return typeid(prefix).toString() as `${Prefix}_${string}`
}
