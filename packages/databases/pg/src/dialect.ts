import type { DatabaseDialect } from '@eventiva/core';
import { bytea, pgTable } from 'drizzle-orm/pg-core';
import { getPgColumnBuilders } from 'drizzle-orm/pg-core/columns/all';
import { typeid } from './typeid.js';

const pgColumns = getPgColumnBuilders();

export const pgDialect: DatabaseDialect = {
    kind: 'postgresql',
    ...pgColumns,
    bytea,
    typeid,
    table: (name: string, columns: Record<string, unknown>, extraConfig?: (self: unknown) => unknown[]) =>
        extraConfig !== undefined
            ? (pgTable as (n: string, c: unknown, e: unknown) => unknown)(name, columns, extraConfig)
            : (pgTable as (n: string, c: unknown) => unknown)(name, columns),
} as unknown as DatabaseDialect;

