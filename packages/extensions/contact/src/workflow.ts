/**
 * Contact extension workflows: on CORE_LOADED publish extension/contact/onLoad;
 * on EXTENSIONS_LOADED_TOPIC seed one demo contact if empty and log the list.
 */
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import {
  EXTENSIONS_LOADED_TOPIC,
  makeExtensionOnLoadLayer,
  makeExtensionWorkflowLayer,
  withSpanAndLog
} from "@eventiva/core"
import { Contact, CONTACT_ENTITY_ID } from "./entity.js"

const EXTENSION_ID = "contact"

const OnLoadLayer = makeExtensionOnLoadLayer(EXTENSION_ID)

// ---- Seed workflow: on EXTENSIONS_LOADED, if contact list empty create one demo, then log list ----
const contactCreatePayload = {
  fullname: "Jane Doe",
  dateOfBirth: new Date("1990-05-15"),
  email: "jane@example.com",
  phone: "+1234567890"
}

const ContactSeedLayer = makeExtensionWorkflowLayer(
  EXTENSION_ID,
  "seed",
  EXTENSIONS_LOADED_TOPIC,
  Effect.gen(function* () {
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
  }).pipe(
    withSpanAndLog("ContactSeedLayer")
  )
)

/**
 * Contact workflow layer: CORE_LOADED -> publish extension/contact/onLoad;
 * EXTENSIONS_LOADED_TOPIC -> seed demo contact and log list. Merge with ContactLayer.
 */
export const ContactWorkflowLayer = Layer.mergeAll(
  OnLoadLayer,
  ContactSeedLayer
)
