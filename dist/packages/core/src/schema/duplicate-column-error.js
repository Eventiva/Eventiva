export const DuplicateColumnError = (tableName, columnName, extensionId) => ({
    _tag: "DuplicateColumnError",
    tableName,
    columnName,
    extensionId
});
