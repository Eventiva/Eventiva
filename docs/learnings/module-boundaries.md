# Module Boundaries and Dependency Management

This document describes the module boundary rules and dependency constraints enforced in the Eventiva monorepo.

## Purpose

As the Eventiva codebase grows, maintaining clear architectural boundaries prevents dependency chaos and ensures a maintainable structure. Module boundaries enforce which packages can depend on which other packages, based on their type and role in the system.

## Module Types

We use a tag-based system to categorize modules:

### `type:core`

**Examples**: `@eventiva/core`

- **Purpose**: Core functionality shared across all modules
- **Can depend on**: Nothing (self-contained)
- **Can be depended on by**: All module types
- **Use case**: Foundation libraries, shared utilities, base types

### `type:database`

**Examples**: `@eventiva/databases.pg`

- **Purpose**: Database implementations and adapters
- **Can depend on**: `type:core` only
- **Can be depended on by**: `type:platform` only (runtime dependencies)
- **DevDependencies**: Other modules may include database packages in `devDependencies` for type imports during development
- **Use case**: Database drivers, connection pools, database-specific schemas
- **Note**: Databases are injected via Effect's dependency injection (Yield*), not direct imports in production code

### `type:extension`

**Examples**: `@eventiva/extensions.contact`, `@eventiva/extensions.hello-world`, `@eventiva/extensions.users` (future)

- **Purpose**: Feature modules that extend platform functionality
- **Can depend on**: `type:core`, `type:extension` (other extensions)
- **Can be depended on by**: `type:extension` (other extensions), `type:platform`
- **Use case**: Business logic modules, feature implementations
- **Note**: Extensions can depend on each other (e.g., `users` depends on `contact`)

### `type:platform`

**Examples**: `@eventiva/platforms.default`

- **Purpose**: Top-level application/platform entry points
- **Can depend on**: All module types (`type:core`, `type:database`, `type:extension`, `type:platform`)
- **Can be depended on by**: Nothing (top of dependency tree)
- **Use case**: Application entry points, platform configurations, runtime orchestration

## Dependency Rules Summary

| Source Type | Can Depend On |
|------------|---------------|
| `type:core` | (nothing) |
| `type:database` | `type:core` |
| `type:extension` | `type:core`, `type:extension` |
| `type:platform` | `type:core`, `type:database`, `type:extension`, `type:platform` |

## Enforcement

### ESLint Rule

Module boundaries are enforced via the `@nx/enforce-module-boundaries` ESLint rule in `eslint.config.mjs`. Violations will cause lint errors.

### Tagging Projects

Tags are defined in `project.json` files:

```json
{
  "tags": ["type:extension"]
}
```

### DevDependencies Exception

While runtime dependencies are strictly enforced, `devDependencies` are allowed for type imports. For example, an extension can include `@eventiva/databases.pg` in `devDependencies` to import types for development work, even though it cannot have it as a runtime dependency.

## Examples

### ✅ Valid Dependencies

- `@eventiva/extensions.users` → `@eventiva/extensions.contact` (extension depends on extension)
- `@eventiva/extensions.contact` → `@eventiva/core` (extension depends on core)
- `@eventiva/platforms.default` → `@eventiva/databases.pg` (platform depends on database)
- `@eventiva/platforms.default` → `@eventiva/extensions.contact` (platform depends on extension)

### ❌ Invalid Dependencies

- `@eventiva/extensions.contact` → `@eventiva/databases.pg` (extension cannot depend on database in runtime)
- `@eventiva/extensions.contact` → `@eventiva/platforms.default` (extension cannot depend on platform)
- `@eventiva/core` → `@eventiva/extensions.contact` (core cannot depend on extensions)
- `@eventiva/databases.pg` → `@eventiva/extensions.contact` (database cannot depend on extensions)

### ✅ DevDependencies (Allowed)

- `@eventiva/extensions.contact` → `@eventiva/databases.pg` (in `devDependencies` for type imports)

## GitHub Labels

Module type tags are synchronized with GitHub labels via smartcloud configuration (`.github/config.json`). Labels use the same naming convention (`type:core`, `type:database`, etc.) for consistency.

## Future Modules

When adding new modules:

1. **Determine the module type** based on its purpose
2. **Add the appropriate tag** to `project.json`
3. **Verify dependencies** comply with the rules above
4. **Run lint** to ensure boundaries are respected: `pnpm nx lint`

### Common Patterns

- **Business domain modules** (users, communities, etc.) → `type:extension`
- **Database adapters** → `type:database`
- **Shared utilities** → `type:core`
- **Application entry points** → `type:platform`

## Related Documentation

- [Nx Module Boundaries](https://nx.dev/docs/features/enforce-module-boundaries)
- [Architecture Learnings](./architecture.md) - Overall system architecture
- [Conventions](./conventions.md) - Coding conventions and standards
