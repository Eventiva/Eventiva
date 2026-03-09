/**
 * Contact extension workflows: on CORE_LOADED register columns;
 * on EXTENSIONS_LOADED_TOPIC seed one demo contact if empty and log the list.
 */
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import {
  EXTENSIONS_LOADED_TOPIC,
  makeExtensionOnLoadLayer,
  makeExtensionWorkflowLayer,
  TableColumnRegistry,
  TableRelationsRegistry,
  EntityRegistry,
  withSpanAndLog
} from "@eventiva/core"
import { CONTACT_ENTITY_ID, contactColumns } from "./entity.js"

const EXTENSION_ID = "contact"

const OnLoadLayer = makeExtensionOnLoadLayer(
  EXTENSION_ID,
  Effect.gen(function* () {
    const registry = yield* TableColumnRegistry
    yield* registry.registerTableColumns("contact", EXTENSION_ID, contactColumns)

    const relationsRegistry = yield* TableRelationsRegistry
    yield* relationsRegistry.registerRelations("contact", EXTENSION_ID, (helpers: any) => {
      return {
        creator: helpers.one.contact({
          from: helpers.contact.createdBy,
          to: helpers.contact.id
        })
      }
    })
  })
)

// ---- Seed workflow: on EXTENSIONS_LOADED, if contact list empty create one demo, then log list ----
const contactCreatePayload = {
  fullname: "Jane Doe",
  dateOfBirth: new Date("1990-05-15").toISOString(), // assuming date string for effect schema
  email: "jane@example.com",
  phone: "+1234567890"
}

const ContactSeedLayer = makeExtensionWorkflowLayer(
  EXTENSION_ID,
  "seed",
  EXTENSIONS_LOADED_TOPIC,
  Effect.gen(function* () {
    const Contact = EntityRegistry.tryGet("Contact")
    if (!Contact) {
      yield* Effect.log("Contact entity not registered (e.g. in-memory DB with placeholder tables); skipping seed.")
      return
    }
    const getClient = yield* Contact.client
    const client = getClient(CONTACT_ENTITY_ID)
    
    // @ts-expect-error dynamic methods
    const list = yield* client.list({})
    if (list.length === 0) {
      // @ts-expect-error dynamic methods
      const created = yield* client.create(contactCreatePayload)
      yield* Effect.log("contact created (demo seed)", { id: created.id, extension: "extensions.contact" })
    }
    // @ts-expect-error dynamic methods
    const listAfter = yield* client.list({})
    yield* Effect.log("contacts list", { count: listAfter.length, extension: "extensions.contact" })
  }).pipe(
    withSpanAndLog("ContactSeedLayer")
  )
)

/**
 * Contact workflow layer: CORE_LOADED -> register columns;
 * EXTENSIONS_LOADED_TOPIC -> seed demo contact and log list.
 */
export const ContactWorkflowLayer = Layer.mergeAll(
  OnLoadLayer,
  ContactSeedLayer
)
