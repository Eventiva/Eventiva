import { SQL, sql } from 'drizzle-orm';
import {
    AnyIndexBuilder,
    CheckBuilder,
    ForeignKeyBuilder,
    index,
    PgColumnBuilder,
    pgEnum,
    PgPolicy,
    pgTable as drizzlePgTable,
    PrimaryKeyBuilder,
    text,
    timestamp,
    UniqueConstraintBuilder,
    uniqueIndex,
} from 'drizzle-orm/pg-core';
import { getPgColumnBuilders } from 'drizzle-orm/pg-core/columns/all';
import { typeid as typeidBuilder } from '@eventiva/databases.shared';

/** Placeholder for createdBy FK when getTable is not available (e.g. createTableFinal standalone). */
const createdByPlaceholder = drizzlePgTable('_created_by_placeholder', { id: text('id') });

/**
 * Represents the status constants used to indicate the state of an entity.
 *
 * The `status` object holds two possible values:
 * - `Inactive`: Represents the entity in an inactive state.
 * - `Active`: Represents the entity in an active state.
 *
 * This is a read-only constant object (as defined with `as const`) and its
 * properties cannot be modified.
 */
export const status = {
    Inactive: 'inactive',
    Active: 'active',
} as const;

/**
 * Status is a TypeScript type that represents a value from the `status` object.
 * It is derived by accessing the union of all values associated with keys in the `status` object.
 * This type is typically used to ensure that certain properties or variables are constrained
 * to valid `status` values as defined within the `status` object.
 */
export type Status = (typeof status)[keyof typeof status];

/**
 * Enum representing the possible statuses for a user.
 *
 * The `userStatusEnum` is utilized to define and constrain the allowable values
 * that a user's status can have within the system. It ensures consistency and
 * integrity for user status values used throughout the application.
 *
 * Enum values:
 * 1. Inactive - Indicates that the user is not currently active in the system.
 * 2. Active - Indicates that the user is currently active in the system.
 *
 * This enum is configured and mapped using a PostgreSQL enum type named 'user-status'.
 */
export const statusEnum = pgEnum('status', [status.Inactive, status.Active]);

/**
 * Represents the required fields that must be present in an object or entity.
 * It is a union of specific string literal types that specify the mandatory properties.
 *
 * Possible values:
 * - 'id': Represents the identifier field.
 */
type RequiredFields = 'id';

/**
 * Represents a set of fields considered forbidden for certain operations
 * or restricted from being accessed or modified.
 *
 * The fields in this type are commonly associated with system-level or
 * metadata-related attributes that should not be directly altered by
 * external systems or users.
 *
 * This type can be useful for scenarios such as filtering out restricted
 * fields or enforcing constraints in data processing.
 *
 * Fields:
 * - 'createdAt': Typically represents the timestamp when an entity was created.
 * - 'updatedAt': Represents the timestamp of the last modification to an entity.
 * - 'disabledAt': Indicates the timestamp when an entity was disabled.
 * - 'deletedAt': Represents the timestamp when an entity was deleted.
 * - 'createdBy': Refers to the user or entity responsible for creating the record.
 * - 'active': Indicates the active status of an entity.
 */
type ForbiddenFields = 'createdAt' | 'updatedAt' | 'disabledAt' | 'deletedAt' | 'createdBy' | 'active';

/**
 * A utility type that ensures required fields in an object type based on specified field constraints.
 *
 * This type merges the original `TColumns` with an enforced set of required fields,
 * making the specified fields mandatory while retaining the rest of the properties as-is.
 * @template TColumns The object type describing the columns, where each property corresponds to a `PgColumnBuilderBase`.
 */
type EnsureRequiredFields<TColumns extends Record<string, PgColumnBuilder>> = Required<Pick<TColumns, RequiredFields>> &
    TColumns;

/**
 * Represents a utility type to exclude forbidden fields from a set of column definitions.
 *
 * The `ExcludeForbiddenFields` type iterates over the keys of the given `TColumns` type
 * and excludes any fields that match the types defined in `ForbiddenFields`.
 * @template TColumns - A record type where the keys represent column names and the values extend `PgColumnBuilderBase`.
 *
 * Properties in `TColumns` that match the `ForbiddenFields` type will be excluded (set to `never`).
 * This type is typically used for dynamically filtering out specific columns in a type-safe way.
 */
type ExcludeForbiddenFields<TColumns extends Record<string, PgColumnBuilder>> = {
    [Field in keyof TColumns]: Field extends ForbiddenFields ? never : TColumns[Field];
};

/**
 * The ValidateColumns utility type ensures that a given set of column definitions conforms to specific rules.
 *
 * It validates the input type by applying the following constraints:
 * - All required fields within the column definitions must be present.
 * - Forbidden fields, if any, will be excluded from the resulting column definition set.
 *
 * This type is typically used to enforce structural and validation constraints
 * on column definitions provided by the user.
 *
 * TColumns: Represents a set of column definitions extending the base type `PgColumnBuilderBase`.
 * The returned type enforces adherence to required fields while excluding forbidden ones.
 */
