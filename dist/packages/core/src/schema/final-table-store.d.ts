/**
 * FinalTableStore: holds the final built table (PgTable) per table name after finalization.
 * Populated by TableColumnRegistry during finalization; read-only thereafter.
 * Used by drizzle-kit integration and relationships later.
 * @see docs/learnings/architecture.md, schema/table-column-registry.ts
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
export interface FinalTableStore {
    /** Get a finalized table by name. Returns undefined if not found. */
    readonly getTable: (tableName: string) => Effect.Effect<unknown | undefined>;
    /** Get all finalized tables as a record (tableName -> table). */
    readonly getAllTables: () => Effect.Effect<Record<string, unknown>>;
    /** Set a table (used only by TableColumnRegistry during finalization). */
    readonly setTable: (tableName: string, table: unknown) => Effect.Effect<void>;
}
export declare const FinalTableStore: Context.Tag<FinalTableStore, FinalTableStore>;
export declare const FinalTableStoreLive: Layer.Layer<FinalTableStore>;
//# sourceMappingURL=final-table-store.d.ts.map