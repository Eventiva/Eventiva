/*
 * File: drizzle-to-effect.ts
 * Last Modified: 11/02/2025, 14:04
 *
 * Contributing: Please read through our documentation. These can be found at ~/README.adoc or https://github.com/Encircle-Marketing/v3-crm/blob/main/README.adoc
 *
 * Copyright (c) 2025. Encircle Marketing Ltd. All Rights Reserved
 * @license
 * @preserve
 */

import * as Drizzle from 'drizzle-orm'
import * as DrizzleMysql from 'drizzle-orm/mysql-core'
import * as DrizzlePg from 'drizzle-orm/pg-core'
import * as DrizzleSqlite from 'drizzle-orm/sqlite-core'
import * as Schema from 'effect/Schema'

/**
 * A utility type that extracts the columns from a given table type.
 * @param TTable - A type extending from Drizzle.Table.
 *
 * The resulting type will be a record where the keys are column names as strings,
 * and the values are the corresponding Drizzle.Column types.
 *
 * If the provided TTable type does not have a valid '_columns' property,
 * the type will resolve to 'never'.
 *
 * This type is useful for static type checking and inferring the structure
 * of table columns in a type-safe manner.
 */
export type Columns<TTable extends Drizzle.Table> =
    TTable['_']['columns'] extends infer TColumns extends Record<
            string,
            Drizzle.Column<any>
        >
        ? TColumns
        : never;

/**
 * A TypeScript type alias that extracts the `From` property from a `Schema.PropertySignature`.
 * This utility type is useful for working with schema definitions where the source type is embedded
 * within the `PropertySignature` interface.
 * @template T - The input type, which should extend `Schema.PropertySignature`.
 * @returns The `From` type if `T` matches `Schema.PropertySignature`, otherwise it evaluates to `never`.
 */
export type PropertySignatureEncoded<T> = T extends Schema.PropertySignature<
        any,
        any,
        any,
        any,
        infer From,
        any,
        any
    >
    ? From
    : never;

/**
 * The PropertySignatureType is a conditional type that extracts the type of a property
 * signature from a given Schema.PropertySignature.
 *
 * This type takes a generic parameter T and checks if T extends Schema.PropertySignature
 * with any type arguments. If the check passes, it extracts and returns the inferred type To.
 * If the check fails, it returns never.
 * @param T - The input type to be evaluated.
 */
export type PropertySignatureType<T> = T extends Schema.PropertySignature<
        any,
        infer To,
        any,
        any,
        any,
        any,
        any
    >
    ? To
    : never;

/**
 * `InsertRefineArg` is a type that represents arguments passed to the `insert` and `refine` methods. It can either be a `Schema.Schema` object or a function that takes an object with properties defined by `InsertColumnPropertySignatures` of the given `TTable` and returns a `Schema.Schema`.
 * @param TTable Represents the table for which the insert or refine operation is being performed.
 * @param Col Represents the column in the table that is being operated on.
 */
export type InsertRefineArg<
    TTable extends Drizzle.Table,
    Col extends keyof Columns<TTable>,
> =
    | Schema.Schema<any, any, any>
    | ( ( s: {
    [S in keyof InsertColumnPropertySignatures<TTable>]: InsertColumnPropertySignatures<TTable>[S] extends Schema.PropertySignature<
            any,
            any,
            any,
            any,
            any,
            any,
            any
        >
        ? Schema.Schema<
            Exclude<
                PropertySignatureEncoded<
                    InsertColumnPropertySignatures<TTable>[S]
                >,
                undefined | null
            >,
            Exclude<
                PropertySignatureType<InsertColumnPropertySignatures<TTable>[S]>,
                undefined | null
            >
        >
        : InsertColumnPropertySignatures<TTable>[S];
} ) => InsertColumnPropertySignatures<TTable>[Col] extends Schema.PropertySignature<
        any,
        any,
        any,
        any,
        any,
        any,
        any
    >
    ? Schema.Schema<
        Exclude<
            PropertySignatureEncoded<
                InsertColumnPropertySignatures<TTable>[Col]
            >,
            undefined | null
        >,
        any
    >
    : Schema.Schema<
        Exclude<
            Schema.Schema.Encoded<InsertColumnPropertySignatures<TTable>[Col]>,
            undefined | null
        >,
        any
    > );

