# Eventiva Learnings

This folder contains structured learnings from the Eventiva codebase, the evolution chain (Eventiva → cms → common-crm), and Odoo/climb-group-odoo. Use these documents when making architectural or convention decisions during the rebuild.

## Purpose

- **Versioned with Eventiva** – Learnings live in the repo so contributors and agents can reuse them without Bit, JetClient, or paid tooling.
- **Reference for rebuild** – Each file captures patterns, requirements, and “what to take vs avoid” to feed Linear issues and implementation.

## Files

| File                                                         | Description                                                                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| [architecture.md](architecture.md)                           | Backend composition, Gateway → servers, Slot-based composition, platform vs runtimes.                               |
| [conventions.md](conventions.md)                             | File headers (FCL-1.0-MIT), naming, scopes, component boundaries.                                                   |
| [tdd-and-test-creation.md](tdd-and-test-creation.md)         | TDD policy: builders do not write tests; test-creator agent (full source access); test-runner agent; feedback loop.  |
| [effect-vitest-testing.md](effect-vitest-testing.md)         | How to write Effect/Vitest tests using @effect/vitest: it.effect, it.live, it.scoped, TestClock, Exit, etc.          |
| [modular-include-exclude.md](modular-include-exclude.md)     | How Bit aspects controlled inclusion; requirements for rebuild (config- or package-list-driven).                    |
| [docs-and-apis.md](docs-and-apis.md)                         | Docs layout, AsciiDoc as source, README.adoc → README.md script requirement, replacing JetClient-style docs.        |
| [ci-and-devcontainer.md](ci-and-devcontainer.md)             | Bit-dependent workflows; target CI/devcontainer; **local Postgres + `psql` inspection** (PGHOST vs HOST).              |
| [effect-migration-notes.md](effect-migration-notes.md)       | Effect Layer/Schema/Service vs current Zod/Aspect/Slot; i18n and feature flags as tier 1; no `any` types.           |
| [evolution-chain-learnings.md](evolution-chain-learnings.md) | common-crm vs cms vs Eventiva (equivalent files); TypeScript/Effect evolution.                                      |
| [odoo-extensions-reference.md](odoo-extensions-reference.md) | What to take from Odoo for Eventiva extensions; what to avoid; climb-group-odoo learnings.                          |
| [debug-initial-crash.md](debug-initial-crash.md)             | Debugging "Cannot read properties of undefined (reading 'initial')" – feature flags, workarounds, dependency audit. |
| [code-quality-sync.md](code-quality-sync.md)                 | EditorConfig, Trunk, and Nx: keep lint/format config in sync; commands for check and fix.                           |
| [module-boundaries.md](module-boundaries.md)                 | Module boundary rules, dependency constraints, tagging strategy, ESLint enforcement.                                  |

## How to update

- Keep content factual and concise (bullets, code references, file paths).
- When the rebuild uncovers new patterns, add them here and link from Linear issues.
