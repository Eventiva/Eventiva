/**
 * Local-only OTEL exporters: mirror spans, log records, and metrics to per-signal files and (by default)
 * to `EVENTIVA_LOG_FILE`. Does not replace OTLP HTTP exporters.
 */
import { appendFileSync } from 'node:fs';
import type { HrTime } from '@opentelemetry/api';
import { ExportResultCode } from '@opentelemetry/core';
import type { ReadableLogRecord } from '@opentelemetry/sdk-logs';
import type { ResourceMetrics } from '@opentelemetry/sdk-metrics';
import type { ReadableSpan } from '@opentelemetry/sdk-trace-base';
import type { SpanExporter } from '@opentelemetry/sdk-trace-base';
import type { LogRecordExporter } from '@opentelemetry/sdk-logs';
import type { PushMetricExporter } from '@opentelemetry/sdk-metrics';
import { ensureDirForFile } from './ensure-dir.js';
import { formatLocalPayload, type LocalTelemetryKind } from './log-format.js';
import type { ObservabilityConfig } from './observability-config.js';
import { emitObservabilitySink } from './observability-sink.js';

function hrTimeToMs(hr: HrTime): number {
    return hr[0] * 1000 + hr[1] / 1e6;
}

function jsonSafe(value: unknown): unknown {
    try {
        return JSON.parse(
            JSON.stringify(value, (_k, v: unknown) => (typeof v === 'bigint' ? String(v) : v))
        );
    } catch {
        return String(value);
    }
}

function writeLocalTelemetry(
    cfg: ObservabilityConfig,
    filePath: string,
    kind: LocalTelemetryKind,
    payload: Record<string, unknown>
): void {
    const lineFile = formatLocalPayload(cfg.effectLogFileFormat, kind, payload);
    const lineConsole = formatLocalPayload(cfg.effectLogConsoleFormat, kind, payload);
    ensureDirForFile(filePath);
    appendFileSync(filePath, `${lineFile}\n`, 'utf-8');
    const mirrorMain =
        cfg.otelMirrorToEffectLogFile && filePath !== cfg.effectLogFile;
    emitObservabilitySink(cfg, lineFile, lineConsole, {
        mirrorToEffectFile: mirrorMain,
        emitConsole: cfg.otelLocalConsole && cfg.effectLogConsole,
    });
}

function spanToPayload(span: ReadableSpan): Record<string, unknown> {
    const ctx = span.spanContext();
    return {
        resource: jsonSafe(span.resource),
        instrumentationScope: jsonSafe(span.instrumentationScope),
        name: span.name,
        traceId: ctx.traceId,
        spanId: ctx.spanId,
        traceFlags: ctx.traceFlags,
        parentSpanId: span.parentSpanContext?.spanId,
        parentTraceId: span.parentSpanContext?.traceId,
        startTimeMs: hrTimeToMs(span.startTime),
        endTimeMs: hrTimeToMs(span.endTime),
        durationMs: hrTimeToMs(span.duration),
        status: span.status,
        kind: span.kind,
        attributes: span.attributes,
        links: span.links,
        events: span.events,
        ended: span.ended,
        droppedAttributesCount: span.droppedAttributesCount,
        droppedEventsCount: span.droppedEventsCount,
        droppedLinksCount: span.droppedLinksCount,
    };
}

function logRecordToPayload(log: ReadableLogRecord): Record<string, unknown> {
    return {
        timestampMs: hrTimeToMs(log.hrTime),
        hrTimeObservedMs: hrTimeToMs(log.hrTimeObserved),
        severityText: log.severityText,
        severityNumber: log.severityNumber,
        body: log.body,
        eventName: log.eventName,
        attributes: log.attributes,
        spanId: log.spanContext?.spanId,
        traceId: log.spanContext?.traceId,
        resource: jsonSafe(log.resource),
        instrumentationScope: jsonSafe(log.instrumentationScope),
        droppedAttributesCount: log.droppedAttributesCount,
    };
}

function metricsToPayload(metrics: ResourceMetrics): Record<string, unknown> {
    const json = JSON.stringify(metrics, (_key, value: unknown) =>
        typeof value === 'bigint' ? value.toString() : value
    );
    return { snapshot: JSON.parse(json) as Record<string, unknown> };
}

export function createLocalSpanExporter(cfg: ObservabilityConfig): SpanExporter {
    return {
        export(spans, resultCallback): void {
            try {
                for (const span of spans) {
                    writeLocalTelemetry(cfg, cfg.otelFileTraces, 'span', spanToPayload(span));
                }
                resultCallback({ code: ExportResultCode.SUCCESS });
            } catch (err) {
                resultCallback({
                    code: ExportResultCode.FAILED,
                    error: err instanceof Error ? err : new Error(String(err)),
                });
            }
        },
        shutdown(): Promise<void> {
            return Promise.resolve();
        },
        forceFlush(): Promise<void> {
            return Promise.resolve();
        },
    };
}

export function createLocalLogRecordExporter(cfg: ObservabilityConfig): LogRecordExporter {
    return {
        export(logs, resultCallback): void {
            try {
                for (const log of logs) {
                    writeLocalTelemetry(cfg, cfg.otelFileLogs, 'otel_log', logRecordToPayload(log));
                }
                resultCallback({ code: ExportResultCode.SUCCESS });
            } catch (err) {
                resultCallback({
                    code: ExportResultCode.FAILED,
                    error: err instanceof Error ? err : new Error(String(err)),
                });
            }
        },
        shutdown(): Promise<void> {
            return Promise.resolve();
        },
    };
}

export function createLocalMetricExporter(cfg: ObservabilityConfig): PushMetricExporter {
    return {
        export(metrics, resultCallback): void {
            try {
                writeLocalTelemetry(cfg, cfg.otelFileMetrics, 'metric', metricsToPayload(metrics));
                resultCallback({ code: ExportResultCode.SUCCESS });
            } catch (err) {
                resultCallback({
                    code: ExportResultCode.FAILED,
                    error: err instanceof Error ? err : new Error(String(err)),
                });
            }
        },
        shutdown(): Promise<void> {
            return Promise.resolve();
        },
        forceFlush(): Promise<void> {
            return Promise.resolve();
        },
    };
}