/**
 * Defines a type, `SelectRefineArg`, that represents a schema or a function which selectively refines the column properties of a table.
 *
 * The type `SelectRefineArg` takes two generic parameters:
 * - `TTable`: The type representing the table.
 * - `Col`: The type of the column key based on the table's column properties.
 *
 * This type can either be:
 * 1. A `Schema.Schema` type.
 * 2. A function that:
 *    - Takes an object where each property key is mapped to either a `Schema` or the signature of
 *      an insertable column property based on `TTable`.
 *    - Returns a `Schema` for the specified column (`Col`) which excludes `undefined` and `null`
 *      from both encoded and type values.
 */
export type SelectRefineArg<
    TTable extends Drizzle.Table,
    Col extends keyof Columns<TTable>,
> =
    | Schema.Schema<any, any, any>
    | ( ( s: {
    [S in keyof InsertColumnPropertySignatures<TTable>]: InsertColumnPropertySignatures<TTable>[S] extends Schema.PropertySignature<
            any,
            any,
            any,
            any,
            any,
            any,
            any
        >
        ? Schema.Schema<
            Exclude<
                PropertySignatureEncoded<
                    InsertColumnPropertySignatures<TTable>[S]
                >,
                undefined | null
            >,
            Exclude<
                PropertySignatureType<InsertColumnPropertySignatures<TTable>[S]>,
                undefined | null
            >
        >
        : InsertColumnPropertySignatures<TTable>[S];
} ) => InsertColumnPropertySignatures<TTable>[Col] extends Schema.PropertySignature<
        any,
        any,
        any,
        any,
        any,
        any,
        any
    >
    ? Schema.Schema<
        Exclude<
            PropertySignatureEncoded<
                InsertColumnPropertySignatures<TTable>[Col]
            >,
            undefined | null
        >,
        any
    >
    : Schema.Schema<
        Exclude<
            Schema.Schema.Encoded<InsertColumnPropertySignatures<TTable>[Col]>,
            undefined | null
        >,
        any
    > );

/**
 * The InsertRefine type is a utility type that allows for the refinement of insert operations on a specified table.
 * This type maps over the columns of a given table (denoted by `TTable`) and provides a means to supply arguments (`InsertRefineArg`)
 * for each column. This can be particularly useful for specifying default values, data transformations, or validation logic
 * on a per-column basis during insert operations.
 * @template TTable - Extends Drizzle.Table, represents the table for which the insert refinement rules are defined.
 */
export type InsertRefine<TTable extends Drizzle.Table> = {
    [K in keyof Columns<TTable>]?: InsertRefineArg<TTable, K>;
};

/**
 * The SelectRefine type is a utility type that allows for the refinement of insert operations on a specified table.
 * This type maps over the columns of a given table (denoted by `TTable`) and provides a means to supply arguments
 * (`SelectRefineArg`)
 * for each column. This can be particularly useful for specifying default values, data transformations, or validation logic
 * on a per-column basis during insert operations.
 * @template TTable - Extends Drizzle.Table, represents the table for which the insert refinement rules are defined.
 */
export type SelectRefine<TTable extends Drizzle.Table> = {
    [K in keyof Columns<TTable>]?: SelectRefineArg<TTable, K>;
};

/**
 * literalSchema is a union type schema that encompasses multiple basic data types.
 * It allows for validation against the following types:
 * - String: Any sequence of characters.
 * - Number: Any numerical value, including integers and floats.
 * - Boolean: A true or false value.
 * - Null: A null value, representing the absence of any value.
 *
 * This schema is useful for scenarios where data can be of multiple types
 * and flexibility in data type acceptance is required.
 */
