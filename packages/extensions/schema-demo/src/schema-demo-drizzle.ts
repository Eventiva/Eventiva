/**
 * Demo table registered on {@link CORE_LOADED_TOPIC} for Drizzle + registry validation.
 */
import { CORE_LOADED_TOPIC, makeTopicListenerLayer, TableColumnRegistry } from "@eventiva/core"
import { createTable } from "@eventiva/databases.pg"
import type { PgColumnBuilder } from "drizzle-orm/pg-core"
import * as Effect from "effect/Effect"

const EXTENSION_ID = "schema-demo"

export const schemaDemoDrizzleLayer = makeTopicListenerLayer(CORE_LOADED_TOPIC, () =>
  Effect.gen(function* () {
    yield* createTable(
      "demo_note",
      EXTENSION_ID,
      (c) =>
        ({
          id: c.typeid("id", { type: "demo_note" }),
          title: c.text("title").notNull(),
        }) as Record<string, PgColumnBuilder>,
    )
    const registry = yield* TableColumnRegistry
    yield* registry.markReady(EXTENSION_ID)
  }),
)
