# Effect Vitest Testing Guide

This guide explains how to write tests for Effect-based code using `@effect/vitest` and Vitest in Eventiva.

## Reference

- Official guide: [Effect Vitest README](https://github.com/Effect-TS/effect/blob/main/packages/vitest/README.md)

## Setup

Install dependencies:

```bash
pnpm add -D vitest @effect/vitest
```

Ensure `vitest` is version `1.6.0` or later.

## Basic Usage

Import the enhanced `it` function from `@effect/vitest`:

```typescript
import { it, expect } from "@effect/vitest"
import { Effect } from "effect"
```

## Test Types

### `it.effect` - Standard Effect Tests

Automatically provides a `TestContext` (e.g., `TestClock`) when running a test.

**Syntax:**
```typescript
it.effect("test name", () => EffectContainingAssertions, timeout: number | TestOptions = 5_000)
```

**Example - Testing Success:**
```typescript
import { it, expect } from "@effect/vitest"
import { Effect } from "effect"

function divide(a: number, b: number) {
  if (b === 0) return Effect.fail("Cannot divide by zero")
  return Effect.succeed(a / b)
}

it.effect("test success", () =>
  Effect.gen(function* () {
    const result = yield* divide(4, 2)
    expect(result).toBe(2)
  })
)
```

**Example - Testing Success and Failure with Exit:**
```typescript
import { it, expect } from "@effect/vitest"
import { Effect, Exit } from "effect"

it.effect("test success as Exit", () =>
  Effect.gen(function* () {
    const result = yield* Effect.exit(divide(4, 2))
    expect(result).toStrictEqual(Exit.succeed(2))
  })
)

it.effect("test failure as Exit", () =>
  Effect.gen(function* () {
    const result = yield* Effect.exit(divide(4, 0))
    expect(result).toStrictEqual(Exit.fail("Cannot divide by zero"))
  })
)
```

### `it.live` - Live Environment Tests

Runs the test with the live Effect environment (real clock, real logging, etc.).

```typescript
it.live("runs with live environment", () =>
  Effect.gen(function* () {
    yield* Effect.log("This log will be displayed")
    // Uses real system clock
  })
)
```

### `it.scoped` - Tests Requiring Scope

Use when your Effect program requires a `Scope` (e.g., for resource management).

```typescript
import { it } from "@effect/vitest"
import { Effect } from "effect"

const resource = Effect.acquireRelease(
  Effect.log("acquire resource"),
  () => Effect.log("release resource")
)

it.scoped("run with scope", () =>
  Effect.gen(function* () {
    yield* resource
  })
)
```

### `it.scopedLive` - Scoped + Live

Combines `scoped` and `live` features.

```typescript
it.scopedLive("scoped with live environment", () =>
  Effect.gen(function* () {
    yield* resource
    yield* Effect.log("Live logging enabled")
  })
)
```

### `it.flakyTest` - Retry Flaky Tests

For tests that may occasionally fail due to timing, randomness, or external dependencies.

```typescript
import { it } from "@effect/vitest"
import { Effect, Random } from "effect"

const flaky = Effect.gen(function* () {
  const random = yield* Random.nextBoolean
  if (random) {
    return yield* Effect.fail("Failed due to randomness")
  }
})

it.effect("retrying until success or timeout", () =>
  it.flakyTest(flaky, "5 seconds")
)
```

## Using TestClock

When writing tests with `it.effect`, a `TestContext` is automatically provided, giving access to `TestClock` for simulating time.

**Example:**
```typescript
import { it } from "@effect/vitest"
import { Clock, Effect, TestClock } from "effect"

const logNow = Effect.gen(function* () {
  const now = yield* Clock.currentTimeMillis
  console.log(now)
})

// Uses real system clock
it.live("runs with live clock", () => logNow)

// Uses test clock (starts at 0)
it.effect("runs with test clock", () =>
  Effect.gen(function* () {
    yield* logNow // Prints 0
  })
)

// Advance test clock
it.effect("advance test clock", () =>
  Effect.gen(function* () {
    yield* TestClock.adjust("1000 millis")
    yield* logNow // Prints 1000
  })
)
```

## Test Modifiers

### Skip Tests

```typescript
it.effect.skip("temporarily disabled test", () => /* ... */)
```

### Run Only One Test

```typescript
it.effect.only("run only this test", () => /* ... */)
```

### Expect Test to Fail

```typescript
it.effect.fails("test that should fail", ({ expect }) =>
  Effect.gen(function* () {
    const result = yield* Effect.exit(someFunction())
    expect(result).toStrictEqual(/* wrong expectation */)
  })
)
```

## Logging

By default, `it.effect` suppresses log output. To enable logging:

**Option 1: Use `it.live`**
```typescript
it.live("displays logs", () =>
  Effect.gen(function* () {
    yield* Effect.log("This will be displayed")
  })
)
```

**Option 2: Provide a custom logger**
```typescript
import { Logger } from "effect"

it.effect("with custom logger", () =>
  Effect.gen(function* () {
    yield* Effect.log("This will be displayed")
  }).pipe(
    Effect.provide(Logger.pretty)
  )
)
```

## Project-Specific Conventions

### Test Location

Tests live under `tests/<package-path>/src/**/*.spec.ts`, mirroring the `packages/<package-path>/src/**/*.ts` structure.

Example:
- `packages/core/src/cluster/config.ts` → `tests/core/src/cluster/config.spec.ts`

### Test Structure

- Use `@effect/vitest` for all Effect-based tests
- One `describe` block per module or file
- One or more `it.effect` (or variant) per exported callable or behavior
- Test both success and failure paths using `Effect.exit` and `Exit.succeed`/`Exit.fail`
- Use `TestClock` for time-dependent code
- Tests must be exhaustive: cover success, failure, boundary/edge cases, and error branches

### Module Resolution

When tests run from the main repo CI, `@eventiva/*` imports resolve to the main repo's implementation (`packages/` or `dist/`). The tests repo does not contain implementation code.

### Example Test File

```typescript
import { describe, it, expect } from "@effect/vitest"
import { Effect, Exit } from "effect"
import { someFunction } from "@eventiva/core/src/some-module"

describe("some-module", () => {
  it.effect("someFunction succeeds with valid input", () =>
    Effect.gen(function* () {
      const result = yield* someFunction("valid")
      expect(result).toBeDefined()
    })
  )

  it.effect("someFunction fails with invalid input", () =>
    Effect.gen(function* () {
      const result = yield* Effect.exit(someFunction("invalid"))
      expect(result).toStrictEqual(Exit.fail("Invalid input"))
    })
  )
})
```

## References

- [Effect Vitest README](https://github.com/Effect-TS/effect/blob/main/packages/vitest/README.md)
- [Effect Testing Guide](https://effect.website/docs/guides/testing/testclock)
- [TDD and Test Creation](tdd-and-test-creation.md)
