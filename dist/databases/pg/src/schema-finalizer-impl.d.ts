/**
 * SchemaFinalizer implementation for PostgreSQL: builds Drizzle PgTable from merged columns and extra configs.
 * Used by TableColumnRegistry during finalization. Core passes Record<string, unknown>; we cast to Drizzle types.
 * @see packages/core/src/schema/schema-finalizer.ts, table-builder.ts buildTableInternal
 */
import { SchemaFinalizer } from '@eventiva/core';
import { Layer } from 'effect';
export declare const SchemaFinalizerPg: Layer.Layer<SchemaFinalizer, never>;
//# sourceMappingURL=schema-finalizer-impl.d.ts.map