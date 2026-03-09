import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { makeCrudEntity } from "../crud/crud-rpc.js";
import { makeCrudHandlersFromDatabase } from "../crud/crud-handlers.js";
import { runWithExtensions } from "./entity-method-extensions.js";
import { typeId, typeIdSchema } from "../schema/typeid-schema.js";
/**
 * Returns a class that extends Schema.Class with id + fields, and provides static entity, layer,
 * idSchema, fieldsSchema, recordSchema, insertSchema, and CRUD handlers wired to Database.
 * Types are derived from the fields schema (FieldsType, FieldsEncoded, Id, RecordType); handlers
 * preserve their Request/Effect types.
 *
 * Usage:
 *   export class Contact extends Base<Contact>()("Contact", {
 *     fullname: Schema.String,
 *     dateOfBirth: Schema.DateFromString,
 *     email: encryptedString,
 *     phone: Schema.String
 *   }, { withDelete: true }) {}
 *   export const ContactEntity = Contact.entity
 *   export const ContactLayer = Contact.layer
 */
export function Base() {
    return (name, fieldsSchema, options) => {
        const tableName = options?.tableName ?? name;
        const prefix = name.toLowerCase();
        const idSchema = typeIdSchema(prefix);
        const withDelete = options?.withDelete ?? false;
        const allFields = { id: idSchema, ...fieldsSchema.fields };
        const BaseSchema = Schema.Class(name)(allFields);
        const entity = makeCrudEntity(name, {
            idSchema,
            fieldsSchema: fieldsSchema,
            withDelete
        });
        const handlers = makeCrudHandlersFromDatabase({
            entityType: name,
            tableName,
            idSchema,
            fieldsSchema: fieldsSchema,
            recordSchema: BaseSchema,
            genId: () => typeId(prefix),
            withDelete,
            _rpcUnion: undefined
        });
        const wrap = (method, h) => (req) => runWithExtensions(name, method, h, req);
        const wrappedHandlers = {
            create: wrap("create", handlers.create),
            get: wrap("get", handlers.get),
            update: wrap("update", handlers.update),
            list: wrap("list", handlers.list),
            ...(withDelete
                ? { delete: wrap("delete", handlers.delete) }
                : {})
        };
        const layer = entity.toLayer(Effect.succeed(wrappedHandlers));
        const insertSchema = fieldsSchema;
        const partialSchema = Schema.partial(fieldsSchema);
        const statics = {
            name,
            tableName,
            idSchema,
            fieldsSchema,
            recordSchema: BaseSchema,
            insertSchema,
            partialSchema,
            withDelete,
            entity: entity,
            layer: layer,
            client: entity.client
        };
        const EntityClass = class extends BaseSchema {
        };
        for (const [k, v] of Object.entries(statics)) {
            if (k === "name") {
                Object.defineProperty(EntityClass, "name", { value: v, configurable: true });
            }
            else {
                EntityClass[k] = v;
            }
        }
        return EntityClass;
    };
}
