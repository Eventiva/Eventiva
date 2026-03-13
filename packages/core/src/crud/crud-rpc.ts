/**
 * Core CRUD RPC helpers: create, get, update, list, delete.
 * Extensions provide id + fields schemas and get standard entity RPCs without repeating Rpc.make boilerplate.
 * @see docs/learnings/architecture.md
 */
import * as Rpc from "@effect/rpc/Rpc"
import * as Schema from "effect/Schema"
import { make as entityMake } from "@effect/cluster/Entity"

const notFoundError = <Id>(idSchema: Schema.Schema<Id, any, any>) =>
  Schema.Struct({ _tag: Schema.Literal("NotFound"), id: idSchema })

/**
 * Options for makeCrudRpc / makeCrudEntity. All schemas use Effect Schema.
 * Id and Fields are the decoded (Type) side; Encoded can differ (e.g. DateFromString).
 */
export interface CrudRpcOptions<Id, Fields> {
  /** Schema for the entity ID (e.g. ContactIdSchema from typeIdSchema("contact")). */
  readonly idSchema: Schema.Schema<Id, any, any>
  /** Schema for the entity fields (create payload and get success). */
  readonly fieldsSchema: Schema.Schema<Fields, any, any>
  /** If true, includes a "delete" RPC (payload: { id }, success: void, error: NotFound). Default false. */
  readonly withDelete?: boolean
}

/**
 * Returns standard CRUD RPC definitions: create, get, update, list, and optionally delete.
 * Returns a const tuple so Entity.make preserves specific RPC types for handler and client inference.
 */
export function makeCrudRpc<Id, Fields>(
  options: CrudRpcOptions<Id, Fields>
) {
  const { idSchema, fieldsSchema, withDelete = false } = options
  const patchSchema = Schema.partial(fieldsSchema) as Schema.Schema<Partial<Fields>, any, any>
  // Use fieldsSchema directly for list items (createSelectSchema includes id); avoid extend to prevent id type conflict
  const listItemSchema = fieldsSchema
  const errorNotFound = notFoundError(idSchema)

  const createRpc = Rpc.make("create", {
    payload: fieldsSchema,
    success: Schema.Struct({ id: idSchema })
  })

  const getRpc = Rpc.make("get", {
    payload: Schema.Struct({ id: idSchema }),
    success: fieldsSchema,
    error: errorNotFound
  })

  const updateRpc = Rpc.make("update", {
    payload: Schema.Struct({
      id: idSchema,
      patch: patchSchema
    }),
    success: Schema.Void,
    error: errorNotFound
  })

  const listRpc = Rpc.make("list", {
    payload: Schema.Struct({}),
    success: Schema.Array(listItemSchema)
  })

  if (withDelete) {
    const deleteRpc = Rpc.make("delete", {
      payload: Schema.Struct({ id: idSchema }),
      success: Schema.Void,
      error: errorNotFound
    })
    return [createRpc, getRpc, updateRpc, listRpc, deleteRpc] as const
  }

  return [createRpc, getRpc, updateRpc, listRpc] as const
}

/**
 * Creates an entity with standard CRUD RPCs (create, get, update, list, optional delete).
 * Extension provides the type name and id/fields schemas; handlers are still provided separately via toLayer(handlers).
 */
export function makeCrudEntity<Type extends string, Id, Fields>(
  typeName: Type,
  options: CrudRpcOptions<Id, Fields>
): import("@effect/cluster/Entity").Entity<Type, Rpc.Any> {
  return entityMake(typeName, makeCrudRpc(options)) as unknown as import("@effect/cluster/Entity").Entity<Type, Rpc.Any>
}
