/**
 * Build SQLite CREATE TABLE / CREATE INDEX statements from finalized Drizzle {@link SQLiteTable} objects.
 * Used because drizzle-kit stable APIs conflict with drizzle-orm 1.0 beta in this workspace.
 */
import { CasingCache } from 'drizzle-orm/casing';
import { getTableName, type Table } from 'drizzle-orm/table';
import type { SQL } from 'drizzle-orm/sql/sql';
import {
    getTableConfig,
    type ForeignKey,
    type Index,
    type IndexColumn,
    type SQLiteTable,
} from 'drizzle-orm/sqlite-core';
import type { SQLiteColumn } from 'drizzle-orm/sqlite-core/columns/common';

function isSQL(x: unknown): x is SQL {
    return typeof x === 'object' && x !== null && 'queryChunks' in x;
}

const buildQueryConfig = {
    casing: new CasingCache(),
    escapeName: (name: string) => `"${String(name).replace(/"/g, '""')}"`,
    escapeParam: () => {
        throw new Error('Unexpected bound parameter in DDL SQL fragment');
    },
    escapeString: (str: string) => `'${String(str).replace(/'/g, "''")}'`,
} as const;

function sqlToSqlite(s: SQL): string {
    return s.toQuery(buildQueryConfig as never).sql;
}

function foreignKeySql(fk: ForeignKey): string {
    const ref = fk.reference();
    const cols = ref.columns.map((c) => buildQueryConfig.escapeName(c.name)).join(', ');
    const fName = buildQueryConfig.escapeName(getTableName(ref.foreignTable as Table));
    const fCols = ref.foreignColumns.map((c) => buildQueryConfig.escapeName(c.name)).join(', ');
    let clause = `FOREIGN KEY (${cols}) REFERENCES ${fName} (${fCols})`;
    if (fk.onUpdate) clause += ` ON UPDATE ${fk.onUpdate.toUpperCase()}`;
    if (fk.onDelete) clause += ` ON DELETE ${fk.onDelete.toUpperCase()}`;
    return clause;
}

function columnSql(col: SQLiteColumn<any, Record<string, unknown>>): string {
    const parts: string[] = [buildQueryConfig.escapeName(col.name), col.getSQLType()];
    if (col.primary) {
        parts.push('PRIMARY KEY');
    }
    if (col.notNull && !col.generated) {
        parts.push('NOT NULL');
    }
    if (col.generated) {
        const g = col.generated;
        const asExpr = typeof g.as === 'function' ? (g.as as () => SQL)() : (g.as as SQL);
        const expr = sqlToSqlite(asExpr);
        const storage = g.mode === 'virtual' ? 'VIRTUAL' : 'STORED';
        parts.push(`GENERATED ALWAYS AS (${expr}) ${storage}`);
    } else if (col.hasDefault && col.default !== undefined) {
        const d = col.default;
        if (isSQL(d)) {
            parts.push(`DEFAULT (${sqlToSqlite(d)})`);
        } else {
            parts.push(`DEFAULT ${buildQueryConfig.escapeString(String(d))}`);
        }
    }
    return parts.join(' ');
}

function indexColumnExpr(c: IndexColumn): string {
    if (isSQL(c)) return sqlToSqlite(c);
    return buildQueryConfig.escapeName(c.name);
}

function indexSql(tableName: string, idx: Index): string | null {
    const q = buildQueryConfig.escapeName;
    const name = idx.config.name;
    if (!name) return null;
    const unique = idx.config.unique ? 'UNIQUE ' : '';
    const onCols = idx.config.columns.map(indexColumnExpr).join(', ');
    let stmt = `CREATE ${unique}INDEX IF NOT EXISTS ${q(name)} ON ${q(tableName)} (${onCols})`;
    if (idx.config.where) {
        stmt += ` WHERE ${sqlToSqlite(idx.config.where)}`;
    }
    return stmt;
}

/**
 * Returns DDL statements for all SQLite tables in the schema map (CREATE TABLE IF NOT EXISTS, then indexes).
 */
export function buildSqliteDdlStatements(tables: Record<string, unknown>): string[] {
    const statements: string[] = [
        // Drizzle `created_by` FK targets this synthetic table (see table-builder `createdByPlaceholder`).
        // Without it, `CREATE TABLE contact (... FOREIGN KEY (created_by) REFERENCES ...)` breaks inserts when foreign_keys=ON.
        'CREATE TABLE IF NOT EXISTS "_created_by_placeholder" ("id" TEXT PRIMARY KEY NOT NULL)',
    ];
    for (const t of Object.values(tables)) {
        if (t == null || typeof t !== 'object') continue;
        const table = t as SQLiteTable;
        let cfg: ReturnType<typeof getTableConfig>;
        try {
            cfg = getTableConfig(table);
        } catch {
            continue;
        }
        const tName = cfg.name;
        const q = buildQueryConfig.escapeName;
        const colParts = cfg.columns.map(columnSql);
        const fkParts = cfg.foreignKeys.map(foreignKeySql);
        const body = [...colParts, ...fkParts].join(', ');
        statements.push(`CREATE TABLE IF NOT EXISTS ${q(tName)} (${body})`);
        for (const idx of cfg.indexes) {
            const s = indexSql(tName, idx);
            if (s) statements.push(s);
        }
    }
    return statements;
}
