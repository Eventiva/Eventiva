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
import { DevTools } from '@effect/experimental';
import { NodeRuntime } from '@effect/platform-node';
import { runCoreStartup } from './run-core-startup.js';
import { EntityEndpointsServer } from '../cluster/entity-endpoints.js';
import { ExtensionHookPubSub, PROCESS_RUNTIME_READY_TOPIC } from '../extensions/extension-hook-pubsub.js';
import { withSpanAndLog } from '../observability/helpers.js';
import type { PlatformTemplateTwoPhase } from './platform.js';

/**
 * DevTools layer. Provide this before your platform/tracing layers so the tracer is patched
 * correctly when using @effect/opentelemetry.
 */
export const DevToolsLive: Layer.Layer<never, never, never> = DevTools.layer();

/**
 * Bootstrap program: run core startup only (System 1). No HTTP, no entity endpoints.
 */
export const bootstrapProgram = runCoreStartup.pipe(withSpanAndLog('bootstrapProgram'));

/**
 * Runtime program: hold EntityEndpointsServer then never exit (System 2). Provide runtime layer
 * after bootstrap has run so the route map sees EntityRegistry populated.
 */
export const runtimeOnlyProgram = Effect.gen(function* () {
    yield* Effect.logInfo('Starting runtime phase (HTTP + entity endpoints)...', { service: 'eventiva-core' });
    yield* EntityEndpointsServer;
    yield* Effect.logInfo('runtime ready; server serving until interrupt');
    const hooks = yield* ExtensionHookPubSub;
    yield* hooks.publish(PROCESS_RUNTIME_READY_TOPIC, {}).pipe(
        Effect.catchAll((err) =>
            Effect.logDebug('PROCESS_RUNTIME_READY_TOPIC listener failed', { error: String(err) }).pipe(Effect.asVoid)
        ),
        Effect.fork,
        Effect.asVoid
    );
    yield* Effect.never;
}).pipe(withSpanAndLog('runtimeOnlyProgram'));

/**
 * Default runtime program: log startup, increment metric, run core startup (integrity + CORE_LOADED + EXTENSIONS_LOADED),
 * hold EntityEndpointsServer so the HTTP server stays up, log ready, then never exit.
 * Provide your platform layer (e.g. defaultPlatformTemplate) and pass to runRuntime or runMain.
 */
export const defaultRuntimeProgram = Effect.gen(function* () {
    yield* Effect.logInfo('runtime starting', { service: 'eventiva-core' });
    yield* runCoreStartup;
    yield* EntityEndpointsServer;
    yield* Effect.logInfo('runtime ready; server serving until interrupt');
    yield* Effect.never;
}).pipe(withSpanAndLog('defaultRuntimeProgram'));

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
export function runPlatform(template: PlatformTemplateTwoPhase): void {
    const useDevTools = process.env.EVENTIVA_FEATURE_DEVTOOLS !== 'false';
    const bootstrapLayer = template.getBootstrapLayer();
    const runtimeLayer = template.getRuntimeLayer();
    const program = Effect.logInfo('runtime starting', { service: 'eventiva-core' }).pipe(
        Effect.flatMap(() => bootstrapProgram),
        Effect.flatMap(() => runtimeOnlyProgram.pipe(Effect.provide(runtimeLayer)))
    ).pipe(Effect.provide(bootstrapLayer)) as Effect.Effect<void, unknown, never>;
    const withDevTools = useDevTools ? program.pipe(Effect.provide(DevToolsLive)) : program;
    // Platform replaces defaultLogger with pretty delegation + file logger; runMain must not run addPrettyLogger
    // or it would no-op (defaultLogger not in the set) or duplicate pretty. See effect-logger-layer.ts.
    NodeRuntime.runMain(Effect.asVoid(withDevTools), { disablePrettyLogger: true });
}

/**
 * Start the default runtime program using the given platform Layer.
 *
 * If the environment variable EVENTIVA_FEATURE_DEVTOOLS is not set to 'false', DevToolsLive
 * is applied before the platform layer so the tracer can be patched correctly.
 * The function runs the program with process and signal handling via the Node runtime.
 *
 * @param platformLayer - The platform Layer to provide to the runtime program
 */
export function runMain(platformLayer: Layer.Layer<never, never, unknown>): void {
    const useDevTools = process.env.EVENTIVA_FEATURE_DEVTOOLS !== 'false';
    const withDevTools = useDevTools ? defaultRuntimeProgram.pipe(Effect.provide(DevToolsLive)) : defaultRuntimeProgram;
    const runnable = withDevTools.pipe(Effect.provide(platformLayer), Effect.asVoid) as Effect.Effect<
        void,
        unknown,
        never
    >;
    NodeRuntime.runMain(runnable, { disablePrettyLogger: true });
}

/**
 * Runs the given effect (typically the platform program with layer provided),
 * then exits: success -> process.exit(0), failure -> console.error and process.exit(1).
 * Registers SIGINT and SIGTERM to call process.exit(0).
 * Call this once at the end of the platform's runtime entrypoint.
 * For dev with DevTools, use runMain(platformLayer) instead.
 */
export function runRuntime(runnable: Effect.Effect<void, unknown, never>): void {
    process.on('SIGINT', () => process.exit(0));
    process.on('SIGTERM', () => process.exit(0));
    Effect.runPromise(runnable).then(
        () => process.exit(0),
        (err: unknown) => {
            console.error(err);
            process.exit(1);
        }
    );
}
