/**
 * Cluster models: Odoo-like model definitions using Effect Schema.
 * A model is a named schema (struct); extensions can extend a base model with extra fields.
 * @see docs/plans/2026-03-07-workflows-models-contact-design.md
 */
import * as Schema from 'effect/Schema';

/**
 * Descriptor for a named model. The schema is the single source of truth for the model's shape.
 * Use defineModel to create, extendModel to add fields (e.g. extensions that depend on Contact).
 */
export interface Model<Name extends string, A = unknown> {
    readonly name: Name;
    readonly schema: Schema.Schema<A>;
}

/**
 * Define a model by name and a struct schema. Like Odoo's model class with fields.*.
 * The schema should be a Schema.Struct (or compatible) so it can be extended later.
 */
export function defineModel<Name extends string, A, I = A, R = never>(
    name: Name,
    schema: Schema.Schema<A, I, R>
): Model<Name, A> {
    return { name, schema } as unknown as Model<Name, A>;
}

/**
 * Extend a base model with additional fields. Returns a new schema that includes
 * base model fields plus extra. Use for extensions that depend on an existing model
 * (e.g. extend Contact with companyId).
 * Both base and extra must be struct-like schemas.
 */
export function extendModel<Name extends string, BaseA, ExtraFields extends Record<string, Schema.Schema.All>>(
    baseModel: Model<Name, BaseA>,
    extraSchema: Schema.Schema<ExtraFields>
): Schema.Schema<BaseA & Schema.Schema.Type<ExtraFields>> {
    return Schema.extend(baseModel.schema, extraSchema) as Schema.Schema<BaseA & Schema.Schema.Type<ExtraFields>>;
}
