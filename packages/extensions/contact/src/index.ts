/**
 * Contact extension: entity (class-based schema + cluster entity) and workflows.
 * Platform must provide Database layer when building the program.
 * Use CONTACT_ENTITY_ID when calling the Contact client.
 */
import type { ExtensionLayer } from "@eventiva/core"
import * as Layer from "effect/Layer"
import { ContactLayer as ContactEntityLayer } from "./entity.js"
import { ContactWorkflowLayer } from "./workflow.js"

export { CONTACT_ENTITY_ID } from "./entity.js"

/**
 * Contact extension Layer: entity handlers + workflow (onLoad, EXTENSIONS_LOADED seed).
 * Platform must provide Database layer (e.g. DatabaseLiveInMemory or PgDatabaseLayer).
 */
export const ContactLayer: ExtensionLayer = Layer.merge(
  ContactEntityLayer,
  ContactWorkflowLayer
) as unknown as ExtensionLayer

export {
  Contact,
  ContactEntity,
  type ContactEncoded,
  type ContactRpc,
  type ContactRecord
} from "./entity.js"
export { ContactWorkflowLayer } from "./workflow.js"
