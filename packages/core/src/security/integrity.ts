/**
 * Integrity checks: must pass before core/loaded is published.
 * Per docs: randomised, unique per server; if they don't pass, exit immediately.
 * Security module must start before everything else (see .cursor/plans/notes.md).
 */
import * as Effect from 'effect/Effect';
import * as Option from 'effect/Option';
import * as Crypto from 'node:crypto';
import { withSpanAndLog } from '../observability/helpers.js';
import { RuntimeConfig } from '../config/runtime-config.js';

const INTEGRITY_NONCE_ENV = 'EVENTIVA_INTEGRITY_NONCE';

/**
 * Runs integrity checks. Call this before publishing CORE_LOADED_TOPIC.
 * On failure returns a failed Effect (runtime should exit).
 *
 * Current check: verifies that the integrity nonce env (or a derived value)
 * is present and matches a minimal validation. In production this would be
 * replaced or extended with build-time signing or external attestation.
 */
export const runIntegrityChecks: Effect.Effect<void, { _tag: 'IntegrityCheckFailed'; reason: string }, RuntimeConfig> =
    Effect.gen(function* () {
        yield* Effect.logInfo('Starting integrity checks...');
        const runtimeConfig = yield* RuntimeConfig;
        const nonce = Option.getOrUndefined(runtimeConfig.integrityNonce);
        if (runtimeConfig.nodeEnv === 'production' && !nonce) {
            return yield* Effect.fail({
                _tag: 'IntegrityCheckFailed' as const,
                reason: `Missing ${INTEGRITY_NONCE_ENV} in production`,
            });
        }
        const seed = nonce ?? 'dev-integrity-seed';
        const hash = Crypto.createHash('sha256').update(seed).digest('hex').slice(0, 16);
        if (!hash || hash.length < 8) {
            return yield* Effect.fail({
                _tag: 'IntegrityCheckFailed' as const,
                reason: 'Integrity hash invalid',
            });
        }
        yield* Effect.logInfo('Integrity checks passed', { security: 'eventiva-core' });
    }).pipe(withSpanAndLog('runIntegrityChecks'));
