/**
 * Cluster models: Odoo-like model definitions using Effect Schema.
 * A model is a named schema (struct); extensions can extend a base model with extra fields.
 * @see docs/plans/2026-03-07-workflows-models-contact-design.md
 */
import * as Schema from "effect/Schema";
/**
 * Define a model by name and a struct schema. Like Odoo's model class with fields.*.
 * The schema should be a Schema.Struct (or compatible) so it can be extended later.
 */
export function defineModel(name, schema) {
    return { name, schema };
}
/**
 * Extend a base model with additional fields. Returns a new schema that includes
 * base model fields plus extra. Use for extensions that depend on an existing model
 * (e.g. extend Contact with companyId).
 * Both base and extra must be struct-like schemas.
 */
export function extendModel(baseModel, extraSchema) {
    return Schema.extend(baseModel.schema, extraSchema);
}
