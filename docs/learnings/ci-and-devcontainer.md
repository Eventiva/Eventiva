# CI and DevContainer Learnings

## Bit-dependent workflows (current)

- **components-bit-init.yml** – Bit init/setup.
- **components-verify.yml** – Bit verify.
- **components-tag-export.yml**, **components-pull-request.yml**, **components-lane-cleanup.yml**, **components-dependency-update.yml**, **components-commit-bitmap.yml**, **components-branch-lane.yml** – All depend on Bit lanes, tagging, bitmap. See `.github/workflows/` for full list.

## Workflows to keep (no Bit)

- **security-\*** – Snyk, secrets, scorecard, OSSAR, dependency review, defender, infrastructure scan.
- **codeql.yml** – CodeQL analysis.
- **management-\*** – GitHub management, CLA.
- **chore-readme-fun.yml** – Chore; can be kept or adapted.

## DevContainer (current)

- `.devcontainer/devcontainer.json` – Uses Bit Cloud auth and 1Password refs (per plan). README noted devcontainers were “temporarily removed” while workflow is adapted.
- **Rebuild requirement:** No Bit registry or `BIT_CLOUD_AUTH_TOKEN`. Optional Docker Compose for Postgres; minimal secrets for contributors. Node + pnpm + Nx.

## Local Postgres inspection (agents and contributors)

When Postgres runs on the same machine as the repo (devcontainer, laptop, or CI runner with a service container), use the **`psql` CLI** to verify schema state. The app and `scripts/pg-e2e-via-nx.mjs` use **`HOST` / `DATABASE`** (and `pgClientConfigFromEnv`) for the Node client, but **`psql` and libpq use `PGHOST` / `PGDATABASE`** — set both or align them, or checks may hit a different database than the platform.

Useful commands:

- `\dt public.*` — list tables; confirms whether `contact` exists after runtime DDL.
- `\d contact` — columns and FKs on `contact`.
- `SELECT pg_get_constraintdef(oid) FROM pg_constraint WHERE conrelid = 'public.contact'::regclass AND contype = 'f';` — FK definitions (e.g. `created_by` must reference a **unique/PK** column).

**Runtime DDL** (`packages/databases/pg/src/runtime-schema-ddl-pg.ts`) applies `CREATE TABLE IF NOT EXISTS` from Drizzle; it does not alter existing tables. A failed `CREATE` (e.g. missing PK on `id` while adding a self-FK) aborts bootstrap and the HTTP server never listens — check platform logs or run `psql` after a schema reset to see what actually exists.

## Target state (post-Bit)

- **Install:** `pnpm install` (no Bit init).
- **Lint / test / build:** Nx tasks or pnpm scripts (e.g. `nx run-many -t lint,test,build` or equivalent).
- **Optional:** Changelog, style-dictionary as Nx tasks or pnpm scripts; run from CI.
- **Docs:** When PR touches docs, run script to generate README.md from README.adoc (see docs-and-apis.md).
- **DevContainer:** Node, pnpm, Nx; optional Postgres via Docker Compose; no Bit or paid secrets. Document in contributor onboarding (Plan Part D).

## References

- `.github/workflows/*.yml`
- Plan: DevContainer and CI section; Part D (Contributor onboarding)
