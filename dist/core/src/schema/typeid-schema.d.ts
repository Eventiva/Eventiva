/**
 * TypeID schema for Effect: type-safe, K-sortable identifiers with a type prefix.
 * Uses typeid-js; decode validates format and prefix, encode is identity (string).
 * Use typeIdSchema(prefix) in model fields and typeId(prefix) to generate new IDs.
 * @see https://github.com/jetify-com/typeid-js
 */
import * as Schema from 'effect/Schema';
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
export declare function typeIdSchema<Prefix extends string>(prefix: Prefix): Schema.Schema<`${Prefix}_${string}`, string>;
/**
 * Generate a new TypeID string for the given prefix.
 * Use when creating entities (e.g. contact create handler).
 */
export declare function typeId<Prefix extends string>(prefix: Prefix): `${Prefix}_${string}`;
//# sourceMappingURL=typeid-schema.d.ts.map