import { text } from 'drizzle-orm/pg-core';
import type { PgColumnBuilder } from 'drizzle-orm/pg-core';
import { runTypeidColumn } from '@eventiva/core';

export const typeid = (value = 'id', config?: { type?: string }): PgColumnBuilder =>
    runTypeidColumn({
        columnName: value,
        typePrefix: config?.type ?? 'unknown',
        // PK required so FKs (e.g. created_by → contact.id) are valid in generated DDL.
        create: () => text(value).primaryKey() as PgColumnBuilder,
    });
