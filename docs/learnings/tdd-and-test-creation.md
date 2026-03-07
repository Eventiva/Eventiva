# TDD and Test Creation (Mandatory for Build Phase)

This document defines the TDD policy for the Eventiva rebuild. It must be reflected in Linear issue descriptions, in Cursor rules, and in automation (test-creator and test-runner agents).

## Rule: builders do not write tests

If the same agent that implements a feature or component also writes its tests, it tends to optimise tests to the implementation (tests that pass rather than tests that specify behaviour). To avoid that:

1. **Building agent** – Implements the feature/component only. It must **not** add or modify tests for that work. It may write or update **type definitions** (schema) that describe the public API.
2. **Test-creator agent** – A **separate** agent is responsible for creating **all** tests. This agent:
   - Has **no context or workspace access** to the implementation (no view of runtime code, no repo access).
   - Receives **only the function/API schema**: **input types** and **output types** (and any error/effect types if relevant). In other words, the same information that would appear in a **`.d.ts`** file—signatures and types only, **no runtime code**.
   - Produces tests that specify expected behaviour from the contract alone.
3. **Test-runner agent (third agent)** – Runs the tests against the code. Has both tests and code. Does **not** create or delete tests; only runs them and acts on results (see feedback loop below).

## Schema format for the test creator

Declaration-only: function and method names, parameter types, return types, exported types. No function bodies, no implementation details. Can be extracted from TypeScript (e.g. emitted `.d.ts`) or from Effect Schema/OpenAPI definitions, as long as no runtime code is included.

## Feedback loop (test-runner agent)

After tests are created, the test-runner agent executes them against the implementation:

- **If the code fails (tests fail)** – Create a **bug in Linear** for the main coding agents. Provide only: (1) the **function type definition** (schema), and (2) a **very broad explanation** (e.g. “80% code coverage”, “unexpected result, was expecting x got y”). **No existing test should ever be deleted**—fix the implementation, not the tests.
- **If coverage is not 100% or something unexpected** (e.g. missing edge cases) – Create a **task in Linear for the test creator** to improve the tests. Provide only: (1) the function type definition, and (2) a broad explanation. The test creator adds or refines tests; **no existing test should ever be deleted**.
- **When a function is modified or improved** – Create a task for the test creator to **improve the tests** so they stay in sync with the updated contract/behaviour. Tests only ever grow or are refined; they are never removed.

## Golden rule

**No existing test should ever be deleted.** If the code fails, fix the code. If coverage or behaviour is insufficient, improve the tests; do not remove them.

## Implications for planning

- Linear issues for features/components must state: “Deliver type definitions (schema) first; tests are created by the separate test-creator agent from schema only; implementer must not write tests for this work; test-runner agent runs tests and creates Linear bugs/tasks per the feedback loop above.”
- CI: two repos (main = code + schema; test repo = tests). Two workflows: test-creation (pull definitions from main, create tests on a branch); test-execution (pull tests from test repo, run against PR, report to both repos via Linear and PR comments).

## References

- Cursor rule: `.cursor/rules/tdd-test-creation.mdc`
- Plan: Eventiva Learnings and Rebuild plan, “TDD and test creation” and Part D (Execution).
