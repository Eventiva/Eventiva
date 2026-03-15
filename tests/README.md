# Eventiva Tests

This directory contains Effect/Vitest tests for the Eventiva codebase, mirroring the `packages/` structure.

## Structure

Tests mirror the package structure:
- `tests/core/src/...` → tests for `packages/core/src/...`
- `tests/databases/pg/src/...` → tests for `packages/databases/pg/src/...`
- `tests/extensions/hello-world/src/...` → tests for `packages/extensions/hello-world/src/...`
- etc.

Each source file should have a corresponding `*.spec.ts` file in the tests directory.

## Running Tests

```bash
# Run all tests
pnpm nx run-many -t test --projects='tests-*'

# Run tests for a specific package
pnpm nx run tests-core:test
```

## Module Resolution

**Note:** Module resolution for `@eventiva/*` imports in tests is currently being configured. Tests should import from package names (e.g., `@eventiva/core`) which resolve to the source files in `packages/`.

## Test Writing Guidelines

See `docs/learnings/effect-vitest-testing.md` for comprehensive guidance on writing Effect/Vitest tests.

Key points:
- Use `@effect/vitest`: `import { it, expect } from "@effect/vitest"`
- Use `it.effect` for Effect-based tests
- Test both success and failure paths using `Effect.exit` and `Exit.succeed`/`Exit.fail`
- Tests must be exhaustive: cover all code paths, edge cases, and error conditions

## Status

Test structure is in place. Module resolution configuration is in progress. Once resolved, all tests should run successfully.
