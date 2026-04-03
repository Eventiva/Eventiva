/**
 * PII encryption at rest. Core-only; extensions use this service, never implement their own.
 * Per docs: encryption must be in core, keys never in UI/frontend (see .cursor/plans/notes.md).
 */
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import * as Option from 'effect/Option';
import * as Crypto from 'node:crypto';
import { withSpanAndLog } from '../observability/helpers.js';
import { RuntimeConfig } from '../config/runtime-config.js';

const ALGO = 'aes-256-gcm';
const IV_LEN = 12;
const KEY_LEN = 32;

export interface PiiEncryption {
    readonly encrypt: (plaintext: string) => Effect.Effect<string, EncryptionError>;
    readonly decrypt: (ciphertext: string) => Effect.Effect<string, EncryptionError>;
}

export class EncryptionError extends Error {
    readonly _tag = 'EncryptionError';
    constructor(
        message: string,
        override readonly cause?: unknown
    ) {
        super(message);
        this.name = 'EncryptionError';
    }
}

export const PiiEncryption = Context.GenericTag<PiiEncryption>('@eventiva/core/PiiEncryption');

function encryptImpl(key: Buffer, plaintext: string): string {
    const iv = Crypto.randomBytes(IV_LEN);
    const cipher = Crypto.createCipheriv(ALGO, key, iv);
    const enc = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return [iv.toString('base64url'), authTag.toString('base64url'), enc.toString('base64url')].join('.');
}

function decryptImpl(key: Buffer, packed: string): string {
    const parts = packed.split('.');
    if (parts.length !== 3) {
        throw new EncryptionError('Invalid ciphertext format');
    }
    const [ivB64, tagB64, encB64] = parts;
    const iv = Buffer.from(ivB64, 'base64url');
    const authTag = Buffer.from(tagB64, 'base64url');
    const enc = Buffer.from(encB64, 'base64url');
    const decipher = Crypto.createDecipheriv(ALGO, key, iv);
    decipher.setAuthTag(authTag);
    return decipher.update(enc).toString('utf8') + decipher.final('utf8');
}

const ENCRYPTION_KEY_ENV = 'EVENTIVA_ENCRYPTION_KEY';
const DEV_KEY_B64 = 'ZGV2LWtleS0zMmJ5dGVzLWZvci1ldmVudGl2YS1waWk=';

function makeKey(raw: string): Buffer {
    const buf = Buffer.from(raw, 'base64');
    if (buf.length === KEY_LEN) return buf;
    const hex = Buffer.from(raw, 'hex');
    if (hex.length === KEY_LEN) return hex;
    const padded = Buffer.alloc(KEY_LEN);
    Crypto.createHash('sha256').update(raw, 'utf8').digest().copy(padded);
    return padded;
}

export const PiiEncryptionLive: Layer.Layer<PiiEncryption, never, RuntimeConfig> = Layer.effect(
    PiiEncryption,
    Effect.gen(function* () {
        const runtimeConfig = yield* RuntimeConfig;
        const raw = Option.getOrUndefined(runtimeConfig.encryptionKey);
        if (!raw && runtimeConfig.nodeEnv === 'production') {
            throw new Error(`Missing ${ENCRYPTION_KEY_ENV} in production`);
        }
        const key = makeKey(raw ?? DEV_KEY_B64);
        if (!raw) {
            yield* Effect.logWarning(
                '[eventiva-core] Using default dev encryption key; set EVENTIVA_ENCRYPTION_KEY for non-dev'
            );
        }
        return {
            encrypt: (plaintext: string) =>
                Effect.try({
                    try: () => encryptImpl(key, plaintext),
                    catch: (e) => new EncryptionError('Encrypt failed', e),
                }).pipe(withSpanAndLog('PiiEncryption.encrypt')),
            decrypt: (ciphertext: string) =>
                Effect.try({
                    try: () => decryptImpl(key, ciphertext),
                    catch: (e) => new EncryptionError('Decrypt failed', e),
                }).pipe(withSpanAndLog('PiiEncryption.decrypt')),
        };
    })
);
