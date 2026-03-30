/**
 * Core {@link Database} service backed by Drizzle + better-sqlite3 (sync driver wrapped in Effect).
 * Mirrors {@link PgDatabaseLayer} laziness: builds schema from {@link FinalTableStore} on first use.
 */
import { Database, FinalTableStore, withSpanAndLog, type StoredRecord } from '@eventiva/core';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import BetterSqlite from 'better-sqlite3';
import { eq, getTableColumns } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { SqliteClient } from './sqlite-client-layer.js';

function getTable(schema: Record<string, unknown>, tableName: string): Record<string, unknown> | undefined {
    const t = schema[tableName];
    if (t == null || typeof t !== 'object') return undefined;
    try {
        const cols = getTableColumns(t as never);
        if (!('id' in cols)) return undefined;
    } catch {
        return undefined;
    }
    return t as Record<string, unknown>;
}

/** Drizzle can return `{ [tableName]: row }` for some select shapes; flatten for CRUD decode. */
function normalizeSqliteRow(tableName: string, row: unknown): unknown {
    if (row === null || typeof row !== 'object' || Array.isArray(row)) return row;
    const r = row as Record<string, unknown>;
    if ('id' in r && r['id'] !== undefined) return row;
    const nested = r[tableName];
    if (nested !== null && typeof nested === 'object' && !Array.isArray(nested) && 'id' in nested) {
        return nested;
    }
    return row;
}

export const SqliteDatabaseLayer = Layer.effect(
        Database,
        Effect.gen(function* () {
            const client = yield* SqliteClient;

            // Rebuild drizzle from FinalTableStore on each operation. Caching a single drizzle instance
            // with a snapshot of `schema` can pin an empty schema if any fiber touched Database before
            // finalization completed, which makes insert/select appear to run against different worlds.
            const getDb = Effect.gen(function* () {
                const store = yield* FinalTableStore;
                const tables = yield* store.getAllTables();
                return drizzle({
                    client: client as InstanceType<typeof BetterSqlite>,
                    schema: tables as any,
                    relations: {} as any,
                });
            });

            const dbService: Database = {
                get: <Id, R extends StoredRecord<Id>>(tableName: string, id: Id) =>
                    Effect.gen(function* () {
                        const db = yield* getDb;
                        const store = yield* FinalTableStore;
                        const tables = yield* store.getAllTables();
                        const table = getTable(tables, tableName);
                        if (!table) return null;
                        const rows = yield* Effect.sync(() =>
                            (db as any).select().from(table).where(eq((table as any).id, id)).all()
                        );
                        const first = rows[0] as unknown;
                        return (normalizeSqliteRow(tableName, first) as R) ?? null;
                    }).pipe(
                        Effect.catchAll((e) => Effect.die(e)),
                        withSpanAndLog('database.get', { attributes: { tableName } })
                    ),

                set: <Id, R extends StoredRecord<Id>>(tableName: string, id: Id, record: R) =>
                    Effect.gen(function* () {
                        const db = yield* getDb;
                        const store = yield* FinalTableStore;
                        const tables = yield* store.getAllTables();
                        const table = getTable(tables, tableName);
                        if (!table) return;
                        yield* Effect.sync(() => {
                            (db as any).delete(table).where(eq((table as any).id, id)).run();
                            const row = record as Record<string, unknown>;
                            const { active: _generatedActive, ...withoutActive } = row;
                            const insertValues = Object.fromEntries(
                                Object.entries(withoutActive).filter(([, v]) => v !== undefined)
                            );
                            (db as any).insert(table).values(insertValues).run();
                        });
                    }).pipe(
                        Effect.catchAll((e) => Effect.die(e)),
                        withSpanAndLog('database.set', { attributes: { tableName } })
                    ),

                delete: <Id>(tableName: string, id: Id) =>
                    Effect.gen(function* () {
                        const db = yield* getDb;
                        const store = yield* FinalTableStore;
                        const tables = yield* store.getAllTables();
                        const table = getTable(tables, tableName);
                        if (!table) return;
                        yield* Effect.sync(() => (db as any).delete(table).where(eq((table as any).id, id)).run());
                    }).pipe(
                        Effect.catchAll((e) => Effect.die(e)),
                        withSpanAndLog('database.delete', { attributes: { tableName } })
                    ),

                list: <Id, R extends StoredRecord<Id>>(tableName: string) =>
                    Effect.gen(function* () {
                        const db = yield* getDb;
                        const store = yield* FinalTableStore;
                        const tables = yield* store.getAllTables();
                        const table = getTable(tables, tableName);
                        if (!table) return [] as ReadonlyArray<R>;
                        const rows = yield* Effect.sync(() => (db as any).select().from(table).all());
                        return rows.map((row: unknown) => normalizeSqliteRow(tableName, row)) as ReadonlyArray<R>;
                    }).pipe(
                        Effect.catchAll((e) => Effect.die(e)),
                        withSpanAndLog('database.list', { attributes: { tableName } })
                    ),
            } as Database;

            return dbService;
        })
    ) as unknown as Layer.Layer<Database, never, typeof SqliteClient | typeof FinalTableStore>;
