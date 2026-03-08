/**
 * Core CRUD handlers: generic create, get, update, list, delete.
 * Two modes: (1) makeCrudHandlers uses storeTag + getRef (Ref<Map>). (2) makeCrudHandlersFromDatabase uses Database service and schema encode/decode; platform provides Database layer.
 * @see docs/learnings/architecture.md, docs/learnings/conventions.md (Type safety)
 */
import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import * as Metric from "effect/Metric"
import * as Ref from "effect/Ref"
import * as Schema from "effect/Schema"
import type { Request } from "@effect/cluster/Entity"
import type { ExtractTag } from "@effect/rpc/Rpc"
import { Database } from "./database.js"
import { withSpanAndLog } from "../observability/helpers.js"

/** NotFound error shape for CRUD get/update/delete. */
export interface NotFound<Id> {
  readonly _tag: "NotFound"
  readonly id: Id
}

/**
 * Options for makeCrudHandlers. Extensions provide store access, encode/decode (e.g. for PII), and id generation.
 * Store can be any service that exposes getRef: Ref<Map<Id, StoredRecord>> (e.g. via getRef(store)).
 */
export interface CrudHandlersOptions<
  Id,
  Fields,
  StoredRecord,
  Store,
  RpcUnion extends import("@effect/rpc/Rpc").Any
> {
  /** Entity type name (e.g. "Contact") for spans and metrics. */
  readonly entityType: string
  /** Context tag for the store service. Use a tag that provides Store (e.g. Context.GenericTag<Store>(...)). Accepts tags with any error type (yield result cast to Store). */
  readonly storeTag: Context.Tag<Store, unknown>
  /** Get Ref<Map<Id, StoredRecord>> from the store. */
  readonly getRef: (store: Store) => Ref.Ref<Map<Id, StoredRecord>>
  /** Decode stored record to API fields (e.g. decrypt PII). Must not expose errors (use catchAll/mapError so handler error channel stays NotFound only). */
  readonly decode: (stored: StoredRecord) => Effect.Effect<Fields, never, unknown>
  /** Encode API fields to stored record (e.g. encrypt PII). For update, existing is the current record and patch is the partial update. Must not expose errors. */
  readonly encode: (
    fields: Fields,
    existing?: StoredRecord,
    patch?: Partial<Fields>
  ) => Effect.Effect<StoredRecord, never, unknown>
  /** Generate a new id for create. */
  readonly genId: () => Id
  /** Include delete handler. Must match entity's withDelete. */
  readonly withDelete?: boolean
  /** RPC union type from the entity (Contact["protocol"] extends RpcGroup<infer R> ? R : never) for handler typing. */
  readonly _rpcUnion?: RpcUnion
}

function createCounter(entityType: string, method: string) {
  return Metric.counter(`${entityType.toLowerCase()}.${method}.count`, {
    description: `Number of ${entityType} ${method} RPCs`
  })
}

/**
 * Builds standard CRUD handlers (create, get, update, list, delete) from a store, encode/decode, and genId.
 * Extension only supplies these; all CRUD logic lives in core.
 */
export function makeCrudHandlers<
  Id,
  Fields extends Record<string, unknown>,
  StoredRecord extends { readonly id: Id },
  Store,
  RpcUnion extends import("@effect/rpc/Rpc").Any
