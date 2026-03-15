import { describe, it, expect } from '@effect/vitest';
import { Effect } from 'effect';
import * as SchemaIndex from '@eventiva/core';

describe('schema/index', () => {
    describe('exports', () => {
        it.effect('exports DuplicateColumnError', () =>
            Effect.gen(function* () {
                expect(SchemaIndex.DuplicateColumnError).toBeDefined();
            })
        );

        it.effect('exports FinalTableStore', () =>
            Effect.gen(function* () {
                expect(SchemaIndex.FinalTableStore).toBeDefined();
                expect(SchemaIndex.FinalTableStoreLive).toBeDefined();
            })
        );

        it.effect('exports SchemaFinalizer', () =>
            Effect.gen(function* () {
                expect(SchemaIndex.SchemaFinalizer).toBeDefined();
                expect(SchemaIndex.SchemaFinalizerNoOp).toBeDefined();
                expect(SchemaIndex.SchemaFinalizerNoOpLayer).toBeDefined();
            })
        );

        it.effect('exports SchemaRegistryConfig', () =>
            Effect.gen(function* () {
                expect(SchemaIndex.SchemaRegistryConfig).toBeDefined();
                expect(SchemaIndex.SchemaRegistryConfigLive).toBeDefined();
            })
        );

        it.effect('exports TableColumnRegistry', () =>
            Effect.gen(function* () {
                expect(SchemaIndex.TableColumnRegistry).toBeDefined();
                expect(SchemaIndex.TableColumnRegistryLive).toBeDefined();
            })
        );

        it.effect('exports TableRelationsRegistry', () =>
            Effect.gen(function* () {
                expect(SchemaIndex.TableRelationsRegistry).toBeDefined();
                expect(SchemaIndex.TableRelationsRegistryLive).toBeDefined();
            })
        );
    });
});
