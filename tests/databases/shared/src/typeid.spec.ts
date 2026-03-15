import { describe, it, expect } from '@effect/vitest';
import { Effect } from 'effect';
import { typeid } from '@eventiva/databases.shared';

describe('databases/shared/typeid', () => {
    describe('typeid', () => {
        it.effect('creates column builder with default name', () =>
            Effect.sync(() => {
                const builder = typeid();
                expect(builder).toBeDefined();
                // Builder should have properties typical of Drizzle column builders
                expect(builder).toHaveProperty('_');
            })
        );

        it.effect('creates column builder with custom name', () =>
            Effect.sync(() => {
                const builder = typeid('custom_id');
                expect(builder).toBeDefined();
                expect(builder).toHaveProperty('_');
            })
        );

        it.effect('creates column builder with type prefix', () =>
            Effect.sync(() => {
                const builder = typeid('id', { type: 'contact' });
                expect(builder).toBeDefined();
                expect(builder).toHaveProperty('_');
            })
        );

        it.effect('creates column builder with different type prefixes', () =>
            Effect.sync(() => {
                const contactBuilder = typeid('id', { type: 'contact' });
                const userBuilder = typeid('id', { type: 'user' });
                const eventBuilder = typeid('id', { type: 'event' });

                expect(contactBuilder).toBeDefined();
                expect(userBuilder).toBeDefined();
                expect(eventBuilder).toBeDefined();
            })
        );

        it.effect('creates column builder with custom name and type', () =>
            Effect.sync(() => {
                const builder = typeid('entity_id', { type: 'entity' });
                expect(builder).toBeDefined();
                expect(builder).toHaveProperty('_');
            })
        );

        it.effect('handles missing type prefix gracefully', () =>
            Effect.sync(() => {
                // When type is not provided, it should still create a builder
                const builder = typeid('id');
                expect(builder).toBeDefined();
            })
        );
    });
});
