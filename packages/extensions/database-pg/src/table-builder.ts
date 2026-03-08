/**
 * Drizzle table builder: accepts extension custom columns, injects standard columns
 * (id, created_at, updated_at, deleted_at, disabled_at, created_by, status) and indexes.
 * Use when defining entity tables for migrations or Drizzle schema.
 * @see docs/learnings/architecture.md
 */
import { index, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core"

const statusEnum = ["active", "inactive"] as const

/**
 * Standard column names for entity tables (snake_case for DB).
 */
export const standardColumns = {
  id: text("id").primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  deleted_at: timestamp("deleted_at", { withTimezone: true }),
  disabled_at: timestamp("disabled_at", { withTimezone: true }),
  created_by: text("created_by"),
  status: text("status", { enum: statusEnum }).notNull().default("active")
}

/**
 * Creates a Drizzle pg table with standard columns plus custom columns.
 * Adds unique index on id and indexes on created_at, updated_at, disabled_at, deleted_at.
 *
 * @param tableName - Table name (e.g. "contact")
 * @param customColumns - Additional columns from the extension (e.g. fullname, email)
 * @returns PgTable that can be used with Drizzle and migrations
 */
export function createEntityTable<T extends Record<string, any>>(
  tableName: string,
  customColumns: T
) {
  return pgTable(
    tableName,
    {
      ...standardColumns,
      ...customColumns
    },
    (t) => [
      uniqueIndex(`${tableName}_id_idx`).on(t.id),
      index(`${tableName}_created_at_idx`).on(t.created_at),
      index(`${tableName}_updated_at_idx`).on(t.updated_at),
      index(`${tableName}_disabled_at_idx`).on(t.disabled_at),
      index(`${tableName}_deleted_at_idx`).on(t.deleted_at)
    ]
  )
}
