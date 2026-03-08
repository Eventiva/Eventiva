# Linear Issues Draft (Eventiva Rebuild)

**Note:** Linear MCP was not available in this workspace. This document provides the full specification for initiatives, projects, and buildable issues. When Linear MCP is available (or for manual creation), use Team **Eventiva** (resnovas workspace) and create the following. Each issue must include: Title, Description, Implementation notes, Dependencies, Context, and TDD (for feature/component).

---

## Initiatives

Create these initiatives (e.g. via `mcp_linear_save_initiative`):

1. **Eventiva Rebuild (Effect)** – Top-level rebuild initiative.
2. **Cluster Manager and Cloud Services** – Central DB, Keygen, Neon, self-host registration.
3. **Remove Bit and Modernise Tooling** – Nx, pnpm, no Bit.
4. **Documentation and Contributor Experience** – AsciiDoc, README.adoc → README.md script, learnings.
5. **DevContainer and CI/CD** – No Bit; pnpm install; Nx tasks; optional Postgres.
6. **Extensions and API Mesh (OpenAPI, GraphQL, MCP, gRPC)** – Extension system; Contact base; unified models.

---

## Projects (link to initiatives above)

- **Core / Cluster** – Under Cluster Manager and Cloud Services.
- **Backend / Platform** – Under Eventiva Rebuild.
- **Extensions – Contact** – Under Extensions and API Mesh.
- **Extensions – Helpdesk** – Under Extensions and API Mesh.
- **Extensions – Discord** – Under Extensions and API Mesh.
- **Monorepo / Nx** – Under Remove Bit and Modernise Tooling.
- **Docs / Contributor** – Under Documentation and Contributor Experience.
- **CI / DevContainer** – Under DevContainer and CI/CD.

---

## Example Buildable Issues

### 1. Remove Bit and adopt Nx monorepo (feature)

- **Title:** Remove Bit and adopt Nx monorepo with pnpm
- **Description:** Replace Bit.dev with Nx as the monorepo orchestration layer. pnpm remains package manager. Achieve: project graph, generators, task pipelines, caching, dependency/affected analysis. No Bit registry or lanes. Success: `pnpm install` and Nx commands run; no Bit references in workflows or app.
- **Implementation notes:** Recommend Nx with pnpm (see plan “Monorepo tooling”). Alternatives to document: pnpm workspaces only, Turborepo. Use Nx generators for libs/apps; replace Bit component model with Nx projects.
- **Dependencies:** None (early in order).
- **Context:** Plan Part C “Monorepo tooling”; docs/learnings/ci-and-devcontainer.md, effect-migration-notes.md.
- **TDD:** Deliver type definitions (schema) for any public Nx generator or config first. Tests created by test-creator agent from schema only; implementer must not write tests.

---

### 2. Core – Effect Layer for Gateway (component)

- **Title:** Implement Effect Layer for API Gateway
- **Description:** Single entry point that proxies to backend services. Port configurable (e.g. 5000–5010). Accepts list of backend service URLs/instances. Success: Gateway runs as Effect service; composes with backend Layers.
- **Implementation notes:** Use @effect/platform or Effect HTTP; replace current DefaultGateway. See docs/learnings/architecture.md (Gateway, GatewayContext). Cluster: later integrate with @effect/cluster for distributed gateways.
- **Dependencies:** Remove Bit and adopt Nx (so we have a place for the package).
- **Context:** docs/learnings/architecture.md (gateway-types, runServices).
- **TDD:** Deliver Gateway interface/schema first. Tests from test-creator agent only; implementer does not write tests.

---

### 3. Core – Effect Layer for Backend Server (component)

- **Title:** Implement Effect Layer for Backend Server (context-driven)
- **Description:** Backend server receives context (name, port, routes, gql, middlewares) and returns runnable app (e.g. Express). Success: One Layer per server type; composition via Layer merge; matches BackendContext contract.
- **Implementation notes:** Effect Layer that provides a Server service; `run(context: BackendContext)` returns Effect of ApplicationInstance. See server-types.ts, platform.node.runtime.runService.
- **Dependencies:** Nx monorepo; optional dependency on Gateway (for composition).
- **Context:** docs/learnings/architecture.md (BackendContext, Server).
- **TDD:** Schema first; test-creator agent creates tests; implementer does not write tests.

