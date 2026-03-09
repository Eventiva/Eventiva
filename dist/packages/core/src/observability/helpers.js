/**
 * Observability helpers: span + log + metric in one go.
 * Every function in the framework and extensions must use tracing, logging, and metrics.
 * @see Observability "every function" contract in README.md
 */
import * as Effect from "effect/Effect";
import * as Metric from "effect/Metric";
/**
 * Wraps an effect with:
 * - A span (tracing) named `spanName`
 * - Entry log with structured fields
 * - Exit log on success
 * - A duration metric (histogram) for the operation
 *
 * Use this so every function satisfies the observability contract:
 * (1) runs inside a span, (2) logs at entry/exit, (3) records at least one metric.
 *
 * @example
 * ```ts
 * const run = Effect.gen(function* () {
 *   const result = yield* withSpanAndLog("MyService.doWork", {
 *     attributes: { entityId: "123" }
 *   })(doWorkEffect)
 *   return result
 * })
 * ```
 */
export function withSpanAndLog(spanName, options) {
    const name = options?.metricName ?? spanName;
    const metricName = name.replace(/\./g, '_');
    const attrs = options?.attributes ?? {};
    const timer = Metric.timer(`${metricName}_duration`);
    const totalCounter = Metric.counter(`${metricName}_total`);
    const successCounter = Metric.counter(`${metricName}_success`);
    const errorCounter = Metric.counter(`${metricName}_error`);
    return (effect) => Effect.withSpan(spanName, { attributes: attrs })(Effect.gen(function* () {
        yield* Effect.logTrace(`entry ${spanName}`, { spanName, ...attrs });
        yield* Metric.increment(totalCounter);
        const result = yield* effect.pipe(Metric.trackDuration(timer), Effect.tap(() => Metric.increment(successCounter)), Effect.tapError((error) => Effect.gen(function* () {
            yield* Effect.logError(`error ${spanName}`, { spanName, error, ...attrs });
            yield* Metric.increment(errorCounter);
        })));
        yield* Effect.logTrace(`exit ${spanName}`, { spanName, ...attrs });
        return result;
    }));
}
