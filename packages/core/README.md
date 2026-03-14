# @eventiva/core

Core Eventiva functionality and shared utilities.

This library is part of the Eventiva monorepo and uses [Nx](https://nx.dev) for build orchestration.

## Building

Build this library:

```sh
pnpm nx build core
```

Or build all packages:

```sh
pnpm nx run-many -t build
```

The build output is written to `dist/core`.

## Testing

Run tests:

```sh
pnpm nx test core
```

Or run all tests:

```sh
pnpm nx run-many -t test
```

Tests use [Vitest](https://vitest.dev) and are configured in `vitest.config.ts`.

## Linting

Lint this package:

```sh
pnpm nx lint core
```

## Type Checking

Type check this package:

```sh
pnpm nx typecheck core
```
