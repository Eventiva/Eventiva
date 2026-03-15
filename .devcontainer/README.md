# Eventiva Dev Container

This devcontainer is for **implementation work only**. The tests repository is **not** initialized here to ensure AI tools don't use test code as context when implementing features.

- **Node.js 22** (from base image)
- **pnpm 9** (installed globally in `onCreateCommand`)
- **nx** (installed globally so `nx` is on PATH; project also has nx via `pnpm install` — use `pnpm exec nx …` for workspace version)
- **PostgreSQL 16** (service `postgres`, port 5432)

**Note:** To run or write tests, use the test-runner devcontainer (`.devcontainer/test-runner/`) instead.

## Environment variables (set in container)

| Variable   | Value       | Notes                           |
| ---------- | ----------- | ------------------------------- |
| `NODE_ENV` | development |                                 |
| `DATABASE` | postgres    | DB name                         |
| `HOST`     | postgres    | Service name (use in container) |
| `PORT`     | 5432        |                                 |
| `USERNAME` | postgres    |                                 |
| `PASSWORD` | postgres    |                                 |
| `SSL`      | false       | For local dev                   |

## Optional env you might add

- **API keys / external services** – Add to `remoteEnv` in `devcontainer.json` or use a `.env` file (add to `.gitignore` if it contains secrets) and load it in your app.
- **`NX_DAEMON`** – Set to `false` if you want to disable the Nx daemon in the container (e.g. to avoid background process issues).
- **`REPLICAS`** / **`SSL_CA_FILE`** – Only if you use the optional Postgres config from `.examples/postgres` (e.g. for staging/prod); not needed for local dev.
- **`NX_MF_DEV_REMOTES`** – If you use Module Federation and need to point to remotes in dev (e.g. `http://localhost:4201/remoteEntry.js`).
- **`CI`** – Set to `true` in CI only; some tools (e.g. Nx) change behavior when `CI` is set.
- **`LOG_LEVEL`** / **`DEBUG`** – For app or library logging (e.g. `DEBUG=*` for verbose output).

## Getting Started

After opening the devcontainer, install dependencies:

```sh
pnpm install
```

## Building

Build all packages:

```sh
pnpm nx run-many -t build
```

Build a specific package:

```sh
pnpm nx build <project-name>
```

## Running Tasks

Common Nx commands:

- **Lint:** `pnpm nx run-many -t lint`
- **Type check:** `pnpm nx run-many -t typecheck`
- **Test:** `pnpm nx run-many -t test`
- **Format:** `pnpm nx run eventiva:format`
- **Check:** `pnpm nx run eventiva:check`

## Rebuild

After changing `devcontainer.json` or this README, run **“Dev Containers: Rebuild Container”** from the command palette.
