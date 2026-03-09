/**
 * Runtime entrypoint helper: runs the platform effect and wires process exit
 * (SIGINT/SIGTERM -> exit 0, promise resolve -> exit 0, promise reject -> log and exit 1).
 * Use from the platform's main so the platform only builds the program and provides the layer.
 *
 * When using DevTools (@effect/experimental), provide DevToolsLive before your tracing layers
 * so the tracer is patched correctly. Use runMain(platformLayer) for dev with DevTools;
 * use runRuntime(program.pipe(Effect.provide(platformLayer), Effect.asVoid)) for production.
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
/**
 * DevTools layer. Provide this before your platform/tracing layers so the tracer is patched
 * correctly when using @effect/opentelemetry.
 */
export declare const DevToolsLive: Layer.Layer<never, never, never>;
/**
 * Default runtime program: log startup, increment metric, run core startup (integrity + CORE_LOADED + EXTENSIONS_LOADED),
 * hold EntityEndpointsServer so the HTTP server stays up, log ready, then never exit.
 * Provide your platform layer (e.g. defaultPlatformTemplate) and pass to runRuntime or runMain.
 */
export declare const defaultRuntimeProgram: Effect.Effect<void, {
    _tag: "IntegrityCheckFailed";
    reason: string;
}, unknown>;
/**
 * Runs the default runtime program with DevTools and the given platform layer.
 * DevTools is provided before the platform layer so the tracer (from ObservabilityLive) is patched correctly.
 * Uses NodeRuntime.runMain for process and signal handling.
 * Use this in development when the Effect VS Code / Cursor extension is installed.
 */
export declare function runMain(platformLayer: Layer.Layer<never, never, unknown>): void;
/**
 * Runs the given effect (typically the platform program with layer provided),
 * then exits: success -> process.exit(0), failure -> console.error and process.exit(1).
 * Registers SIGINT and SIGTERM to call process.exit(0).
 * Call this once at the end of the platform's runtime entrypoint.
 * For dev with DevTools, use runMain(platformLayer) instead.
 */
export declare function runRuntime(runnable: Effect.Effect<void, unknown, never>): void;
//# sourceMappingURL=run-runtime.d.ts.map