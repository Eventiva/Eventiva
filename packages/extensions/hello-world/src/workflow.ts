/**
 * Hello-world extension workflow: runs when core/loaded is published.
 * Publishes extension/hello-world/onLoad so listeners (startup banner, etc.) run;
 * then calls sayHello once so afterCall banner runs during startup.
 */
import * as Effect from "effect/Effect"
import { makeExtensionOnLoadLayer, withSpanAndLog } from "@eventiva/core"
import { HelloWorld } from "./entity.js"

const EXTENSION_ID = "hello-world"
const DEFAULT_ENTITY_ID = "hello-1"

export const HelloWorldWorkflowAndLoadLayer = makeExtensionOnLoadLayer(
  EXTENSION_ID,
  Effect.gen(function* () {
    const getClient = yield* HelloWorld.client
    const client = getClient(DEFAULT_ENTITY_ID)
    yield* client["sayHello"]({}).pipe(Effect.catchAll(() => Effect.void))
  }).pipe(
    withSpanAndLog("HelloWorldWorkflowAndLoadLayer")
  )
)
