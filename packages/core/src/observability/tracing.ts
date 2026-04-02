import { NodeSdk } from "@effect/opentelemetry"
import type { Resource as OtelResourceTag } from "@effect/opentelemetry/Resource"
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
} from "@opentelemetry/sdk-trace-base"
import * as Sentry from "@sentry/node"
import { SentrySpanProcessor } from "@sentry/opentelemetry"
import { Layer } from "effect"

function serviceName(): string {
  return process.env.EVENTIVA_SERVICE_NAME?.trim() || "eventiva-core"
}

function otelConsoleEnabled(): boolean {
  const v = process.env.EVENTIVA_OTEL_CONSOLE?.trim().toLowerCase()
  return v === "1" || v === "true" || v === "yes"
}

/**
 * OpenTelemetry `Resource` layer: Sentry span export when `SENTRY_DSN` is set,
 * optional console span export when `EVENTIVA_OTEL_CONSOLE` is truthy,
 * otherwise a minimal resource with no span processor (no export).
 */
export const tracingLayer: Layer.Layer<OtelResourceTag> = NodeSdk.layer(() => {
  const name = serviceName()
  const dsn = process.env.SENTRY_DSN?.trim()

  if (dsn) {
    Sentry.init({
      dsn,
      tracesSampleRate: 1.0,
    })
    return {
      resource: { serviceName: name },
      spanProcessor: new SentrySpanProcessor(),
    }
  }

  if (otelConsoleEnabled()) {
    return {
      resource: { serviceName: name },
      spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter()),
    }
  }

  return {
    resource: { serviceName: name },
  }
})
