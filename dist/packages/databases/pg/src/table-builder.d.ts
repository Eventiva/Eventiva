import { AnyIndexBuilder, CheckBuilder, ForeignKeyBuilder, PgColumnBuilder, PgPolicy, PrimaryKeyBuilder, UniqueConstraintBuilder } from 'drizzle-orm/pg-core';
import { getPgColumnBuilders } from 'drizzle-orm/pg-core/columns/all';
/**
 * Creates a text object based on the provided value. (Used by drizzle)
 * @param value - The input value to be processed.
 * @param [config] - Optional configuration object.
 * @param config.type - The type of input value, if provided.
 * @returns - A text object derived from the input value.
 */
export declare const typeid: (value?: string, config?: {
    type: string;
}) => import("drizzle-orm/pg-core").PgTextBuilder<[string, ...string[]]>;
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
export declare const status: {
    readonly Inactive: "inactive";
    readonly Active: "active";
};
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
export declare const statusEnum: import("drizzle-orm/pg-core").PgEnum<["inactive", "active"]>;
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
type EnsureRequiredFields<TColumns extends Record<string, PgColumnBuilder>> = Required<Pick<TColumns, RequiredFields>> & TColumns;
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
type ValidateColumns<TColumns extends Record<string, PgColumnBuilder>> = EnsureRequiredFields<ExcludeForbiddenFields<TColumns>>;
export type AllBuilders = {
    typeid: typeof typeid;
} & ReturnType<typeof getPgColumnBuilders>;
export type PgTableExtraConfigValue = AnyIndexBuilder | CheckBuilder | ForeignKeyBuilder | PrimaryKeyBuilder | UniqueConstraintBuilder | PgPolicy;
export type PgTableExtraConfig = Record<string, PgTableExtraConfigValue>;
export declare function testColumns<TTableName extends string, TColumnsKey extends string, TColumnsMap extends Record<TColumnsKey, PgColumnBuilder>>(name: TTableName, db: AllBuilders, columns: (columnTypes: AllBuilders) => ValidateColumns<TColumnsMap>): ValidateColumns<TColumnsMap>;
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
export declare function createTableFinal<TTableName extends string, TColumnsKey extends string, TColumnsMap extends Record<TColumnsKey, PgColumnBuilder>>(name: TTableName, columns: (columnTypes: AllBuilders) => ValidateColumns<TColumnsMap>, extraConfig?: (self: unknown) => PgTableExtraConfigValue[]): import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: TTableName;
    schema: undefined;
    columns: Required<Pick<ExcludeForbiddenFields<TColumnsMap>, "id">> & ExcludeForbiddenFields<TColumnsMap> & {
        createdAt: import("drizzle-orm/pg-core").SetHasDefault<import("drizzle-orm/pg-core").PgTimestampStringBuilder>;
        updatedAt: import("drizzle-orm/pg-core").SetHasDefault<import("drizzle-orm/pg-core").SetHasDefault<import("drizzle-orm/pg-core").PgTimestampStringBuilder>>;
        disabledAt: import("drizzle-orm/pg-core").PgTimestampStringBuilder;
        deletedAt: import("drizzle-orm/pg-core").PgTimestampStringBuilder;
        /**
         * Because this references the users table, we must update the users table manually if adding any new
         * fields to this abstraction.
         */
        createdBy: import("drizzle-orm/pg-core").PgTextBuilder<[string, ...string[]]>;
        active: import("drizzle-orm/pg-core").SetHasGenerated<import("drizzle-orm/pg-core").PgEnumColumnBuilder<["inactive", "active"]>>;
    } extends infer T extends Record<string, import("drizzle-orm/pg-core").AnyPgColumnBuilder> ? { [Key in keyof T]: import("drizzle-orm/pg-core").PgBuildColumn<TTableName_1, T[Key], {
        name: string;
        tableName: TTableName_1;
        dataType: T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["dataType"];
        data: T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["dimensions"] extends 1 | 2 | 5 | 3 | 4 ? T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["dimensions"] extends infer T_1 ? T_1 extends T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["dimensions"] ? T_1 extends 1 ? (T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] extends infer T_2 ? T_2 extends T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] ? T_2 extends {
            $type: infer U;
        } ? U : T_2 extends {
            data: infer D;
        } ? D : unknown : never : never)[] : T_1 extends 2 ? (T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] extends infer T_3 ? T_3 extends T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] ? T_3 extends {
            $type: infer U;
        } ? U : T_3 extends {
            data: infer D;
        } ? D : unknown : never : never)[][] : T_1 extends 3 ? (T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] extends infer T_4 ? T_4 extends T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] ? T_4 extends {
            $type: infer U;
        } ? U : T_4 extends {
            data: infer D;
        } ? D : unknown : never : never)[][][] : T_1 extends 4 ? (T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] extends infer T_5 ? T_5 extends T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] ? T_5 extends {
            $type: infer U;
        } ? U : T_5 extends {
            data: infer D;
        } ? D : unknown : never : never)[][][][] : T_1 extends 5 ? (T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] extends infer T_6 ? T_6 extends T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] ? T_6 extends {
            $type: infer U;
        } ? U : T_6 extends {
            data: infer D;
        } ? D : unknown : never : never)[][][][][] : T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] extends infer T_7 ? T_7 extends T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] ? T_7 extends {
            $type: infer U;
        } ? U : T_7 extends {
            data: infer D;
        } ? D : unknown : never : never : never : never : T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] extends infer T_8 ? T_8 extends T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] ? T_8 extends {
            $type: infer U;
        } ? U : T_8 extends {
            data: infer D;
        } ? D : unknown : never : never;
        driverParam: T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["dimensions"] extends 1 | 2 | 5 | 3 | 4 ? string | (T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["dimensions"] extends infer T_9 ? T_9 extends T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["dimensions"] ? T_9 extends 1 ? T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["driverParam"][] : T_9 extends 2 ? T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["driverParam"][][] : T_9 extends 3 ? T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["driverParam"][][][] : T_9 extends 4 ? T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["driverParam"][][][][] : T_9 extends 5 ? T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["driverParam"][][][][][] : T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["driverParam"] : never : never) : T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["driverParam"];
        notNull: T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["notNull"] extends true ? true : false;
        hasDefault: T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["hasDefault"] extends true ? true : false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] extends infer T_10 ? T_10 extends T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] ? T_10 extends {
            enumValues: infer E extends string[];
        } ? E : undefined : never : never;
        identity: T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["identity"] extends "always" | "byDefault" ? T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["identity"] : undefined;
        generated: T[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["generated"] extends true ? true : undefined;
    }>; } : never;
    dialect: "pg";
}>;
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
export declare function buildTableInternal(name: string, mergedColumns: Record<string, PgColumnBuilder>, extraConfigs: ReadonlyArray<(table: any) => PgTableExtraConfigValue[]>, getTable?: (tableName: string) => unknown): import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: string;
    schema: undefined;
    columns: {
        createdAt: import("drizzle-orm/pg-core").PgBuildColumn<string, import("drizzle-orm/pg-core").SetHasDefault<import("drizzle-orm/pg-core").PgTimestampStringBuilder>, {
            name: string;
            tableName: string;
            dataType: "string timestamp";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updatedAt: import("drizzle-orm/pg-core").PgBuildColumn<string, import("drizzle-orm/pg-core").SetHasDefault<import("drizzle-orm/pg-core").SetHasDefault<import("drizzle-orm/pg-core").PgTimestampStringBuilder>>, {
            name: string;
            tableName: string;
            dataType: "string timestamp";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        disabledAt: import("drizzle-orm/pg-core").PgBuildColumn<string, import("drizzle-orm/pg-core").PgTimestampStringBuilder, {
            name: string;
            tableName: string;
            dataType: "string timestamp";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        deletedAt: import("drizzle-orm/pg-core").PgBuildColumn<string, import("drizzle-orm/pg-core").PgTimestampStringBuilder, {
            name: string;
            tableName: string;
            dataType: "string timestamp";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        createdBy: import("drizzle-orm/pg-core").PgBuildColumn<string, import("drizzle-orm/pg-core").PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: string;
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        active: import("drizzle-orm/pg-core").PgBuildColumn<string, import("drizzle-orm/pg-core").SetHasGenerated<import("drizzle-orm/pg-core").PgEnumColumnBuilder<["inactive", "active"]>>, {
            name: string;
            tableName: string;
            dataType: "string enum";
            data: "inactive" | "active";
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["inactive", "active"];
            identity: undefined;
            generated: true;
        }>;
    };
    dialect: "pg";
}>;
export declare function pgTable<TTableName extends string, TColumnsKey extends string, TColumnsMap extends Record<TColumnsKey, PgColumnBuilder>>(name: TTableName, columns: (columnTypes: AllBuilders) => TColumnsMap, extraConfig?: ((self: unknown) => PgTableExtraConfigValue[]) | undefined): import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: TTableName;
    schema: undefined;
    columns: { [Key in keyof TColumnsMap]: import("drizzle-orm/pg-core").PgBuildColumn<TTableName, TColumnsMap[Key], {
        name: string;
        tableName: TTableName;
        dataType: TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["dataType"];
        data: TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["dimensions"] extends 1 | 2 | 5 | 3 | 4 ? TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["dimensions"] extends infer T ? T extends TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["dimensions"] ? T extends 1 ? (TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] extends infer T_1 ? T_1 extends TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] ? T_1 extends {
            $type: infer U;
        } ? U : T_1 extends {
            data: infer D;
        } ? D : unknown : never : never)[] : T extends 2 ? (TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] extends infer T_2 ? T_2 extends TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] ? T_2 extends {
            $type: infer U;
        } ? U : T_2 extends {
            data: infer D;
        } ? D : unknown : never : never)[][] : T extends 3 ? (TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] extends infer T_3 ? T_3 extends TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] ? T_3 extends {
            $type: infer U;
        } ? U : T_3 extends {
            data: infer D;
        } ? D : unknown : never : never)[][][] : T extends 4 ? (TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] extends infer T_4 ? T_4 extends TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] ? T_4 extends {
            $type: infer U;
        } ? U : T_4 extends {
            data: infer D;
        } ? D : unknown : never : never)[][][][] : T extends 5 ? (TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] extends infer T_5 ? T_5 extends TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] ? T_5 extends {
            $type: infer U;
        } ? U : T_5 extends {
            data: infer D;
        } ? D : unknown : never : never)[][][][][] : TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] extends infer T_6 ? T_6 extends TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] ? T_6 extends {
            $type: infer U;
        } ? U : T_6 extends {
            data: infer D;
        } ? D : unknown : never : never : never : never : TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] extends infer T_7 ? T_7 extends TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] ? T_7 extends {
            $type: infer U;
        } ? U : T_7 extends {
            data: infer D;
        } ? D : unknown : never : never;
        driverParam: TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["dimensions"] extends 1 | 2 | 5 | 3 | 4 ? string | (TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["dimensions"] extends infer T_8 ? T_8 extends TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["dimensions"] ? T_8 extends 1 ? TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["driverParam"][] : T_8 extends 2 ? TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["driverParam"][][] : T_8 extends 3 ? TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["driverParam"][][][] : T_8 extends 4 ? TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["driverParam"][][][][] : T_8 extends 5 ? TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["driverParam"][][][][][] : TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["driverParam"] : never : never) : TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["driverParam"];
        notNull: TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["notNull"] extends true ? true : false;
        hasDefault: TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["hasDefault"] extends true ? true : false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] extends infer T_9 ? T_9 extends TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand] ? T_9 extends {
            enumValues: infer E extends string[];
        } ? E : undefined : never : never;
        identity: TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["identity"] extends "always" | "byDefault" ? TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["identity"] : undefined;
        generated: TColumnsMap[Key][typeof import("drizzle-orm/pg-core").PgColumnBuilderBrand]["generated"] extends true ? true : undefined;
    }>; };
    dialect: "pg";
}>;
export {};
//# sourceMappingURL=table-builder.d.ts.map