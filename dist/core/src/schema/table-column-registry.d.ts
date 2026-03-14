/**
 * TableColumnRegistry: pending table columns (merged across extensions), ready count, and finalization.
 * When all expected extensions have called markReady, finalization runs: SchemaFinalizer builds each table,
 * results are stored in FinalTableStore, and waitUntilFinalized completes.
 * @see docs/learnings/architecture.md
 */
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import { type DuplicateColumnError } from './duplicate-column-error.js';
import { FinalTableStore } from './final-table-store.js';
import { type ExtraConfigItem, SchemaFinalizer } from './schema-finalizer.js';
import { SchemaRegistryConfig } from './schema-registry-config.js';
/** Pending entry per table: merged columns and list of extraConfig callbacks. */
export interface PendingTableEntry {
    readonly columns: Record<string, unknown>;
    readonly extraConfigs: ReadonlyArray<ExtraConfigItem>;
}
export interface TableColumnRegistryState {
    readonly pending: Map<string, PendingTableEntry>;
    readonly expectedReadyCount: number;
    readonly readyIds: Set<string>;
    readonly finalized: boolean;
}
export interface TableColumnRegistry {
    /** Merge columns for a table. Fails with DuplicateColumnError if any column name already exists. */
    readonly registerTableColumns: (tableName: string, extensionId: string, columns: Record<string, unknown>, extraConfig?: ExtraConfigItem) => Effect.Effect<void, DuplicateColumnError>;
    /** Set how many extensions must call markReady before finalization. */
    readonly setExpectedReadyCount: (n: number) => Effect.Effect<void>;
    /** Mark an extension as ready. Idempotent per extensionId. When count matches expected, finalization runs. */
    readonly markReady: (extensionId: string) => Effect.Effect<void>;
    /** Completes when finalization has run (after all markReady calls and buildTable for each table). */
    readonly waitUntilFinalized: () => Effect.Effect<void>;
}
export declare const TableColumnRegistry: Context.Tag<TableColumnRegistry, TableColumnRegistry>;
export declare const TableColumnRegistryLive: Layer.Layer<TableColumnRegistry, never, SchemaFinalizer | FinalTableStore | SchemaRegistryConfig>;
//# sourceMappingURL=table-column-registry.d.ts.map