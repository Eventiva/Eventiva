/**
 * Contact entity: CRUD from createEntity. No store; platform provides Database layer.
 */
import { createEntity } from "@eventiva/core"
import { ContactFields } from "./model.js"

/** Entity ID for the shared contact entity. Use this when calling Contact client (e.g. client("store")). */
export const CONTACT_ENTITY_ID = "store"

const { entity, layer } = createEntity({
  name: "Contact",
  schema: ContactFields,
  withDelete: true
})

export const Contact = entity
export type Contact = typeof Contact

/** RPC union for Contact entity. Use with Request<ExtractTag<ContactRpc, "create">> etc. */
export type ContactRpc = Contact["protocol"] extends import("@effect/rpc/RpcGroup").RpcGroup<
  infer R extends import("@effect/rpc/Rpc").Any
>
  ? R
  : never

/** Layer that provides Contact entity with CRUD handlers. Requires Database (and PiiEncryption for encrypted email). */
export const ContactLayer = layer
