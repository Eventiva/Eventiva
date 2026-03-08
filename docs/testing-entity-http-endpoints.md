# Testing entity HTTP/RPC endpoints (Contact)

When the default platform runs with entity endpoints enabled, it starts an HTTP server (default port 3000) that exposes each registered entity as an RPC-over-HTTP proxy. Request payloads are **decoded** with the entity’s RPC payload schema (e.g. `dateOfBirth` as `"1990-05-15"` is decoded to a `Date`).

## Start the server

```bash
pnpm nx run platforms-default:run
```

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

## Adding more entities

Register an entity in the default platform by:

1. Adding an entry to `defaultEntityEndpoints` in `packages/platforms/default/src/default.ts` (or passing `options.entityEndpoints` to `defaultPlatform()`).
2. Each entry: `{ entity, defaultEntityId, pathPrefix }`. The server will expose `POST /api/rpc/:pathPrefix` for that entity. If the entity has `list`, `get`, `create`, `update`, and `delete` methods, it will also expose REST: `GET/POST /api/:pathPrefix` and `GET/PATCH/DELETE /api/:pathPrefix/{id}` (and these appear in OpenAPI).
