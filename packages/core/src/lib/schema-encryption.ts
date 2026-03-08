/**
 * Schema-level encryption: Effect Schema transform for PII fields.
 * Decode (stored → API): decrypt via PiiEncryption. Encode (API → stored): encrypt via PiiEncryption.
 * Schema requires PiiEncryption in context. Use in entity record schemas so createEntity encode/decode handles encryption automatically.
 * @see docs/learnings/architecture.md
 */
import * as Effect from "effect/Effect"
import * as ParseResult from "effect/ParseResult"
import * as Schema from "effect/Schema"
import { PiiEncryption } from "../security/encryption.js"

function encryptionMessage(e: unknown): string {
  if (e instanceof Error) return e.message
  return String(e)
}

/**
 * Effect Schema for a string that is encrypted at rest. Decode: decrypt(stored). Encode: encrypt(api).
 * Requires PiiEncryption in context. Use for PII fields (e.g. email) so extensions do not write encode/decode by hand.
 */
export const encryptedString: Schema.Schema<string, string, PiiEncryption> = Schema.transformOrFail(
  Schema.String,
  Schema.String,
  {
    decode: (fromA, _options, ast, _fromI) =>
      PiiEncryption.pipe(
        Effect.flatMap((pii) => pii.decrypt(fromA)),
        Effect.mapError((e) => new ParseResult.Type(ast, fromA, encryptionMessage(e)))
      ),
    encode: (toI, _options, ast, toA) =>
      PiiEncryption.pipe(
        Effect.flatMap((pii) => pii.encrypt(toA)),
        Effect.mapError((e) => new ParseResult.Type(ast, toI, encryptionMessage(e)))
      )
  }
)

/** Alias for use in structs: e.g. email: Schema.encryptedString or Schema.encryptedString */
export const encryptedStringSchema = encryptedString
