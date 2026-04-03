/**
 * Shared formatting for Effect log **file** lines and local OTEL mirror output.
 * Application stdout uses Effect's built-in pretty logger (see `effect-logger-layer.ts`).
 */
import * as HashMap from 'effect/HashMap';
import * as Inspectable from 'effect/Inspectable';
import * as List from 'effect/List';
import type * as Logger from 'effect/Logger';

export type EffectLogFormat = 'default' | 'string' | 'logfmt' | 'pretty' | 'json' | 'structured';

export type LocalTelemetryKind = 'effect_log' | 'otel_log' | 'span' | 'metric';

function jsonSafe(value: unknown): unknown {
    try {
        return JSON.parse(
            JSON.stringify(value, (_k, v: unknown) => (typeof v === 'bigint' ? String(v) : v))
        );
    } catch {
        return Inspectable.toStringUnknown(value);
    }
}

/** Parse log format env values (case-insensitive). */
export function parseLogFormat(raw: string | undefined): EffectLogFormat {
    const v = (raw ?? 'default').trim().toLowerCase();
    if (
        v === 'default' ||
        v === 'string' ||
        v === 'logfmt' ||
        v === 'pretty' ||
        v === 'json' ||
        v === 'structured'
    ) {
        return v;
    }
    return 'default';
}

function escapeLogfmtValue(value: string): string {
    if (/[\s"\\]/.test(value)) {
        return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
    }
    return value;
}

function toLogfmtLine(record: Record<string, unknown>): string {
    return Object.entries(record)
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => {
            const s =
                typeof v === 'string' ? v : typeof v === 'object' ? JSON.stringify(v) : String(v);
            return `${k}=${escapeLogfmtValue(s)}`;
        })
        .join(' ');
}

/**
 * Format a canonical JSON-serializable payload for local sinks (not OTLP wire).
 */
export function formatLocalPayload(
    format: EffectLogFormat,
    kind: LocalTelemetryKind,
    payload: Record<string, unknown>
): string {
    const withKind = { kind, ...payload };
    switch (format) {
        case 'json':
        case 'structured':
        case 'default':
            return JSON.stringify(withKind);
        case 'string':
            return `${kind}: ${Inspectable.stringifyCircular(withKind)}`;
        case 'logfmt':
            return toLogfmtLine(withKind as Record<string, unknown>);
        case 'pretty':
            return JSON.stringify(withKind, null, 2);
        default: {
            const _exhaustive: never = format;
            return JSON.stringify({ ...withKind, _badFormat: _exhaustive });
        }
    }
}

function buildEffectLogPayload(options: Logger.Logger.Options<unknown>): Record<string, unknown> {
    const message = Inspectable.toStringUnknown(options.message);
    return {
        timestamp: options.date.toISOString(),
        level: options.logLevel.label,
        message,
        fiberId: String(options.fiberId),
        cause: Inspectable.stringifyCircular(options.cause),
        annotations: Object.fromEntries(
            HashMap.toEntries(options.annotations).map(([k, v]) => [String(k), jsonSafe(v)])
        ),
        spans: List.toArray(options.spans).map((s) => ({
            label: s.label,
            startTime: s.startTime,
        })),
    };
}

/** One line for the Effect log audit file (`EVENTIVA_LOG_FILE`). */
export function formatEffectLogLine(format: EffectLogFormat, options: Logger.Logger.Options<unknown>): string {
    const payload = buildEffectLogPayload(options);
    return formatLocalPayload(format, 'effect_log', payload);
}
