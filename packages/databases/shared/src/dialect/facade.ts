import type { DatabaseDialect } from './database-dialect.js';
import { tryGetDatabaseDialect } from './dialect-registry.js';
import { fallbackPgDialect } from './fallback-pg-dialect.js';

function dialectOrFallback(): DatabaseDialect {
    return tryGetDatabaseDialect() ?? fallbackPgDialect;
}

/**
 * Forward to the active dialect’s column helper. Throws if the helper does not exist for that engine
 * (e.g. `blob` on PostgreSQL).
 */
function forward(name: string): (...args: unknown[]) => unknown {
    return (...args: unknown[]) => {
        const o = dialectOrFallback() as Record<string, unknown>;
        const fn = o[name];
        if (typeof fn !== 'function') {
            throw new Error(
                `@eventiva/databases.shared: column helper "${name}" is not available for dialect "${String(o.kind)}".`
            );
        }
        return (fn as (...a: unknown[]) => unknown)(...args);
    };
}

/** Wrap with `any` so extensions can chain Drizzle builders without dialect-specific types. */
function forwardAny(name: string): (...args: unknown[]) => any {
    return (...args: unknown[]) => forward(name)(...args) as any;
}

// --- PostgreSQL `getPgColumnBuilders()` + `bytea` (union with SQLite-only `blob`) ---

export const bigint = forwardAny('bigint');
export const bigserial = forwardAny('bigserial');
export const bit = forwardAny('bit');
export const blob = forwardAny('blob');
export const boolean = forwardAny('boolean');
export const bytea = forwardAny('bytea');
export const char = forwardAny('char');
export const cidr = forwardAny('cidr');
export const customType = forwardAny('customType');
export const date = forwardAny('date');
export const doublePrecision = forwardAny('doublePrecision');
export const geometry = forwardAny('geometry');
export const halfvec = forwardAny('halfvec');
export const inet = forwardAny('inet');
export const integer = forwardAny('integer');
export const interval = forwardAny('interval');
export const json = forwardAny('json');
export const jsonb = forwardAny('jsonb');
export const line = forwardAny('line');
export const macaddr = forwardAny('macaddr');
export const macaddr8 = forwardAny('macaddr8');
export const numeric = forwardAny('numeric');
export const point = forwardAny('point');
export const real = forwardAny('real');
export const serial = forwardAny('serial');
export const smallint = forwardAny('smallint');
export const smallserial = forwardAny('smallserial');
export const sparsevec = forwardAny('sparsevec');
export const text = forwardAny('text');
export const time = forwardAny('time');
export const timestamp = forwardAny('timestamp');
export const uuid = forwardAny('uuid');
export const varchar = forwardAny('varchar');
export const vector = forwardAny('vector');

export const typeid = forwardAny('typeid');
export const table = forwardAny('table');
