/**
 * Hello-world extension workflow: runs when core/loaded is published.
 * Publishes extension/hello-world/onLoad so listeners (startup banner, etc.) run;
 * then calls sayHello once so afterCall banner runs during startup.
 */
import * as Workflow from "@effect/workflow/Workflow"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Schema from "effect/Schema"
import {
  CORE_LOADED_TOPIC,
  ExtensionHookPubSub,
  extensionHookTopic
} from "@eventiva/core"
import { HelloWorld } from "./entity.js"

const EXTENSION_ID = "hello-world"
const DEFAULT_ENTITY_ID = "hello-1"

const HelloWorldWorkflowPayload = Schema.Struct({
  messageId: Schema.optional(Schema.String)
})

export const HelloWorldWorkflow = Workflow.make({
  name: EXTENSION_ID,
  payload: HelloWorldWorkflowPayload,
  idempotencyKey: (p) => p.messageId ?? "hello-world-load",
  success: Schema.Void,
  error: Schema.Never
})

type Payload = Schema.Schema.Type<typeof HelloWorldWorkflowPayload>

const HelloWorldWorkflowLayer = HelloWorldWorkflow.toLayer(
  Effect.fn(function* (_payload: Payload, _executionId: string) {
    const pubsub = yield* ExtensionHookPubSub
    yield* pubsub.publish(extensionHookTopic(EXTENSION_ID, "onLoad"), {}).pipe(
      Effect.catchAll(() => Effect.void)
    )
    const getClient = yield* HelloWorld.client
    const client = getClient(DEFAULT_ENTITY_ID)
    yield* client["sayHello"]({}).pipe(Effect.catchAll(() => Effect.void))
  })
)

/** Registers the hello-world workflow to run when core/loaded is published. */
const LoadListenerLayer = Layer.effectDiscard(
  Effect.gen(function* () {
    const pubsub = yield* ExtensionHookPubSub
    yield* pubsub.listenTo(
      CORE_LOADED_TOPIC,
      (payload, messageId) =>
        HelloWorldWorkflow.execute({ messageId }).pipe(Effect.asVoid)
    )
  })
)

export const HelloWorldWorkflowAndLoadLayer = Layer.mergeAll(
  HelloWorldWorkflowLayer,
  LoadListenerLayer
)
