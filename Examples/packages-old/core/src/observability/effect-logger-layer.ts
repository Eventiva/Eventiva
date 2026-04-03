/**
 * Effect `Logger` wiring: **console** uses Effect's built-in pretty logger (TTY/grouped output);
 * **file** appends one formatted line per log (JSON/logfmt/etc. via `EVENTIVA_LOG_FORMAT_FILE`).
 * OpenTelemetry log export is unchanged (NodeSdk adds its own logger).
 *
 * @see https://effect.website/docs/observability/logging/#custom-loggers
 */
import { appendFileSync } from 'node:fs';
import type { ConfigError } from 'effect/ConfigError';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import * as LogLevel from 'effect/LogLevel';
import * as Logger from 'effect/Logger';
import { ensureDirForFile } from './ensure-dir.js';
import { formatEffectLogLine } from './log-format.js';
import type { ObservabilityConfig } from './observability-config.js';
import { loadObservabilityConfig } from './observability-config.js';

export type { EffectLogFormat } from './log-format.js';

/**
 * Console sink: delegates to Effect's built-in {@link Logger.prettyLoggerDefault} so multiline
 * messages (e.g. startup banner) render like stock Effect, not JSON/logfmt.
 */
function consoleLoggerFromConfig(cfg: ObservabilityConfig): Logger.Logger<unknown, void> {
    if (!cfg.effectLogConsole) {
        return Logger.none;
    }
    return Logger.make<unknown, void>((options) => {
        if (!LogLevel.greaterThanEqual(options.logLevel, cfg.effectLogConsoleMinLevel)) {
            return;
        }
        Logger.prettyLoggerDefault.log(options);
    });
}

/**
 * File-only audit line (structured); does not write to stdout.
 */
function fileLoggerFromConfig(cfg: ObservabilityConfig): Logger.Logger<unknown, void> {
    return Logger.make<unknown, void>((options) => {
        if (!LogLevel.greaterThanEqual(options.logLevel, cfg.effectLogFileMinLevel)) {
            return;
        }
        const line = formatEffectLogLine(cfg.effectLogFileFormat, options);
        try {
            ensureDirForFile(cfg.effectLogFile);
            appendFileSync(cfg.effectLogFile, `${line}\n`, 'utf-8');
        } catch (err) {
            console.error('[eventiva] effect log file write failed:', cfg.effectLogFile, err);
        }
    });
}

/**
 * Replaces `Logger.defaultLogger` with the console sink and **adds** a file logger.
 * Does not replace or remove {@link Logger.prettyLoggerDefault} (it stays unused unless referenced here).
 */
export function effectLoggerLayerFromConfig(cfg: ObservabilityConfig): Layer.Layer<never> {
    return Logger.add(fileLoggerFromConfig(cfg)).pipe(
        Layer.provideMerge(Logger.replace(Logger.defaultLogger, consoleLoggerFromConfig(cfg)))
    );
}

/**
 * Logger wiring from env only (no OTEL). For sync/bootstrap code paths that cannot provide
 * the full observability stack (e.g. column builders). Prefer `ObservabilityStackLive` in runtimes.
 */
export function effectLoggerLayerFromEnv(): Layer.Layer<never, ConfigError, never> {
    return Layer.unwrapEffect(Effect.map(loadObservabilityConfig, effectLoggerLayerFromConfig));
}
