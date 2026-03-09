import { BuildExtraConfigColumns, SQL, sql } from 'drizzle-orm'
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
    timestamp,
    UniqueConstraintBuilder,
    uniqueIndex
} from 'drizzle-orm/pg-core'
import { getPgColumnBuilders } from 'drizzle-orm/pg-core/columns/all'
import { text } from 'drizzle-orm/pg-core'

/**
 * Creates a text object based on the provided value. (Used by drizzle)
 * @param value - The input value to be processed.
 * @param [config] - Optional configuration object.
 * @param config.type - The type of input value, if provided.
 * @returns - A text object derived from the input value.
 */
export const typeid = (
    value: string = 'id',
    config?: { type: string }
) => text( value )

const contactSkeleton = drizzlePgTable('contact', { id: typeid('id', { type: 'contact' }) });

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
    'Inactive': 'inactive',
    'Active': 'active'
} as const

/**
 * Status is a TypeScript type that represents a value from the `status` object.
 * It is derived by accessing the union of all values associated with keys in the `status` object.
 * This type is typically used to ensure that certain properties or variables are constrained
 * to valid `status` values as defined within the `status` object.
 */
export type Status = typeof status[keyof typeof status]

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
export const statusEnum = pgEnum(
    'status',
    [
        status.Inactive,
        status.Active
    ]
)

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
type ForbiddenFields =
    | 'createdAt'
    | 'updatedAt'
    | 'disabledAt'
    | 'deletedAt'
    | 'createdBy'
    | 'active';

/**
 * A utility type that ensures required fields in an object type based on specified field constraints.
 *
 * This type merges the original `TColumns` with an enforced set of required fields,
 * making the specified fields mandatory while retaining the rest of the properties as-is.
 * @template TColumns The object type describing the columns, where each property corresponds to a `PgColumnBuilderBase`.
 */
type EnsureRequiredFields<TColumns extends Record<string, PgColumnBuilder>> =
    Required<Pick<TColumns, RequiredFields>> & TColumns;

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
    [Field in keyof TColumns]: Field extends ForbiddenFields
        ? never
        : TColumns[Field];
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
    typeid: typeof typeid
} & ReturnType<typeof getPgColumnBuilders>

export type PgTableExtraConfigValue =
    AnyIndexBuilder
    | CheckBuilder
    | ForeignKeyBuilder
    | PrimaryKeyBuilder
    | UniqueConstraintBuilder
    | PgPolicy;
export type PgTableExtraConfig = Record<string, PgTableExtraConfigValue>;


export function testColumns<
    TTableName extends string,
    TColumnsKey extends string,
    TColumnsMap extends Record<TColumnsKey, PgColumnBuilder>>
(
    name: TTableName,
    db: AllBuilders,
    columns: ( columnTypes: AllBuilders ) => ValidateColumns<TColumnsMap>
) {
    const table = columns( {
        ...db,
        typeid
    } )
    // Check if columns have an "id" field
    if ( !( 'id' in table ) ) {
        throw new Error( `Table definition for ${ name } is incorrect. The column definition must include an "id"`
            + ' field. Please use the importable "typeid" function and the typeid_generate_text() default'
            + ' function' )
    }
    if ( 'createdAt' in table ) {
        throw new Error( `Table definition for ${ name } is incorrect. The column definition must not include a "createdAt" field. This would be overwritten by the default settings` )
    }

    if ( 'updatedAt' in table ) {
        throw new Error( `Table definition for ${ name } is incorrect. The column definition must not include a "updatedAt" field. This would be overwritten by the default settings` )
    }

    if ( 'disabledAt' in table ) {
        throw new Error( `Table definition for ${ name } is incorrect. The column definition must not include a "disabledAt" field. This would be overwritten by the default settings` )
    }

    if ( 'deletedAt' in table ) {
        throw new Error( `Table definition for ${ name } is incorrect. The column definition must not include a "deletedAt" field. This would be overwritten by the default settings` )
    }

    if ( 'createdBy' in table ) {
        throw new Error( `Table definition for ${ name } is incorrect. The column definition must not include a "createdBy" field. This would be overwritten by the default settings` )
    }

    if ( 'active' in table ) {
        throw new Error( `Table definition for ${ name } is incorrect. The column definition must not include an "active" field. This would be overwritten by the default settings which generate the status "Active" or "Inactive" depending on the value of the "deleted_at" field.` )
    }
    return table
}

/**
 * Creates a database table with specified columns and optional extra configuration.
 * This function ensures required fields are present and applies default configurations
 * to certain fields while restricting the inclusion of specific fields in the column definitions.
 * @param name The name of the table, lowercase without "-" or "_"
 * @param columns A validated object representing the columns of the table.
 *        Must include required fields such as "id", "encircleId", and "embeddingTerm".
 * @param [extraConfig]
 *        An optional function to define extra configurations for the table, extending or modifying the default settings.
 * @throws {Error} If required fields ("id") are missing or if restricted fields
 *        ("createdAt", "updatedAt", "deletedAt", "createdBy", "active") are included.
 *        Thrown errors should also be populated within your IDE type-guarding.
 * @returns The fully configured table with default and customized settings.
 */
