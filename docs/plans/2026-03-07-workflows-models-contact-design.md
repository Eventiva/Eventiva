# Workflows (central callable), cluster models, and contact module

**Date:** 2026-03-07

## Summary

1. **Workflows** – Register callable workflows in the central `WorkflowRegistry` so they can be invoked by name. Provide `WorkflowRegistryLive` on the platform and document that extensions register workflows during layer setup.
2. **Cluster models** – Odoo-like model definitions using Effect Schema: define a model (name + schema struct); register it so extensions can extend it via `Schema.extend`. One model = one schema; entities can be tied to a model for their state/RPCs.
3. **Contact module** – New extension defining the Contact model (fullname, dateOfBirth, email, phone) and a Contact entity with create/get/update/list RPCs, in-memory storage.

## 1. Workflow registration (central callable)

- **Current:** `WorkflowRegistry` + `WorkflowRegistryLive` exist in core; extensions use `@effect/workflow` + PubSub for hook-driven flows. The platform does not provide `WorkflowRegistryLive`.
- **Change:** Add `WorkflowRegistryLive` to the default platform stack so extensions have access to `WorkflowRegistry`. Extensions that want a workflow to be **callable by name** run `WorkflowRegistry.register(workflow, executeFn)` in a layer (e.g. during startup or in a Layer.effectDiscard). Then any code with `WorkflowRegistry` in context can run `WorkflowRegistry.execute(workflow, { payload })`.
- **Convention:** Hook-driven workflows (e.g. hello-world onLoad) can stay as today (PubSub + @effect/workflow). When an extension also wants the same logic callable by name, it additionally registers it with `WorkflowRegistry` using the same payload/result schemas.

## 2. Cluster entities as models (Odoo-like)

- **Idea:** Like Odoo’s `fields.Char`, etc., we use **Effect Schema** to define “fields”; a **model** is a named schema (struct). Registering the model makes it the single source of truth; other extensions can **extend** it by defining additional fields and merging with the base schema.
- **Core API (minimal):**
  - `defineModel(name, schema)` – returns a `Model<Name, Schema>` descriptor (name + schema). No side-effect registry required for phase 1; the descriptor is the contract.
  - `extendModel(baseModel, extraSchema)` – returns a new schema: `Schema.extend(baseModel.schema, extraSchema)`. Extensions that depend on “Contact” import the Contact model and call `extendModel(Contact, { companyId: Schema.String })` etc.
- **Entity ↔ model:** An entity’s RPC payloads/state can use the model’s schema. So Contact entity has `create` (payload: ContactSchema), `get` (payload: { id }, success: ContactSchema), `update`, `list`. Handlers decode/encode using the same schema.

## 3. Contact module

- **Package:** `packages/extensions/contact` (new).
- **Model:** Contact = `{ fullname: string, dateOfBirth: Date, email: string, phone: string }`. Use Effect Schema (`Schema.Struct`, `Schema.DateFromString` or equivalent for date).
- **Entity:** Contact entity type (e.g. `"Contact"`), RPCs:
  - `create` – payload: Contact fields; success: `{ id: string }` or full Contact with id.
  - `get` – payload: `{ id: string }`; success: Contact (or 404 error).
  - `update` – payload: `{ id: string }` + partial Contact; success: void or updated Contact.
  - `list` – payload: optional filter; success: array of Contact with id.
- **Storage:** In-memory for now (e.g. `Ref.make<Map<string, ContactRecord>>` in the entity layer). ID = nanoid or similar.
- **Export:** `ContactModel`, `ContactLayer`; platform can add `ContactLayer` to the default profile.

## Implementation order

1. Add `WorkflowRegistryLive` to default platform; optionally register hello-world workflow by name as an example.
2. Add model helpers in core: `defineModel`, `extendModel` (and export from cluster or a new `models` subpath).
3. Create contact extension: schema (Contact model), entity + handlers, in-memory store; export ContactLayer.
4. Wire ContactLayer into default platform profile and run a quick sanity check.
