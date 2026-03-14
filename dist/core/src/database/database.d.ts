/**
 * Database service interface for entity persistence.
 * Core store/CRUD logic calls this service; the platform provides the implementation via Effect Layers
 * (e.g. PgDrizzle from database-pg, or in-memory for tests). Core never imports a specific driver.
 * @see docs/learnings/architecture.md
 */
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
/**
 * Stored record shape: must have an id field. Used for get/set/list.
 * Id type parameter is the key type (for get/set/delete); the record's id field may be the encoded form (e.g. string for TypeID).
 */
export type StoredRecord<Id = unknown> = {
    readonly id: unknown;
} & Record<string, unknown>;
/**
 * Driver-agnostic interface for entity table storage.
 * Implementations use Effect SQL + Drizzle (or in-memory Ref) to persist records keyed by table name and id.
 */
export interface Database {
    /** Get a record by table name and id. Returns null if not found. R is the stored (possibly encoded) shape. */
    readonly get: <Id, R extends StoredRecord<Id>>(tableName: string, id: Id) => Effect.Effect<R | null>;
    /** Set (insert or replace) a record. Record must include id (encoded form is fine). */
    readonly set: <Id, R extends StoredRecord<Id>>(tableName: string, id: Id, record: R) => Effect.Effect<void>;
    /** Delete a record by table name and id. */
    readonly delete: <Id>(tableName: string, id: Id) => Effect.Effect<void>;
    /** List all records for a table. */
    readonly list: <Id, R extends StoredRecord<Id>>(tableName: string) => Effect.Effect<ReadonlyArray<R>>;
}
export declare const Database: Context.Tag<Database, Database>;
/**
 * In-memory Database layer. Uses a single Ref<Map<tableName, Map<idKey, record>>>.
 * Use in tests or when no persistent DB is configured; platform can merge this instead of PgDrizzle.
 */
export declare const DatabaseLiveInMemory: Layer.Layer<Database>;
//# sourceMappingURL=database.d.ts.map