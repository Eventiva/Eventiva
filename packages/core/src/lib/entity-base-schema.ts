/**
 * Base Effect Schema fields for entities: id (typeid), timestamps, createdBy, status.
 * Extensions compose these with their own fields. Use with createEntity and table builder.
 * @see docs/learnings/architecture.md
 */
import * as Schema from "effect/Schema"
import { typeIdSchema } from "./typeid-schema.js"

/** Status for soft delete / disable: active | inactive. */
export const statusEnum = Schema.Union(
  Schema.Literal("active"),
  Schema.Literal("inactive")
)
export type Status = Schema.Schema.Type<typeof statusEnum>

/**
 * Id schema for an entity table. Use the entity's type prefix (e.g. "contact").
 * Wraps typeIdSchema(prefix).
 */
export function baseIdSchema<Prefix extends string>(prefix: Prefix) {
  return typeIdSchema(prefix)
}

/** ISO date string (API/stored). Use for createdAt, updatedAt. */
export const createdAtSchema = Schema.DateFromString
/** ISO date string (API/stored). Use for updatedAt. */
export const updatedAtSchema = Schema.DateFromString
/** Optional ISO date; set when record is soft-deleted. */
export const deletedAtSchema = Schema.optional(Schema.DateFromString)
/** Optional ISO date; set when record is disabled. */
export const disabledAtSchema = Schema.optional(Schema.DateFromString)
/** Optional creator identifier (e.g. user id). */
export const createdBySchema = Schema.optional(Schema.String)

/** Struct of standard base fields (no id). Compose with extension fields via Schema.extend. */
export const baseFieldsSchema = Schema.Struct({
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema,
  deletedAt: deletedAtSchema,
  disabledAt: disabledAtSchema,
  createdBy: createdBySchema,
  status: statusEnum
})
export type BaseFields = Schema.Schema.Type<typeof baseFieldsSchema>
