import * as Effect from "effect/Effect";
import * as Ref from "effect/Ref";
import * as Schema from "effect/Schema";
import { Database } from "../database/database.js";
import { withSpanAndLog } from "../observability/helpers.js";
/**
 * Builds standard CRUD handlers (create, get, update, list, delete) from a store, encode/decode, and genId.
 * Extension only supplies these; all CRUD logic lives in core.
 */
export function makeCrudHandlers(options) {
    const { entityType, storeTag, getRef, decode, encode, genId, withDelete = false } = options;
    const createHandler = (req) => withSpanAndLog(`${entityType}.create`, {
        metricName: `${entityType.toLowerCase()}.create.duration`,
        attributes: { entityId: req.address.entityId }
    })(Effect.gen(function* () {
        const store = yield* storeTag;
        const ref = getRef(store);
        const payload = req.payload;
        const id = genId();
        const stored = yield* encode(payload, undefined, undefined);
        const record = { ...stored, id };
        yield* Ref.update(ref, (map) => new Map(map).set(id, record));
        return { id };
    }));
    const getHandler = (req) => withSpanAndLog(`${entityType}.get`, {
        metricName: `${entityType.toLowerCase()}.get.duration`,
        attributes: { entityId: req.address.entityId }
    })(Effect.gen(function* () {
        const store = yield* storeTag;
        const ref = getRef(store);
        const { id } = req.payload;
        const map = yield* Ref.get(ref);
        const record = map.get(id);
        if (!record) {
            return yield* Effect.fail({ _tag: "NotFound", id });
        }
        return yield* decode(record);
    }));
    const updateHandler = (req) => withSpanAndLog(`${entityType}.update`, {
        metricName: `${entityType.toLowerCase()}.update.duration`,
        attributes: { entityId: req.address.entityId }
    })(Effect.gen(function* () {
        const store = yield* storeTag;
        const ref = getRef(store);
        const { id, patch } = req.payload;
        const map = yield* Ref.get(ref);
        const existing = map.get(id);
        if (!existing) {
            return yield* Effect.fail({ _tag: "NotFound", id });
        }
        const decoded = yield* decode(existing);
        const merged = { ...decoded, ...patch };
        const updated = yield* encode(merged, existing, patch);
        const record = { ...updated, id };
        yield* Ref.update(ref, (m) => new Map(m).set(id, record));
    }));
    const listHandler = (req) => withSpanAndLog(`${entityType}.list`, {
        metricName: `${entityType.toLowerCase()}.list.duration`,
        attributes: { entityId: req.address.entityId }
    })(Effect.gen(function* () {
        const store = yield* storeTag;
        const ref = getRef(store);
        const map = yield* Ref.get(ref);
        const records = Array.from(map.values());
        const out = [];
        for (const r of records) {
            const fields = yield* decode(r);
            out.push({ ...fields, id: r.id });
        }
        return out;
    }));
    const deleteHandler = (req) => withSpanAndLog(`${entityType}.delete`, {
        metricName: `${entityType.toLowerCase()}.delete.duration`,
        attributes: { entityId: req.address.entityId }
    })(Effect.gen(function* () {
        const store = yield* storeTag;
        const ref = getRef(store);
        const { id } = req.payload;
        const map = yield* Ref.get(ref);
        if (!map.has(id)) {
            return yield* Effect.fail({ _tag: "NotFound", id });
        }
        yield* Ref.update(ref, (m) => {
            const next = new Map(m);
            next.delete(id);
            return next;
        });
    }));
    const handlers = {
        create: createHandler,
        get: getHandler,
        update: updateHandler,
        list: listHandler,
        ...(withDelete ? { delete: deleteHandler } : {})
    };
    return handlers;
}
/**
 * Builds CRUD handlers that use the Database service (from context) and schema encode/decode.
 * No storeTag/getRef; platform must provide Database layer when building the program.
 */
export function makeCrudHandlersFromDatabase(options) {
    const { entityType, tableName, recordSchema, genId, withDelete = false } = options;
    const decodeRecord = (stored) => Schema.decodeUnknown(recordSchema)(stored).pipe(Effect.orDie);
    const encodeRecord = (record) => Schema.encode(recordSchema)(record).pipe(Effect.orDie);
    const createHandler = (req) => withSpanAndLog(`${entityType}.create`, {
        metricName: `${entityType.toLowerCase()}.create.duration`,
        attributes: { entityId: req.address.entityId }
    })(Effect.gen(function* () {
        const db = yield* Database;
        const payload = req.payload;
        const id = genId();
        const record = { ...payload, id };
        const encoded = yield* encodeRecord(record);
        yield* db.set(tableName, id, encoded);
        return { id };
    }));
    const getHandler = (req) => withSpanAndLog(`${entityType}.get`, {
        metricName: `${entityType.toLowerCase()}.get.duration`,
        attributes: { entityId: req.address.entityId }
    })(Effect.gen(function* () {
        const db = yield* Database;
        const { id } = req.payload;
        const stored = yield* db.get(tableName, id);
        if (!stored) {
            return yield* Effect.fail({ _tag: "NotFound", id });
        }
        const decoded = yield* decodeRecord(stored);
        const { id: _id, ...fields } = decoded;
        return fields;
    }));
    const updateHandler = (req) => withSpanAndLog(`${entityType}.update`, {
        metricName: `${entityType.toLowerCase()}.update.duration`,
        attributes: { entityId: req.address.entityId }
    })(Effect.gen(function* () {
        const db = yield* Database;
        const { id, patch } = req.payload;
        const stored = yield* db.get(tableName, id);
        if (!stored) {
            return yield* Effect.fail({ _tag: "NotFound", id });
        }
        const existing = yield* decodeRecord(stored);
        const merged = { ...existing, ...patch };
        const encoded = yield* encodeRecord(merged);
        yield* db.set(tableName, id, encoded);
    }));
    const listHandler = (req) => withSpanAndLog(`${entityType}.list`, {
        metricName: `${entityType.toLowerCase()}.list.duration`,
        attributes: { entityId: req.address.entityId }
    })(Effect.gen(function* () {
        const db = yield* Database;
        const storedList = yield* db.list(tableName);
        const out = [];
        for (const stored of storedList) {
            const decoded = yield* decodeRecord(stored);
            const { id, ...fields } = decoded;
            out.push({ ...fields, id });
        }
        return out;
    }));
    const deleteHandler = (req) => withSpanAndLog(`${entityType}.delete`, {
        metricName: `${entityType.toLowerCase()}.delete.duration`,
        attributes: { entityId: req.address.entityId }
    })(Effect.gen(function* () {
        const db = yield* Database;
        const { id } = req.payload;
        const stored = yield* db.get(tableName, id);
        if (!stored) {
            return yield* Effect.fail({ _tag: "NotFound", id });
        }
        yield* db.delete(tableName, id);
    }));
    const handlers = {
        create: createHandler,
        get: getHandler,
        update: updateHandler,
        list: listHandler,
        ...(withDelete ? { delete: deleteHandler } : {})
    };
    return handlers;
}
