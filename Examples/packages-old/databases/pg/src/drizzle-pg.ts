/**
 * Re-exports Drizzle ORM effect-postgres driver and migrator.
 * Use these layers and factories instead of custom postgres handlers.
 * Requires PgClient (@effect/sql-pg); use DefaultServices for EffectCache and EffectLogger when using make().
 *
 * @see https://github.com/drizzle-team/drizzle-orm/blob/beta/drizzle-orm/src/effect-postgres/driver.ts
 * @see https://orm.drizzle.team/docs/connect-effect-postgres
 */
export {
    DefaultServices,
    type EffectDrizzleConfig,
    EffectPgDatabase,
    make,
    makeWithDefaults,
} from 'drizzle-orm/effect-postgres';
export { migrate } from 'drizzle-orm/effect-postgres/migrator';