>(
  options: CrudHandlersOptions<Id, Fields, StoredRecord, Store, RpcUnion>
): {
  create: (
    req: Request<ExtractTag<RpcUnion, "create">>
  ) => Effect.Effect<{ id: Id }, never, Store | unknown>
  get: (
    req: Request<ExtractTag<RpcUnion, "get">>
  ) => Effect.Effect<Fields, NotFound<Id>, Store | unknown>
  update: (
    req: Request<ExtractTag<RpcUnion, "update">>
  ) => Effect.Effect<void, NotFound<Id>, Store | unknown>
  list: (
    req: Request<ExtractTag<RpcUnion, "list">>
  ) => Effect.Effect<ReadonlyArray<Fields & { readonly id: Id }>, never, Store | unknown>
  delete: (
    req: Request<ExtractTag<RpcUnion, "delete">>
  ) => Effect.Effect<void, NotFound<Id>, Store>
} {
  const {
    entityType,
    storeTag,
    getRef,
    decode,
    encode,
    genId,
    withDelete = false
  } = options

  const createCount = createCounter(entityType, "create")
  const getCount = createCounter(entityType, "get")
  const updateCount = createCounter(entityType, "update")
  const listCount = createCounter(entityType, "list")
  const deleteCount = createCounter(entityType, "delete")

  const createHandler = (
    req: Request<ExtractTag<RpcUnion, "create">>
  ): Effect.Effect<{ id: Id }, never, Store | unknown> =>
    withSpanAndLog(`${entityType}.create`, {
      metricName: `${entityType.toLowerCase()}.create.duration`,
      attributes: { entityId: req.address.entityId }
    })(
      Effect.gen(function* () {
        yield* createCount(Effect.succeed(1))
        const store = yield* storeTag
        const ref = getRef(store as Store)
        const payload = req.payload as Fields
        const id = genId()
        const stored = yield* encode(payload, undefined, undefined)
        const record = { ...stored, id } as StoredRecord
        yield* Ref.update(ref, (map) => new Map(map).set(id, record))
        return { id }
      })
    ) as Effect.Effect<{ id: Id }, never, Store | unknown>

  const getHandler = (
    req: Request<ExtractTag<RpcUnion, "get">>
  ): Effect.Effect<Fields, NotFound<Id>, Store | unknown> =>
    withSpanAndLog(`${entityType}.get`, {
      metricName: `${entityType.toLowerCase()}.get.duration`,
      attributes: { entityId: req.address.entityId }
    })(
      Effect.gen(function* () {
        yield* getCount(Effect.succeed(1))
        const store = yield* storeTag
        const ref = getRef(store as Store)
        const { id } = req.payload as { id: Id }
        const map = yield* Ref.get(ref)
        const record = map.get(id)
        if (!record) {
          return yield* Effect.fail({ _tag: "NotFound" as const, id })
        }
        return yield* decode(record)
      })
    ) as Effect.Effect<Fields, NotFound<Id>, Store | unknown>

  const updateHandler = (
    req: Request<ExtractTag<RpcUnion, "update">>
  ): Effect.Effect<void, NotFound<Id>, Store | unknown> =>
    withSpanAndLog(`${entityType}.update`, {
      metricName: `${entityType.toLowerCase()}.update.duration`,
      attributes: { entityId: req.address.entityId }
    })(
      Effect.gen(function* () {
        yield* updateCount(Effect.succeed(1))
        const store = yield* storeTag
        const ref = getRef(store as Store)
        const { id, patch } = req.payload as { id: Id; patch: Partial<Fields> }
        const map = yield* Ref.get(ref)
        const existing = map.get(id)
        if (!existing) {
          return yield* Effect.fail({ _tag: "NotFound" as const, id })
        }
        const decoded = yield* decode(existing)
        const merged = { ...decoded, ...patch } as Fields
        const updated = yield* encode(merged, existing, patch)
        const record = { ...updated, id } as StoredRecord
        yield* Ref.update(ref, (m) => new Map(m).set(id, record))
      })
    ) as Effect.Effect<void, NotFound<Id>, Store | unknown>

  const listHandler = (
    req: Request<ExtractTag<RpcUnion, "list">>
  ): Effect.Effect<ReadonlyArray<Fields & { readonly id: Id }>, never, Store | unknown> =>
    withSpanAndLog(`${entityType}.list`, {
      metricName: `${entityType.toLowerCase()}.list.duration`,
      attributes: { entityId: req.address.entityId }
    })(
      Effect.gen(function* () {
        yield* listCount(Effect.succeed(1))
        const store = yield* storeTag
        const ref = getRef(store as Store)
        const map = yield* Ref.get(ref)
        const records = Array.from(map.values())
        const out: Array<Fields & { readonly id: Id }> = []
        for (const r of records) {
          const fields = yield* decode(r)
          out.push({ ...fields, id: r.id })
        }
        return out
      })
    ) as Effect.Effect<ReadonlyArray<Fields & { readonly id: Id }>, never, Store | unknown>

  const deleteHandler = (
    req: Request<ExtractTag<RpcUnion, "delete">>
  ): Effect.Effect<void, NotFound<Id>, Store> =>
    withSpanAndLog(`${entityType}.delete`, {
      metricName: `${entityType.toLowerCase()}.delete.duration`,
      attributes: { entityId: req.address.entityId }
    })(
      Effect.gen(function* () {
        yield* deleteCount(Effect.succeed(1))
        const store = yield* storeTag
        const ref = getRef(store as Store)
        const { id } = req.payload as { id: Id }
        const map = yield* Ref.get(ref)
        if (!map.has(id)) {
          return yield* Effect.fail({ _tag: "NotFound" as const, id })
        }
        yield* Ref.update(ref, (m) => {
          const next = new Map(m)
          next.delete(id)
          return next
        })
      })
    ) as Effect.Effect<void, NotFound<Id>, Store>

  const handlers = {
    create: createHandler,
    get: getHandler,
    update: updateHandler,
    list: listHandler,
    ...(withDelete ? { delete: deleteHandler } : {})
  }

  return handlers as {
    create: (
      req: Request<ExtractTag<RpcUnion, "create">>
    ) => Effect.Effect<{ id: Id }, never, Store | unknown>
    get: (
      req: Request<ExtractTag<RpcUnion, "get">>
    ) => Effect.Effect<Fields, NotFound<Id>, Store | unknown>
    update: (
      req: Request<ExtractTag<RpcUnion, "update">>
    ) => Effect.Effect<void, NotFound<Id>, Store | unknown>
    list: (
      req: Request<ExtractTag<RpcUnion, "list">>
    ) => Effect.Effect<ReadonlyArray<Fields & { readonly id: Id }>, never, Store | unknown>
    delete: (
      req: Request<ExtractTag<RpcUnion, "delete">>
    ) => Effect.Effect<void, NotFound<Id>, Store>
  }
}

