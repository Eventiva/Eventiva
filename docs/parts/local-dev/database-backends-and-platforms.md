# Local development: database backends and platforms

If you only need “run the app locally,” this guide tells you which platform package to start, which environment variables matter, and how that ties to Postgres versus SQLite. No prior Eventiva architecture knowledge is required; deeper design notes live in the learnings index linked at the end.

## Terms used here

- **Database backend** — A registered implementation (Postgres or SQLite) that supplies the database layer, schema finalization, and runtime DDL wiring. Eventiva does **not** ship an in-core in-memory database; storage is always through a real driver (`@effect/sql-pg` or SQLite via `better-sqlite3`).
- **Platform package** — A runnable entry that composes extensions, picks a backend, and starts HTTP. Two packages are documented below: **postgresql** (env-driven backend; Postgres by default) and **sqlite-demo** (SQLite only).

## When to use Postgres versus SQLite

| Situation | Sensible choice |
| --------- | --------------- |
| Match the devcontainer or a shared team database | **Postgres** — unset `EVENTIVA_DATABASE` or set it to `postgres` (or aliases `postgresql`, `pg`). |
| Quick local run without Postgres, tests, or a disposable file DB | **SQLite** — run the **sqlite-demo** platform, or add a platform package that registers the SQLite backend and uses `activateDatabaseStackFromEnv()` (the **postgresql** platform only registers Postgres). |
| Ephemeral SQLite (no file on disk) | Set `EVENTIVA_SQLITE_PATH=:memory:` when using SQLite. |

The default backend when `EVENTIVA_DATABASE` is **unset** is **postgres** (for the **postgresql** platform), so local behaviour matches a typical Postgres-first devcontainer.

## Environment variables

### Selecting the backend (postgresql platform only)

1. Prefer **`EVENTIVA_DATABASE`** with one of: `postgres`, `postgresql`, `pg`, or `sqlite`.
2. If that is unset, **`EVENTIVA_DATABASE_DIALECT=sqlite`** still selects SQLite (legacy).
3. If neither applies, **`DATABASE=postgres`** (legacy) selects the Postgres backend id.
4. Otherwise the active backend id is **postgres**.

Note: the Postgres **connection** layer also reads **`DATABASE`** as the **Postgres database name** (not the backend selector) when building the client from env. If you use legacy `DATABASE=postgres` only for backend selection, ensure your actual database name is still correct for your connection settings.

### Postgres connection (when the active backend is Postgres)

Set the usual variables expected by the Postgres client layer: **`HOST`**, **`DATABASE`** (database name), and optionally **`SSL=true`**.

For **credentials**, prefer libpq-style **`PGUSER`** and **`PGPASSWORD`** (same as `psql`). If unset, the client falls back to **`USERNAME`** and **`PASSWORD`**. On many Linux desktops **`USERNAME`** is the OS login and is **not** a Postgres role; use **`PGUSER=postgres`** (or your DB user) so the app does not try to connect as the wrong role.

For the **database TCP port**, prefer **`PGPORT`** (e.g. `5432`). If **`PGPORT`** is unset, the client falls back to generic **`PORT`**. Many HTTP stacks set `PORT` to the web server port (e.g. `3000`); in that case **always set `PGPORT=5432`** (or your Postgres port) so the app does not try to connect the SQL client to the wrong port.

### SQLite paths and demo HTTP port

1. **`EVENTIVA_SQLITE_PATH`** — Filesystem path to the SQLite file, or **`:memory:`** for an in-memory database. If unset, the SQLite client layer uses a default file under **`.data/`** in the workspace (see `@eventiva/databases.sqlite`).
2. **`EVENTIVA_HTTP_PORT`** — HTTP listen port for runnable platforms. If unset, **postgresql** and **sqlite-demo** both default to **3000**; set this when running two platforms at once.

## How backends get registered

Each platform package imports its own **`register-database-backends.ts`** (side effect) **before** calling `activateDatabaseStackFromEnv()` or `activateDatabaseBackend(...)`. That file calls **`registerDatabaseBackend`** for **one** driver package (`@eventiva/databases.pg` or `@eventiva/databases.sqlite`). Do **not** introduce a shared **`@eventiva/platforms.*`** package to deduplicate platform sources—see [architecture.md — Platform packages](../../learnings/architecture.md).

