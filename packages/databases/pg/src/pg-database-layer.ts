/**
 * Database layer for PostgreSQL using Drizzle effect-postgres.
 * Lazily builds EffectPgDatabase from FinalTableStore (schema + relations) on first use.
 * Requires PgClient and FinalTableStore; use DefaultServices when providing PgClient if you use make() elsewhere.
 *
 * @see docs/learnings/architecture.md
 * @see .cursor/plans/drizzle_effect-postgres_integration_b20f3540.plan.md
 */
import { Database, FinalTableStore, withSpanAndLog, type StoredRecord } from '@eventiva/core';
import * as Deferred from 'effect/Deferred';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import * as Ref from 'effect/Ref';
import { eq } from 'drizzle-orm';
import { PgClient } from '@effect/sql-pg';
import { makeWithDefaults } from './drizzle-pg.js';

/** Tables from FinalTableStore are Drizzle PgTable; we use them with eq(table.id, id). */
function getTable(schema: Record<string, unknown>, tableName: string): Record<string, unknown> | undefined {
    const t = schema[tableName];
    if (!t || typeof t !== 'object' || !('id' in t)) return undefined;
    return t as Record<string, unknown>;
}

/**
 * Layer that provides the core Database service by delegating to Drizzle effect-postgres.
 * Requires PgClient (@effect/sql-pg) and FinalTableStore (provided by platform schema stack).
 * Lazy-initialises EffectPgDatabase from FinalTableStore.getAllTables() and getAllRelations() on first get/set/list/delete.
 */
export const PgDatabaseLayer: Layer.Layer<Database, never, typeof PgClient | typeof FinalTableStore> =
    Layer.effect(
        Database,
        Effect.gen(function* () {
            const dbRef = yield* Ref.make<Deferred.Deferred<any, never> | null>(null);

            const getDb = Effect.gen(function* () {
                const d = yield* Ref.get(dbRef);
                if (d) return yield* Deferred.await(d);
                const newD = yield* Deferred.make<any, never>();
                yield* Ref.set(dbRef, newD);
                const store = yield* FinalTableStore;
                const [tables, relations] = yield* Effect.all([
                    store.getAllTables(),
                    store.getAllRelations(),
                ]);
                const db = yield* makeWithDefaults({ schema: tables as any, relations: relations as any });
                yield* Deferred.succeed(newD, db);
                return yield* Deferred.await(newD);
            });

            const database: Database = {
                get: <Id, R extends StoredRecord<Id>>(tableName: string, id: Id) =>
                    Effect.gen(function* () {
                        const db = yield* getDb;
                        const store = yield* FinalTableStore;
                        const tables = yield* store.getAllTables();
                        const table = getTable(tables, tableName);
                        if (!table) return null;
                        const rows = yield* (db as any).select().from(table).where(eq((table as any).id, id));
                        return (rows[0] as R) ?? null;
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
                        yield* (db as any).delete(table).where(eq((table as any).id, id));
                        yield* (db as any).insert(table).values(record as Record<string, unknown>);
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
                        yield* (db as any).delete(table).where(eq((table as any).id, id));
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
                        const rows = yield* (db as any).select().from(table);
                        return rows as ReadonlyArray<R>;
                    }).pipe(
                        Effect.catchAll((e) => Effect.die(e)),
                        withSpanAndLog('database.list', { attributes: { tableName } })
                    ),
            } as Database;

            return database;
        })
    );
