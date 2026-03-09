import * as Schema from "effect/Schema";
import { PiiEncryption } from "../security/encryption.js";
/**
 * Effect Schema for a string that is encrypted at rest. Decode: decrypt(stored). Encode: encrypt(api).
 * Requires PiiEncryption in context. Use for PII fields (e.g. email) so extensions do not write encode/decode by hand.
 */
export declare const encryptedString: Schema.Schema<string, string, PiiEncryption>;
/** Alias for use in structs: e.g. email: Schema.encryptedString or Schema.encryptedString */
export declare const encryptedStringSchema: Schema.Schema<string, string, PiiEncryption>;
//# sourceMappingURL=schema-encryption.d.ts.map