/**
 * Observability Layer using @effect/opentelemetry.
 * Provides Logger, Metrics, and Tracer backed by OpenTelemetry (NodeSdk).
 * Every function in the framework and extensions must use Tracer (span), Logger (structured log), and Metric where appropriate.
 * @see https://effect-ts.github.io/effect/docs/opentelemetry
 */
import { BatchSpanProcessor, ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base"
import {
  ConsoleLogRecordExporter,
  SimpleLogRecordProcessor
} from "@opentelemetry/sdk-logs"
import {
  ConsoleMetricExporter,
  PeriodicExportingMetricReader
} from "@opentelemetry/sdk-metrics"
import * as Layer from "effect/Layer"
import * as NodeSdk from "@effect/opentelemetry/NodeSdk"
import type * as Resource from "@effect/opentelemetry/Resource"

function getDefaultConfig(): NodeSdk.Configuration {
  return {
    resource: { serviceName: "eventiva-core", serviceVersion: "0.0.1" },
    spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter()),
    logRecordProcessor: new SimpleLogRecordProcessor(new ConsoleLogRecordExporter()),
    metricReader: new PeriodicExportingMetricReader({
      exporter: new ConsoleMetricExporter(),
      exportIntervalMillis: 10_000
    }),
    shutdownTimeout: 3000
  }
}

/**
 * ObservabilityLive: single Layer providing Effect Logger, Tracer, Metrics, and Resource (OTEL).
 * Use as the base for runtime and all entity handlers. Every function must use span + log + metric where appropriate.
 */
export const ObservabilityLive: Layer.Layer<Resource.Resource> = NodeSdk.layer(
  getDefaultConfig
)
