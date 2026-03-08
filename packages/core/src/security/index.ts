/**
 * Core security: integrity checks (run before CORE_LOADED) and PII encryption at rest.
 * @see .cursor/plans/notes.md (2.1.2, 2.1.4)
 */
export { runIntegrityChecks } from "./integrity.js"
export {
  PiiEncryption,
  PiiEncryptionLive,
  EncryptionError
} from "./encryption.js"
export type { PiiEncryption as PiiEncryptionService } from "./encryption.js"
