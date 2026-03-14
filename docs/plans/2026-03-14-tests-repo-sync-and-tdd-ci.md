# Tests repo sync and TDD CI plan

**Date:** 2026-03-14

## Goal

Build an operational two-repo TDD loop where:

1. This repo (main) owns implementation code and schemas/contracts.
2. `Eventiva/tests` owns tests and committed `dist/` snapshots used as schema-only input for AI test creation.
3. CI keeps branches in sync, updates tests from contract diffs, runs tests against main implementation, and gates PRs.

This plan follows `docs/learnings/tdd-and-test-creation.md`:
- implementers do not write tests for the same feature work,
- test creation is schema-only,
- existing tests are never deleted.

## Non-goals

- No migration of existing business modules in this phase.
- No Bit tooling or lane workflows.
- No requirement for the tests repo to run an independent CI gate (main CI is the source of truth).

## Architecture summary

### Repositories

- **Main repo (this one):** source code, Nx config, build pipeline.
- **Tests repo (`Eventiva/tests`):** test projects mirroring package paths and committed `dist/` snapshots from main CI.

### Trust and visibility boundaries

- AI test creation receives only schema-level diff from `dist/` changes.
- Test execution in main CI resolves `@eventiva/*` to main implementation (`packages/*` and/or main build output), not tests-repo `dist`.
- PR feedback is sanitized (suite/test names + messages + coverage summary; no test code/paths).

## Required workflows (main repo)

### 1) Branch sync workflow

- **File:** `.github/workflows/tests-repo-branch-sync.yml`
- **Trigger:** `push` to non-`main` branches.
- **Responsibility:** ensure matching branch exists in `Eventiva/tests`.
- **Auth:** `BOT_TOKEN`.
- **Rules:** idempotent branch create, no force push.

### 2) PR TDD workflow

- **File:** `.github/workflows/tests-repo-pr-tdd.yml`
- **Trigger:** `pull_request` (`opened`, `synchronize`, `reopened`).
- **Gate:** required status check in branch protection.

### Job 1 - Build main and export dist artifact

- Checkout PR head.
- `pnpm install --no-frozen-lockfile`.
- Build via Nx (`pnpm nx run-many -t build`).
- Upload `dist/` artifact.

### Job 2 - Sync dist to tests repo and create/update tests

- Checkout `Eventiva/tests` same branch (create from default branch if missing).
- Download/copy `dist/`.
- Commit updated `dist/` in tests repo.
- Compute schema diff (`git diff <base> -- dist/`).
- Run Cursor CLI with `CURSOR_API_KEY` using prompt constraints:
    - only use diff as input contract,
    - only add/update tests and related test workflow files,
    - never delete existing tests.
- Commit generated test updates and push using `BOT_TOKEN`.

### Job 3 - Execute tests from tests repo against main implementation

- Checkout main PR branch.
- Ensure build output is available (`dist/` artifact or rebuild).
- Clone tests repo branch into `tests/` in workspace.
- Run tests from main Nx context (for example `pnpm nx run-many -t test` with tests projects under `tests/`).
- Enforce coverage threshold (minimum 80%).
- Publish artifacts (coverage + machine-readable test result files).
- Produce sanitized summary for PR reporting.

### Job 4 - Bot review decision

- On pass: submit `APPROVE` review with concise status.
- On fail: submit `REQUEST_CHANGES` with sanitized failure summary.

### 3) Merge sync workflow

- **File:** `.github/workflows/tests-repo-merge-sync.yml`
- **Trigger:** merged PRs to `main` (or push to `main` with PR metadata lookup).
- **Responsibility:** merge corresponding tests-repo branch into tests repo default branch.
- **Auth:** `BOT_TOKEN`.
- **Rules:** handle already-merged and missing-branch cases without failing the whole pipeline.

## Nx and repository shape requirements

### Main repo

- Keep `tests/` as the CI clone location for `Eventiva/tests`.
- Ensure Nx can discover projects under `tests/**/project.json`.
- Add one always-passing placeholder test project in `tests/.placeholder` so local/CI `run-many -t test` does not fail when tests repo is absent.

### Tests repo (`Eventiva/tests`)

- Mirror main package paths as test projects (e.g. main `packages/core` maps to tests repo `core` project consumed in main as `tests/core`).
- Keep `dist/` committed (not gitignored) for diff-driven schema updates.
- Package naming convention: `@eventiva/tests.<path-as-dots>`.
- Include Vitest projects and Step CI workflow assets where applicable.

## API/integration testing policy

Use Step CI inside Vitest (`@stepci/runner`) for:
- contract checks (e.g. OpenAPI-aligned),
- SSE coverage where endpoints exist,
- CO2 checks where relevant.

Step CI files remain in tests repo and are executed from the main CI run.

## Security and secrets

- `BOT_TOKEN`: cross-repo branch create/push, PR review/comment/check operations, merge sync.
- `CURSOR_API_KEY`: headless Cursor CLI test-creator step.
- Never post raw test files or code snippets into PR comments.

## Rollout plan

1. Add branch-sync workflow and verify non-main push creates tests-repo branch.
2. Add PR TDD workflow Job 1 + Job 2 (`dist` sync only), verify committed `dist` updates in tests repo.
3. Enable Cursor CLI generation in Job 2 with strict prompt guardrails.
4. Add Job 3 test execution and coverage gate.
5. Add Job 4 bot approve/request-changes behavior.
6. Add merge-sync workflow.
7. Turn on branch protection requiring TDD check.

## Acceptance criteria

- Any new feature branch in main auto-exists in tests repo.
- PR updates main `dist` and corresponding tests in tests repo branch.
- Test creation step uses schema-only input (`dist` diff) and never deletes tests.
- Main PR is blocked if tests fail or coverage is below threshold.
- PR receives sanitized TDD summary and bot review outcome.
- Merging main PR syncs tests repo default branch.

## Risks and mitigations

- **Cross-repo auth failures:** validate `BOT_TOKEN` scopes early with dry-run API checks.
- **Large `dist` churn:** constrain build output and diff parsing to API/surface artifacts where possible.
- **Resolution drift (`@eventiva/*`):** explicitly pin test runtime module resolution to main implementation.
- **No tests-repo branch at PR open:** branch-sync workflow on push plus fallback branch create in PR job.

## Deliverables for implementation issue(s)

- `.github/workflows/tests-repo-branch-sync.yml`
- `.github/workflows/tests-repo-pr-tdd.yml`
- `.github/workflows/tests-repo-merge-sync.yml`
- `tests/.placeholder/` Nx test project (main repo)
- contributor docs for required secrets and expected workflow behavior
