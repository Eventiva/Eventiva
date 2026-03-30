/**
 * Optional Effect `Logger` wiring: console format and/or JSON lines file sink.
 * Uses `Logger.zip` to combine a console logger with a file sink (structured logs as JSON per line).
 *
 * Environment:
 * - `EVENTIVA_LOG_FORMAT` — `default` | `string` | `logfmt` | `pretty` | `json` | `structured`
 * - `EVENTIVA_LOG_FILE` — if set, append one JSON object per log line (same shape as `jsonLogger`)
 *
 * @see https://effect.website/docs/observability/logging/#custom-loggers
 */
import { appendFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import * as Layer from 'effect/Layer';
import * as Logger from 'effect/Logger';

export type EffectLogFormat = 'default' | 'string' | 'logfmt' | 'pretty' | 'json' | 'structured';

function parseLogFormat(raw: string | undefined): EffectLogFormat {
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

function consoleLoggerForFormat(format: EffectLogFormat): Logger.Logger<unknown, void> {
    switch (format) {
        case 'default':
            return Logger.defaultLogger;
        case 'string':
            return Logger.stringLogger;
        case 'logfmt':
            return Logger.logfmtLogger;
        case 'pretty':
            return Logger.prettyLogger();
        case 'json':
            return Logger.jsonLogger
        case 'structured':
            return Logger.structuredLogger
        default:
            return Logger.prettyLogger();;
    }
}

/**
 * Append each log as one JSON line (Effect `jsonLogger` output).
 */
function jsonLinesFileLogger(filePath: string): Logger.Logger<unknown, void> {
    mkdirSync(dirname(filePath), { recursive: true });
    return Logger.map(Logger.structuredLogger, (line) => {
        appendFileSync(filePath, JSON.stringify(line) + '\n', 'utf-8');
    });
}

/**
 * Returns a layer that replaces `Logger.defaultLogger` when `EVENTIVA_LOG_FILE` is set
 * and/or `EVENTIVA_LOG_FORMAT` is not `default`. Otherwise `Layer.empty`.
 */
export function effectLoggerLayerFromEnv(): Layer.Layer<never> {
    const filePath = process.env.EVENTIVA_LOG_FILE?.trim();
    const format = parseLogFormat(process.env.EVENTIVA_LOG_FORMAT);
    const useFile = Boolean(filePath && filePath.length > 0);
    const useCustomFormat = format !== 'default';

    if (!useFile && !useCustomFormat) {
        return Layer.empty;
    }

    const consoleLog = consoleLoggerForFormat(format);
    const combined = useFile && filePath ? Logger.zip(consoleLog, jsonLinesFileLogger(filePath)) : consoleLog;

    return Logger.replace(Logger.defaultLogger, combined);
}
