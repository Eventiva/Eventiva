/**
 * Contact extension: model (fullname, dateOfBirth, email encrypted, phone) + entity via createEntity.
 * No store layer; platform must provide Database layer when building the program.
 *
 * Use CONTACT_ENTITY_ID when calling the Contact client.
 */
import type { ExtensionLayer } from "@eventiva/core"
import * as Layer from "effect/Layer"
import { ContactLayer as ContactEntityLayer } from "./entity.js"
import { ContactWorkflowLayer } from "./workflow.js"

/** Entity ID for the shared contact entity. Use this when calling Contact client (e.g. client("store")). */
export { CONTACT_ENTITY_ID } from "./entity.js"

/**
 * Contact extension Layer: entity handlers + workflow (onLoad, EXTENSIONS_LOADED seed). Platform must provide Database layer (e.g. DatabaseLiveInMemory or PgDatabaseLayer).
 */
export const ContactLayer: ExtensionLayer = Layer.merge(
  ContactEntityLayer,
  ContactWorkflowLayer
) as unknown as ExtensionLayer

export { Contact } from "./entity.js"
export { ContactWorkflowLayer } from "./workflow.js"
export { ContactModel, ContactFields, ContactIdSchema, type ContactFields as ContactFieldsType, type ContactId } from "./model.js"