type ValidateColumns<TColumns extends Record<string, PgColumnBuilder>> = EnsureRequiredFields<
    ExcludeForbiddenFields<TColumns>
>;

export type AllBuilders = {
    typeid: typeof typeidBuilder;
} & ReturnType<typeof getPgColumnBuilders>;

export type PgTableExtraConfigValue =
    | AnyIndexBuilder
    | CheckBuilder
    | ForeignKeyBuilder
    | PrimaryKeyBuilder
    | UniqueConstraintBuilder
    | PgPolicy;
export type PgTableExtraConfig = Record<string, PgTableExtraConfigValue>;

/**
 * Validates and returns a table's column definitions, enforcing required and forbidden fields.
 *
 * @param name - The table name used in error messages
 * @param db - Builder utilities (including column builders and `typeid`)
 * @param columns - Callback that receives builders and returns the table's column map
 * @returns The validated column map for the table
 * @throws Error if the returned column map does not include an `id` column or if it includes any of the forbidden fields: `createdAt`, `updatedAt`, `disabledAt`, `deletedAt`, `createdBy`, or `active`
 */
export function testColumns<
    TTableName extends string,
    TColumnsKey extends string,
    TColumnsMap extends Record<TColumnsKey, PgColumnBuilder>,
>(name: TTableName, db: AllBuilders, columns: (columnTypes: AllBuilders) => ValidateColumns<TColumnsMap>) {
    const table = columns({
        ...db,
        typeid: typeidBuilder,
    });
    // Check if columns have an "id" field
    if (!('id' in table)) {
        throw new Error(
            `Table definition for ${name} is incorrect. The column definition must include an "id"` +
                ' field. Please use the importable "typeid" function and the typeid_generate_text() default' +
                ' function'
        );
    }
    if ('createdAt' in table) {
        throw new Error(
            `Table definition for ${name} is incorrect. The column definition must not include a "createdAt" field. This would be overwritten by the default settings`
        );
    }

    if ('updatedAt' in table) {
        throw new Error(
            `Table definition for ${name} is incorrect. The column definition must not include a "updatedAt" field. This would be overwritten by the default settings`
        );
    }

    if ('disabledAt' in table) {
        throw new Error(
            `Table definition for ${name} is incorrect. The column definition must not include a "disabledAt" field. This would be overwritten by the default settings`
        );
    }

    if ('deletedAt' in table) {
        throw new Error(
            `Table definition for ${name} is incorrect. The column definition must not include a "deletedAt" field. This would be overwritten by the default settings`
        );
    }

    if ('createdBy' in table) {
        throw new Error(
            `Table definition for ${name} is incorrect. The column definition must not include a "createdBy" field. This would be overwritten by the default settings`
        );
    }

    if ('active' in table) {
        throw new Error(
            `Table definition for ${name} is incorrect. The column definition must not include an "active" field. This would be overwritten by the default settings which generate the status "Active" or "Inactive" depending on the value of the "deleted_at" field.`
        );
    }
    return table;
}

/**
 * Create a PostgreSQL table definition with standard metadata fields, indices and optional extra configuration.
 *
 * The provided column factory is validated (must include an `id` column and must not define reserved fields)
 * and the table is augmented with `createdAt`, `updatedAt`, `disabledAt`, `deletedAt`, `createdBy` and a generated
 * `active` status, plus standard indices.
 *
 * @param name - Table name (lowercase, no "-" or "_")
 * @param columns - Factory invoked with DB column builders that must return the table's columns. The returned
 *                  columns must include an `id` column and must not include reserved fields: `createdAt`, `updatedAt`,
 *                  `disabledAt`, `deletedAt`, `createdBy`, or `active`.
 * @param extraConfig - Optional callback that receives the constructed table and returns additional table constraints,
 *                      indices or other extra configuration entries to be applied.
 * @returns The final pgTable definition including validated columns, standard metadata fields and indices
 * @throws {Error} If the required `id` column is missing or any reserved fields are present in the provided columns
 */
export function createTableFinal<
    TTableName extends string,
    TColumnsKey extends string,
    TColumnsMap extends Record<TColumnsKey, PgColumnBuilder>,
