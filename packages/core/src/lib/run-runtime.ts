/**
 * Runtime entrypoint helper: runs the platform effect and wires process exit
 * (SIGINT/SIGTERM -> exit 0, promise resolve -> exit 0, promise reject -> log and exit 1).
 * Use from the platform's main so the platform only builds the program and provides the layer.
 *
 * When using DevTools (@effect/experimental), provide DevToolsLive before your tracing layers
 * so the tracer is patched correctly. Use runMain(platformLayer) for dev with DevTools;
 * use runRuntime(program.pipe(Effect.provide(platformLayer), Effect.asVoid)) for production.
 */
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Metric from "effect/Metric"
import { DevTools } from "@effect/experimental"
import { NodeRuntime } from "@effect/platform-node"
import { runCoreStartup } from "./extension-hooks.js"
import { EntityEndpointsServer } from "../cluster/entity-endpoints.js"

const runtimeStartedCounter = Metric.counter("runtime.started", {
  description: "Number of runtime startups"
})

/**
 * DevTools layer. Provide this before your platform/tracing layers so the tracer is patched
 * correctly when using @effect/opentelemetry.
 */
export const DevToolsLive: Layer.Layer<never, never, never> = DevTools.layer()

/**
 * Default runtime program: log startup, increment metric, run core startup (integrity + CORE_LOADED + EXTENSIONS_LOADED),
 * hold EntityEndpointsServer so the HTTP server stays up, log ready, then never exit.
 * Provide your platform layer (e.g. defaultPlatformTemplate) and pass to runRuntime or runMain.
 */
export const defaultRuntimeProgram = Effect.gen(function* () {
  yield* Effect.log("runtime starting", { service: "eventiva-core" })
  yield* runtimeStartedCounter(Effect.succeed(1))
  yield* runCoreStartup
  yield* EntityEndpointsServer
  yield* Effect.log("runtime ready; server serving until interrupt")
  yield* Effect.never
})

/**
 * Runs the default runtime program with DevTools and the given platform layer.
 * DevTools is provided before the platform layer so the tracer (from ObservabilityLive) is patched correctly.
 * Uses NodeRuntime.runMain for process and signal handling.
 * Use this in development when the Effect VS Code / Cursor extension is installed.
 */
export function runMain(platformLayer: Layer.Layer<never, never, unknown>): void {
  const runnable = defaultRuntimeProgram.pipe(
    Effect.provide(DevToolsLive),
    Effect.provide(platformLayer),
    Effect.asVoid
  ) as Effect.Effect<void, unknown, never>
  NodeRuntime.runMain(runnable)
}

/**
 * Runs the given effect (typically the platform program with layer provided),
 * then exits: success -> process.exit(0), failure -> console.error and process.exit(1).
 * Registers SIGINT and SIGTERM to call process.exit(0).
 * Call this once at the end of the platform's runtime entrypoint.
 * For dev with DevTools, use runMain(platformLayer) instead.
 */
export function runRuntime(runnable: Effect.Effect<void, unknown, never>): void {
  process.on("SIGINT", () => process.exit(0))
  process.on("SIGTERM", () => process.exit(0))
  Effect.runPromise(runnable).then(
    () => process.exit(0),
    (err: unknown) => {
      console.error(err)
      process.exit(1)
    }
  )
}