export const literalSchema = Schema.Union(
    Schema.String,
    Schema.Number,
    Schema.Boolean,
    Schema.Null
)

/**
 * A type that represents any valid JSON value.
 *
 * JsonType can be:
 * - A string
 * - A number
 * - A boolean
 * - An object with string keys and values of type JsonType
 * - An array of JsonType elements
 * - A readonly array of JsonType elements
 * - null
 */
export type JsonType =
    | string
    | number
    | boolean
    | { [ key: string ]: JsonType; }
    | JsonType[]
    | readonly JsonType[]
    | null;

/**
 * Json variable defines a recursive JSON schema utilizing the Schema framework.
 * The schema supports the following JSON types:
 * - Literal values: typically primitive data types such as string, number, boolean, or null.
 * - Arrays containing elements of types defined by the same JSON schema.
 * - Objects described as records with string keys and values conforming to the same JSON schema.
 *
 * Json is constructed using a self-referential approach to accommodate nested structures,
 * allowing for complex and deeply nested JSON documents.
 */
export const Json = Schema.suspend(
    (): Schema.Schema<JsonType> =>
        Schema.Union(
            literalSchema,
            Schema.Array( Json ),
            Schema.Record( { key: Schema.String, value: Json } )
        )
).annotations( { identifier: 'Json' } )

/**
 * GetSchemaForType is a utility type that takes a column of type Drizzle.Column and
 * determines the corresponding Schema.Schema type based on the column's dataType.
 *
 * The mapping of TColumn['_']['dataType'] to Schema.Schema types is as follows:
 * - 'custom' maps to Schema.Schema<any>
 * - 'json' maps to Schema.Schema<JsonType>
 * - Columns with enumValues property map to Schema.Schema<string> if enumValues is a tuple of strings,
 * otherwise they map to Schema.Schema<TColumn['enumValues'][number]>
 * - 'array' maps to Schema.Schema<null | readonly baseColumn['data'][]>
 * - 'bigint' maps to Schema.Schema<bigint>
 * - 'number' maps to Schema.Schema<number>
 * - 'string' maps to Schema.Schema<string>
 * - 'boolean' maps to Schema.Schema<boolean>
 * - 'date' maps to Schema.Schema<Date>
 * - Any other dataType defaults to Schema.Schema<any>
 *
 * The primary purpose of this type is to facilitate type-safe schema generation based on column definitions.
 * @param TColumn - A type that extends Drizzle.Column
 */
export type GetSchemaForType<TColumn extends Drizzle.Column> =
    TColumn['_']['dataType'] extends infer TDataType
        ? TDataType extends 'custom'
            ? Schema.Schema<any>
            : TDataType extends 'json'
                ? Schema.Schema<JsonType>
                : TColumn extends { enumValues: [ string, ...string[] ] }
                    ? Drizzle.Equal<TColumn['enumValues'], [ string, ...string[] ]> extends true
                        ? Schema.Schema<string>
                        : Schema.Schema<TColumn['enumValues'][number]>
                    : TDataType extends 'array'
                        ? Schema.Schema<
                            | null
                            | readonly Drizzle.Assume<
                            TColumn['_'],
                            { baseColumn: Drizzle.Column }
                        >['baseColumn']['_']['data'][]
                        >
                        : TDataType extends 'bigint'
                            ? Schema.Schema<bigint>
                            : TDataType extends 'number'
                                ? Schema.Schema<number>
                                : TDataType extends 'string'
                                    ? Schema.Schema<string>
                                    : TDataType extends 'boolean'
                                        ? Schema.Schema<boolean>
                                        : TDataType extends 'date'
                                            ? Schema.Union<[ typeof Schema.DateFromString, typeof Schema.ValidDateFromSelf ]>
                                            : Schema.Schema<any>
        : never;

