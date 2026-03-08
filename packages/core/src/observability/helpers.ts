/**
 * Observability helpers: span + log + metric in one go.
 * Every function in the framework and extensions must use tracing, logging, and metrics.
 * @see Observability "every function" contract in README.md
 */
import * as Effect from "effect/Effect"
import * as Metric from "effect/Metric"

/**
 * Options for withSpanAndLog.
 */
export interface WithSpanAndLogOptions {
  /** Optional metric name for duration (default: `${spanName}.duration`) */
  readonly metricName?: string
  /** Structured fields to include in entry/exit logs */
  readonly attributes?: Record<string, string | number | boolean>
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
export function withSpanAndLog<A, E, R>(
  spanName: string,
  options?: WithSpanAndLogOptions
) {
  const metricName = options?.metricName ?? `${spanName}.duration`
  const attrs = options?.attributes ?? {}
  const timer = Metric.timer(metricName, `Duration of ${spanName}`)

  return (effect: Effect.Effect<A, E, R>): Effect.Effect<A, E, R> =>
    Effect.withSpan(spanName)(
      Effect.gen(function* () {
        yield* Effect.log(`entry ${spanName}`, { spanName, ...attrs })
        const result = yield* effect.pipe(Metric.trackDuration(timer))
        yield* Effect.log(`exit ${spanName}`, { spanName, ...attrs })
        return result
      })
    )
}