// -----------------------------------------------------------------------------
// Database-backed CRUD handlers (require Database in context; use schema encode/decode)
// -----------------------------------------------------------------------------

/**
 * Options for makeCrudHandlersFromDatabase. Handlers require Database in context.
 * tableName identifies the entity table; recordSchema is used for encode/decode (e.g. with Schema.encryptedString for PII).
 */
export interface CrudHandlersOptionsWithDatabase<
  Id,
  Fields extends Record<string, unknown>,
  EntityRecord extends { readonly id: Id } & Fields,
  Encoded extends { readonly id: Id },
  RpcUnion extends import("@effect/rpc/Rpc").Any
> {
  readonly entityType: string
  readonly tableName: string
  readonly idSchema: Schema.Schema<Id, any, any>
  readonly fieldsSchema: Schema.Schema<Fields, unknown, never>
  /** Full record schema (id + fields). Decode: stored -> EntityRecord. Encode: EntityRecord -> stored. Use for schema-level encryption. */
  readonly recordSchema: Schema.Schema<EntityRecord, Encoded, unknown>
  readonly genId: () => Id
  readonly withDelete?: boolean
  readonly _rpcUnion?: RpcUnion
}

/**
 * Builds CRUD handlers that use the Database service (from context) and schema encode/decode.
 * No storeTag/getRef; platform must provide Database layer when building the program.
 */
export function makeCrudHandlersFromDatabase<
  Id,
  Fields extends Record<string, unknown>,
  EntityRecord extends { readonly id: Id } & Fields,
  Encoded extends { readonly id: Id },
  RpcUnion extends import("@effect/rpc/Rpc").Any
