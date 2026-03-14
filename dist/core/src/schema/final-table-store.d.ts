/**
 * FinalTableStore: holds the final built table (PgTable) per table name after finalization.
 * Populated by TableColumnRegistry during finalization; read-only thereafter.
 * Used by drizzle-kit integration and relationships later.
 * @see docs/learnings/architecture.md, schema/table-column-registry.ts
 */
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
/** Relation metadata for entity schema: name, cardinality, and related table. */
export interface RelationMetadata {
    readonly relationName: string;
    readonly cardinality: 'one' | 'many';
    readonly relatedTableName: string;
}
export interface FinalTableStore {
    /** Get a finalized table by name. Returns undefined if not found. */
    readonly getTable: (tableName: string) => Effect.Effect<unknown | undefined>;
    /** Get all finalized tables as a record (tableName -> table). */
    readonly getAllTables: () => Effect.Effect<Record<string, unknown>>;
    /** Set a table (used only by TableColumnRegistry during finalization). */
    readonly setTable: (tableName: string, table: unknown) => Effect.Effect<void>;
    /** Get finalized relations by table name. Returns undefined if not found. */
    readonly getRelations: (tableName: string) => Effect.Effect<unknown | undefined>;
    /** Get all finalized relations as a record (tableName -> relations). */
    readonly getAllRelations: () => Effect.Effect<Record<string, unknown>>;
    /** Set relations (used during Phase 2 finalization). */
    readonly setRelations: (tableName: string, relations: unknown) => Effect.Effect<void>;
    /** Set relation metadata for a table (used during entity build). */
    readonly setRelationMetadata: (tableName: string, metadata: ReadonlyArray<RelationMetadata>) => Effect.Effect<void>;
    /** Get relation metadata for a table. Returns empty array if not found. */
    readonly getRelationMetadata: (tableName: string) => Effect.Effect<ReadonlyArray<RelationMetadata>>;
}
export declare const FinalTableStore: Context.Tag<FinalTableStore, FinalTableStore>;
export declare const FinalTableStoreLive: Layer.Layer<FinalTableStore>;
//# sourceMappingURL=final-table-store.d.ts.map