/**
 * This type maps a Drizzle.Column to a specific property signature required
 * for schema validation based on the characteristics of the column such as
 * nullability and default value presence.
 *
 * If the column is not nullable, it generates a Schema.PropertySignature with an optional
 * Type and Encoded property that can either be undefined or null.
 *
 * If the column has a default value, it generates a Schema.PropertySignature with an optional
 * Type and Encoded property that can either be undefined.
 *
 * Otherwise, it directly uses GetSchemaForType<TColumn> which provides the appropriate
 * schema based on the column type.
 *
 * TColumn - The column type to be mapped.
 */
export type MapInsertColumnToPropertySignature<TColumn extends Drizzle.Column> =
    TColumn['_']['notNull'] extends false
        ? Schema.PropertySignature<
            '?:',
            Schema.Schema.Type<GetSchemaForType<TColumn>> | undefined | null,
            TColumn['_']['name'],
            '?:',
            Schema.Schema.Encoded<GetSchemaForType<TColumn>> | undefined | null,
            false,
            never
        >
        : TColumn['_']['hasDefault'] extends true
            ? Schema.PropertySignature<
                '?:',
                Schema.Schema.Type<GetSchemaForType<TColumn>> | undefined,
                TColumn['_']['name'],
                '?:',
                Schema.Schema.Encoded<GetSchemaForType<TColumn>> | undefined,
                true,
                never
            >
            : GetSchemaForType<TColumn>;

/**
 * MapSelectColumnToPropertySignature maps a given database column type
 * signature to a property type in a schema. The mapping is determined
 * based on the nullability of the column. If the column is nullable,
 * the resulting property in the schema allows null values. Otherwise,
 * it strictly adheres to the column type.
 * @param TColumn - The type of the database column, extending Drizzle.Column.
 */
export type MapSelectColumnToPropertySignature<TColumn extends Drizzle.Column> =
    TColumn['_']['notNull'] extends false
        ? Schema.Schema<Schema.Schema.Type<GetSchemaForType<TColumn>> | null>
        : GetSchemaForType<TColumn>;


/**
 * Represents a type transformation utility that maps the properties
 * of columns from a given table to their respective property signatures.
 * @param TTable - The type of the table which extends from Drizzle.Table.
 * @returns A type whose keys are the same as the columns of the table and values
 * are the corresponding mapped property signatures.
 */
export type InsertColumnPropertySignatures<TTable extends Drizzle.Table> = {
    [K in keyof Columns<TTable>]: MapInsertColumnToPropertySignature<
        Columns<TTable>[K]
    >;
};
/**
 * Represents a type transformation utility that maps the properties
 * of columns from a given table to their respective property signatures.
 * @param TTable - The type of the table which extends from Drizzle.Table.
 * @returns A type whose keys are the same as the columns of the table and values
 * are the corresponding mapped property signatures.
 */
export type SelectColumnPropertySignatures<TTable extends Drizzle.Table> = {
    [K in keyof Columns<TTable>]: MapSelectColumnToPropertySignature<
        Columns<TTable>[K]
    >;
};

/**
 * A utility type that allows replacing the type of a property signature within a schema.
 *
 * This type conditionally maps over a given schema property signature `S` and replaces its
 * type with `ReplaceWith`, while preserving all other attributes of the property signature.
 * @template S - The source property signature type.
 * @template ReplaceWith - The new type to replace in the property signature.
 */
export type PropertySignatureReplaceType<S, ReplaceWith> =
    S extends Schema.PropertySignature<
            infer TokenType,
            any,
            infer Name,
            infer TokenEncoded,
            infer Encoded,
            infer HasDefault,
            infer R
        >
        ? Schema.PropertySignature<
            TokenType,
            ReplaceWith,
            Name,
            TokenEncoded,
            Encoded,
            HasDefault,
            R
        >
        : never;

/**
 * The `CarryOverNull` type allows you to carry over the `null` type from one type (`From`) to another (`To`).
 *
 * If the `From` type includes `null`, then `CarryOverNull` ensures that `null` is also included in the `To` type.
 * If the `From` type does not include `null`, then `To` type remains unchanged.
 * @param From - The original type which may or may not include `null`.
 * @param To - The target type to which `null` is conditionally added based on the `From` type.
 */
