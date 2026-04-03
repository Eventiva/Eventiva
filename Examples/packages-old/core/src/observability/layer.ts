/**
 * Observability Layer using @effect/opentelemetry.
 * Provides Logger, Metrics, and Tracer backed by OpenTelemetry (NodeSdk).
 *
 * When `OTEL_EXPORTER_OTLP_ENDPOINT` is set, exports traces, logs, and metrics via OTLP HTTP
 * (standard wire format for Grafana and other backends). Local mirrors also write JSONL to
 * `EVENTIVA_OTEL_FILE_*`, and by default append the same lines to `EVENTIVA_LOG_FILE` (combined audit log;
 * disable with `EVENTIVA_OTEL_MIRROR_EFFECT_LOG=false`). Mirror lines go to stdout only if
 * `EVENTIVA_OTEL_LOCAL_CONSOLE=true`. Effect **stdout** uses Effect's built-in pretty logger; the audit
 * file uses `EVENTIVA_LOG_FORMAT_FILE`. Level gates:
 * `EVENTIVA_LOG_FILE_MIN_LEVEL` / `EVENTIVA_LOG_CONSOLE_MIN_LEVEL` (default Trace vs Info).
 *
 * @see https://effect-ts.github.io/effect/docs/opentelemetry
 */
import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import * as LogLevel from 'effect/LogLevel';
import * as Logger from 'effect/Logger';
import * as NodeSdk from '@effect/opentelemetry/NodeSdk';
import * as Option from 'effect/Option';
import type * as Resource from '@effect/opentelemetry/Resource';
import type { ConfigError } from 'effect/ConfigError';
import { effectLoggerLayerFromConfig } from './effect-logger-layer.js';
import {
    createLocalLogRecordExporter,
    createLocalMetricExporter,
    createLocalSpanExporter,
} from './otel-format-exporters.js';
import { loadObservabilityConfig, type ObservabilityConfig } from './observability-config.js';

/** Fiber minimum so log lines reach file + console loggers when either sink wants them. */
function observabilityFiberMinimumLogLevel(cfg: ObservabilityConfig): LogLevel.LogLevel {
    const candidates: LogLevel.LogLevel[] = [cfg.effectLogFileMinLevel];
    if (cfg.effectLogConsole) {
        candidates.push(cfg.effectLogConsoleMinLevel);
    }
    return candidates.reduce((a, b) => (a.ordinal <= b.ordinal ? a : b));
}

const DEFAULT_SERVICE_NAME = 'eventiva-core';
const DEFAULT_SERVICE_VERSION = '0.0.1' as const;
const OTLP_EXPORT_INTERVAL_MS = 10_000;

function buildNodeSdkConfiguration(cfg: ObservabilityConfig): NodeSdk.Configuration {
    const localSpanExporter = createLocalSpanExporter(cfg);
    const localLogExporter = createLocalLogRecordExporter(cfg);
    const localMetricExporter = createLocalMetricExporter(cfg);

    const localSpanProcessor = new BatchSpanProcessor(localSpanExporter);
    const localLogProcessor = new BatchLogRecordProcessor(localLogExporter);
    const localMetricReader = new PeriodicExportingMetricReader({
        exporter: localMetricExporter,
        exportIntervalMillis: OTLP_EXPORT_INTERVAL_MS,
    });

    const baseResource = {
        serviceName: DEFAULT_SERVICE_NAME,
        serviceVersion: DEFAULT_SERVICE_VERSION,
    };

    if (Option.isSome(cfg.otlpEndpoint)) {
        const base = cfg.otlpEndpoint.value;
        const headers = Option.getOrUndefined(cfg.otlpHeaders);

        const traceExporter = new OTLPTraceExporter({
            url: `${base}/v1/traces`,
            headers,
        });
        const logExporter = new OTLPLogExporter({
            url: `${base}/v1/logs`,
            headers,
        });
        const metricExporter = new OTLPMetricExporter({
            url: `${base}/v1/metrics`,
            headers,
        });

        return {
            resource: baseResource,
            spanProcessor: [new BatchSpanProcessor(traceExporter), localSpanProcessor],
            logRecordProcessor: [new BatchLogRecordProcessor(logExporter), localLogProcessor],
            metricReader: [
                new PeriodicExportingMetricReader({
                    exporter: metricExporter,
                    exportIntervalMillis: OTLP_EXPORT_INTERVAL_MS,
                }),
                localMetricReader,
            ],
            shutdownTimeout: 3000,
        };
    }

    return {
        resource: baseResource,
        spanProcessor: localSpanProcessor,
        logRecordProcessor: localLogProcessor,
        metricReader: localMetricReader,
        shutdownTimeout: 3000,
    };
}

/**
 * Full observability stack: Effect logger wiring (pretty stdout + audit file) + OTEL NodeSdk
 * (OTLP when configured, plus optional local file mirrors).
 */
export const ObservabilityStackLive: Layer.Layer<Resource.Resource, ConfigError, never> = Layer.unwrapEffect(
    Effect.gen(function* () {
        const cfg = yield* loadObservabilityConfig;
        const otelLayer = NodeSdk.layer(Effect.succeed(buildNodeSdkConfiguration(cfg)));
        const effectLogLayer = effectLoggerLayerFromConfig(cfg);
        const fiberMin = observabilityFiberMinimumLogLevel(cfg);
        // NodeSdk adds an OTEL bridge logger via Logger.add. Console uses prettyLoggerDefault only through
        // effectLoggerLayerFromConfig (delegation); keep NodeRuntime.runMain({ disablePrettyLogger: true }) so
        // runMain does not swap defaultLogger → pretty (we already replaced defaultLogger).
        // Use provideMerge chains (not Layer.mergeAll): mergeAll races FiberRef updates for currentLoggers.
        return otelLayer.pipe(
            Layer.provideMerge(Logger.minimumLogLevel(fiberMin)),
            Layer.provideMerge(effectLogLayer)
        );
    })
);
