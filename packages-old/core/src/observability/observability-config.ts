/**
 * Observability settings loaded from environment via Effect `Config` (default `ConfigProvider.fromEnv()`).
 * Keys are flat env vars (e.g. `EVENTIVA_LOG_FILE`); see {@link loadObservabilityConfig}.
 *
 * Full catalog: repository root `.env.example`.
 * @see https://effect.website/docs/configuration/#loading-configuration-from-environment-variables
 */
import * as Config from 'effect/Config';
import type { ConfigError } from 'effect/ConfigError';
import * as Effect from 'effect/Effect';
import * as LogLevel from 'effect/LogLevel';
import * as Option from 'effect/Option';
import { parseLogFormat, type EffectLogFormat } from './log-format.js';

/** Parse `EVENTIVA_LOG_*_MIN_LEVEL` values (case-insensitive). Invalid values fall back to `fallback`. */
function parseEffectLogLevelLabel(raw: string | undefined, fallback: LogLevel.LogLevel): LogLevel.LogLevel {
    const key = (raw ?? '').trim().toLowerCase();
    const map: Record<string, LogLevel.LogLevel> = {
        all: LogLevel.All,
        trace: LogLevel.Trace,
        debug: LogLevel.Debug,
        info: LogLevel.Info,
        warning: LogLevel.Warning,
        warn: LogLevel.Warning,
        error: LogLevel.Error,
        fatal: LogLevel.Fatal,
        none: LogLevel.None,
    };
    return map[key] ?? fallback;
}

export interface ObservabilityConfig {
    readonly effectLogFile: string;
    /**
     * Format for local OTEL mirror lines when mirrored to stdout (`EVENTIVA_OTEL_LOCAL_CONSOLE`).
     * Effect application logs on stdout use Effect's built-in pretty logger, not this field.
     */
    readonly effectLogConsoleFormat: EffectLogFormat;
    /** Format for log files (Effect logger + local OTEL mirror files). Default `json` unless `EVENTIVA_LOG_FORMAT` is set. */
    readonly effectLogFileFormat: EffectLogFormat;
    readonly effectLogConsole: boolean;
    /**
     * Minimum Effect log level written to `effectLogFile`. Default `Trace` so debug/trace stay file-only
     * when `effectLogConsoleMinLevel` is `Info`.
     */
    readonly effectLogFileMinLevel: LogLevel.LogLevel;
    /** Minimum Effect log level printed to stdout. Default `Info`. */
    readonly effectLogConsoleMinLevel: LogLevel.LogLevel;
    /** When true, mirror local OTEL span/log/metric snapshots to stdout (verbose). Default false. */
    readonly otelLocalConsole: boolean;
    /**
     * When true, append the same local OTEL mirror lines (span / otel_log / metric) to `effectLogFile`
     * as well as the per-signal files (`EVENTIVA_OTEL_FILE_*`). Default true so the main audit file is a
     * combined stream. Set false to keep OTEL mirrors only under the dedicated paths.
     */
    readonly otelMirrorToEffectLogFile: boolean;
    readonly otelFileTraces: string;
    readonly otelFileLogs: string;
    readonly otelFileMetrics: string;
    /** Base URL without trailing slash; `None` when OTLP is disabled. */
    readonly otlpEndpoint: Option.Option<string>;
    readonly otlpHeaders: Option.Option<Record<string, string>>;
}

function parseOtlpHeaders(raw: string | undefined): Record<string, string> | undefined {
    if (!raw?.trim()) return undefined;
    return Object.fromEntries(
        raw.split(',').map((h) => {
            const [key, ...valParts] = h.trim().split('=');
            return [key.trim(), valParts.join('=').trim()];
        })
    );
}

/**
 * Loads observability config from the process environment (default `ConfigProvider`).
 */