>(
    name: TTableName,
    columns: (columnTypes: AllBuilders) => ValidateColumns<TColumnsMap>,
    extraConfig?: (self: unknown) => PgTableExtraConfigValue[]
) {
    /**
     * Represents a database table configuration using `pgTable` with predefined columns, indices, and generated fields.
     * @param {string} name - The name of the database table.
     * @param {object} columns - Columns of the table, including predefined fields such as `createdAt`, `updatedAt`, `deletedAt`, etc.
     * @param {object} extraConfig - Additional configuration to extend the table's properties and indices.
     *
     * Table fields:
     * - `createdAt` - A timestamp field indicating when the record was created. Defaults to the current timestamp.
     * - `updatedAt` - A timestamp field indicating when the record was last updated. Automatically updates to the current timestamp when the record is modified.
     * - `deletedAt` - A nullable timestamp field indicating when the record was deleted.
     * - `createdBy` - A foreign key referencing the `id` field of the users table. Represents the user who created the record.
     * - `active` - A status field generated as `Active` if `deletedAt` is `NULL` and `Inactive` otherwise.
     *
     * Table indices:
     * - `createdAtIndex` - An index on the `createdAt` column for optimized querying by creation date.
     */
    const result = drizzlePgTable(
        name,
        (db) => ({
            ...testColumns(
                name,
                {
                    ...db,
                    typeid: typeidBuilder,
                },
                columns
            ),
            createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
            updatedAt: timestamp('updated_at', { mode: 'string' })
                .defaultNow()
                .$onUpdate(() => new Date().toISOString()),
            disabledAt: timestamp('disabled_at', { mode: 'string' }),
            deletedAt: timestamp('deleted_at', { mode: 'string' }),
            /**
             * Because this references the users table, we must update the users table manually if adding any new
             * fields to this abstraction.
             */
            createdBy: text('created_by').references(() => createdByPlaceholder.id),
            active: statusEnum('active').generatedAlwaysAs(
                (): SQL =>
                    sql`CASE WHEN deleted_at IS NULL AND disabled_at IS NULL THEN 'active'::status ELSE 'inactive'::status END`
            ),
        }),
        (table: any) => {
            const extra = extraConfig ? extraConfig(table) : [];

            return [
                ...extra,
                uniqueIndex(`${name}_id_index`).on(table.id),
                index(`${name}_created_at_index`).on(table.createdAt),
                index(`${name}_updated_at_index`).on(table.updatedAt),
                index(`${name}_disabled_at_index`).on(table.disabledAt),
                index(`${name}_deleted_at_index`).on(table.deletedAt),
            ];
        }
    );
    return result;
}

/**
 * Builds a single Drizzle table from merged columns object and extra config callbacks.
 * Used by SchemaFinalizer and by createTableFinal. Adds standard columns (createdAt, updatedAt, etc.) and standard indexes.
 * When getTable is provided, createdBy references the real creator table; otherwise uses a placeholder.
 *
 * @param name - Table name
 * @param mergedColumns - Column definitions (must include id). Same shape as second arg to pgTable.
 * @param extraConfigs - Optional array of callbacks (table) => PgTableExtraConfigValue[] to add indexes/constraints
 * @param getTable - Optional callback to resolve already-built tables (creator table built first). Default creator table name: 'contact'.
 * @returns The built PgTable
 */
export function buildTableInternal(
    name: string,
    mergedColumns: Record<string, PgColumnBuilder>,
    extraConfigs: ReadonlyArray<(table: any) => PgTableExtraConfigValue[]>,
    getTable?: (tableName: string) => unknown
) {
    const creatorTable = getTable?.('contact') as { id: typeof createdByPlaceholder.id } | undefined;
    const createdByRef = (): typeof createdByPlaceholder.id => creatorTable?.id ?? createdByPlaceholder.id;
    return drizzlePgTable(
        name,
        (db) => ({
            ...mergedColumns,
            createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
            updatedAt: timestamp('updated_at', { mode: 'string' })
                .defaultNow()
                .$onUpdate(() => new Date().toISOString()),
            disabledAt: timestamp('disabled_at', { mode: 'string' }),
            deletedAt: timestamp('deleted_at', { mode: 'string' }),
            createdBy: text('created_by').references(createdByRef),
            active: statusEnum('active').generatedAlwaysAs(
                (): SQL =>
                    sql`CASE WHEN deleted_at IS NULL AND disabled_at IS NULL THEN 'active'::status ELSE 'inactive'::status END`
            ),
        }),
        (table: any) => {
            const extra = extraConfigs.flatMap((cb) => (typeof cb === 'function' ? cb(table) : []));
            return [
                ...extra,
                uniqueIndex(`${name}_id_index`).on(table.id),
                index(`${name}_created_at_index`).on(table.createdAt),
                index(`${name}_updated_at_index`).on(table.updatedAt),
                index(`${name}_disabled_at_index`).on(table.disabledAt),
                index(`${name}_deleted_at_index`).on(table.deletedAt),
            ];
        }
    );
}

/**
 * Create a PostgreSQL table definition using provided column builders and optional extra configuration.
 *
 * @param columns - Function that receives an AllBuilders object (collection of column builders; includes `typeid`) and returns the table's column map.
 * @param extraConfig - Optional function that receives the table `self` and returns additional table configuration items (indexes, constraints, checks, policies, etc.).
 * @returns The constructed Drizzle PostgreSQL table definition for `name`
 */
export function pgTable<
    TTableName extends string,
    TColumnsKey extends string,
    TColumnsMap extends Record<TColumnsKey, PgColumnBuilder>,
>(
    name: TTableName,
    columns: (columnTypes: AllBuilders) => TColumnsMap,
    extraConfig?: ((self: unknown) => PgTableExtraConfigValue[]) | undefined
) {
    const result = drizzlePgTable(
        name,
        (db) =>
            columns({
                ...db,
                typeid: typeidBuilder,
            }),
        extraConfig
    );
    return result;
}
