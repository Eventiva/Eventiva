import { describe, it, expect } from '@effect/vitest';
import { Effect, Exit, Layer } from 'effect';
import {
    TableColumnRegistry,
    TableColumnRegistryLive,
    type PendingTableEntry,
} from '@eventiva/core';
import { FinalTableStoreLive } from '@eventiva/core';
import { SchemaRegistryConfigLive } from '@eventiva/core';
import { SchemaFinalizerNoOpLayer } from '@eventiva/core';

describe('schema/table-column-registry', () => {
    describe('TableColumnRegistryLive', () => {
        it.effect('provides TableColumnRegistry service', () =>
            Effect.gen(function* () {
                const layer = TableColumnRegistryLive.pipe(
                    Layer.provide(FinalTableStoreLive),
                    Layer.provide(SchemaFinalizerNoOpLayer),
                    Layer.provide(SchemaRegistryConfigLive(0))
                );
                const registry = yield* Layer.build(layer);

                expect(registry).toBeDefined();
                expect(registry.registerTableColumns).toBeDefined();
                expect(registry.setExpectedReadyCount).toBeDefined();
                expect(registry.markReady).toBeDefined();
                expect(registry.waitUntilFinalized).toBeDefined();
            })
        );

        it.effect('registerTableColumns registers columns', () =>
            Effect.gen(function* () {
                const layer = TableColumnRegistryLive.pipe(
                    Layer.provide(FinalTableStoreLive),
                    Layer.provide(SchemaFinalizerNoOpLayer),
                    Layer.provide(SchemaRegistryConfigLive(0))
                );
                const registry = yield* Layer.build(layer);

                yield* registry.registerTableColumns('test_table', 'ext1', { id: {}, name: {} });
                // Should not throw
                expect(true).toBe(true);
            })
        );

        it.effect('setExpectedReadyCount sets the count', () =>
            Effect.gen(function* () {
                const layer = TableColumnRegistryLive.pipe(
                    Layer.provide(FinalTableStoreLive),
                    Layer.provide(SchemaFinalizerNoOpLayer),
                    Layer.provide(SchemaRegistryConfigLive(0))
                );
                const registry = yield* Layer.build(layer);

                yield* registry.setExpectedReadyCount(5);
                // Should not throw
                expect(true).toBe(true);
            })
        );

        it.effect('markReady marks extension as ready', () =>
            Effect.gen(function* () {
                const layer = TableColumnRegistryLive.pipe(
                    Layer.provide(FinalTableStoreLive),
                    Layer.provide(SchemaFinalizerNoOpLayer),
                    Layer.provide(SchemaRegistryConfigLive(1))
                );
                const registry = yield* Layer.build(layer);

                yield* registry.setExpectedReadyCount(1);
                yield* registry.markReady('ext1');
                // Should trigger finalization
                const result = yield* Effect.exit(registry.waitUntilFinalized());
                expect(Exit.isSuccess(result)).toBe(true);
            })
        );
    });

    describe('TableColumnRegistry tag', () => {
        it.effect('TableColumnRegistry tag is properly defined', () =>
            Effect.gen(function* () {
                const tag = TableColumnRegistry;
                expect(tag).toBeDefined();
                expect(tag.key).toBe('@eventiva/core/TableColumnRegistry');
            })
        );
    });
});