export const loadObservabilityConfig: Effect.Effect<ObservabilityConfig, ConfigError, never> =
    Effect.gen(function* () {
        const effectLogFile = yield* Config.string('EVENTIVA_LOG_FILE').pipe(
            Config.withDefault('/tmp/eventiva-effect.log')
        );
        /** When set, applies the same format to console and file (legacy single knob). */
        const legacyFormatOpt = yield* Config.option(Config.string('EVENTIVA_LOG_FORMAT'));
        const consoleFormatRaw = yield* Config.string('EVENTIVA_LOG_FORMAT_CONSOLE').pipe(Config.withDefault('logfmt'));
        const fileFormatRaw = yield* Config.string('EVENTIVA_LOG_FORMAT_FILE').pipe(Config.withDefault('json'));

        const effectLogConsoleFormat = Option.match(legacyFormatOpt, {
            onSome: (raw) => parseLogFormat(raw),
            onNone: () => parseLogFormat(consoleFormatRaw),
        });
        const effectLogFileFormat = Option.match(legacyFormatOpt, {
            onSome: (raw) => parseLogFormat(raw),
            onNone: () => parseLogFormat(fileFormatRaw),
        });
        const effectLogConsole = yield* Config.boolean('EVENTIVA_LOG_CONSOLE').pipe(Config.withDefault(true));
        const effectLogFileMinLevelRaw = yield* Config.string('EVENTIVA_LOG_FILE_MIN_LEVEL').pipe(
            Config.withDefault('Trace')
        );
        const effectLogConsoleMinLevelRaw = yield* Config.string('EVENTIVA_LOG_CONSOLE_MIN_LEVEL').pipe(
            Config.withDefault('Info')
        );
        const effectLogFileMinLevel = parseEffectLogLevelLabel(effectLogFileMinLevelRaw, LogLevel.Trace);
        const effectLogConsoleMinLevel = parseEffectLogLevelLabel(effectLogConsoleMinLevelRaw, LogLevel.Info);
        const otelLocalConsole = yield* Config.boolean('EVENTIVA_OTEL_LOCAL_CONSOLE').pipe(Config.withDefault(false));
        const otelMirrorToEffectLogFile = yield* Config.boolean('EVENTIVA_OTEL_MIRROR_EFFECT_LOG').pipe(
            Config.withDefault(true)
        );

        const otelFileTraces = yield* Config.string('EVENTIVA_OTEL_FILE_TRACES').pipe(
            Config.withDefault('/tmp/eventiva-otel-traces.jsonl')
        );
        const otelFileLogs = yield* Config.string('EVENTIVA_OTEL_FILE_LOGS').pipe(
            Config.withDefault('/tmp/eventiva-otel-logs.jsonl')
        );
        const otelFileMetrics = yield* Config.string('EVENTIVA_OTEL_FILE_METRICS').pipe(
            Config.withDefault('/tmp/eventiva-otel-metrics.jsonl')
        );

        const otlpEndpointRaw = yield* Config.option(Config.string('OTEL_EXPORTER_OTLP_ENDPOINT'));
        const otlpHeadersRaw = yield* Config.option(Config.string('OTEL_EXPORTER_OTLP_HEADERS'));
        const fireUsername = yield* Config.option(Config.string('FIRETIGER_USERNAME'));
        const firePassword = yield* Config.option(Config.string('FIRETIGER_PASSWORD'));

        let headerRecord: Record<string, string> | undefined = Option.match(otlpHeadersRaw, {
            onNone: () => undefined,
            onSome: (h) => parseOtlpHeaders(h),
        });

        if (!headerRecord && Option.isSome(fireUsername) && Option.isSome(firePassword)) {
            const auth = Buffer.from(`${fireUsername.value}:${firePassword.value}`, 'utf-8').toString(
                'base64'
            );
            headerRecord = { Authorization: `Basic ${auth}` };
        }

        const otlpHeaders = Option.fromNullable(headerRecord);
        const otlpEndpoint = Option.map(otlpEndpointRaw, (url) => url.replace(/\/$/, ''));

        return {
            effectLogFile,
            effectLogConsoleFormat,
            effectLogFileFormat,
            effectLogConsole,
            effectLogFileMinLevel,
            effectLogConsoleMinLevel,
            otelLocalConsole,
            otelMirrorToEffectLogFile,
            otelFileTraces,
            otelFileLogs,
            otelFileMetrics,
            otlpEndpoint,
            otlpHeaders,
        } satisfies ObservabilityConfig;
    });
