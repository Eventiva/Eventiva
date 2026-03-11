/**
 * PII encryption at rest. Core-only; extensions use this service, never implement their own.
 * Per docs: encryption must be in core, keys never in UI/frontend (see .cursor/plans/notes.md).
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { RuntimeConfig } from "../config/runtime-config.js";
export interface PiiEncryption {
    readonly encrypt: (plaintext: string) => Effect.Effect<string, EncryptionError>;
    readonly decrypt: (ciphertext: string) => Effect.Effect<string, EncryptionError>;
}
export declare class EncryptionError extends Error {
    readonly cause?: unknown | undefined;
    readonly _tag = "EncryptionError";
    constructor(message: string, cause?: unknown | undefined);
}
export declare const PiiEncryption: Context.Tag<PiiEncryption, PiiEncryption>;
export declare const PiiEncryptionLive: Layer.Layer<PiiEncryption, never, RuntimeConfig>;
//# sourceMappingURL=encryption.d.ts.map