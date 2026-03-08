/**
 * Base Effect Schema fields for entities: id (typeid), timestamps, createdBy, status.
 * Extensions compose these with their own fields. Use with createEntity and table builder.
 * @see docs/learnings/architecture.md
 */
import * as Schema from "effect/Schema";
/** Status for soft delete / disable: active | inactive. */
export declare const statusEnum: Schema.Union<[Schema.Literal<["active"]>, Schema.Literal<["inactive"]>]>;
export type Status = Schema.Schema.Type<typeof statusEnum>;
/**
 * Id schema for an entity table. Use the entity's type prefix (e.g. "contact").
 * Wraps typeIdSchema(prefix).
 */
export declare function baseIdSchema<Prefix extends string>(prefix: Prefix): Schema.Schema<`${Prefix}_${string}`, string, never>;
/** ISO date string (API/stored). Use for createdAt, updatedAt. */
export declare const createdAtSchema: typeof Schema.DateFromString;
/** ISO date string (API/stored). Use for updatedAt. */
export declare const updatedAtSchema: typeof Schema.DateFromString;
/** Optional ISO date; set when record is soft-deleted. */
export declare const deletedAtSchema: Schema.optional<typeof Schema.DateFromString>;
/** Optional ISO date; set when record is disabled. */
export declare const disabledAtSchema: Schema.optional<typeof Schema.DateFromString>;
/** Optional creator identifier (e.g. user id). */
export declare const createdBySchema: Schema.optional<typeof Schema.String>;
/** Struct of standard base fields (no id). Compose with extension fields via Schema.extend. */
export declare const baseFieldsSchema: Schema.Struct<{
    createdAt: typeof Schema.DateFromString;
    updatedAt: typeof Schema.DateFromString;
    deletedAt: Schema.optional<typeof Schema.DateFromString>;
    disabledAt: Schema.optional<typeof Schema.DateFromString>;
    createdBy: Schema.optional<typeof Schema.String>;
    status: Schema.Union<[Schema.Literal<["active"]>, Schema.Literal<["inactive"]>]>;
}>;
export type BaseFields = Schema.Schema.Type<typeof baseFieldsSchema>;
//# sourceMappingURL=entity-base-schema.d.ts.map