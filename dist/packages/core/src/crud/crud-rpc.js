/**
 * Core CRUD RPC helpers: create, get, update, list, delete.
 * Extensions provide id + fields schemas and get standard entity RPCs without repeating Rpc.make boilerplate.
 * @see docs/learnings/architecture.md
 */
import * as Rpc from "@effect/rpc/Rpc";
import * as Schema from "effect/Schema";
import { make as entityMake } from "@effect/cluster/Entity";
const notFoundError = (idSchema) => Schema.Struct({ _tag: Schema.Literal("NotFound"), id: idSchema });
/**
 * Returns standard CRUD RPC definitions: create, get, update, list, and optionally delete.
 * Returns a const tuple so Entity.make preserves specific RPC types for handler and client inference.
 */
export function makeCrudRpc(options) {
    const { idSchema, fieldsSchema, withDelete = false } = options;
    const patchSchema = Schema.partial(fieldsSchema);
    const listItemSchema = fieldsSchema.pipe(Schema.extend(Schema.Struct({ id: idSchema })));
    const errorNotFound = notFoundError(idSchema);
    const createRpc = Rpc.make("create", {
        payload: fieldsSchema,
        success: Schema.Struct({ id: idSchema })
    });
    const getRpc = Rpc.make("get", {
        payload: Schema.Struct({ id: idSchema }),
        success: fieldsSchema,
        error: errorNotFound
    });
    const updateRpc = Rpc.make("update", {
        payload: Schema.Struct({
            id: idSchema,
            patch: patchSchema
        }),
        success: Schema.Void,
        error: errorNotFound
    });
    const listRpc = Rpc.make("list", {
        payload: Schema.Struct({}),
        success: Schema.Array(listItemSchema)
    });
    if (withDelete) {
        const deleteRpc = Rpc.make("delete", {
            payload: Schema.Struct({ id: idSchema }),
            success: Schema.Void,
            error: errorNotFound
        });
        return [createRpc, getRpc, updateRpc, listRpc, deleteRpc];
    }
    return [createRpc, getRpc, updateRpc, listRpc];
}
/**
 * Creates an entity with standard CRUD RPCs (create, get, update, list, optional delete).
 * Extension provides the type name and id/fields schemas; handlers are still provided separately via toLayer(handlers).
 */
export function makeCrudEntity(typeName, options) {
    return entityMake(typeName, makeCrudRpc(options));
}
