import type { DatabaseDialect } from '@eventiva/databases.shared';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { getSQLiteColumnBuilders } from 'drizzle-orm/sqlite-core/columns/all';
import { typeid } from './typeid.js';

const sqliteColumns = getSQLiteColumnBuilders();

const dateAsText = (name: string) => text(name);

export const sqliteDialect: DatabaseDialect = {
    kind: 'sqlite',
    ...sqliteColumns,
    date: dateAsText,
    typeid,
    table: (name: string, columns: Record<string, unknown>, extraConfig?: (self: unknown) => unknown[]) =>
        extraConfig !== undefined
            ? (sqliteTable as (n: string, c: unknown, e: unknown) => unknown)(name, columns, extraConfig)
            : (sqliteTable as (n: string, c: unknown) => unknown)(name, columns),
} as unknown as DatabaseDialect;