## Running the postgresql platform (Postgres or SQLite from env)

1. From the repository root, install dependencies if needed (`pnpm install`).
2. Set `EVENTIVA_DATABASE` (and Postgres or SQLite variables above) as required.
3. Run:

```bash
pnpm nx run platforms-postgresql:run
```

This uses **`activateDatabaseStackFromEnv()`**, which resolves the backend from environment variables and wires **`RuntimeSchemaDDLService`** so that after schema finalization, **CREATE TABLE** (and related DDL) runs for the active backend.

To run the full **Postgres + Contact HTTP/RPC** flow through Nx (build, start server, `psql`, CRUD, Swagger):

```bash
pnpm nx run platforms-postgresql:verify-pg-e2e
```

See **[Testing entity HTTP/RPC endpoints (Contact)](../../testing-entity-http-endpoints.md)** for env overrides and **`SKIP_PSQL`** / **`PG_E2E_RESET`**.

### Postgres runtime DDL (`psql`)

The Postgres backend applies DDL by invoking the **`psql`** client on your **`PATH`** (same connection semantics as **`PGHOST`**, **`PGPORT`**, **`PGUSER`**, **`PGPASSWORD`**, **`PGDATABASE`** / the variables above). Install PostgreSQL client tools locally or run inside an environment where `psql` is available; the app SQL driver (`@effect/sql-pg`) is separate from this one-off DDL step.

## Running the SQLite demo platform

The **sqlite-demo** platform mirrors **postgresql**’s files (`index.ts`, `extensions.ts`, etc.) but **`register-database-backends.ts`** registers SQLite only, and **`index.ts`** calls **`activateDatabaseBackend('sqlite')`** so SQLite is always active regardless of `EVENTIVA_DATABASE`.

1. Optionally set **`EVENTIVA_SQLITE_PATH`** (file path or `:memory:`).
2. Optionally set **`EVENTIVA_HTTP_PORT`** if **3000** is already in use (e.g. second platform).
3. Run:

```bash
pnpm nx run platforms-sqlite-demo:run
```

## Smoke-check REST and RPC (Contact)

After logs show **runtime ready** (or equivalent), you can confirm the stack the same way for either platform: only the **host/port** changes.

1. **PostgreSQL platform** — HTTP **`EVENTIVA_HTTP_PORT`** if set, otherwise **3000**.
2. **SQLite demo** — same default; set **`EVENTIVA_HTTP_PORT`** when running beside another platform.

Use **GET/POST/PATCH** on **`/api/contacts`** and **`POST /api/rpc/contacts`** with the exact curl examples in **[Testing entity HTTP/RPC endpoints (Contact)](../../testing-entity-http-endpoints.md)**; substitute `http://localhost:3000` with your base URL if you changed **`EVENTIVA_HTTP_PORT`**. **GET /api/docs** opens Swagger when the entity HTTP server is enabled.

## Package layout reference

| Package | Role |
| ------- | ---- |
| `@eventiva/databases.shared` | Backend registry, `resolveActiveDatabaseBackendId`, `activateDatabaseStackFromEnv`, `activateDatabaseBackend`. |
| `@eventiva/databases.pg` / `@eventiva/databases.sqlite` | Driver-specific layers and DDL implementations. |
| `packages/platforms/postgresql` | Runnable platform; registers Postgres backend; env-selected active backend; HTTP from **`EVENTIVA_HTTP_PORT`** (default **3000**). |
| `packages/platforms/sqlite-demo` | Runnable demo; SQLite only; HTTP from **`EVENTIVA_HTTP_PORT`** (default **3000**). |

## Further reading (no duplication here)

- **Dependency rules and tags** for database and platform packages: [module-boundaries.md](../../learnings/module-boundaries.md).
- **Platform and runtime composition** (higher-level architecture): [architecture.md](../../learnings/architecture.md) and the learnings index [README.md](../../learnings/README.md).
- **Devcontainer and local Postgres**: [ci-and-devcontainer.md](../../learnings/ci-and-devcontainer.md).
