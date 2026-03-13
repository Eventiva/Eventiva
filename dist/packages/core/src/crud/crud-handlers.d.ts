/**
 * Core CRUD handlers: generic create, get, update, list, delete.
 * Two modes: (1) makeCrudHandlers uses storeTag + getRef (Ref<Map>). (2) makeCrudHandlersFromDatabase uses Database service and schema encode/decode; platform provides Database layer.
 * @see docs/learnings/architecture.md, docs/learnings/conventions.md (Type safety)
 */
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Ref from 'effect/Ref';
import * as Schema from 'effect/Schema';
import type { Request } from '@effect/cluster/Entity';
import type { ExtractTag } from '@effect/rpc/Rpc';
import { Database } from '../database/database.js';
/** NotFound error shape for CRUD get/update/delete. */
export interface NotFound<Id> {
    readonly _tag: 'NotFound';
    readonly id: Id;
}
/**
 * Options for makeCrudHandlers. Extensions provide store access, encode/decode (e.g. for PII), and id generation.
 * Store can be any service that exposes getRef: Ref<Map<Id, StoredRecord>> (e.g. via getRef(store)).
 */
export interface CrudHandlersOptions<Id, Fields, StoredRecord, Store, RpcUnion extends import('@effect/rpc/Rpc').Any> {
    /** Entity type name (e.g. "Contact") for spans and metrics. */
    readonly entityType: string;
    /** Context tag for the store service. Use a tag that provides Store (e.g. Context.GenericTag<Store>(...)). Accepts tags with any error type (yield result cast to Store). */
    readonly storeTag: Context.Tag<Store, unknown>;
    /** Get Ref<Map<Id, StoredRecord>> from the store. */
    readonly getRef: (store: Store) => Ref.Ref<Map<Id, StoredRecord>>;
    /** Decode stored record to API fields (e.g. decrypt PII). Must not expose errors (use catchAll/mapError so handler error channel stays NotFound only). */
    readonly decode: (stored: StoredRecord) => Effect.Effect<Fields, never, unknown>;
    /** Encode API fields to stored record (e.g. encrypt PII). For update, existing is the current record and patch is the partial update. Must not expose errors. */
    readonly encode: (fields: Fields, existing?: StoredRecord, patch?: Partial<Fields>) => Effect.Effect<StoredRecord, never, unknown>;
    /** Generate a new id for create. */
    readonly genId: () => Id;
    /** Include delete handler. Must match entity's withDelete. */
    readonly withDelete?: boolean;
    /** RPC union type from the entity (Contact["protocol"] extends RpcGroup<infer R> ? R : never) for handler typing. */
    readonly _rpcUnion?: RpcUnion;
}
/**
 * Builds standard CRUD handlers (create, get, update, list, delete) from a store, encode/decode, and genId.
 * Extension only supplies these; all CRUD logic lives in core.
 */
export declare function makeCrudHandlers<Id, Fields extends Record<string, unknown>, StoredRecord extends {
    readonly id: Id;
}, Store, RpcUnion extends import('@effect/rpc/Rpc').Any>(options: CrudHandlersOptions<Id, Fields, StoredRecord, Store, RpcUnion>): {
    create: (req: Request<ExtractTag<RpcUnion, 'create'>>) => Effect.Effect<{
        id: Id;
    }, never, Store | unknown>;
    get: (req: Request<ExtractTag<RpcUnion, 'get'>>) => Effect.Effect<Fields, NotFound<Id>, Store | unknown>;
    update: (req: Request<ExtractTag<RpcUnion, 'update'>>) => Effect.Effect<void, NotFound<Id>, Store | unknown>;
    list: (req: Request<ExtractTag<RpcUnion, 'list'>>) => Effect.Effect<ReadonlyArray<Fields & {
        readonly id: Id;
    }>, never, Store | unknown>;
    delete: (req: Request<ExtractTag<RpcUnion, 'delete'>>) => Effect.Effect<void, NotFound<Id>, Store>;
};
/**
 * Options for makeCrudHandlersFromDatabase. Handlers require Database in context.
 * tableName identifies the entity table; recordSchema is used for encode/decode (e.g. with Schema.encryptedString for PII).
 */
export interface CrudHandlersOptionsWithDatabase<Id, Fields extends Record<string, unknown>, EntityRecord extends {
    readonly id: Id;
} & Fields, Encoded extends Record<string, unknown> & {
    readonly id: unknown;
}, RpcUnion extends import('@effect/rpc/Rpc').Any> {
    readonly entityType: string;
    readonly tableName: string;
    readonly idSchema: Schema.Schema<Id, any, any>;
    /** Schema for the entity fields (create payload and get success). Context allowed (e.g. PiiEncryption). */
    readonly fieldsSchema: Schema.Schema<Fields, any, any>;
    /** Full record schema (id + fields). Decode: stored -> EntityRecord. Encode: EntityRecord -> stored. Use for schema-level encryption. */
    readonly recordSchema: Schema.Schema<EntityRecord, Encoded, any>;
    readonly genId: () => Id;
    readonly withDelete?: boolean;
    readonly _rpcUnion?: RpcUnion;
}
/**
 * Builds CRUD handlers that use the Database service (from context) and schema encode/decode.
 * No storeTag/getRef; platform must provide Database layer when building the program.
 */
export declare function makeCrudHandlersFromDatabase<Id, Fields extends Record<string, unknown>, EntityRecord extends {
    readonly id: Id;
} & Fields, Encoded extends Record<string, unknown> & {
    readonly id: unknown;
}, RpcUnion extends import('@effect/rpc/Rpc').Any>(options: CrudHandlersOptionsWithDatabase<Id, Fields, EntityRecord, Encoded, RpcUnion>): {
    create: (req: Request<ExtractTag<RpcUnion, 'create'>>) => Effect.Effect<{
        id: Id;
    }, never, Database | unknown>;
    get: (req: Request<ExtractTag<RpcUnion, 'get'>>) => Effect.Effect<Fields, NotFound<Id>, Database | unknown>;
    update: (req: Request<ExtractTag<RpcUnion, 'update'>>) => Effect.Effect<void, NotFound<Id>, Database | unknown>;
    list: (req: Request<ExtractTag<RpcUnion, 'list'>>) => Effect.Effect<ReadonlyArray<Fields & {
        readonly id: Id;
    }>, never, Database | unknown>;
    delete: (req: Request<ExtractTag<RpcUnion, 'delete'>>) => Effect.Effect<void, NotFound<Id>, Database>;
};
//# sourceMappingURL=crud-handlers.d.ts.map