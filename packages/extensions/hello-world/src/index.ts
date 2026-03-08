/**
 * HelloWorld extension: workflow (runs on core/loaded, publishes hello-world/onLoad),
 * entity + beforeCall/afterCall for hello-world. Other extensions listen to
 * extension/hello-world/onLoad and extension/hello-world/afterCall.
 */
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import type { ExtensionLayer } from "@eventiva/core"
import { ExtensionHooks, withExtensionHooksWith } from "@eventiva/core"
import { HelloWorld } from "./entity.js"
import { sayHelloHandler } from "./handlers.js"
import { HelloWorldWorkflowAndLoadLayer } from "./workflow.js"

export { HelloWorld } from "./entity.js"
export { sayHelloHandler } from "./handlers.js"
export { HelloWorldWorkflow, HelloWorldWorkflowAndLoadLayer } from "./workflow.js"

const EXTENSION_ID = "hello-world"

const HelloWorldHandlersLayer = HelloWorld.toLayer(
  Effect.gen(function* () {
    const hooks = yield* ExtensionHooks
    return {
      sayHello: withExtensionHooksWith(hooks, EXTENSION_ID, "HelloWorld", "sayHello", sayHelloHandler)
    }
  })
)

/**
 * HelloWorld extension Layer: workflow (listens to core/loaded, publishes hello-world/onLoad) + entity with hooks.
 * Requires ExtensionHookPubSub (as ExtensionHooks) and WorkflowEngine.
 */
export const HelloWorldLayer: ExtensionLayer = Layer.mergeAll(
  HelloWorldWorkflowAndLoadLayer,
  HelloWorldHandlersLayer
) as unknown as ExtensionLayer
