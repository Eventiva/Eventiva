/**
 * SQLite file path from env for the default platform. Forks can provide their own layer.
 * `EVENTIVA_SQLITE_PATH` — file path or `:memory:` (default `./.data/eventiva.sqlite`).
 */
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import BetterSqlite from 'better-sqlite3';

/** Phantom id for the native SQLite client tag (do not merge with the `SqliteClient` value — breaks `GenericTag` inference). */
export type SqliteNativeClientTag = { readonly __eventivaSqliteNativeClient?: undefined };

/** Native better-sqlite3 connection (see `better-sqlite3` Database instance). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- @types/better-sqlite3 is `export =`; TS cannot emit `BetterSqlite3.Database` in our .d.ts (TS4023).
export const SqliteClient = Context.GenericTag<SqliteNativeClientTag, any>(
    '@eventiva/databases.sqlite/SqliteClient'
);

export function sqlitePathFromEnv(env: NodeJS.ProcessEnv = process.env): string {
    const p = env['EVENTIVA_SQLITE_PATH']?.trim();
    if (p) return p;
    return './.data/eventiva.sqlite';
}

/**
 * Scoped better-sqlite3 connection; closed when the layer scope ends.
 */
function openDatabase(): InstanceType<typeof BetterSqlite> {
    const path = sqlitePathFromEnv();
    if (path === ':memory:') {
        return new BetterSqlite(path);
    }
    const full = resolve(path);
    mkdirSync(dirname(full), { recursive: true });
    return new BetterSqlite(full);
}

export const SqliteClientLayerDefault = Layer.scoped(
    SqliteClient,
    Effect.acquireRelease(
        Effect.sync(() => openDatabase()),
        (db) => Effect.sync(() => db.close())
    )
);
