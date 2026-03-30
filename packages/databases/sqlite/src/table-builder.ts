import { SQL, sql } from 'drizzle-orm';
import {
    CheckBuilder,
    ForeignKeyBuilder,
    IndexBuilder,
    index,
    PrimaryKeyBuilder,
    SQLiteColumnBuilder,
    sqliteTable as drizzleSqliteTable,
    text,
    UniqueConstraintBuilder,
    uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { getSQLiteColumnBuilders } from 'drizzle-orm/sqlite-core/columns/all';
import { typeid as typeidBuilder } from './typeid.js';

const createdByPlaceholder = drizzleSqliteTable('_created_by_placeholder', { id: text('id') });

export const status = {
    Inactive: 'inactive',
    Active: 'active',
} as const;

export type Status = (typeof status)[keyof typeof status];

type RequiredFields = 'id';

type ForbiddenFields = 'createdAt' | 'updatedAt' | 'disabledAt' | 'deletedAt' | 'createdBy' | 'active';

type EnsureRequiredFields<TColumns extends Record<string, SQLiteColumnBuilder>> = Required<Pick<TColumns, RequiredFields>> &
    TColumns;

type ExcludeForbiddenFields<TColumns extends Record<string, SQLiteColumnBuilder>> = {
    [Field in keyof TColumns]: Field extends ForbiddenFields ? never : TColumns[Field];
};

type ValidateColumns<TColumns extends Record<string, SQLiteColumnBuilder>> = EnsureRequiredFields<
    ExcludeForbiddenFields<TColumns>
>;

export type AllBuilders = {
    typeid: typeof typeidBuilder;
} & ReturnType<typeof getSQLiteColumnBuilders>;

export type SQLiteTableExtraConfigValue =
    | IndexBuilder
    | CheckBuilder
    | ForeignKeyBuilder
    | PrimaryKeyBuilder
    | UniqueConstraintBuilder;

export function testColumns<
    TTableName extends string,
    TColumnsKey extends string,
    TColumnsMap extends Record<TColumnsKey, SQLiteColumnBuilder>,
>(name: TTableName, db: AllBuilders, columns: (columnTypes: AllBuilders) => ValidateColumns<TColumnsMap>) {
    const table = columns({
        ...db,
        typeid: typeidBuilder,
    });
    if (!('id' in table)) {
        throw new Error(
            `Table definition for ${name} is incorrect. The column definition must include an "id"` +
                ' field. Please use the importable "typeid" function.'
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
 * SQLite table with the same standard metadata fields and indices as `createTableFinal` in `@eventiva/databases.pg`,
 * using text timestamps and a generated `active` status (no PostgreSQL enums).
 */
export function createTableFinal<
    TTableName extends string,
    TColumnsKey extends string,
    TColumnsMap extends Record<TColumnsKey, SQLiteColumnBuilder>,
>(
    name: TTableName,
    columns: (columnTypes: AllBuilders) => ValidateColumns<TColumnsMap>,
    extraConfig?: (self: unknown) => SQLiteTableExtraConfigValue[]
) {
    return drizzleSqliteTable(
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
            createdAt: text('created_at').default(sql`(datetime('now'))`),
            updatedAt: text('updated_at').default(sql`(datetime('now'))`),
            disabledAt: text('disabled_at'),
            deletedAt: text('deleted_at'),
            createdBy: text('created_by').references(() => createdByPlaceholder.id),
            active: text('active').generatedAlwaysAs(
                (): SQL =>
                    sql`(CASE WHEN deleted_at IS NULL AND disabled_at IS NULL THEN 'active' ELSE 'inactive' END)`
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
}

export function buildTableInternal(
    name: string,
    mergedColumns: Record<string, SQLiteColumnBuilder>,
    extraConfigs: ReadonlyArray<(table: any) => SQLiteTableExtraConfigValue[]>,
    getTable?: (tableName: string) => unknown,
    creatorTableName: string = 'contact'
) {
    let selfTable!: ReturnType<typeof drizzleSqliteTable>;
    const createdByRef = (): typeof createdByPlaceholder.id => {
        if (name === creatorTableName) {
            return selfTable.id;
        }
        const creator = getTable?.(creatorTableName) as { id: typeof createdByPlaceholder.id } | undefined;
        return creator?.id ?? createdByPlaceholder.id;
    };
    selfTable = drizzleSqliteTable(
        name,
        (db) => ({
            ...mergedColumns,
            createdAt: text('created_at').default(sql`(datetime('now'))`),
            updatedAt: text('updated_at').default(sql`(datetime('now'))`),
            disabledAt: text('disabled_at'),
            deletedAt: text('deleted_at'),
            createdBy: text('created_by').references(createdByRef),
            active: text('active').generatedAlwaysAs(
                (): SQL =>
                    sql`(CASE WHEN deleted_at IS NULL AND disabled_at IS NULL THEN 'active' ELSE 'inactive' END)`
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
    return selfTable;
}

export function sqliteTable<
    TTableName extends string,
    TColumnsKey extends string,
    TColumnsMap extends Record<TColumnsKey, SQLiteColumnBuilder>,
>(
    name: TTableName,
    columns: (columnTypes: AllBuilders) => TColumnsMap,
    extraConfig?: ((self: unknown) => SQLiteTableExtraConfigValue[]) | undefined
) {
    return drizzleSqliteTable(
        name,
        (db) =>
            columns({
                ...db,
                typeid: typeidBuilder,
            }),
        extraConfig
    );
}
