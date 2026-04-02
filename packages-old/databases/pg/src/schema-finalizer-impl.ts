/**
 * SchemaFinalizer implementation for PostgreSQL: builds Drizzle PgTable from merged columns and extra configs.
 * Used by TableColumnRegistry during finalization. Core passes Record<string, unknown>; we cast to Drizzle types.
 * @see packages/core/src/schema/schema-finalizer.ts, table-builder.ts buildTableInternal
 */
import { SchemaFinalizer, withSpanAndLog } from '@eventiva/core';
import { Effect, Layer } from 'effect';
import { buildTableInternal, type PgTableExtraConfigValue } from './table-builder.js';
import type { PgColumnBuilder } from 'drizzle-orm/pg-core';

function isExtraConfigFunction(item: unknown): item is (table: any) => PgTableExtraConfigValue[] {
    return typeof item === 'function';
}

export const SchemaFinalizerPg: Layer.Layer<SchemaFinalizer, never> = Layer.succeed(SchemaFinalizer, {
    buildTable: (tableName, mergedColumns, extraConfigs, getTable, creatorTableName) =>
        Effect.sync(() => {
            const columns = mergedColumns as Record<string, PgColumnBuilder>;
            const configFns = extraConfigs.filter(isExtraConfigFunction);
            return buildTableInternal(
                tableName,
                columns,
                configFns,
                getTable,
                creatorTableName ?? 'contact'
            );
        }).pipe(withSpanAndLog('SchemaFinalizerPg.buildTable', { attributes: { tableName } })),
});
