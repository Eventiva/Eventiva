/**
 * createEntity: single entry point for entity abstraction. Builds CRUD RPC + Database-backed handlers,
 * returns Entity and Layer. Extension only merges the layer; platform must provide Database layer.
 * @see docs/learnings/architecture.md
 */
import type { Entity } from "@effect/cluster/Entity";
import type { Layer } from "effect/Layer";
import * as Schema from "effect/Schema";
import { Database } from "./database.js";
import { typeIdSchema } from "./typeid-schema.js";
/**
 * Options for createEntity. Schema is the fields-only schema (no id); id is derived from name (lowercase prefix).
 */
export interface CreateEntityOptions<Fields extends Record<string, unknown>> {
    /** Entity type name (e.g. "Contact"). Used as type and default table name. */
    readonly name: string;
    /** Effect Schema for entity fields (create payload, get success). Id is added automatically. */
    readonly schema: Schema.Schema<Fields, any, any>;
    /** Table name for Database get/set/delete/list. Defaults to name. */
    readonly tableName?: string;
    /** If true, includes delete RPC and handler. Default false. */
    readonly withDelete?: boolean;
}
/**
 * Result of createEntity: entity and layer.
 * - Extension only merges this layer when composing the program.
 * - Platform must provide the Database layer when building the program (e.g. DatabaseLiveInMemory or PgDrizzle from database-pg).
 */
export interface CreateEntityResult<Type extends string, Id, Fields extends Record<string, unknown>, RpcUnion extends import("@effect/rpc/Rpc").Any> {
    readonly entity: Entity<Type, RpcUnion>;
    /** Layer requires Database (and any schema context, e.g. PiiEncryption). Merge when building the program. */
    readonly layer: Layer<never, never, Database>;
}
/**
 * Creates an entity with CRUD RPC and Database-backed handlers. Derives idSchema from name (lowercase),
 * builds recordSchema as { id, ...schema }, and uses makeCrudHandlersFromDatabase. No store parameter.
 * Extension only merges the returned layer; the platform must provide the Database layer when building the program.
 */
export declare function createEntity<Fields extends Record<string, unknown>>(options: CreateEntityOptions<Fields>): CreateEntityResult<string, Schema.Schema.Type<ReturnType<typeof typeIdSchema>>, Fields, import("@effect/rpc/Rpc").Any>;
//# sourceMappingURL=create-entity.d.ts.map