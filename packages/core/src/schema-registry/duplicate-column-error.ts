/**
 * Error when a table column is registered more than once (duplicate key on merge).
 * TableColumnRegistry rejects any registerTableColumns that would add a column name already present for that table.
 * @see docs/learnings/architecture.md, schema/table-column-registry.ts
 */
export interface DuplicateColumnError {
    readonly _tag: 'DuplicateColumnError';
    readonly tableName: string;
    readonly columnName: string;
    readonly extensionId: string;
}

export const DuplicateColumnError = (
    tableName: string,
    columnName: string,
    extensionId: string
): DuplicateColumnError => ({
    _tag: 'DuplicateColumnError',
    tableName,
    columnName,
    extensionId,
});