export type CarryOverNull<From, To> = null extends From
    ? To | null
    : To;
/**
 * `CarryOverUndefined` is a utility type that conditions the inclusion of
 * `undefined` in the resulting type based on the presence of `undefined` in the
 * `From` type.
 *
 * If `From` type includes `undefined`, the `To` type will be combined with
 * `undefined`. Otherwise, the `To` type will remain as is.
 *
 * This can be useful for preserving the optionality of a type property when
 * transforming types.
 * @template From - The original type that may or may not include `undefined`.
 * @template To - The type to be conditioned with `undefined`.
 */
export type CarryOverUndefined<From, To> = undefined extends From
    ? To | undefined
    : To;

/**
 * The `CarryOverOptionality` type is a utility type that ensures the optionality (null or undefined)
 * properties from type `From` are carried over to type `To`. Specifically, it extends `CarryOverNull`
 * and `CarryOverUndefined` types to propagate null and undefined optional properties respectively.
 * @template From - The source type from which optionality is derived.
 * @template To - The target type to which optionality is applied.
 */
export type CarryOverOptionality<From, To> = CarryOverNull<
    From,
    CarryOverUndefined<From, To>
>;

/**
 * Type utility for constructing an insert schema for a table, with optional refinement.
 * @template TTable - The Drizzle table for which the insert schema is being built.
 * @template TRefine - An optional refinement object that allows customizing or overriding the inferred schema.
 *
 * This type creates a schema (`Schema.Struct`) that describes the structure of data that can be inserted into the given table.
 * It combines the base insert column property signatures with any custom refinements provided via the `TRefine` parameter.
 * Each key in `TRefine` must either be a schema (`Schema.Schema`), or a function returning a schema.
 */
export type BuildInsertSchema<
    TTable extends Drizzle.Table,
    TRefine extends InsertRefine<TTable> | {} = {},
> = Schema.Struct<
    InsertColumnPropertySignatures<TTable> & {
    [K in keyof TRefine &
        string]: InsertColumnPropertySignatures<TTable>[K] extends Schema.PropertySignature<
            any,
            any,
            any,
            any,
            any,
            any
        >
        ? TRefine[K] extends Schema.Schema<any, any, any>
            ? Schema.Schema<
                CarryOverOptionality<
                    PropertySignatureType<InsertColumnPropertySignatures<TTable>[K]>,
                    Schema.Schema.Type<TRefine[K]>
                >
            >
            : TRefine[K] extends ( ...a: any[] ) => any
                ? PropertySignatureReplaceType<
                    InsertColumnPropertySignatures<TTable>[K],
                    CarryOverOptionality<
                        PropertySignatureType<InsertColumnPropertySignatures<TTable>[K]>,
                        Schema.Schema.Type<ReturnType<TRefine[K]>>
                    >
                >
                : never
        : TRefine[K];
}
>;

/**
 * `BuildSelectSchema` is a TypeScript utility type that constructs a schema
 * for selected columns of a table in the Drizzle ORM. It optionally refines
 * the selected columns with additional specifications provided in the `TRefine`
 * parameter.
 * @param TTable - Type extending `Drizzle.Table`, representing the table schema.
 * @param TRefine - Optional type that extends `InsertRefine<TTable>` or an empty object.
 *
 * The resulting schema merges properties from `SelectColumnPropertySignatures<TTable>`
 * with any refinements applied in `TRefine`.
 *
 * - If `TRefine[K]` is a Schema, it replaces the type while carrying over the original optionality.
 * - If `TRefine[K]` is a function, it applies the function's return type to replace the property type.
 * - Otherwise, it takes the type defined in `TRefine`.
 */
export type BuildSelectSchema<
    TTable extends Drizzle.Table,
    TRefine extends InsertRefine<TTable> | {} = {},
