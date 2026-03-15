import { describe } from 'vitest';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import { it as itEffect } from '@effect/vitest';
import { createTable } from '@eventiva/databases.pg';
import { TableColumnRegistryLive } from '@eventiva/core';
import { typeid } from '@eventiva/databases.shared';
import { getPgColumnBuilders } from 'drizzle-orm/pg-core/columns/all';

describe('createTable', () => {
    itEffect('registers table with valid columns', () =>
        Effect.gen(function* () {
            const db = {
                ...getPgColumnBuilders(),
                typeid,
            };
            yield* createTable(
                'test_table',
                'test-extension',
                (columnTypes) => ({
                    id: columnTypes.typeid('id'),
                    name: columnTypes.text('name'),
                })
            );
        }).pipe(Effect.provide(TableColumnRegistryLive))
    );

    itEffect('fails when id column is missing', () =>
        Effect.gen(function* () {
            const result = yield* Effect.exit(
                createTable(
                    'test_table',
                    'test-extension',
                    (columnTypes) => ({
                        name: columnTypes.text('name'),
                    } as any)
                )
            );
            expect(Effect.isFailure(result)).toBe(true);
        }).pipe(Effect.provide(TableColumnRegistryLive))
    );

    itEffect('fails when forbidden fields are present', () =>
        Effect.gen(function* () {
            const result = yield* Effect.exit(
                createTable(
                    'test_table',
                    'test-extension',
                    (columnTypes) => ({
                        id: columnTypes.typeid('id'),
                        createdAt: columnTypes.timestamp('created_at'),
                    } as any)
                )
            );
            expect(Effect.isFailure(result)).toBe(true);
        }).pipe(Effect.provide(TableColumnRegistryLive))
    );
});
