/**
 * Effect-based createTable: validates columns with testColumns then registers with TableColumnRegistry.
 * Requires TableColumnRegistry in context. Used by extensions during layer build.
 * @see packages/core/src/schema/table-column-registry.ts, table-builder.ts
 */
import type { DuplicateColumnError } from '@eventiva/core';
import { TableColumnRegistry } from '@eventiva/core';
import { Effect } from 'effect';
import type { PgColumnBuilder } from 'drizzle-orm/pg-core';
import { type AllBuilders, type PgTableExtraConfigValue } from './table-builder.js';
/**
 * Registers a table with the schema registry. Run inside an Effect that has TableColumnRegistry in context.
 * Validates columns (id required, no forbidden fields) then merges into the registry; fails with DuplicateColumnError if any column name already exists for this table.
 */
export declare function createTable<TTableName extends string, TColumnsKey extends string, TColumnsMap extends Record<TColumnsKey, PgColumnBuilder>>(name: TTableName, extensionId: string, columns: (columnTypes: AllBuilders) => TColumnsMap, extraConfig?: (self: unknown) => PgTableExtraConfigValue[]): Effect.Effect<void, DuplicateColumnError, TableColumnRegistry>;
//# sourceMappingURL=create-table.d.ts.map