> = Schema.Struct<
    {
        [K in keyof SelectColumnPropertySignatures<TTable>]: SelectColumnPropertySignatures<TTable>[K];
    } & {
    [K in keyof TRefine &
        string]: SelectColumnPropertySignatures<TTable>[K] extends Schema.PropertySignature<
            any,
            any,
            any,
            any,
            any,
            any
        >
        ? TRefine[K] extends Schema.Schema<any, any, any>
            ? Schema.Schema<
                CarryOverOptionality<
                    PropertySignatureType<SelectColumnPropertySignatures<TTable>[K]>,
                    Schema.Schema.Type<TRefine[K]>
                >
            >
            : TRefine[K] extends ( ...a: any[] ) => any
                ? PropertySignatureReplaceType<
                    SelectColumnPropertySignatures<TTable>[K],
                    CarryOverOptionality<
                        PropertySignatureType<SelectColumnPropertySignatures<TTable>[K]>,
                        Schema.Schema.Type<ReturnType<TRefine[K]>>
                    >
                >
                : never
        : TRefine[K];
}
>;

/**
 * Creates an insert schema for a given table with optional refinement.
 * @param table The table for which the insert schema is to be created.
 * @param refine An optional refinement object that allows specifying custom insert logic for specific columns.
 * @returns A schema object representing the insert schema for the given table.
 */
export function createInsertSchema<
    TTable extends Drizzle.Table,
    TRefine extends InsertRefine<TTable>,
> (
    table: TTable,
    refine?: {
        [K in keyof TRefine]: K extends keyof TTable['_']['columns']
            ? TRefine[K]
            : Drizzle.DrizzleTypeError<`Column '${ K &
                string }' does not exist in table '${ TTable['_']['name'] }'`>;
    }
): BuildInsertSchema<
    TTable,
    Drizzle.Equal<TRefine, InsertRefine<TTable>> extends true
        ? {}
        : TRefine
> {
    const columns = Drizzle.getTableColumns( table )
    const columnEntries = Object.entries( columns )

    let schemaEntries = Object.fromEntries(
        columnEntries.map( ( [ name, column ] ) => {
            return [ name, mapColumnToSchema( column ) ]
        } )
    )

    if ( refine ) {
        schemaEntries = Object.assign(
            schemaEntries,
            Object.fromEntries(
                Object.entries( refine ).map( ( [ name, refineColumn ] ) => {
                    return [
                        name,
                        typeof refineColumn === 'function' &&
                        !( Schema.isSchema( refineColumn ) )
                            ? refineColumn( schemaEntries as any )
                            : refineColumn
                    ]
                } )
            )
        )
    }

    for ( const [ name, column ] of columnEntries ) {
        if ( !column.notNull ) {
            schemaEntries[ name ] = Schema.optional(
                Schema.NullOr(
                    schemaEntries[ name ]!
                )
            ) as any
        } else if ( column.hasDefault ) {
            schemaEntries[ name ] = Schema.optional( schemaEntries[ name ]! ) as any
        }
    }

    return Schema.Struct( schemaEntries ) as any
}

/**
 * Creates a select schema for a given table with optional refinements.
 * @param table - The table for which the select schema is to be created.
 * @param refine - Optional refinement object, where keys should match column names in the table.
 *                 Provides a way to customize or refine the schema for specific columns.
 * @returns A structured schema constructed based on the table and the optional refinements.
 */
export function createSelectSchema<
    TTable extends Drizzle.Table,
    TRefine extends SelectRefine<TTable>,
> (
    table: TTable,
    refine?: {
        [K in keyof TRefine]: K extends keyof TTable['_']['columns']
            ? TRefine[K]
            : Drizzle.DrizzleTypeError<`Column '${ K &
                string }' does not exist in table '${ TTable['_']['name'] }'`>;
    }
): BuildSelectSchema<
    TTable,
    Drizzle.Equal<TRefine, SelectRefine<TTable>> extends true
        ? {}
        : TRefine
