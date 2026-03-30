/**
 * SchemaFinalizer for SQLite merged tables (same role as `SchemaFinalizerPg` in `@eventiva/databases.pg`).
 */
import { SchemaFinalizer, withSpanAndLog } from '@eventiva/core';
import { Effect, Layer } from 'effect';
import { buildTableInternal, type SQLiteTableExtraConfigValue } from './table-builder.js';
import type { SQLiteColumnBuilder } from 'drizzle-orm/sqlite-core';

function isExtraConfigFunction(item: unknown): item is (table: unknown) => SQLiteTableExtraConfigValue[] {
    return typeof item === 'function';
}

export const SchemaFinalizerSqlite: Layer.Layer<SchemaFinalizer, never> = Layer.succeed(SchemaFinalizer, {
    buildTable: (tableName, mergedColumns, extraConfigs, getTable, creatorTableName) =>
        Effect.sync(() => {
            const columns = mergedColumns as Record<string, SQLiteColumnBuilder>;
            const configFns = extraConfigs.filter(isExtraConfigFunction);
            return buildTableInternal(
                tableName,
                columns,
                configFns,
                getTable,
                creatorTableName ?? 'contact'
            );
        }).pipe(withSpanAndLog('SchemaFinalizerSqlite.buildTable', { attributes: { tableName } })),
});
