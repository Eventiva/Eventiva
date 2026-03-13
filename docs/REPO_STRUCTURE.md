# Eventiva – Nx Monorepo Structure

This document describes the repository layout after the Part D.C cleanup and Nx rebuild. The repo is primed for implementing tasks from the Linear issues draft (`docs/linear-issues-draft.md`) and the plan (`.cursor/plans/eventiva_learnings_and_rebuild_f7373630.plan.md`).

## Root

- **package.json** – pnpm workspace root; Nx scripts (`build`, `lint`, `test`, `nx`).
- **pnpm-workspace.yaml** – pnpm workspaces: `apps/*`, `libs/*`.
- **nx.json** – Nx root config; default base `main`; targetDefaults for build/lint/test.
- **docs/** – Learnings (`docs/learnings/`), Linear issues draft (`docs/linear-issues-draft.md`).
- **.cursor/** – Plans, rules (TDD, learnings reference).
- **.github/workflows/** – Security and management workflows only (no Bit components-\*).

## Apps (`apps/`)

- **gateway** – API gateway entry point. Will be Effect-based; proxies to backend services.
- **platform** – Main platform orchestrator (Effect Layers, cluster). Composes gateway and backends.
- **mobile** – Zephyr wrapper UI; **React Native as primary React flavour**. Extension UIs mount here. To be wired with Zephyr (module federation for React Native) so multiple UI modules can be created.

## Libs (`libs/`)

- **core** – Shared core types, config, extension manifest. Framework-only; no business logic.
- **ui-module-loader** – Zephyr-based loader for extension UIs. Placeholder until Zephyr integration.

## Zephyr and React Native

Per the plan, the UI uses a **Zephyr**-based wrapper so that:

- Multiple UI modules can be created as extensions.
- **React Native** is the primary React flavour.
- Extension UIs are mounted per extension (host/remote module federation pattern).

Next steps (when implementing):

1. Add React Native and Zephyr (e.g. Zephyr Cloud or equivalent) to `apps/mobile` and `libs/ui-module-loader`.
2. Configure module federation (Metro or Re.Pack) so extension UIs can be loaded as remotes.
3. Add further apps/libs as needed (e.g. backend services, extensions for Contact, Helpdesk, Discord).

## Commands

- `pnpm install` – Install dependencies.
- `pnpm nx run-many -t build` – Build all projects.
- `pnpm nx run-many -t lint` – Lint all.
- `pnpm nx run-many -t test` – Test all.
- `pnpm nx graph` – View project graph (after `pnpm install`).

## Learnings and plan

- **Learnings:** `docs/learnings/README.md` (index) and themed files (architecture, conventions, TDD, Effect migration, Odoo reference, etc.).
- **Linear draft:** `docs/linear-issues-draft.md` – create these issues in Linear when MCP or manual creation is used.
- **Plan:** `.cursor/plans/eventiva_learnings_and_rebuild_f7373630.plan.md` – Parts A–C (planning), Part D (execution).
