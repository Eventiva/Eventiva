/**
 * Contact model: fullname, dateOfBirth, email (encrypted), phone.
 * Defined with Effect Schema; email uses Schema.encryptedString so no hand-written encode/decode.
 * Contact IDs use TypeID with prefix "contact" for type safety and K-sortability.
 */
import * as Schema from "effect/Schema"
import { defineModel, typeIdSchema, encryptedString } from "@eventiva/core"

export const ContactIdSchema = typeIdSchema("contact")
export type ContactId = Schema.Schema.Type<typeof ContactIdSchema>

export const ContactFields = Schema.Struct({
  fullname: Schema.String,
  dateOfBirth: Schema.DateFromString,
  email: encryptedString,
  phone: Schema.String
})

export type ContactFields = Schema.Schema.Type<typeof ContactFields>

export const ContactModel = defineModel("Contact", ContactFields)

export type ContactModel = typeof ContactModel

/** List item type: fields + id. Matches CRUD list RPC success element. */
export type ContactListItem = ContactFields & { readonly id: ContactId }
