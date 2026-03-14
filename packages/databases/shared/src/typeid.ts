import { text } from 'drizzle-orm/pg-core';
import type { PgColumnBuilder } from 'drizzle-orm/pg-core';
import * as Effect from 'effect/Effect';
import * as Metric from 'effect/Metric';

/**
 * Creates a text column builder for TypeID fields in Drizzle ORM.
 * 
 * TypeID is a type-safe, K-sortable identifier format with a type prefix
 * (e.g., "contact_01h2xcejqtf2nbrexx3vqjhp41").
 * 
 * This function creates a Drizzle text column that can be used in table definitions.
 * The column will store TypeID strings with the specified type prefix.
 * 
 * @param value - The column name (default: 'id')
 * @param config - Optional configuration object
 * @param config.type - The TypeID prefix type (e.g., 'contact', 'user')
 * @returns A Drizzle text column builder
 * 
 * @example
 * ```typescript
 * import { typeid } from '@eventiva/databases.shared';
 * 
 * const contactColumns = {
 *   id: typeid('id', { type: 'contact' }),
 *   // ... other columns
 * };
 * ```
 */
export const typeid = (value = 'id', config?: { type: string }): PgColumnBuilder => {
    const typeidCounter = Metric.counter('typeid_total');
    const typeidErrorCounter = Metric.counter('typeid_error');
    const typeidDuration = Metric.timer('typeid_duration');

    const effect = Effect.gen(function* () {
        yield* Effect.logInfo('typeid: creating column builder', {
            columnName: value,
            typePrefix: config?.type ?? 'unknown',
        });

        yield* Metric.increment(typeidCounter);

        const columnBuilder = yield* Effect.try({
            try: () => text(value) as PgColumnBuilder,
            catch: (error) => error,
        }).pipe(
            Metric.trackDuration(typeidDuration),
            Effect.tapError((error) =>
                Effect.gen(function* () {
                    yield* Effect.logError('typeid: error creating column builder', {
                        columnName: value,
                        typePrefix: config?.type ?? 'unknown',
                        error: String(error),
                    });
                    yield* Metric.increment(typeidErrorCounter);
                })
            )
        );

        return columnBuilder;
    }).pipe(
        Effect.withSpan('typeid', {
            attributes: {
                columnName: value,
                typePrefix: config?.type ?? 'unknown',
            },
        })
    );

    // Run synchronously to maintain the synchronous function signature
    // Effect.runSync executes the effect synchronously
    // Observability (logging, tracing, metrics) will work if services are available in the runtime context
    // If services are not available, Effect uses default no-op implementations
    return Effect.runSync(effect);
};
