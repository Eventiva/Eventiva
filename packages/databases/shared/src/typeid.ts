import { text } from 'drizzle-orm/pg-core';
import type { PgColumnBuilder } from 'drizzle-orm/pg-core';

/**
 * Creates a text column builder for TypeID fields in Drizzle ORM.
 * 
 * TypeID is a type-safe, K-sortable identifier format with a type prefix
 * (e.g., "contact_01h2xcejqtf2nbrexx3vqjhp41").
 * 
 * This function creates a Drizzle text column that can be used in table definitions.
 * The column will store TypeID strings with the specified type prefix.
 * 
 * @param value - The column name (default: 'id')
 * @param config - Optional configuration object
 * @param config.type - The TypeID prefix type (e.g., 'contact', 'user')
 * @returns A Drizzle text column builder
 * 
 * @example
 * ```typescript
 * import { typeid } from '@eventiva/databases.shared';
 * 
 * const contactColumns = {
 *   id: typeid('id', { type: 'contact' }),
 *   // ... other columns
 * };
 * ```
 */
export const typeid = (value = 'id', config?: { type: string }): PgColumnBuilder => {
    return text(value) as PgColumnBuilder;
};
