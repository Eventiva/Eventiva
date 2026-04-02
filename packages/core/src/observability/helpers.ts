import { Effect, Metric, Predicate } from "effect"

/**
 * Options for {@link withSpanAndLog}.
 */
export interface WithSpanAndLogOptions {
  /** Optional metric name prefix (default: spanName with `.` → `_`) */
  readonly metricName?: string
  /**
   * Structured fields on the span and in entry/exit logs. When non-empty, the
   * same key-value pairs are also applied with {@link Effect.annotateLogs} so
   * every log line inside the wrapped effect carries this context.
   */
  readonly attributes?: Record<string, string | number | boolean>
}

/** Histogram bucket edges (ms); {@link Metric.timerWithBoundaries} adds +∞. Suited to RPC-style latency. */
const RPC_LATENCY_MS_BOUNDARIES: ReadonlyArray<number> = [
  0, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300, 400, 500, 750, 1000, 1500, 2000,
  3000, 5000, 10000,
]

function errorKindLabel(error: unknown): string {
  if (Predicate.hasProperty(error, "_tag") && typeof (error as { _tag: unknown })._tag === "string") {
    return (error as { _tag: string })._tag
  }
  if (error instanceof Error) {
    return error.name
  }
  return "unknown"
}

/**
 * Wraps an effect with a span, entry/exit trace logs, duration histogram, counters, and error-kind frequency.
 * When {@link WithSpanAndLogOptions.attributes} is non-empty, wraps the result with
 * {@link Effect.annotateLogs} using those values (same data as the span attributes).
 *
 * Duration is recorded in milliseconds; the timer metric carries `time_unit: milliseconds` (Effect default).
 */
export function withSpanAndLog(spanName: string, options?: WithSpanAndLogOptions) {
  const name = options?.metricName ?? spanName
  const metricBase = name.replace(/\./g, "_")
  const attrs = options?.attributes ?? {}
  const annotateFromAttrs = Object.keys(attrs).length > 0

  const tagOp = <Type, In, Out>(self: Metric.Metric<Type, In, Out>) =>
    Metric.tagged(self, "operation", metricBase)

  const timer = tagOp(
    Metric.timerWithBoundaries(
      `${metricBase}_duration`,
      RPC_LATENCY_MS_BOUNDARIES,
      `Duration (ms) for ${metricBase}.`,
    ),
  )

  const errorKinds = tagOp(
    Metric.frequency(`${metricBase}_error_kinds`, {
      description: `Distinct failure labels for ${metricBase}.`,
    }),
  )

  const totalCounter = tagOp(
    Metric.counter(`${metricBase}_total`, {
      incremental: true,
      description: `Invocation count for ${metricBase}.`,
    }),
  )

  const successCounter = tagOp(
    Metric.counter(`${metricBase}_success_total`, {
      incremental: true,
      description: `Successful completions for ${metricBase}.`,
    }),
  )

  const errorCounter = tagOp(
    Metric.counter(`${metricBase}_error_total`, {
      incremental: true,
      description: `Errors for ${metricBase}.`,
    }),
  )

  const instrument = Effect.fn(spanName)(function* (inner: Effect.Effect<unknown, unknown, unknown>) {
    for (const [k, v] of Object.entries(attrs)) {
      yield* Effect.annotateCurrentSpan(k, v)
    }
    yield* Effect.logTrace(`entry ${spanName}`, { spanName, ...attrs })
    yield* Metric.increment(totalCounter)
    const result = yield* inner.pipe(
      Metric.trackDuration(timer),
      Effect.tap(() => Metric.increment(successCounter)),
      Effect.tapError((error) =>
        Effect.gen(function* () {
          yield* Effect.logError(`error ${spanName}`, { spanName, error, ...attrs })
          yield* Metric.increment(errorCounter)
          yield* Metric.update(errorKinds, errorKindLabel(error))
        }),
      ),
    )
    yield* Effect.logTrace(`exit ${spanName}`, { spanName, ...attrs })
    return result
  })

  return <A, E, R>(effect: Effect.Effect<A, E, R>): Effect.Effect<A, E, R> => {
    const out = instrument(effect) as Effect.Effect<A, E, R>
    return annotateFromAttrs ? Effect.annotateLogs(out, attrs as Record<string, unknown>) : out
  }
}
