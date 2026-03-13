/**
 * Schema registry: table column registration, finalization, and final table store.
 * Used by extensions (via createTable in databases/pg) and by platform startup.
 * @see docs/learnings/architecture.md
 */
export { DuplicateColumnError } from './duplicate-column-error.js';
export { FinalTableStore, FinalTableStoreLive } from './final-table-store.js';
export { type ExtraConfigItem, type MergedColumns, SchemaFinalizer, SchemaFinalizerNoOp, SchemaFinalizerNoOpLayer, } from './schema-finalizer.js';
export { SchemaRegistryConfig, SchemaRegistryConfigLive } from './schema-registry-config.js';
export { TableColumnRegistry, TableColumnRegistryLive, type PendingTableEntry, type TableColumnRegistryState, } from './table-column-registry.js';
export { TableRelationsRegistry, TableRelationsRegistryLive, type RelationCallback, type TableRelationsRegistryState, } from './table-relations-registry.js';
//# sourceMappingURL=index.d.ts.map