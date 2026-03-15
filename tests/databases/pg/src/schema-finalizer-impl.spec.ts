import { describe } from 'vitest';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import { it as itEffect } from '@effect/vitest';
import { SchemaFinalizerPg } from '@eventiva/databases.pg';
import { SchemaFinalizer } from '@eventiva/core';
import { typeid } from '@eventiva/databases.shared';
import { getPgColumnBuilders } from 'drizzle-orm/pg-core/columns/all';

describe('SchemaFinalizerPg', () => {
    itEffect('provides schema finalizer service', () =>
        Effect.gen(function* () {
            const finalizer = yield* SchemaFinalizer;
            expect(finalizer).toBeDefined();
            expect(finalizer.buildTable).toBeDefined();
        }).pipe(Effect.provide(SchemaFinalizerPg))
    );

    itEffect('builds table from merged columns', () =>
        Effect.gen(function* () {
            const finalizer = yield* SchemaFinalizer;
            const db = {
                ...getPgColumnBuilders(),
                typeid,
            };
            const columns = {
                id: db.typeid('id'),
                name: db.text('name'),
            };
            const table = yield* finalizer.buildTable('test_table', columns as any, [], undefined);
            expect(table).toBeDefined();
        }).pipe(Effect.provide(SchemaFinalizerPg))
    );
});
