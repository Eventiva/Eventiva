/**
 * Registers {@link EVENTIVA_TRANSFORM_PIPELINE_TABLE} via the schema registry on {@link CORE_LOADED_TOPIC},
 * matching columns used by `@eventiva/core` transform RPC loading.
 */
import {
  CORE_LOADED_TOPIC,
  makeTopicListenerLayer,
  TableColumnRegistry,
} from "@eventiva/core"
import * as Effect from "effect/Effect"
import type { PgColumnBuilder } from "drizzle-orm/pg-core"
import { index } from "drizzle-orm/pg-core"
import { createTable } from "./create-table.js"

/** Must match {@link EVENTIVA_TRANSFORM_PIPELINE_TABLE} in core. */
export const EVENTIVA_TRANSFORM_PIPELINE_TABLE = "eventiva_transform_pipeline" as const

const CORE_EXTENSION_ID = "eventiva-core"

export const transformPipelineTableBootstrapLayer = makeTopicListenerLayer(
  CORE_LOADED_TOPIC,
  () =>
    Effect.gen(function* () {
      yield* createTable(
        EVENTIVA_TRANSFORM_PIPELINE_TABLE,
        CORE_EXTENSION_ID,
        (c) =>
          ({
            id: c.typeid("id", { type: "ev_transform" }),
            extension_id: c.text("extension_id").notNull(),
            transform_id: c.text("transform_id").notNull(),
            rpc_name: c.text("rpc_name").notNull(),
            phase: c.text("phase").notNull(),
            ordering: c.integer("ordering").notNull(),
            enabled: c.boolean("enabled").notNull().default(true),
          }) as Record<string, PgColumnBuilder>,
        (self: unknown) => {
          const table = self as Record<string, unknown>
          return [
            index("idx_eventiva_transform_pipeline_rpc").on(
              table.rpc_name as never,
              table.phase as never,
              table.ordering as never,
            ),
            index("idx_eventiva_transform_pipeline_enabled").on(table.enabled as never),
          ]
        },
      )
      const registry = yield* TableColumnRegistry
      yield* registry.markReady(CORE_EXTENSION_ID)
    }).pipe(Effect.catchAll((e) => Effect.logError("transform pipeline table registration failed", { error: e }))),
)
