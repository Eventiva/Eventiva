/**
 * Single write path for observability lines: Effect tee and local OTEL mirrors both use this so
 * console + {@link ObservabilityConfig.effectLogFile} stay aligned.
 */
import { appendFileSync } from 'node:fs';
import type { ObservabilityConfig } from './observability-config.js';
import { ensureDirForFile } from './ensure-dir.js';

export interface EmitObservabilitySinkOptions {
    /**
     * When false, skips appending to {@link ObservabilityConfig.effectLogFile}. Use when
     * `lineFile` was already written elsewhere (e.g. per-signal OTEL path).
     */
    readonly mirrorToEffectFile?: boolean;
    /**
     * When set, overrides {@link ObservabilityConfig.effectLogConsole} for this emit
     * (e.g. suppress console for debug/trace while still writing the file).
     */
    readonly emitConsole?: boolean;
}

/**
 * Writes one formatted line to console (if enabled) and optionally appends the file-formatted
 * line to the main Effect log file.
 */
export function emitObservabilitySink(
    cfg: ObservabilityConfig,
    lineFile: string,
    lineConsole: string,
    options?: EmitObservabilitySinkOptions
): void {
    const mirror = options?.mirrorToEffectFile ?? true;
    const toConsole = options?.emitConsole ?? cfg.effectLogConsole;
    if (toConsole) {
        console.log(lineConsole);
    }
    if (!mirror) {
        return;
    }
    try {
        ensureDirForFile(cfg.effectLogFile);
        appendFileSync(cfg.effectLogFile, `${lineFile}\n`, 'utf-8');
    } catch (err) {
        console.error('[eventiva] effect log file write failed:', cfg.effectLogFile, err);
    }
}
