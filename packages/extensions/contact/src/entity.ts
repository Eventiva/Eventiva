/**
 * Contact entity: class-based schema and Effect Cluster entity via Base.
 * Schema uses Effect Classes API (id + fields); Base provides entity and layer.
 */
import * as Schema from "effect/Schema"
import { Base, type BaseEncoded, type EntityRpc, encryptedString } from "@eventiva/core"

/** Encoded shape for Contact (storage/wire). */
export interface ContactEncoded extends BaseEncoded<"Contact"> {
  readonly fullname: string
  readonly dateOfBirth: string
  readonly email: string
  readonly phone: string
}

export class Contact extends Base<Contact>()("Contact", {
  fullname: Schema.String,
  dateOfBirth: Schema.DateFromString,
  email: encryptedString,
  phone: Schema.String
}, { withDelete: true }) {}

/** Entity ID for the shared contact entity. Use when calling Contact.client("store"). */
export const CONTACT_ENTITY_ID = "store"

export const ContactEntity = Contact.entity
export const ContactLayer = Contact.layer
export type ContactRpc = EntityRpc<typeof Contact.entity>
/** Decoded contact record (id + fields). */
export type ContactRecord = Schema.Schema.Type<typeof Contact>
