import type { PgColumnsBuilders } from 'drizzle-orm/pg-core/columns/all';
import type { SQLiteColumnBuilders } from 'drizzle-orm/sqlite-core/columns/all';

/**
 * Active Drizzle dialect is installed by the platform (`installDatabaseDialect`) before extension modules
 * use `@eventiva/core` database column facades (`bigint`, `text`, `typeid`, …).
 */
export type DatabaseDialectKind = 'postgresql' | 'sqlite';

/** Shared entrypoints every dialect exposes (plus dialect-specific column builders). */
export type DialectTableBundle = {
    typeid: (columnName?: string, config?: { type?: string }) => unknown;
    table: (
        name: string,
        columns: Record<string, unknown>,
        extraConfig?: (self: unknown) => unknown[]
    ) => unknown;
};

/** `getPgColumnBuilders()` plus `bytea` (not included in Drizzle’s `columns/all` bundle). */
export type PgDialectColumns = PgColumnsBuilders & { bytea: typeof import('drizzle-orm/pg-core').bytea };

export type PgDatabaseDialect = { readonly kind: 'postgresql' } & PgDialectColumns & DialectTableBundle;

/** `getSQLiteColumnBuilders()` plus `date` (ISO text). */
export type SqliteDatabaseDialect = { readonly kind: 'sqlite' } & SQLiteColumnBuilders &
    DialectTableBundle & {
        /** Logical dates stored as text (same as Drizzle SQLite portable pattern). */
        date: SQLiteColumnBuilders['text'];
    };

export type DatabaseDialect = PgDatabaseDialect | SqliteDatabaseDialect;