>(
  options: CrudHandlersOptionsWithDatabase<Id, Fields, EntityRecord, Encoded, RpcUnion>
): {
  create: (
    req: Request<ExtractTag<RpcUnion, "create">>
  ) => Effect.Effect<{ id: Id }, never, Database | unknown>
  get: (
    req: Request<ExtractTag<RpcUnion, "get">>
  ) => Effect.Effect<Fields, NotFound<Id>, Database | unknown>
  update: (
    req: Request<ExtractTag<RpcUnion, "update">>
  ) => Effect.Effect<void, NotFound<Id>, Database | unknown>
  list: (
    req: Request<ExtractTag<RpcUnion, "list">>
  ) => Effect.Effect<ReadonlyArray<Fields & { readonly id: Id }>, never, Database | unknown>
  delete: (
    req: Request<ExtractTag<RpcUnion, "delete">>
  ) => Effect.Effect<void, NotFound<Id>, Database>
} {
  const {
    entityType,
    tableName,
    recordSchema,
    genId,
    withDelete = false
  } = options

  const createCount = createCounter(entityType, "create")
  const getCount = createCounter(entityType, "get")
  const updateCount = createCounter(entityType, "update")
  const listCount = createCounter(entityType, "list")
  const deleteCount = createCounter(entityType, "delete")

  const decodeRecord = (stored: Encoded) =>
    Schema.decodeUnknown(recordSchema)(stored).pipe(
      Effect.mapError(() => ({ _tag: "DecodeError" as const }))
    )
  const encodeRecord = (record: EntityRecord) =>
    Schema.encode(recordSchema)(record).pipe(
      Effect.mapError(() => ({ _tag: "EncodeError" as const }))
    )

  const createHandler = (
    req: Request<ExtractTag<RpcUnion, "create">>
  ): Effect.Effect<{ id: Id }, never, Database | unknown> =>
    withSpanAndLog(`${entityType}.create`, {
      metricName: `${entityType.toLowerCase()}.create.duration`,
      attributes: { entityId: req.address.entityId }
    })(
      Effect.gen(function* () {
        yield* createCount(Effect.succeed(1))
        const db = yield* Database
        const payload = req.payload as Fields
        const id = genId()
        const record = { ...payload, id } as EntityRecord
        const encoded = yield* encodeRecord(record)
        yield* db.set(tableName, id, encoded)
        return { id } as { id: Id }
      })
    ) as Effect.Effect<{ id: Id }, never, Database | unknown>

  const getHandler = (
    req: Request<ExtractTag<RpcUnion, "get">>
  ): Effect.Effect<Fields, NotFound<Id>, Database | unknown> =>
    withSpanAndLog(`${entityType}.get`, {
      metricName: `${entityType.toLowerCase()}.get.duration`,
      attributes: { entityId: req.address.entityId }
    })(
      Effect.gen(function* () {
        yield* getCount(Effect.succeed(1))
        const db = yield* Database
        const { id } = req.payload as { id: Id }
        const stored = yield* db.get<Id, Encoded>(tableName, id)
        if (!stored) {
          return yield* Effect.fail({ _tag: "NotFound" as const, id })
        }
        const decoded = yield* decodeRecord(stored)
        const { id: _id, ...fields } = decoded
        return fields as Fields
      })
    ) as Effect.Effect<Fields, NotFound<Id>, Database | unknown>

  const updateHandler = (
    req: Request<ExtractTag<RpcUnion, "update">>
  ): Effect.Effect<void, NotFound<Id>, Database | unknown> =>
    withSpanAndLog(`${entityType}.update`, {
      metricName: `${entityType.toLowerCase()}.update.duration`,
      attributes: { entityId: req.address.entityId }
    })(
      Effect.gen(function* () {
        yield* updateCount(Effect.succeed(1))
        const db = yield* Database
        const { id, patch } = req.payload as { id: Id; patch: Partial<Fields> }
        const stored = yield* db.get<Id, Encoded>(tableName, id)
        if (!stored) {
          return yield* Effect.fail({ _tag: "NotFound" as const, id })
        }
        const existing = yield* decodeRecord(stored)
        const merged = { ...existing, ...patch } as EntityRecord
        const encoded = yield* encodeRecord(merged)
        yield* db.set(tableName, id, encoded)
      })
    ) as Effect.Effect<void, NotFound<Id>, Database | unknown>

  const listHandler = (
    req: Request<ExtractTag<RpcUnion, "list">>
  ): Effect.Effect<ReadonlyArray<Fields & { readonly id: Id }>, never, Database | unknown> =>
    withSpanAndLog(`${entityType}.list`, {
      metricName: `${entityType.toLowerCase()}.list.duration`,
      attributes: { entityId: req.address.entityId }
    })(
      Effect.gen(function* () {
        yield* listCount(Effect.succeed(1))
        const db = yield* Database
        const storedList = yield* db.list<Id, Encoded>(tableName)
        const out: Array<Fields & { readonly id: Id }> = []
        for (const stored of storedList) {
          const decoded = yield* decodeRecord(stored)
          const { id, ...fields } = decoded
          out.push({ ...fields, id } as Fields & { readonly id: Id })
        }
        return out
      })
    ) as Effect.Effect<ReadonlyArray<Fields & { readonly id: Id }>, never, Database | unknown>

  const deleteHandler = (
    req: Request<ExtractTag<RpcUnion, "delete">>
  ): Effect.Effect<void, NotFound<Id>, Database> =>
    withSpanAndLog(`${entityType}.delete`, {
      metricName: `${entityType.toLowerCase()}.delete.duration`,
      attributes: { entityId: req.address.entityId }
    })(
      Effect.gen(function* () {
        yield* deleteCount(Effect.succeed(1))
        const db = yield* Database
        const { id } = req.payload as { id: Id }
        const stored = yield* db.get(tableName, id)
        if (!stored) {
          return yield* Effect.fail({ _tag: "NotFound" as const, id })
        }
        yield* db.delete(tableName, id)
      })
    ) as Effect.Effect<void, NotFound<Id>, Database>

  const handlers = {
    create: createHandler,
    get: getHandler,
    update: updateHandler,
    list: listHandler,
    ...(withDelete ? { delete: deleteHandler } : {})
  }

  return handlers as {
    create: (
      req: Request<ExtractTag<RpcUnion, "create">>
    ) => Effect.Effect<{ id: Id }, never, Database | unknown>
    get: (
      req: Request<ExtractTag<RpcUnion, "get">>
    ) => Effect.Effect<Fields, NotFound<Id>, Database | unknown>
    update: (
      req: Request<ExtractTag<RpcUnion, "update">>
    ) => Effect.Effect<void, NotFound<Id>, Database | unknown>
    list: (
      req: Request<ExtractTag<RpcUnion, "list">>
    ) => Effect.Effect<ReadonlyArray<Fields & { readonly id: Id }>, never, Database | unknown>
    delete: (
      req: Request<ExtractTag<RpcUnion, "delete">>
    ) => Effect.Effect<void, NotFound<Id>, Database>
  }
}
