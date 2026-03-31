---
name: dynamic-drizzle-effect-entities
overview: Refactor Eventiva to define columns dynamically using Drizzle, generate Effect schemas using drizzle-orm/effect-schema, and expose dynamically instantiated cluster entities via a strongly-typed Registry. Resolves circular dependencies via two-phase table building, lazy schema relations, and merged Drizzle relations.
todos:
  - id: drop-old-drizzle-adapter
    content: Delete `packages/core/src/database/drizzle-to-effect.ts`. We will replace it with `drizzle-orm/effect-schema` in subsequent steps.
    status: completed
  - id: refactor-entity-base
    content: Update `packages/core/src/entity/entity-base.ts`. Modify the `Base()` factory to accept a dynamically generated `Schema.Schema` (from `createSelectSchema`/`createInsertSchema`) instead of taking static `Schema.Struct.Fields`. Ensure internal CRUD handlers and RPC signatures still correctly infer type/encoded shapes.
    status: completed
  - id: create-entity-registry
    content: "Create `packages/core/src/entity/entity-registry.ts`. It must include: (1) A global `interface RegisteredEntities {}` for module augmentation. (2) An `EntityRegistry` service acting as a DI container. (3) A helper method `EntityRegistry.lazy<Type, Encoded>(\"Contact\")` using `Schema.suspend` to fetch schemas lazily without runtime circular `require()` loops."
    status: completed
  - id: expand-schema-finalizer
    content: "Update `packages/core/src/schema/schema-finalizer.ts` and `TableColumnRegistry` to support Phase 2 (Relations). Add a `TableRelationsRegistry` (or expand the existing registry) that accepts relation callbacks: `(helpers, schema) => ({ ... })`. Update `runCoreStartup` so that after `FinalTableStore` is populated (Phase 1), it iterates these callbacks, merges the returned relation objects per table, and calls Drizzle's `relations(table, () => merged)`."
    status: completed
  - id: generate-schemas-and-populate-registry
    content: "Update `packages/core/src/runtime/run-core-startup.ts`. After the Phase 2 DB initialization is complete (but before `EXTENSIONS_LOADED_TOPIC`), iterate over all tables in `FinalTableStore`. For each: generate Effect Schemas using `drizzle-orm/effect-schema`, feed them into the refactored `Base()` factory, instantiate the entity, and register the fully wired entity into the `EntityRegistry`."
    status: completed
  - id: refactor-contact-extension
    content: "Refactor `packages/extensions/contact/src/entity.ts` and `workflow.ts`. Remove static schema definitions. Export an `import type` declaration augmenting `RegisteredEntities`. On `CORE_LOADED_TOPIC`, define Drizzle columns (`fullname: text()`, etc.) and register them. Also register any relations using the new callback approach. In the seed workflow on `EXTENSIONS_LOADED_TOPIC`, fetch the fully built entity via `yield* EntityRegistry.get(\"Contact\")` to perform operations."
    status: pending
  - id: http-api-swagger-integration
    content: Update the server bootstrap (e.g. `packages/core/src/runtime/run-runtime.ts` or relevant entry point) to dynamically aggregate the RPC groups from all entities in the `EntityRegistry`. Expose this aggregated group via `@effect/platform` `HttpApi` and mount it using `HttpLayerRouter` alongside `HttpApiSwagger` to provide full API documentation.
    status: pending
isProject: false
---

# Refactor to Dynamic Drizzle-Effect Entities

## Phase 1: Core Registry & `Base` Refactor

1. **Drop Custom Drizzle-to-Effect Adapter**:
  - Delete `packages/core/src/database/drizzle-to-effect.ts`.
  - Integrate `createSelectSchema` and `createInsertSchema` from `drizzle-orm/effect-schema` (beta branch support) to dynamically derive Effect schemas from Drizzle `pgTable` definitions.
2. **Refactor `Base` Entity Factory**:
  - Update `packages/core/src/entity/entity-base.ts`.
  - Refactor `Base()` to accept a pre-constructed `Schema.Schema` (derived from the Drizzle table) rather than statically defined `Schema.Struct.Fields`.
  - Ensure the internal CRUD handlers and Cluster RPC definitions correctly infer types from the newly provided schema.
3. **Establish `EntityRegistry` with Declaration Merging**:
  - Create a new service `EntityRegistry` in `@eventiva/core` to serve as a DI container for fully constructed entities.
  - Define a global `interface RegisteredEntities {}`. Extensions will use TypeScript module augmentation (declaration merging) to inject their specific entity types into this interface.
  - Example access pattern: `yield* EntityRegistry.get("Contact")` returning a strongly-typed `RegisteredEntities["Contact"]`.
  - Implement a helper `EntityRegistry.lazy<Type, Encoded>("Contact")` which utilizes `Schema.suspend` internally. This allows schemas to reference one another lazily at runtime and relies entirely on `import type` at compile time, eliminating Node.js circular module dependencies.

## Phase 2: Updating Extensions to the 3-Step Process (and Two-Phase DB Init)

1. **Step 1: Load into system without running workflows**:
  - In extensions (`contacts`, `hello-world`), strip out static `Base` instantiations from `src/entity.ts`.
  - The primary layer export should solely register a listener for the `CORE_LOADED_TOPIC` via `makeExtensionOnLoadLayer` without executing entity logic.
2. **Step 2: On Core Successfully Loading (Phase 1 DB Init)**:
  - Within the `CORE_LOADED_TOPIC` listener, define base table columns using Drizzle (e.g., `text()`, `date()`), intentionally omitting DB-level foreign keys referencing tables that don't exist yet.
  - Call `TableColumnRegistry.registerTableColumns("Contact", "contact", contactColumns)`.
  - Also register any relational links using a new `TableRelationsRegistry.registerRelations("Contact", "contact", (helpers, schema) => ({ ... }))`.
  - Call `TableColumnRegistry.markReady("contact")` to confirm column loading is complete.
3. **Step 3: Table Finalization & Relations (Phase 2 DB Init)**:
  - Let `TableColumnRegistry` finalize the base `PgTable` definitions via `SchemaFinalizer` once all extensions are ready.
  - Using the fully populated `FinalTableStore`, execute a second pass to build the relations. Iterate over the registered relation callbacks for each table, passing in the Drizzle `helpers` (`{ one, many }`) and the fully populated `schema` object from the `FinalTableStore`.
  - Merge the resulting objects and call Drizzle's `relations(table, () => mergedRelations)` to produce the final relation configs.
  - Iterate over the finalized schema, generate Effect Schemas using `drizzle-orm/effect-schema`, call the refactored `Base` factory, and register the fully linked entities into the `EntityRegistry`.
  - Effect Schema level relations can use the `EntityRegistry.lazy()` helper.
  - Extension workflows (e.g., seeding data) triggered on `EXTENSIONS_LOADED_TOPIC` will yield the dynamic entity via `EntityRegistry` and execute operations.

## Phase 3: Platform & Cluster Integrations

1. **Cluster RPC & Swagger API Compatibility**:
  - Ensure the dynamically generated entities correctly emit `@effect/rpc` definitions.
  - Dynamically aggregate these RPC definitions into an `@effect/platform` `HttpApi`.
  - Serve the aggregated `HttpApi` using `HttpLayerRouter` and broadcast it via `HttpApiSwagger` to fully expose the cluster RPC endpoints within Swagger.

