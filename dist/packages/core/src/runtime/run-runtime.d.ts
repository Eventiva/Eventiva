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
 * Run a two‑phase platform startup: execute the bootstrap phase, then start the runtime phase within the same process.
 *
 * The bootstrap layer from `template` is applied for the initial core startup. After bootstrap completes the runtime
 * layer from `template` is applied so entity endpoints are constructed with a populated EntityRegistry (so endpoints
 * such as `/api/rpc/contacts` and generated Swagger reflect registered entities). If the environment variable
 * `EVENTIVA_FEATURE_DEVTOOLS` is not set to `'false'` DevTools integration is applied before the platform layers.
 *
 * @param template - A two‑phase platform template providing `getBootstrapLayer()` and `getRuntimeLayer()` for the
 *                   bootstrap and runtime phases respectively
 */
export declare function runMainTwoPhase(template: PlatformTemplateTwoPhase): void;
/**
 * Start the default runtime program using the given platform Layer.
 *
 * If the environment variable EVENTIVA_FEATURE_DEVTOOLS is not set to 'false', DevToolsLive
 * is applied before the platform layer so the tracer can be patched correctly.
 * The function runs the program with process and signal handling via the Node runtime.
 *
 * @param platformLayer - The platform Layer to provide to the runtime program
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