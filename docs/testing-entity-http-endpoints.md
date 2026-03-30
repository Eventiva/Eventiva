# Testing entity HTTP/RPC endpoints (Contact)

When the PostgreSQL platform runs with entity endpoints enabled, it starts an HTTP server (default port 3000, or `EVENTIVA_HTTP_PORT`) that exposes each registered entity as an RPC-over-HTTP proxy. Request payloads are **decoded** with the entity’s RPC payload schema (e.g. `dateOfBirth` as `"1990-05-15"` is decoded to a `Date`).

## Start the server

```bash
pnpm nx run platforms-postgresql:run
```

The Nx **`run`** target sets **libpq-style defaults** (`PGPORT`, `PGUSER`, `PGPASSWORD`, `HOST`, `DATABASE`) so local Postgres matches `postgres`/`postgres` on `localhost:5432` without extra shell exports. Override them in your environment when your database differs. It does **not** set `EVENTIVA_DATABASE`; use `EVENTIVA_DATABASE=sqlite` (or your value) in the shell to pick another backend.

### Automated Postgres E2E (same checks as the PG verification plan)

With Postgres reachable using those defaults (or your overrides):

```bash
pnpm nx run platforms-postgresql:verify-pg-e2e
```

This **`dependsOn` `build`**, starts **`platforms-postgresql:run` via Nx**, waits for port **3000** (or **`EVENTIVA_HTTP_PORT`** if set), runs **`psql \\d contact`** (unless **`SKIP_PSQL=1`** or `psql` is missing), then exercises **RPC list / creates / update / delete** and **REST GET/POST/PATCH/DELETE**, and **`GET /api/docs`**. Set **`PG_E2E_RESET=1`** to run `DELETE FROM contact;` before the server starts (destructive).

The process will:

1. Run **integrity checks** (per docs/plans); if they fail, the process exits and `core/loaded` is not published.
2. Publish `core/loaded` and run the in-process demo (HelloWorld sayHello, Contact create + list).
3. Log `Entity HTTP endpoints up` with port and path.
4. Stay running (server listens until you interrupt with Ctrl+C).

## OpenAPI / Swagger

- **GET /api/openapi.json** — OpenAPI 3.0 spec for all registered entity RPCs, **REST CRUD** (when entity has list/get/create/update/delete), and **GET/POST /api/shutdown**.
- **GET /api/docs** — Swagger UI (HTML) that loads the spec; use it to try the endpoints.

**Shutdown (for UI or scripts):** **GET /api/shutdown** or **POST /api/shutdown** — Returns `200` with `{ "ok": true, "message": "Shutting down" }` then exits the process with code 0. Use from a UI or script to stop the server; Nx will report success.

## Contact RPC over HTTP

**Base path:** `POST /api/rpc/contacts`

**Request body (JSON):**

- `method` (required): RPC method name: `"create"`, `"get"`, `"update"`, `"list"`, or `"delete"`.
- `payload` (optional): Method payload (omit or `{}` for `list`). For `create`, use **ISO date strings** for `dateOfBirth` (e.g. `"1990-05-15"`); the server decodes them to `Date` using the Contact schema.
- `entityId` (optional): Entity ID; defaults to `"store"` for Contact.

Contact uses the core CRUD entity helper (`makeCrudEntity`): create, get, update, list, and delete are standard RPCs; the extension only supplies the Contact id and fields schemas and handlers.

## REST-style CRUD (Contact)

For entities that expose `list`, `get`, `create`, `update`, and `delete`, the server also exposes REST routes. These are included in **GET /api/openapi.json** so Swagger UI shows them.

- **GET /api/contacts** — List all contacts. Response: `{ "success": [ { "id": "...", "fullname": "...", ... }, ... ] }`.
- **GET /api/contacts/{id}** — Get one contact by id. Response: `{ "success": { "fullname": "...", "dateOfBirth": "...", ... } }` or `404` if not found.
- **POST /api/contacts** — Create. Body: entity fields (e.g. `{ "fullname": "Jane", "dateOfBirth": "1990-05-15", "email": "jane@example.com", "phone": "+1" }`). Response: `{ "success": { "id": "contact_..." } }`.
- **PATCH /api/contacts/{id}** — Update. Body: partial fields. Response: `{ "success": null }` or `404`.
- **DELETE /api/contacts/{id}** — Delete. Response: `{ "success": null }` or `404`.

**Examples:**

