/**
 * Observability helpers: span + log + metric in one go.
 * Every function in the framework and extensions must use tracing, logging, and metrics.
 * @see Observability "every function" contract in README.md
 */
import * as Effect from "effect/Effect";
/**
 * Options for withSpanAndLog.
 */
export interface WithSpanAndLogOptions {
    /** Optional metric name for duration (default: `${spanName}.duration`) */
    readonly metricName?: string;
    /** Structured fields to include in entry/exit logs */
    readonly attributes?: Record<string, string | number | boolean>;
}
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
export declare function withSpanAndLog<A, E, R>(spanName: string, options?: WithSpanAndLogOptions): (effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>;
//# sourceMappingURL=helpers.d.ts.map