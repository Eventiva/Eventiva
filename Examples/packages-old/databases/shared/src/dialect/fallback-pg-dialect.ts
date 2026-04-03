import { bytea, pgTable } from 'drizzle-orm/pg-core';
import type { PgColumnBuilder } from 'drizzle-orm/pg-core';
import { getPgColumnBuilders } from 'drizzle-orm/pg-core/columns/all';
import type { DatabaseDialect } from './database-dialect.js';
import { runTypeidColumn } from '../typeid/typeid-factory.js';

const pgColumns = getPgColumnBuilders();

/**
 * Used when `installDatabaseDialect` has not run yet (e.g. Vitest importing an extension module directly).
 * Mirrors PostgreSQL `getPgColumnBuilders()` + `bytea` + `typeid` + `table`.
 */
export const fallbackPgDialect: DatabaseDialect = {
    kind: 'postgresql',
    ...pgColumns,
    bytea,
    typeid: (value = 'id', config?: { type?: string }): PgColumnBuilder =>
        runTypeidColumn({
            columnName: value,
            typePrefix: config?.type ?? 'unknown',
            create: () => pgColumns.text(value).primaryKey() as PgColumnBuilder,
        }),
    table: (name: string, columns: Record<string, unknown>, extraConfig?: (self: unknown) => unknown[]) =>
        extraConfig !== undefined
            ? (pgTable as (n: string, c: unknown, e: unknown) => unknown)(name, columns, extraConfig)
            : (pgTable as (n: string, c: unknown) => unknown)(name, columns),
} as unknown as DatabaseDialect;
