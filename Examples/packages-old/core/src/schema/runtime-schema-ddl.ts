/**
 * Optional bootstrap hook: apply finalized Drizzle tables to the physical database (drizzle-kit push / migration).
 * Database packages provide an implementation; core defaults to no-op.
 */
import * as Context from 'effect/Context';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';

export interface RuntimeSchemaDDLService {
    /** Run after `TableColumnRegistry.waitUntilFinalized()` so `FinalTableStore` is populated. */
    readonly sync: () => Effect.Effect<void, unknown, unknown>;
}

export const RuntimeSchemaDDL = Context.GenericTag<RuntimeSchemaDDLService>('@eventiva/core/RuntimeSchemaDDL');

export const RuntimeSchemaDDLNoOp: RuntimeSchemaDDLService = {
    sync: () => Effect.void,
};

export const RuntimeSchemaDDLNoOpLayer: Layer.Layer<RuntimeSchemaDDLService> = Layer.succeed(
    RuntimeSchemaDDL,
    RuntimeSchemaDDLNoOp
);