export function createTableFinal<
    TTableName extends string,
    TColumnsKey extends string,
    TColumnsMap extends Record<TColumnsKey, PgColumnBuilder>
> (
    name: TTableName,
    columns: ( columnTypes: AllBuilders ) => ValidateColumns<TColumnsMap>,
    extraConfig?: ( self: BuildExtraConfigColumns<TTableName, TColumnsMap, 'pg'> ) => PgTableExtraConfigValue[]
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
        ( db ) => ( {
            ...testColumns(
                name,
                {
                    ...db,
                    typeid
                },
                columns
            ),
            createdAt: timestamp( 'created_at', { mode: 'string' } ).defaultNow(),
            updatedAt: timestamp(
                'updated_at',
                { mode: 'string' }
            ).defaultNow().$onUpdate( () => new Date().toISOString() ),
            disabledAt: timestamp( 'disabled_at', { mode: 'string' } ),
            deletedAt: timestamp( 'deleted_at', { mode: 'string' } ),
            /**
             * Because this references the users table, we must update the users table manually if adding any new
             * fields to this abstraction.
             */
            createdBy: typeid( 'created_by', { type: 'contact' } ).references( () => contactSkeleton.id ),
            active: statusEnum( 'active' ).generatedAlwaysAs( (): SQL => sql`CASE WHEN deleted_at IS NULL AND disabled_at IS NULL THEN 'active'::status ELSE 'inactive'::status END` )
        } ),
        ( table: any ) => {
            const extra = extraConfig
                ? extraConfig( table )
                : []

            return [
                ...extra,
                uniqueIndex( `${name}_id_index` ).on( table.id ),
                index( `${name}_created_at_index` ).on( table.createdAt ),
                index( `${name}_updated_at_index` ).on( table.updatedAt ),
                index( `${name}_disabled_at_index` ).on( table.disabledAt ),
                index( `${name}_deleted_at_index` ).on( table.deletedAt )
            ]
        }
    )
    return result
}

/**
 * Builds a single Drizzle table from merged columns object and extra config callbacks.
 * Used by SchemaFinalizer and by createTableFinal. Adds standard columns (createdAt, updatedAt, etc.) and standard indexes.
 * Self-referencing tables (e.g. contact → contact) can be supported later via assign-after-construct pattern.
 *
 * @param name - Table name
 * @param mergedColumns - Column definitions (must include id). Same shape as second arg to pgTable.
 * @param extraConfigs - Optional array of callbacks (table) => PgTableExtraConfigValue[] to add indexes/constraints
 * @returns The built PgTable
 */
export function buildTableInternal(
    name: string,
    mergedColumns: Record<string, PgColumnBuilder>,
    extraConfigs: ReadonlyArray<( table: any ) => PgTableExtraConfigValue[]>
) {
    return drizzlePgTable(
        name,
        ( db ) => ( {
            ...mergedColumns,
            createdAt: timestamp( 'created_at', { mode: 'string' } ).defaultNow(),
            updatedAt: timestamp(
                'updated_at',
                { mode: 'string' }
            ).defaultNow().$onUpdate( () => new Date().toISOString() ),
            disabledAt: timestamp( 'disabled_at', { mode: 'string' } ),
            deletedAt: timestamp( 'deleted_at', { mode: 'string' } ),
            createdBy: typeid( 'created_by', { type: 'contact' } ).references( () => contactSkeleton.id ),
            active: statusEnum( 'active' ).generatedAlwaysAs( (): SQL => sql`CASE WHEN deleted_at IS NULL AND disabled_at IS NULL THEN 'active'::status ELSE 'inactive'::status END` )
        } ),
        ( table: any ) => {
            const extra = extraConfigs.flatMap( ( cb ) => ( typeof cb === 'function' ? cb( table ) : [] ) )
            return [
                ...extra,
                uniqueIndex( `${name}_id_index` ).on( table.id ),
                index( `${name}_created_at_index` ).on( table.createdAt ),
                index( `${name}_updated_at_index` ).on( table.updatedAt ),
                index( `${name}_disabled_at_index` ).on( table.disabledAt ),
                index( `${name}_deleted_at_index` ).on( table.deletedAt )
            ]
        }
    )
}

export function pgTable<
    TTableName extends string,
    TColumnsKey extends string,
    TColumnsMap extends Record<TColumnsKey, PgColumnBuilder>
> (
    name: TTableName,
    columns: ( columnTypes: AllBuilders ) => TColumnsMap,
    extraConfig?: ( ( self: BuildExtraConfigColumns<TTableName, TColumnsMap, 'pg'> ) => PgTableExtraConfigValue[] ) | undefined
) {
    const result = drizzlePgTable(
        name,
        ( db ) => columns( {
            ...db,
            typeid
        } ),
        extraConfig
    )
    return result
}
