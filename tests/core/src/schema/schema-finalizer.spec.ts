import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Layer } from 'effect';
import {
    SchemaFinalizer,
    SchemaFinalizerNoOp,
    SchemaFinalizerNoOpLayer,
    type MergedColumns,
    type ExtraConfigItem,
} from '@eventiva/core';

describe('schema/schema-finalizer', () => {
    describe('SchemaFinalizerNoOp', () => {
        it.effect('buildTable returns empty object', () =>
            Effect.gen(function* () {
                const result = yield* SchemaFinalizerNoOp.buildTable('test_table', {}, []);
                expect(result).toBeDefined();
            })
        );

        it.effect('buildTable accepts any table name and columns', () =>
            Effect.gen(function* () {
                const columns: MergedColumns = { id: {}, name: {} };
                const result = yield* SchemaFinalizerNoOp.buildTable('test_table', columns, []);
                expect(result).toBeDefined();
            })
        );
    });

    describe('SchemaFinalizerNoOpLayer', () => {
        it.effect('provides SchemaFinalizer service', () =>
            Effect.gen(function* () {
                const finalizer = yield* Layer.build(SchemaFinalizerNoOpLayer);
                expect(finalizer).toBeDefined();
                expect(finalizer.buildTable).toBeDefined();
            })
        );
    });

    describe('SchemaFinalizer tag', () => {
        it.effect('SchemaFinalizer tag is properly defined', () =>
            Effect.gen(function* () {
                const tag = SchemaFinalizer;
                expect(tag).toBeDefined();
                expect(tag.key).toBe('@eventiva/core/SchemaFinalizer');
            })
        );
    });
});
