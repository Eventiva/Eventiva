/**
 * SchemaFinalizer: builds a single table from merged columns and extra configs.
 * Implemented by @eventiva/databases.pg; core only defines the interface.
 * Used by TableColumnRegistry during finalization to produce the final PgTable per table name.
 * @see docs/learnings/architecture.md, schema/table-column-registry.ts
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
/** Column set shape (same as second arg to pgTable). Core uses unknown to avoid depending on Drizzle. */
export type MergedColumns = Record<string, unknown>;
/** Extra config per table (e.g. index/constraint callbacks). Stored as unknown in core. */
export type ExtraConfigItem = unknown;
export interface SchemaFinalizer {
    /** Build one table from merged columns and extraConfigs. Returns the built table (PgTable in pg impl). */
    readonly buildTable: (tableName: string, mergedColumns: MergedColumns, extraConfigs: ReadonlyArray<ExtraConfigItem>) => Effect.Effect<unknown>;
}
export declare const SchemaFinalizer: Context.Tag<SchemaFinalizer, SchemaFinalizer>;
/** No-op implementation when not using a DB with schema (e.g. in-memory). FinalTableStore gets placeholder values. */
export declare const SchemaFinalizerNoOp: SchemaFinalizer;
export declare const SchemaFinalizerNoOpLayer: Layer.Layer<SchemaFinalizer, never, never>;
//# sourceMappingURL=schema-finalizer.d.ts.map