/**
 * Observability Layer using @effect/opentelemetry.
 * Provides Logger, Metrics, and Tracer backed by OpenTelemetry (NodeSdk).
 * Every function in the framework and extensions must use Tracer (span), Logger (structured log), and Metric where appropriate.
 * @see https://effect-ts.github.io/effect/docs/opentelemetry
 *
 * When OTEL_EXPORTER_OTLP_ENDPOINT is set, exports traces, logs, and metrics via OTLP HTTP to that endpoint
 * (e.g. Firetiger). Use OTEL_EXPORTER_OTLP_HEADERS for custom headers, or FIRETIGER_USERNAME and FIRETIGER_PASSWORD
 * for Basic Auth (we build the Authorization header when both are set).
 */
import { BatchSpanProcessor, ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base"
import {
  BatchLogRecordProcessor,
  ConsoleLogRecordExporter,
  SimpleLogRecordProcessor
} from "@opentelemetry/sdk-logs"
import {
  ConsoleMetricExporter,
  PeriodicExportingMetricReader
} from "@opentelemetry/sdk-metrics"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http"
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http"
import * as Layer from "effect/Layer"
import * as NodeSdk from "@effect/opentelemetry/NodeSdk"
import type * as Resource from "@effect/opentelemetry/Resource"

const DEFAULT_SERVICE_NAME = "eventiva-core"
const DEFAULT_SERVICE_VERSION = "0.0.1" as const
const OTLP_EXPORT_INTERVAL_MS = 10_000

function getOtlpHeaders(): Record<string, string> | undefined {
  const customHeaders = process.env.OTEL_EXPORTER_OTLP_HEADERS
  if (customHeaders) {
    return Object.fromEntries(
      customHeaders.split(",").map((h) => {
        const [key, ...valParts] = h.trim().split("=")
        return [key.trim(), valParts.join("=").trim()]
      })
    )
  }
  const username = process.env.FIRETIGER_USERNAME
  const password = process.env.FIRETIGER_PASSWORD
  if (username && password) {
    const auth = Buffer.from(`${username}:${password}`, "utf-8").toString("base64")
    return { Authorization: `Basic ${auth}` }
  }
  return undefined
}

function getOtlpExporterConfig(): { url: string; headers?: Record<string, string> } | null {
  const endpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT
  if (!endpoint) return null
  const base = endpoint.replace(/\/$/, "")
  const headers = getOtlpHeaders()
  return { url: base, headers: headers ?? undefined }
}

function getDefaultConfig(): NodeSdk.Configuration {
  const otlpConfig = getOtlpExporterConfig()

  if (otlpConfig) {
    const tracesUrl = `${otlpConfig.url}/v1/traces`
    const logsUrl = `${otlpConfig.url}/v1/logs`
    const metricsUrl = `${otlpConfig.url}/v1/metrics`

    const traceExporter = new OTLPTraceExporter({
      url: tracesUrl,
      headers: otlpConfig.headers
    })
    const logExporter = new OTLPLogExporter({
      url: logsUrl,
      headers: otlpConfig.headers
    })
    const metricExporter = new OTLPMetricExporter({
      url: metricsUrl,
      headers: otlpConfig.headers
    })

    return {
      resource: { serviceName: DEFAULT_SERVICE_NAME, serviceVersion: DEFAULT_SERVICE_VERSION },
      spanProcessor: new BatchSpanProcessor(traceExporter),
      logRecordProcessor: new BatchLogRecordProcessor(logExporter),
      metricReader: new PeriodicExportingMetricReader({
        exporter: metricExporter,
        exportIntervalMillis: OTLP_EXPORT_INTERVAL_MS
      }),
      shutdownTimeout: 3000
    }
  }

  return {
    resource: { serviceName: DEFAULT_SERVICE_NAME, serviceVersion: DEFAULT_SERVICE_VERSION },
    spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter()),
    logRecordProcessor: new SimpleLogRecordProcessor(new ConsoleLogRecordExporter()),
    metricReader: new PeriodicExportingMetricReader({
      exporter: new ConsoleMetricExporter(),
      exportIntervalMillis: OTLP_EXPORT_INTERVAL_MS
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
