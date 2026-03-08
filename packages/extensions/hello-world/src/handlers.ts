/**
 * HelloWorld handlers: sayHello with full observability (span, log, metric) and extension lifecycle hooks.
 * sayHelloHandler is used with withExtensionHooksWith in the layer so ExtensionHooks is captured at build time.
 */
import * as Effect from "effect/Effect"
import * as Metric from "effect/Metric"
import type { Request } from "@eventiva/core"
import { withSpanAndLog } from "@eventiva/core"

const helloWorldSayHelloCount = Metric.counter("hello_world.say_hello.count", {
  description: "Number of sayHello RPC invocations"
})

/** Raw handler for sayHello; wrapped with extension hooks in the layer via withExtensionHooksWith. */
export function sayHelloHandler(
  envelope: Request<any>
): Effect.Effect<string, never, never> {
  const entityId = envelope.address.entityId
  return withSpanAndLog("HelloWorld.sayHello", {
    metricName: "hello_world.say_hello.duration",
    attributes: { entityId }
  })(
    Effect.gen(function* () {
      yield* helloWorldSayHelloCount(Effect.succeed(1))
      yield* Effect.log("Hello World", { entityId })
      return "Hello World"
    })
  ) as Effect.Effect<string, never, never>
}
