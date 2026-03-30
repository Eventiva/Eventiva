/**
 * Build PostgreSQL CREATE TYPE / CREATE TABLE / CREATE INDEX statements from finalized Drizzle {@link PgTable} objects.
 * Avoids drizzle-kit `pushSchema` introspection (unstable with empty catalogs in beta).
 */
import { CasingCache } from 'drizzle-orm/casing';
import { getTableName, type Table } from 'drizzle-orm/table';
import type { SQL } from 'drizzle-orm/sql/sql';
import { getTableConfig, type ForeignKey, type Index, type PgTable } from 'drizzle-orm/pg-core';
import type { AnyPgColumn } from 'drizzle-orm/pg-core';

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

function sqlToPg(s: SQL): string {
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

function columnSql(col: AnyPgColumn): string {
    const qn = buildQueryConfig.escapeName(col.name);
    const sqlType = col.getSQLType();

    if (col.generatedIdentity) {
        const idType = col.generatedIdentity.type === 'always' ? 'ALWAYS' : 'BY DEFAULT';
        const parts = [qn, sqlType, `GENERATED ${idType} AS IDENTITY`];
        if (col.primary) parts.push('PRIMARY KEY');
        if (col.notNull) parts.push('NOT NULL');
        return parts.join(' ');
    }

    if (col.generated) {
        const g = col.generated;
        const asExpr = typeof g.as === 'function' ? (g.as as () => SQL)() : (g.as as SQL);
        const expr = sqlToPg(asExpr);
        const storage = g.mode === 'virtual' ? '' : ' STORED';
        const parts = [qn, sqlType, `GENERATED ALWAYS AS (${expr})${storage}`];
        if (col.primary) parts.push('PRIMARY KEY');
        if (col.notNull) parts.push('NOT NULL');
        return parts.join(' ');
    }

    const parts: string[] = [qn, sqlType];
    if (col.primary) parts.push('PRIMARY KEY');
    if (col.notNull) parts.push('NOT NULL');
    if (col.hasDefault && col.default !== undefined) {
        const d = col.default;
        if (isSQL(d)) {
            parts.push(`DEFAULT (${sqlToPg(d)})`);
        } else {
            parts.push(`DEFAULT ${buildQueryConfig.escapeString(String(d))}`);
        }
    }
    return parts.join(' ');
}

function indexColumnExpr(c: unknown): string {
    if (isSQL(c)) return sqlToPg(c);
    if (c != null && typeof c === 'object' && 'name' in c && typeof (c as { name: unknown }).name === 'string') {
        return buildQueryConfig.escapeName((c as { name: string }).name);
    }
    throw new Error('Unexpected index column shape in PG DDL');
}

function indexSql(qualifiedName: string, idx: Index): string | null {
    const q = buildQueryConfig.escapeName;
    const name = idx.config.name;
    if (!name) return null;
    const unique = idx.config.unique ? 'UNIQUE ' : '';
    const onCols = idx.config.columns.map(indexColumnExpr).join(', ');
    let stmt = `CREATE ${unique}INDEX IF NOT EXISTS ${q(name)} ON ${qualifiedName} (${onCols})`;
    if (idx.config.where) {
        stmt += ` WHERE ${sqlToPg(idx.config.where)}`;
    }
    return stmt;
}

function tableQualifiedName(cfg: { name: string; schema?: string }): string {
    const q = buildQueryConfig.escapeName;
    if (cfg.schema) return `${q(cfg.schema)}.${q(cfg.name)}`;
    return q(cfg.name);
}

/** Idempotent enum used by {@link table-builder} `statusEnum` / generated `active` column. */
const STATUS_ENUM_DDL = `DO $$ BEGIN
  CREATE TYPE "status" AS ENUM ('inactive', 'active');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;`;

/**
 * Returns DDL statements for all Pg tables in the schema map (enum prelude, placeholder table, CREATE TABLE IF NOT EXISTS, then indexes).
 *
 * FK clauses come from Drizzle `getTableConfig(table).foreignKeys` (e.g. `contact.created_by` → `contact.id` when the creator table uses a self-reference).
 * The placeholder table is still created so legacy or non-creator tables that reference it remain valid DDL.
 *
 * **Note:** `CREATE TABLE IF NOT EXISTS` never alters an existing table; changing FK targets requires dropping affected tables (see `scripts/pg-e2e-via-nx.mjs` `PG_E2E_SCHEMA_RESET`).
 */
export function buildPgDdlStatements(tables: Record<string, unknown>): string[] {
    const statements: string[] = [
        STATUS_ENUM_DDL,
        'CREATE TABLE IF NOT EXISTS "_created_by_placeholder" ("id" text PRIMARY KEY NOT NULL)',
    ];

    for (const t of Object.values(tables)) {
        if (t == null || typeof t !== 'object') continue;
        const table = t as PgTable;
        let cfg: ReturnType<typeof getTableConfig>;
        try {
            cfg = getTableConfig(table);
        } catch {
            continue;
        }
        const qName = tableQualifiedName(cfg);
        const colParts = cfg.columns.map(columnSql);
        const fkParts = cfg.foreignKeys.map(foreignKeySql);
        const body = [...colParts, ...fkParts].join(', ');
        statements.push(`CREATE TABLE IF NOT EXISTS ${qName} (${body})`);
        for (const idx of cfg.indexes) {
            const s = indexSql(qName, idx);
            if (s) statements.push(s);
        }
    }
    return statements;
}
