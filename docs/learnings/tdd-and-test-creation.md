# TDD and Test Creation (Mandatory for Build Phase)

This document defines the TDD policy for the Eventiva rebuild. It must be reflected in Linear issue descriptions, in Cursor rules, and in automation (test-creator and test-runner agents).

## Rule: builders do not write tests

If the same agent that implements a feature or component also writes its tests, it tends to optimise tests to the implementation (tests that pass rather than tests that specify behaviour). To avoid that:

1. **Building agent** – Implements the feature/component only. It must **not** add or modify tests for that work. It may write or update **type definitions** (schema) that describe the public API.
2. **Test-creator agent** – A **separate** agent is responsible for creating **all** tests. This agent:
    - Has **full read access** to the implementation (main repo source code in `packages/`). This allows it to write exhaustive, correct Effect/Vitest tests that understand the actual implementation behavior.
    - Uses the **full source code** plus docstrings (from declarations) to understand intended behavior and write comprehensive tests.
    - Produces tests that specify expected behaviour based on the implementation and documented contracts.
3. **Test-runner agent (third agent)** – Runs the tests against the code. Has both tests and code. Does **not** create or delete tests; only runs them and acts on results (see feedback loop below).

## Input format for the test creator

The test-creator has **full read access to the main repo source code** (`packages/**/*.ts`). It uses:
- The complete implementation source code to understand actual behavior
- Docstrings from declarations (`@remarks`, `@example`, `@param`, `@returns`) to understand intended behavior
- Type definitions and exported interfaces

This allows the test-creator to write exhaustive, correct tests that cover all code paths, edge cases, and error conditions.

## Feedback loop (test-runner agent)

After tests are created, the test-runner agent executes them against the implementation:

- **If the code fails (tests fail)** – Create a **bug in Linear** for the main coding agents. Provide only: (1) the **function type definition** (schema), and (2) a **very broad explanation** (e.g. “80% code coverage”, “unexpected result, was expecting x got y”). **No existing test should ever be deleted**—fix the implementation, not the tests.
- **If coverage is not 100% or something unexpected** (e.g. missing edge cases) – Create a **task in Linear for the test creator** to improve the tests. Provide only: (1) the function type definition, and (2) a broad explanation. The test creator adds or refines tests; **no existing test should ever be deleted**.
- **When a function is modified or improved** – Create a task for the test creator to **improve the tests** so they stay in sync with the updated contract/behaviour. Tests only ever grow or are refined; they are never removed.

## Golden rule

**No existing test should ever be deleted.** If the code fails, fix the code. If coverage or behaviour is insufficient, improve the tests; do not remove them.

## Implications for planning

- Linear issues for features/components must state: “Deliver implementation code with complete docstrings; tests are created by the separate test-creator agent which has full read access to the implementation; implementer must not write tests for this work and must never have access to the tests repo when doing implementation work; test-runner agent runs tests and creates Linear bugs/tasks per the feedback loop above.”
- CI: two repos (main = code; test repo = tests). Two workflows: test-creation (test-creator has full read access to main repo source, writes tests to tests repo); test-execution (pull tests from test repo, run against main repo implementation, report to both repos via Linear and PR comments). **Critical:** Implementation workflows (build, lint, typecheck) must **never** clone or access the tests repo, so the builder/implementer AI never sees test code. Current workflow files in main repo: `.github/workflows/ci.yml` (main checks + TDD flow), `.github/workflows/tests-repo-branch-sync.yml`, `.github/workflows/tests-repo-merge-sync.yml`.

## References

- Cursor rule: `.cursor/rules/tdd-test-creation.mdc`
- Effect Vitest testing guide: `docs/learnings/effect-vitest-testing.md`
- Plan: Eventiva Learnings and Rebuild plan, “TDD and test creation” and Part D (Execution).
- Implementation plan: `docs/plans/2026-03-14-tests-repo-sync-and-tdd-ci.md`