> {
    const columns = Drizzle.getTableColumns( table )
    const columnEntries = Object.entries( columns )

    let schemaEntries = Object.fromEntries(
        columnEntries.map( ( [ name, column ] ) => {
            return [ name, mapColumnToSchema( column ) ]
        } )
    )

    if ( refine ) {
        schemaEntries = Object.assign(
            schemaEntries,
            Object.fromEntries(
                Object.entries( refine ).map( ( [ name, refineColumn ] ) => {
                    return [
                        name,
                        typeof refineColumn === 'function' &&
                        !( Schema.isSchema( refineColumn ) )
                            ? refineColumn( schemaEntries as any )
                            : refineColumn
                    ]
                } )
            )
        )
    }

    for ( const [ name, column ] of columnEntries ) {
        if ( !column.notNull ) {
            schemaEntries[ name ] = Schema.NullOr( schemaEntries[ name ]! )
        }
    }

    return Schema.Struct( schemaEntries ) as any
}

/**
 * Maps a given database column to the corresponding schema type.
 * @param column The database column to be mapped. This parameter is of type `Drizzle.Column`.
 * @returns The corresponding schema type, represented as `Schema.Schema<any, any>`.
 */
export function mapColumnToSchema ( column: Drizzle.Column ): Schema.Schema<any, any> {
    let type: Schema.Schema<any, any> | undefined

    if ( isWithEnum( column ) ) {
        type = column.enumValues.length
            ? Schema.Literal( ...column.enumValues )
            : Schema.String
    }

    if ( !type ) {
        const [ baseType, constraint ] = column.dataType.split( ' ' )

        if ( Drizzle.is( column, DrizzlePg.PgUUID ) || constraint === 'uuid' ) {
            type = Schema.UUID
        } else if ( baseType === 'custom' ) {
            type = Schema.Any
        } else if ( constraint === 'json' ) {
            type = Json
        } else if ( baseType === 'array' ) {
            if ( constraint === 'vector' || constraint === 'halfvector' ) {
                type = Schema.Array( Schema.Number )
            } else {
                type = Schema.Array( Schema.Any )
            }
        } else if ( baseType === 'number' ) {
            type = Schema.Union( Schema.NumberFromString, Schema.Number )
        } else if ( baseType === 'bigint' ) {
            type = Schema.BigIntFromSelf
        } else if ( baseType === 'boolean' ) {
            type = Schema.Boolean
        } else if ( baseType === 'object' && constraint === 'date' ) {
            type = Schema.Date
        } else if ( baseType === 'string' ) {
            let sType = Schema.String

            if (
                ( Drizzle.is( column, DrizzlePg.PgChar ) ||
                    Drizzle.is( column, DrizzlePg.PgVarchar ) ||
                    Drizzle.is( column, DrizzleMysql.MySqlVarChar ) ||
                    Drizzle.is( column, DrizzleMysql.MySqlVarBinary ) ||
                    Drizzle.is( column, DrizzleMysql.MySqlChar ) ||
                    Drizzle.is( column, DrizzleSqlite.SQLiteText ) ) &&
                typeof column.length === 'number'
            ) {
                sType = sType.pipe( Schema.maxLength( column.length ) )
            }

            type = sType
        }
    }

    if ( !type ) {
        type = Schema.Any
    }

    if ( 'dimensions' in column && typeof column.dimensions === 'number' && column.dimensions > 0 && !column.dataType.startsWith( 'array' ) ) {
        for (let i = 0; i < column.dimensions; i++) {
            type = Schema.Array(type)
        }
    }

    return type
}

/**
 * Checks if a given column is an enumeration type by verifying the presence of
 * the `enumValues` property and ensuring it is a non-empty array.
 * @param column The column to check for enumeration values.
 * @returns A boolean indicating whether the column is an enumeration type.
 */
export function isWithEnum (
    column: Drizzle.Column
): column is typeof column & { enumValues: [ string, ...string[] ] } {
    return (
        'enumValues' in column &&
        Array.isArray( column.enumValues ) &&
        column.enumValues.length > 0
    )
}
