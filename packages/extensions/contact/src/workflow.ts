/**
 * Contact extension workflows: on CORE_LOADED publish extension/contact/onLoad;
 * on EXTENSIONS_LOADED_TOPIC seed one demo contact if empty and log the list.
 */
import * as Workflow from "@effect/workflow/Workflow"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Schema from "effect/Schema"
import {
  CORE_LOADED_TOPIC,
  EXTENSIONS_LOADED_TOPIC,
  ExtensionHookPubSub,
  extensionHookTopic
} from "@eventiva/core"
import { Contact, CONTACT_ENTITY_ID } from "./entity.js"

const EXTENSION_ID = "contact"

const OnLoadPayload = Schema.Struct({ messageId: Schema.optional(Schema.String) })
type OnLoadPayload = Schema.Schema.Type<typeof OnLoadPayload>

const ContactOnLoadWorkflow = Workflow.make({
  name: `${EXTENSION_ID}/onLoad`,
  payload: OnLoadPayload,
  idempotencyKey: (p) => p.messageId ?? "contact-onLoad",
  success: Schema.Void,
  error: Schema.Never
})

const ContactOnLoadWorkflowLayer = ContactOnLoadWorkflow.toLayer(
  Effect.fn(function* (_payload: OnLoadPayload, _executionId: string) {
    const pubsub = yield* ExtensionHookPubSub
    yield* pubsub.publish(extensionHookTopic(EXTENSION_ID, "onLoad"), {}).pipe(
      Effect.catchAll(() => Effect.void)
    )
  })
)

const LoadListenerLayer = Layer.effectDiscard(
  Effect.gen(function* () {
    const pubsub = yield* ExtensionHookPubSub
    yield* pubsub.listenTo(
      CORE_LOADED_TOPIC,
      (_payload, messageId) =>
        ContactOnLoadWorkflow.execute({ messageId }).pipe(Effect.asVoid)
    )
  })
)

// ---- Seed workflow: on EXTENSIONS_LOADED, if contact list empty create one demo, then log list ----
const SeedPayload = Schema.Struct({ messageId: Schema.optional(Schema.String) })
type SeedPayload = Schema.Schema.Type<typeof SeedPayload>

const ContactSeedWorkflow = Workflow.make({
  name: `${EXTENSION_ID}/seed`,
  payload: SeedPayload,
  idempotencyKey: (p) => p.messageId ?? "contact-seed",
  success: Schema.Void,
  error: Schema.Never
})

const contactCreatePayload = {
  fullname: "Jane Doe",
  dateOfBirth: new Date("1990-05-15"),
  email: "jane@example.com",
  phone: "+1234567890"
}

const ContactSeedWorkflowLayer = ContactSeedWorkflow.toLayer(
  Effect.fn(function* (_payload: SeedPayload, _executionId: string) {
    const getClient = yield* Contact.client
    const client = getClient(CONTACT_ENTITY_ID)
    const list = yield* (client as unknown as { list: (p: object) => Effect.Effect<ReadonlyArray<unknown>> })["list"]({})
    if (list.length === 0) {
      const created = yield* (client as unknown as {
        create: (p: typeof contactCreatePayload) => Effect.Effect<{ id: string }>
      })["create"](contactCreatePayload)
      yield* Effect.log("contact created (demo seed)", { id: created.id, extension: "extensions.contact" })
    }
    const listAfter = yield* (client as unknown as { list: (p: object) => Effect.Effect<ReadonlyArray<unknown>> })["list"]({})
    yield* Effect.log("contacts list", { count: listAfter.length, extension: "extensions.contact" })
  })
)

const SeedListenerLayer = Layer.effectDiscard(
  Effect.gen(function* () {
    const pubsub = yield* ExtensionHookPubSub
    yield* pubsub.listenTo(
      EXTENSIONS_LOADED_TOPIC,
      (_payload, messageId) =>
        ContactSeedWorkflow.execute({ messageId }).pipe(Effect.asVoid)
    )
  })
)

/**
 * Contact workflow layer: CORE_LOADED -> publish extension/contact/onLoad;
 * EXTENSIONS_LOADED_TOPIC -> seed demo contact and log list. Merge with ContactLayer.
 */
export const ContactWorkflowLayer = Layer.mergeAll(
  ContactOnLoadWorkflowLayer,
  LoadListenerLayer,
  ContactSeedWorkflowLayer,
  SeedListenerLayer
)
