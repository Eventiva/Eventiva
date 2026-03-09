import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Ref from "effect/Ref";
import { withSpanAndLog } from "../observability/helpers.js";
export const TableRelationsRegistry = Context.GenericTag("@eventiva/core/TableRelationsRegistry");
export const TableRelationsRegistryLive = Layer.effect(TableRelationsRegistry, Effect.gen(function* () {
    const stateRef = yield* Ref.make({
        pending: new Map()
    });
    return {
        registerRelations: (tableName, extensionId, callback) => Effect.gen(function* () {
            yield* Effect.logInfo(`Registering relations for table ${tableName} from extension ${extensionId}`);
            yield* Ref.update(stateRef, (state) => {
                const nextPending = new Map(state.pending);
                const existing = nextPending.get(tableName) ?? [];
                nextPending.set(tableName, [...existing, { extensionId, callback }]);
                return { pending: nextPending };
            });
        }).pipe(withSpanAndLog("registerRelations", { attributes: { tableName, extensionId } })),
        getAllCallbacks: () => Effect.gen(function* () {
            const state = yield* Ref.get(stateRef);
            const result = new Map();
            for (const [tableName, entries] of state.pending.entries()) {
                result.set(tableName, entries.map(e => e.callback));
            }
            return result;
        })
    };
}));
