/**
 * Database service interface for entity persistence.
 * Core store/CRUD logic calls this service; the platform provides the implementation via Effect Layers
 * (e.g. PgDrizzle from database-pg, or in-memory for tests). Core never imports a specific driver.
 * @see docs/learnings/architecture.md
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Ref from "effect/Ref";
import { withSpanAndLog } from "../observability/helpers.js";
export const Database = Context.GenericTag("@eventiva/core/Database");
/** Key for the in-memory map: tableName -> id string -> record */
function idKey(id) {
    return typeof id === "string" ? id : String(id);
}
/**
 * In-memory Database layer. Uses a single Ref<Map<tableName, Map<idKey, record>>>.
 * Use in tests or when no persistent DB is configured; platform can merge this instead of PgDrizzle.
 */
export const DatabaseLiveInMemory = Layer.scoped(Database, Effect.gen(function* () {
    const ref = yield* Ref.make(new Map());
    const database = {
        get: (tableName, id) => Ref.get(ref).pipe(Effect.map((tables) => {
            const table = tables.get(tableName);
            if (!table)
                return null;
            const record = table.get(idKey(id));
            return record != null ? record : null;
        }), withSpanAndLog("database.get", { attributes: { tableName } })),
        set: (tableName, id, record) => Ref.update(ref, (tables) => {
            const next = new Map(tables);
            const table = next.get(tableName) ?? new Map();
            const nextTable = new Map(table);
            nextTable.set(idKey(id), record);
            next.set(tableName, nextTable);
            return next;
        }).pipe(withSpanAndLog("database.set", { attributes: { tableName } })),
        delete: (tableName, id) => Ref.update(ref, (tables) => {
            const next = new Map(tables);
            const table = next.get(tableName);
            if (table) {
                const nextTable = new Map(table);
                nextTable.delete(idKey(id));
                next.set(tableName, nextTable);
            }
            return next;
        }).pipe(withSpanAndLog("database.delete", { attributes: { tableName } })),
        list: (tableName) => Ref.get(ref).pipe(Effect.map((tables) => {
            const table = tables.get(tableName);
            const arr = table ? Array.from(table.values()) : [];
            return arr;
        }), withSpanAndLog("database.list", { attributes: { tableName } }))
    };
    return database;
}));