---

### 4. Extensions – Contact model and Contacts module (feature)

- **Title:** Implement Contact model and Contacts extension (auto-install)
- **Description:** Contact is the base model for every person (attendee, staff, user). Lives in a Contacts extension that is auto-installed on all servers (depends only on core). Success: Contact entity in DB; extension manifest declares dependency on core; when core is present, Contacts installs automatically; unified model referenced by other extensions.
- **Implementation notes:** Effect Schema for Contact; Drizzle or Effect SQL table; extension manifest with `dependsOn: ['core']`, `autoInstall: true`. See plan Part D (1.1); docs/learnings/odoo-extensions-reference.md (unified model).
- **Dependencies:** Core framework (extension loader); DB access Layer.
- **Context:** docs/learnings/odoo-extensions-reference.md; Plan Part D.A (Contact).
- **TDD:** Schema for Contact and public API first; tests by test-creator agent only.

---

### 5. Extensions – Helpdesk module (story)

- **Title:** Implement Helpdesk extension (multi-team, channels, statuses, tags, categories, priorities, attachments, notes, history, automation, reporting, integrations, SLAs)
- **Description:** Helpdesk as test ground for key components. Multiple teams; multiple channels (email, chat, social via extensions); statuses, tags, categories, priorities, attachments, notes, history, automation, reporting, integrations, SLAs. Integrates with Contacts (display contact info, link tickets to contacts, update contact from helpdesk). Knowledge bases, template responses, embedding + vector search for AI. Full extendability (e.g. discounts, deployments).
- **Implementation notes:** Multiple models (Team, Channel, Ticket, Status, Tag, etc.); extension depends on Contacts. Use transform/registry pattern for automation and reporting. See plan Part D (1.2); docs/learnings/evolution-chain-learnings.md (transforms).
- **Dependencies:** Contact extension; core; optional vector store for embeddings.
- **Context:** Plan Part D.A (1.2); odoo-extensions-reference.md (Helpdesk row).
- **TDD:** Per sub-feature: schema first; test-creator agent; implementer does not write tests.

---

### 6. Documentation – README.adoc to README.md script (component)

- **Title:** Add CI script to generate README.md from README.adoc on doc PRs
- **Description:** When a PR to main touches documentation, generate README.md from README.adoc (e.g. in GitHub Actions). AsciiDoc remains source of truth. Success: Script run in CI; README.md committed or published from README.adoc.
- **Implementation notes:** asciidoctor or similar in CI step; trigger on path filter (e.g. `**/*.adoc`, `README.adoc`). See plan “Documentation and licensing”; docs/learnings/docs-and-apis.md.
- **Dependencies:** None (or after Nx so script lives in repo).
- **Context:** docs/learnings/docs-and-apis.md.
- **TDD:** Schema for script input/output if any; tests by test-creator agent.

---

### 7. DevContainer – Node + pnpm + Nx, no Bit (component)

- **Title:** Provide DevContainer with Node, pnpm, Nx; no Bit or paid secrets
- **Description:** DevContainer that runs Node, pnpm, Nx. No Bit registry or BIT_CLOUD_AUTH_TOKEN. Optional Docker Compose for Postgres. Minimal secrets for contributors. Success: Contributor can open in Dev Container and run `pnpm install`, Nx commands.
- **Implementation notes:** .devcontainer/devcontainer.json; install pnpm, Nx; optional docker-compose.yml for Postgres. See docs/learnings/ci-and-devcontainer.md; Plan Part D (Contributor onboarding).
- **Dependencies:** Remove Bit (so no conflict).
- **Context:** docs/learnings/ci-and-devcontainer.md.
- **TDD:** N/A for config (or schema for any helper scripts).

---

### 8. TDD – Test-creation and test-execution workflows (feature)

