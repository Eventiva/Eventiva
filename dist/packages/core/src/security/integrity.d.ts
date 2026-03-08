/**
 * Integrity checks: must pass before core/loaded is published.
 * Per docs: randomised, unique per server; if they don't pass, exit immediately.
 * Security module must start before everything else (see .cursor/plans/notes.md).
 */
import * as Effect from "effect/Effect";
/**
 * Runs integrity checks. Call this before publishing CORE_LOADED_TOPIC.
 * On failure returns a failed Effect (runtime should exit).
 *
 * Current check: verifies that the integrity nonce env (or a derived value)
 * is present and matches a minimal validation. In production this would be
 * replaced or extended with build-time signing or external attestation.
 */
export declare const runIntegrityChecks: Effect.Effect<void, {
    _tag: "IntegrityCheckFailed";
    reason: string;
}>;
//# sourceMappingURL=integrity.d.ts.map