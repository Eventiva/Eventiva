import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
export type RelationCallback = (helpers: any, schema: Record<string, any>) => Record<string, any>;
export interface TableRelationsRegistryState {
    readonly pending: Map<string, Array<{
        extensionId: string;
        callback: RelationCallback;
    }>>;
}
/**
 * Registry to collect Drizzle relation callbacks from extensions.
 * During Phase 2 of DB Initialization, these callbacks are executed, and their outputs
 * are merged into a single `relations()` call per table.
 */
export interface TableRelationsRegistry {
    readonly registerRelations: (tableName: string, extensionId: string, callback: RelationCallback) => Effect.Effect<void>;
    readonly getAllCallbacks: () => Effect.Effect<ReadonlyMap<string, ReadonlyArray<RelationCallback>>>;
}
export declare const TableRelationsRegistry: Context.Tag<TableRelationsRegistry, TableRelationsRegistry>;
export declare const TableRelationsRegistryLive: Layer.Layer<TableRelationsRegistry, never, never>;
//# sourceMappingURL=table-relations-registry.d.ts.map