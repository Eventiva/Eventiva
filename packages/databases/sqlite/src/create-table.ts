/**
 * Effect-based createTable: validates columns with testColumns then registers with TableColumnRegistry.
 * Mirrors `@eventiva/databases.pg` createTable for SQLite column builders.
 * @see packages/databases/pg/src/create-table.ts
 */
import type { DuplicateColumnError } from '@eventiva/core';
import { TableColumnRegistry, withSpanAndLog } from '@eventiva/core';
import { Effect } from 'effect';
import { getSQLiteColumnBuilders } from 'drizzle-orm/sqlite-core/columns/all';
import type { SQLiteColumnBuilder } from 'drizzle-orm/sqlite-core';
import { type AllBuilders, type SQLiteTableExtraConfigValue, testColumns } from './table-builder.js';
import { typeid } from './typeid.js';

/**
 * Registers a table with the schema registry. Run inside an Effect that has TableColumnRegistry in context.
 */
export function createTable<
    TTableName extends string,
    TColumnsKey extends string,
    TColumnsMap extends Record<TColumnsKey, SQLiteColumnBuilder>,
>(
    name: TTableName,
    extensionId: string,
    columns: (columnTypes: AllBuilders) => TColumnsMap,
    extraConfig?: (self: unknown) => SQLiteTableExtraConfigValue[]
): Effect.Effect<void, DuplicateColumnError, TableColumnRegistry> {
    return Effect.gen(function* () {
        const registry = yield* TableColumnRegistry;
        const db: AllBuilders = {
            ...getSQLiteColumnBuilders(),
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
