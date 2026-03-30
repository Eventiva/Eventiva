import { text } from 'drizzle-orm/sqlite-core';
import type { SQLiteColumnBuilder } from 'drizzle-orm/sqlite-core';
import { runTypeidColumn } from '@eventiva/databases.shared';

export const typeid = (value = 'id', config?: { type?: string }): SQLiteColumnBuilder =>
    runTypeidColumn({
        columnName: value,
        typePrefix: config?.type ?? 'unknown',
        create: () => text(value).primaryKey() as SQLiteColumnBuilder,
    });
