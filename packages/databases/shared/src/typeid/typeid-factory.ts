import * as Effect from 'effect/Effect';
import * as Metric from 'effect/Metric';

const typeidCounter = Metric.counter('typeid_total');
const typeidErrorCounter = Metric.counter('typeid_error');
const typeidDuration = Metric.timer('typeid_duration');

/**
 * Shared Effect/metrics wrapper for dialect-specific TypeID column builders.
 */
export function runTypeidColumn<C>(options: {
    readonly columnName: string;
    readonly typePrefix: string;
    readonly create: () => C;
}): C {
    const effect = Effect.gen(function* () {
        yield* Effect.logInfo('typeid: creating column builder', {
            columnName: options.columnName,
            typePrefix: options.typePrefix,
        });

        yield* Metric.increment(typeidCounter);

        const columnBuilder = yield* Effect.sync(() => options.create()).pipe(
            Metric.trackDuration(typeidDuration),
            Effect.tapDefect((defect) =>
                Effect.gen(function* () {
                    yield* Effect.logError('typeid: error creating column builder', {
                        columnName: options.columnName,
                        typePrefix: options.typePrefix,
                        error: String(defect),
                    });
                    yield* Metric.increment(typeidErrorCounter);
                })
            ),
            Effect.tapError((error) =>
                Effect.gen(function* () {
                    yield* Effect.logError('typeid: error creating column builder', {
                        columnName: options.columnName,
                        typePrefix: options.typePrefix,
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
                columnName: options.columnName,
                typePrefix: options.typePrefix,
            },
        })
    );

    return Effect.runSync(effect);
}
