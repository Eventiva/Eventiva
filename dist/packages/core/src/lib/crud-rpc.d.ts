/**
 * Core CRUD RPC helpers: create, get, update, list, delete.
 * Extensions provide id + fields schemas and get standard entity RPCs without repeating Rpc.make boilerplate.
 * @see docs/learnings/architecture.md
 */
import * as Rpc from "@effect/rpc/Rpc";
import * as Schema from "effect/Schema";
/**
 * Options for makeCrudRpc / makeCrudEntity. All schemas use Effect Schema.
 * Id and Fields are the decoded (Type) side; Encoded can differ (e.g. DateFromString).
 */
export interface CrudRpcOptions<Id, Fields> {
    /** Schema for the entity ID (e.g. ContactIdSchema from typeIdSchema("contact")). */
    readonly idSchema: Schema.Schema<Id, any, any>;
    /** Schema for the entity fields (create payload and get success). */
    readonly fieldsSchema: Schema.Schema<Fields, any, any>;
    /** If true, includes a "delete" RPC (payload: { id }, success: void, error: NotFound). Default false. */
    readonly withDelete?: boolean;
}
/**
 * Returns standard CRUD RPC definitions: create, get, update, list, and optionally delete.
 * Returns a const tuple so Entity.make preserves specific RPC types for handler and client inference.
 */
export declare function makeCrudRpc<Id, Fields>(options: CrudRpcOptions<Id, Fields>): readonly [Rpc.Rpc<"create", Schema.Schema<Fields, any, any>, Schema.Struct<{
    id: Schema.Schema<Id, any, any>;
}>, typeof Schema.Never, never>, Rpc.Rpc<"get", Schema.Struct<{
    id: Schema.Schema<Id, any, any>;
}>, Schema.Schema<Fields, any, any>, Schema.Struct<{
    _tag: Schema.Literal<["NotFound"]>;
    id: Schema.Schema<Id, any, any>;
}>, never>, Rpc.Rpc<"update", Schema.Struct<{
    id: Schema.Schema<Id, any, any>;
    patch: Schema.Schema<Partial<Fields>, any, any>;
}>, typeof Schema.Void, Schema.Struct<{
    _tag: Schema.Literal<["NotFound"]>;
    id: Schema.Schema<Id, any, any>;
}>, never>, Rpc.Rpc<"list", Schema.Struct<{}>, Schema.Array$<Schema.extend<Schema.Schema<Fields, any, any>, Schema.Struct<{
    id: Schema.Schema<Id, any, any>;
}>>>, typeof Schema.Never, never>, Rpc.Rpc<"delete", Schema.Struct<{
    id: Schema.Schema<Id, any, any>;
}>, typeof Schema.Void, Schema.Struct<{
    _tag: Schema.Literal<["NotFound"]>;
    id: Schema.Schema<Id, any, any>;
}>, never>] | readonly [Rpc.Rpc<"create", Schema.Schema<Fields, any, any>, Schema.Struct<{
    id: Schema.Schema<Id, any, any>;
}>, typeof Schema.Never, never>, Rpc.Rpc<"get", Schema.Struct<{
    id: Schema.Schema<Id, any, any>;
}>, Schema.Schema<Fields, any, any>, Schema.Struct<{
    _tag: Schema.Literal<["NotFound"]>;
    id: Schema.Schema<Id, any, any>;
}>, never>, Rpc.Rpc<"update", Schema.Struct<{
    id: Schema.Schema<Id, any, any>;
    patch: Schema.Schema<Partial<Fields>, any, any>;
}>, typeof Schema.Void, Schema.Struct<{
    _tag: Schema.Literal<["NotFound"]>;
    id: Schema.Schema<Id, any, any>;
}>, never>, Rpc.Rpc<"list", Schema.Struct<{}>, Schema.Array$<Schema.extend<Schema.Schema<Fields, any, any>, Schema.Struct<{
    id: Schema.Schema<Id, any, any>;
}>>>, typeof Schema.Never, never>];
/**
 * Creates an entity with standard CRUD RPCs (create, get, update, list, optional delete).
 * Extension provides the type name and id/fields schemas; handlers are still provided separately via toLayer(handlers).
 */
export declare function makeCrudEntity<Type extends string, Id, Fields>(typeName: Type, options: CrudRpcOptions<Id, Fields>): import("@effect/cluster/Entity").Entity<Type, Rpc.Any>;
//# sourceMappingURL=crud-rpc.d.ts.map