```bash
# List
curl -s http://localhost:3000/api/contacts

# Get by id (replace CONTACT_ID with e.g. contact_01h2x...)
curl -s http://localhost:3000/api/contacts/CONTACT_ID

# Create
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"fullname":"Jane Doe","dateOfBirth":"1990-05-15","email":"jane@example.com","phone":"+1234567890"}'

# Update
curl -X PATCH http://localhost:3000/api/contacts/CONTACT_ID \
  -H "Content-Type: application/json" \
  -d '{"phone":"+999"}'

# Delete
curl -X DELETE http://localhost:3000/api/contacts/CONTACT_ID
```

## Contact RPC examples (POST /api/rpc/contacts)

```bash
curl -X POST http://localhost:3000/api/rpc/contacts \
  -H "Content-Type: application/json" \
  -d '{"method":"list","payload":{}}'
```

**Create a contact**

```bash
curl -X POST http://localhost:3000/api/rpc/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "method": "create",
    "payload": {
      "fullname": "Jane Doe",
      "dateOfBirth": "1990-05-15",
      "email": "jane@example.com",
      "phone": "+1234567890"
    }
  }'
```

Response shape: `{"success": {"id": "contact_..."}}`. Use the returned `id` for `get` and `update`.

**Get a contact by ID**

```bash
curl -X POST http://localhost:3000/api/rpc/contacts \
  -H "Content-Type: application/json" \
  -d '{"method":"get","payload":{"id":"contact_<paste-id-here>"}}'
```

**Update a contact**

```bash
curl -X POST http://localhost:3000/api/rpc/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "method": "update",
    "payload": {
      "id": "contact_<paste-id-here>",
      "patch": { "fullname": "Jane Smith" }
    }
  }'
```

**Delete a contact**

```bash
curl -X POST http://localhost:3000/api/rpc/contacts \
  -H "Content-Type: application/json" \
  -d '{"method":"delete","payload":{"id":"contact_<paste-id-here>"}}'
```

## Postgres verification outcome (2026-03-28)

Manual run against **PostgreSQL** on **`localhost:5432`**, database **`postgres`**, user **`postgres`** (password **`postgres`**), with:

- `EVENTIVA_DATABASE=postgres`
- `PGPORT=5432` `PGUSER=postgres` `PGPASSWORD=postgres` `HOST=localhost` `DATABASE=postgres`
- `CONTACT_SEED_ENABLED=false` for a deterministic row count during CRUD checks

**DDL:** After bootstrap, `public.contact` exists with extension columns (`id`, `fullname`, `date_of_birth`, `email`, `phone`) plus table-builder columns (`created_at`, `updated_at`, `disabled_at`, `deleted_at`, `created_by`, generated `active` with enum `status`), indexes, and `created_by` referencing `_created_by_placeholder`. Use `psql` `\d contact` to inspect.

**HTTP:** `GET /api/contacts` returned `[]` with seed off; `POST /api/contacts` twice created two rows; `PATCH /api/contacts/{id}` updated one; `POST /api/rpc/contacts` with `delete` removed one row; final list and `psql` showed a single remaining row.

**Fixes shipped with this verification:** REST `PATCH` sends `{ id, patch }` to the update RPC; PG env prefers **`PGPORT`** / **`PGUSER`** / **`PGPASSWORD`**; Postgres runtime DDL uses generated SQL plus **`psql`** (and creates `_created_by_placeholder` before `contact`); `PgDatabaseLayer` passes empty `relations` into Drizzle Effect DB to match CRUD-only usage; dynamically registered table entities use **`withDelete: true`** so RPC/REST delete work. **Nx:** a minimal **`.devcontainer/project.json`** names the devcontainer folder so `pnpm nx run platforms-postgresql:run` can load the project graph when the Docker plugin infers that directory.

## Adding more entities

Register an entity in the platform you run (e.g. **postgresql**) by:

1. Passing `options.entityEndpoints` in `packages/platforms/postgresql/src/index.ts` (or the sibling platform you run).
2. Each entry: `{ entity, defaultEntityId, pathPrefix }`. The server will expose `POST /api/rpc/:pathPrefix` for that entity. If the entity has `list`, `get`, `create`, `update`, and `delete` methods, it will also expose REST: `GET/POST /api/:pathPrefix` and `GET/PATCH/DELETE /api/:pathPrefix/{id}` (and these appear in OpenAPI).
