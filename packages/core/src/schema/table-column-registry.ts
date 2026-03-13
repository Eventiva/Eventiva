/**
 * TableColumnRegistry: pending table columns (merged across extensions), ready count, and finalization.
 * When all expected extensions have called markReady, finalization runs: SchemaFinalizer builds each table,
 * results are stored in FinalTableStore, and waitUntilFinalized completes.
 * @see docs/learnings/architecture.md
 */
import * as Context from 'effect/Context';
import * as Deferred from 'effect/Deferred';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import * as Ref from 'effect/Ref';
import {
    type DuplicateColumnError,
    DuplicateColumnError as MakeDuplicateColumnError,
} from './duplicate-column-error.js';
import { FinalTableStore } from './final-table-store.js';
import { type ExtraConfigItem, SchemaFinalizer } from './schema-finalizer.js';
import { SchemaRegistryConfig } from './schema-registry-config.js';
import { withSpanAndLog } from '../observability/helpers.js';

/** Pending entry per table: merged columns and list of extraConfig callbacks. */
export interface PendingTableEntry {
    readonly columns: Record<string, unknown>;
    readonly extraConfigs: ReadonlyArray<ExtraConfigItem>;
}

export interface TableColumnRegistryState {
    readonly pending: Map<string, PendingTableEntry>;
    readonly expectedReadyCount: number;
    readonly readyIds: Set<string>;
    readonly finalized: boolean;
}

export interface TableColumnRegistry {
    /** Merge columns for a table. Fails with DuplicateColumnError if any column name already exists. */
    readonly registerTableColumns: (
        tableName: string,
        extensionId: string,
        columns: Record<string, unknown>,
        extraConfig?: ExtraConfigItem
    ) => Effect.Effect<void, DuplicateColumnError>;
    /** Set how many extensions must call markReady before finalization. */
    readonly setExpectedReadyCount: (n: number) => Effect.Effect<void>;
    /** Mark an extension as ready. Idempotent per extensionId. When count matches expected, finalization runs. */
    readonly markReady: (extensionId: string) => Effect.Effect<void>;
    /** Completes when finalization has run (after all markReady calls and buildTable for each table). */
    readonly waitUntilFinalized: () => Effect.Effect<void>;
}

export const TableColumnRegistry = Context.GenericTag<TableColumnRegistry>('@eventiva/core/TableColumnRegistry');

function runFinalization(
    stateRef: Ref.Ref<TableColumnRegistryState>,
    deferred: Deferred.Deferred<void>,
    finalizer: SchemaFinalizer,
    store: FinalTableStore,
    creatorTableName: string
): Effect.Effect<void> {
    return Effect.gen(function* () {
        const state = yield* Ref.get(stateRef);
        if (state.finalized) return;
        yield* Effect.logInfo('Running schema finalization...');
        const tableNames = Array.from(state.pending.keys());
        tableNames.sort((a, b) => {
            if (a === creatorTableName) return -1;
            if (b === creatorTableName) return 1;
            return a.localeCompare(b);
        });
        const builtTables = new Map<string, unknown>();
        const getTable = (name: string) => builtTables.get(name);
        for (const tableName of tableNames) {
            const entry = state.pending.get(tableName)!;
            const table = yield* finalizer.buildTable(tableName, entry.columns, entry.extraConfigs, getTable);
            builtTables.set(tableName, table);
            yield* store.setTable(tableName, table);
        }
        yield* Ref.update(stateRef, (s) => ({
            ...s,
            finalized: true,
        }));
        yield* Deferred.succeed(deferred, undefined);
    }).pipe(withSpanAndLog('runFinalization'));
}

export const TableColumnRegistryLive: Layer.Layer<
    TableColumnRegistry,
    never,
    SchemaFinalizer | FinalTableStore | SchemaRegistryConfig
> = Layer.effect(
    TableColumnRegistry,
    Effect.gen(function* () {
        const stateRef = yield* Ref.make<TableColumnRegistryState>({
            pending: new Map(),
            expectedReadyCount: 0,
            readyIds: new Set(),
            finalized: false,
        });
        const deferred = yield* Deferred.make<void>();
        const finalizer = yield* SchemaFinalizer;
        const store = yield* FinalTableStore;
        const schemaConfig = yield* SchemaRegistryConfig;
        const creatorTableName = schemaConfig.creatorTableName ?? 'contact';

        const registry: TableColumnRegistry = {
            registerTableColumns: (tableName, extensionId, columns, extraConfig) =>
                Effect.gen(function* () {
                    yield* Effect.logInfo(`Registering columns for table ${tableName} from extension ${extensionId}`);
                    const state = yield* Ref.get(stateRef);
                    if (state.finalized) {
                        yield* Effect.die(new Error('TableColumnRegistry: cannot register after finalization'));
                    }
                    const existing = state.pending.get(tableName);
                    for (const key of Object.keys(columns)) {
                        if (existing?.columns && key in existing.columns) {
                            return yield* Effect.fail(MakeDuplicateColumnError(tableName, key, extensionId));
                        }
                    }
                    const mergedColumns = { ...(existing?.columns ?? {}), ...columns };
                    const extraConfigs =
                        extraConfig != null
                            ? [...(existing?.extraConfigs ?? []), extraConfig]
                            : (existing?.extraConfigs ?? []);
                    const nextPending = new Map(state.pending);
                    nextPending.set(tableName, { columns: mergedColumns, extraConfigs });
                    yield* Ref.set(stateRef, { ...state, pending: nextPending });
                }).pipe(withSpanAndLog('registerTableColumns', { attributes: { tableName, extensionId } })),

            setExpectedReadyCount: (n) =>
                Effect.gen(function* () {
                    yield* Effect.logInfo(`Setting expected ready count to ${n}`);
                    yield* Ref.update(stateRef, (s) => ({ ...s, expectedReadyCount: n }));
                    if (n === 0) {
                        const state = yield* Ref.get(stateRef);
                        if (!state.finalized) {
                            yield* runFinalization(stateRef, deferred, finalizer, store, creatorTableName);
                        }
                    }
                }).pipe(withSpanAndLog('setExpectedReadyCount', { attributes: { count: n } })),

            markReady: (extensionId) =>
                Effect.gen(function* () {
                    yield* Effect.logInfo(`Extension ${extensionId} marked as ready`);
                    const state = yield* Ref.get(stateRef);
                    if (state.finalized) return;
                    const nextReadyIds = new Set(state.readyIds);
                    nextReadyIds.add(extensionId);
                    yield* Ref.set(stateRef, { ...state, readyIds: nextReadyIds });
                    const nextState = yield* Ref.get(stateRef);
                    if (nextState.readyIds.size === nextState.expectedReadyCount && !nextState.finalized) {
                        yield* runFinalization(stateRef, deferred, finalizer, store, creatorTableName);
                    }
                }).pipe(withSpanAndLog('markReady', { attributes: { extensionId } })),

            waitUntilFinalized: () => Deferred.await(deferred).pipe(withSpanAndLog('waitUntilFinalized')),
        };
        return registry;
    })
);
