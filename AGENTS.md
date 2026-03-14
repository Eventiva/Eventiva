<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

## Cursor Cloud specific instructions

### Environment

- **Node.js 22** and **pnpm 9.14.2** are required (matching `package.json` `packageManager` field).
- The lockfile may be slightly behind `package.json` changes; use `pnpm install` (not `--frozen-lockfile`) in development.
- Nx Cloud is disabled (free plan exceeded) — all tasks run locally; ignore Nx Cloud warning messages.

### Running tasks

- **Lint:** `pnpm exec nx run-many -t lint --exclude=eventiva` — the root `eventiva` project must be excluded because its inferred lint target scans the entire workspace root and is extremely slow. Use the project's `check` target (`pnpm exec nx run eventiva:check`) for the canonical CI-like check (lint + format).
- **Build:** `pnpm exec nx run-many -t build --exclude=eventiva` — builds all 4 library packages (core, databases-pg, extensions-hello-world, platforms-default).
- **Test:** `pnpm exec nx run-many -t test --exclude=eventiva` — only `core` has a test target (vitest). Note: `packages/core/tsconfig.json` does not exist (only `tsconfig.lib.json`); the test target will fail until a base tsconfig is added. No spec files exist yet.
- **Run platform:** `pnpm exec nx run platforms-default:run` — requires `packages/platforms/default/src/main.ts` which does not exist yet (pre-alpha rebuild). Use `node --import=tsx/esm` to run ad-hoc scripts that import platform modules.

### Gotchas

- When using `tsx` with `-e` to evaluate inline ESM code, prefer `node --import=tsx/esm -e "..."` over `pnpm exec tsx -e "..."` — the latter can hang when importing Effect-TS layers that use top-level evaluation.
- The project uses ESM throughout (`"type": "module"` in all `package.json` files) with `.js` extensions in import paths resolved via TypeScript's `nodenext` module resolution.
- `packages/platforms/default/tsconfig.run.json` has path aliases for workspace packages — use it when running platform code with tsx.
- PostgreSQL is optional for development; the default platform uses `DatabaseLiveInMemory`. The devcontainer config (`.devcontainer/devcontainer.json`) defines the full PG setup if needed.