- **Title:** Implement test-creation and test-execution CI workflows (two repos)
- **Description:** Two repositories: main (code, .d.ts, API contracts) and test (test code). Workflow 1: test-creation – pull definition files from main, create new test files/suites on a branch named to correlate with main branch. Workflow 2: test-execution – pull test code from test repo, run tests against PR, report results to both repos via Linear issues and PR comments. Success: Both workflows run in CI; TDD loop operable.
- **Implementation notes:** GitHub Actions; Nx for task orchestration; Linear API or MCP for creating bugs/tasks. See plan Part D (5.1, 5.2); docs/learnings/tdd-and-test-creation.md.
- **Dependencies:** Nx monorepo; second repo created/configured.
- **Context:** docs/learnings/tdd-and-test-creation.md.
- **TDD:** Schema for workflow inputs/outputs; implementer does not write tests for application code covered by these workflows.

---

### 9. Licensing – One canonical FCL-MIT header (task)

- **Title:** Enforce one canonical FCL-MIT header in every file
- **Description:** Rebuild must keep one canonical license header (identical except file name, “Last modified”). FCL-MIT only. Document the exact header text and add lint/check in CI. Success: Every file has the same header; CI fails if missing or wrong.
- **Implementation notes:** Copy header from existing Eventiva file; ESLint or custom script to check; CONTRIBUTING/CoC links, Eventiva Cooperation Commitment. See docs/learnings/conventions.md.
- **Dependencies:** None.
- **Context:** docs/learnings/conventions.md.

---

### 10. Extensions – Discord integration (feature)

- **Title:** Implement Discord integration extension (multiple bots, manage channels/roles/users, helpdesk from Discord)
- **Description:** Multiple Discord bots; manage channels, roles, users, permissions from Discord inside the system. Create, respond to, interact with helpdesk tickets from Discord. Bots highly configurable: custom commands and interactions from UI, stored as plain text. Success: At least one bot runs; helpdesk tickets creatable/updatable from Discord; configurable commands.
- **Implementation notes:** Effect-based Discord client(s); extension depends on Helpdesk and Contacts. Config entity for command text. See plan Part D (1.3).
- **Dependencies:** Helpdesk extension; Contact extension; core.
- **Context:** Plan Part D.A (1.3).
- **TDD:** Schema first for bot API and config; tests by test-creator agent only.

---

## Labels to use

- `type:story` | `type:feature` | `type:component`
- `tier1:i18n` | `tier1:feature-flags` (where applicable)
- `initiative:rebuild` | `initiative:cluster` | `initiative:extensions` | `initiative:docs` | `initiative:ci` (if not using initiative hierarchy)

---

## Order suggestion

1. Remove Bit and adopt Nx (foundation).
2. Core Gateway and Backend Server Layers (architecture).
3. Core extension loader and manifest (auto-install).
4. Contact model and Contacts extension.
5. Helpdesk extension (incremental).
6. Documentation script, DevContainer, CI workflows, licensing.
7. Discord integration.
8. Further extensions (Accounting, Calendar, etc.) per plan table.

Use this draft with Linear MCP when available, or create issues manually from each section. Link to `docs/learnings/` and the plan where indicated.

---

## Database and Entity Abstraction (Plan: database_and_entity_abstraction)

**Context:** Plan "Database-Backed Entities and Core Entity Abstraction". Initiatives: Extensions and API Mesh, Core.

### Implemented in codebase

- Database service interface in core; in-memory Database layer; CRUD handlers using Database; schema encryption (Schema.encryptedString); base schema fields and status enum; createEntity; database-pg extension (package, layer, impl, table builder); Contact migrated to createEntity + encrypted email; platform provides Database layer; entity method extension registry and runWithExtensions integrated; EmbeddingService interface and no-op/custom layer.

### Deferred (track separately)

- **Title:** Reporting / generateRelations (deferred)
- **Description:** Dynamic report generation from arbitrary entry points (e.g. generateRelations from common-crm). Deferred to a dedicated plan; do not implement as part of Database and Entity Abstraction.
- **Implementation notes:** See common-crm reference; plan section "What to defer".
- **Dependencies:** Entity abstraction (done).
- **Context:** Plan "Database and Entity Abstraction" section 6; docs/learnings/architecture.md.
- **TDD:** Schema first when implemented; test-creator agent only.

