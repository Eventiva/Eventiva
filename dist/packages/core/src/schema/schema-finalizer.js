/**
 * SchemaFinalizer: builds a single table from merged columns and extra configs.
 * Implemented by @eventiva/databases.pg; core only defines the interface.
 * Used by TableColumnRegistry during finalization to produce the final PgTable per table name.
 * @see docs/learnings/architecture.md, schema/table-column-registry.ts
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
export const SchemaFinalizer = Context.GenericTag("@eventiva/core/SchemaFinalizer");
/** No-op implementation when not using a DB with schema (e.g. in-memory). FinalTableStore gets placeholder values. */
export const SchemaFinalizerNoOp = {
    buildTable: () => Effect.succeed(Object.create(null))
};
export const SchemaFinalizerNoOpLayer = Layer.succeed(SchemaFinalizer, SchemaFinalizerNoOp);
