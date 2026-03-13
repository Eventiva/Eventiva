/**
 * Runtime entrypoint helper: runs the platform effect and wires process exit
 * (SIGINT/SIGTERM -> exit 0, promise resolve -> exit 0, promise reject -> log and exit 1).
 * Use from the platform's main so the platform only builds the program and provides the layer.
 *
 * When using DevTools (@effect/experimental), provide DevToolsLive before your tracing layers
 * so the tracer is patched correctly. Use runMain(platformLayer) for dev with DevTools;
 * use runRuntime(program.pipe(Effect.provide(platformLayer), Effect.asVoid)) for production.
 *
 * Two-phase: use runMainTwoPhase(template) so entity endpoints are built after runCoreStartup
 * (EntityRegistry populated); dynamic entities like Contact then appear in the route map.
 */
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import type { PlatformTemplateTwoPhase } from './platform.js';
/**
 * DevTools layer. Provide this before your platform/tracing layers so the tracer is patched
 * correctly when using @effect/opentelemetry.
 */
export declare const DevToolsLive: Layer.Layer<never, never, never>;
/**
 * Bootstrap program: run core startup only (System 1). No HTTP, no entity endpoints.
 */
export declare const bootstrapProgram: Effect.Effect<void, {
    _tag: "IntegrityCheckFailed";
    reason: string;
}, unknown>;
/**
 * Runtime program: hold EntityEndpointsServer then never exit (System 2). Provide runtime layer
 * after bootstrap has run so the route map sees EntityRegistry populated.
 */
export declare const runtimeOnlyProgram: Effect.Effect<void, never, unknown>;
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
 * Runs the two-phase platform: bootstrap (runCoreStartup) with phase 1 layer, then runtime
 * (EntityEndpointsServer) with phase 2 layer in the same scope. Runtime layer is provided only
 * after bootstrap has run, so entity endpoints are built after EntityRegistry is populated and
 * /api/rpc/contacts and Swagger see Contact. DevTools is applied when enabled.
 */
export declare function runMainTwoPhase(template: PlatformTemplateTwoPhase): void;
/**
 * Runs the default runtime program with DevTools and the given platform layer.
 * DevTools is provided before the platform layer so the tracer (from ObservabilityLive) is patched correctly.
 * Uses NodeRuntime.runMain for process and signal handling.
 * Use this in development when the Effect VS Code / Cursor extension is installed.
 * Set EVENTIVA_FEATURE_DEVTOOLS=false to skip DevTools (e.g. for debugging tracer crashes).
 * For correct entity route map (Contact etc.), prefer runMainTwoPhase(createPlatformTemplateTwoPhase(options)).
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