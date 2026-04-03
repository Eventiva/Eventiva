/**
 * Effect-based createTable: validates columns with testColumns then registers with TableColumnRegistry.
 * Requires TableColumnRegistry in context. Used by extensions during layer build.
 * @see packages/core/src/schema/table-column-registry.ts, table-builder.ts
 */
import type { DuplicateColumnError } from '@eventiva/core';
import { TableColumnRegistry, withSpanAndLog } from '@eventiva/core';
import { Effect } from 'effect';
import { getPgColumnBuilders } from 'drizzle-orm/pg-core/columns/all';
import type { PgColumnBuilder } from 'drizzle-orm/pg-core';
import {
    type AllBuilders,
    createTableFinal,
    type PgTableExtraConfigValue,
    testColumns,
} from './table-builder.js';
import { typeid } from './typeid.js';

/**
 * Registers a table with the schema registry. Run inside an Effect that has TableColumnRegistry in context.
 * Validates columns (id required, no forbidden fields) then merges into the registry; fails with DuplicateColumnError if any column name already exists for this table.
 */
export function createTable<
    TTableName extends string,
    TColumnsKey extends string,
    TColumnsMap extends Record<TColumnsKey, PgColumnBuilder>,
>(
    name: TTableName,
    extensionId: string,
    columns: (columnTypes: AllBuilders) => TColumnsMap,
    extraConfig?: (self: unknown) => PgTableExtraConfigValue[]
): Effect.Effect<void, DuplicateColumnError, TableColumnRegistry> {
    return Effect.gen(function* () {
        const registry = yield* TableColumnRegistry;
        const db: AllBuilders = {
            ...getPgColumnBuilders(),
            typeid,
        };
        const validatedColumns = testColumns(name, db, columns as unknown as Parameters<typeof testColumns>[2]);
        yield* registry.registerTableColumns(
            name,
            extensionId,
            validatedColumns as Record<string, unknown>,
            extraConfig as unknown
        );
    }).pipe(withSpanAndLog('createTable', { attributes: { name, extensionId } }));
}

/**
 * For extensions that need both TableColumnRegistry entries (column builders only) and a full Drizzle
 * table for `createSelectSchema` / `createInsertSchema`. The registry must receive builders; passing
 * the result of `pgTable()` causes `colBuilder.setName is not a function` during schema finalization.
 *
 * The column factory is typed loosely (`Record<string, unknown>`) so consumers are not forced to unify
 * `PgColumnBuilder` across multiple physical `drizzle-orm` installs under pnpm; runtime validation is
 * still done by `testColumns` / `createTableFinal`.
 */
export function defineExtensionTable(
    name: string,
    columns: (columnTypes: AllBuilders) => Record<string, unknown>
) {
    const db: AllBuilders = {
        ...getPgColumnBuilders(),
        typeid,
    };
    const registryColumns = testColumns(name, db, columns as Parameters<typeof testColumns>[2]);
    const schemaTable = createTableFinal(name, columns as Parameters<typeof createTableFinal>[1]);
    return { registryColumns, schemaTable };
}
