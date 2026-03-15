# Eventiva Test Runner Dev Container

This devcontainer is **for running and writing tests only**. It initializes the tests repository submodule so you can run tests and write new test cases.

**Important:** Do **not** use this devcontainer for feature implementation work with AI tools. Use the main devcontainer (`.devcontainer/devcontainer.json`) for implementation, which excludes the tests repository.

## What's Different

- **Tests submodule:** The `tests/` submodule is initialized in `postCreateCommand`, then the default branch is checked out and pulled so you get the latest from the tests repo.
- **Same base setup:** Node.js 22, pnpm 9, nx, PostgreSQL 16 (same as main devcontainer)
- **Test mode flag:** `EVENTIVA_TEST_MODE=true` environment variable is set

## Usage

After opening this devcontainer:

1. Install dependencies (if not already done):
   ```sh
   pnpm install
   ```

2. Run all tests:
   ```sh
   pnpm nx run-many -t test --projects='tests-*'
   ```

3. Run tests for a specific package:
   ```sh
   pnpm nx run tests-core:test
   ```

4. Write new tests following the guide in `docs/learnings/effect-vitest-testing.md`

## When to Use

- ✅ Running tests locally
- ✅ Writing new test cases
- ✅ Reviewing test code
- ✅ Debugging test failures

## When NOT to Use

- ❌ Implementing new features
- ❌ Writing implementation code
- ❌ Using AI tools for code generation (they should not see tests)

For implementation work, use the main devcontainer (`.devcontainer/devcontainer.json`).

## References

- TDD policy: `docs/learnings/tdd-and-test-creation.md`
- Effect Vitest guide: `docs/learnings/effect-vitest-testing.md`
