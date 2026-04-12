# Module Boundaries and Dependency Management

This document describes the module boundary rules and dependency constraints enforced in the Eventiva monorepo.

## Purpose

As the Eventiva codebase grows, maintaining clear architectural boundaries prevents dependency chaos and ensures a maintainable structure. Module boundaries enforce which packages can depend on which other packages, based on their type and role in the system.

## Tag System

We use a multi-tag system to categorize modules across three dimensions:

1. **Type** (`type:*`) - Module architectural role
2. **Layer** (`layer:*`) - Frontend/backend separation
3. **Capability** (`capability:*`) - What the module provides (entities, workflows, UI)

Projects can have multiple tags (e.g., `["type:extension", "layer:backend", "capability:entities", "capability:workflows"]`).

## Module Types

### `type:core`

**Examples**: `@eventiva/core`

- **Purpose**: Core functionality shared across all modules
- **Can depend on**: Nothing (self-contained)
- **Can be depended on by**: All module types
- **Use case**: Foundation libraries, shared utilities, base types

### `type:database`

**Examples**: `@eventiva/databases.pg` (shared Drizzle dialect facades and backend registry live in `@eventiva/core`)

- **Purpose**: Database implementations and adapters
- **Can depend on**: `type:core`, `type:shared`
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

**Examples**: `@eventiva/platforms.postgresql`

- **Purpose**: Top-level application/platform entry points
- **Can depend on**: All module types (`type:core`, `type:database`, `type:extension`, `type:platform`)
- **Can be depended on by**: Nothing (top of dependency tree)
- **Use case**: Application entry points, platform configurations, runtime orchestration

## Layer Tags

### `layer:backend`

- **Purpose**: Backend/server-side code
- **Can depend on**: `layer:backend`, `layer:shared`
- **Use case**: Server logic, API handlers, database operations, business logic

### `layer:frontend`

- **Purpose**: Frontend/client-side code
- **Can depend on**: `layer:frontend`, `layer:shared`
- **Use case**: React components, UI libraries, client-side state management

### `layer:shared`

- **Purpose**: Code shared between frontend and backend
- **Can depend on**: `layer:shared` only
- **Use case**: Type definitions, validation schemas, shared utilities

## Capability Tags

Capability tags describe what a module provides. A module can have multiple capability tags.

### `capability:entities`

- **Purpose**: Module defines entities (data models with CRUD operations)
- **Use case**: Entity definitions, schema, CRUD handlers

### `capability:workflows`

- **Purpose**: Module defines workflows (business process automation)
- **Use case**: Workflow definitions, workflow execution logic

### `capability:ui`

- **Purpose**: Module provides UI components
- **Use case**: React components, UI libraries, frontend interfaces

## Dependency Rules Summary

### Type-Based Rules (Primary Architectural Boundaries)

| Source Type | Can Depend On |
|------------|---------------|
| `type:core` | (nothing) |
| `type:database` | `type:core`, `type:shared`, `type:database` |
| `type:extension` | `type:core`, `type:extension` |
| `type:platform` | `type:core`, `type:database`, `type:extension`, `type:platform` |

### Layer-Based Rules (Frontend/Backend Separation)

| Source Layer | Can Depend On |
|--------------|---------------|
| `layer:backend` | `layer:backend`, `layer:shared` |
| `layer:frontend` | `layer:frontend`, `layer:shared` |
| `layer:shared` | `layer:shared` |

### Multi-Tag Enforcement

Projects with multiple tags must satisfy **all** applicable constraints. For example:
- A project tagged `["type:extension", "layer:backend"]` must satisfy both:
  - Type constraint: can depend on `type:core` and `type:extension`
  - Layer constraint: can depend on `layer:backend` and `layer:shared`

## Enforcement

### ESLint Rule

Module boundaries are enforced via the `@nx/enforce-module-boundaries` ESLint rule in `eslint.config.mjs`. Violations will cause lint errors.

### Tagging Projects

Tags are defined in `project.json` files. Projects typically have 2-3 tags:

```json
{
  "tags": ["type:extension", "layer:backend", "capability:entities", "capability:workflows"]
}
```

**Tag Selection Guidelines:**
1. **Type tag** (required): Choose one of `type:core`, `type:database`, `type:extension`, `type:platform`
2. **Layer tag** (required): Choose one of `layer:backend`, `layer:frontend`, `layer:shared`
3. **Capability tags** (optional, multiple allowed): Add `capability:entities`, `capability:workflows`, `capability:ui` as applicable

### DevDependencies Exception

While runtime dependencies are strictly enforced, `devDependencies` are allowed for type imports. For example, an extension can include `@eventiva/databases.pg` in `devDependencies` to import types for development work, even though it cannot have it as a runtime dependency.

## Examples

### ✅ Valid Dependencies

- `@eventiva/extensions.users` → `@eventiva/extensions.contact` (extension depends on extension)
- `@eventiva/extensions.contact` → `@eventiva/core` (extension depends on core)
- `@eventiva/platforms.postgresql` → `@eventiva/databases.pg` (platform depends on database)
- `@eventiva/platforms.postgresql` → `@eventiva/extensions.contact` (platform depends on extension)

### ❌ Invalid Dependencies

- `@eventiva/extensions.contact` → `@eventiva/databases.pg` (extension cannot depend on database in runtime)
- `@eventiva/extensions.contact` → `@eventiva/platforms.postgresql` (extension cannot depend on platform)
- `@eventiva/core` → `@eventiva/extensions.contact` (core cannot depend on extensions)
- `@eventiva/databases.pg` → `@eventiva/extensions.contact` (database cannot depend on extensions)

### ✅ DevDependencies (Allowed)

- `@eventiva/extensions.contact` → `@eventiva/databases.pg` (in `devDependencies` for type imports)

## GitHub Labels

Module type tags are synchronized with GitHub labels via smartcloud configuration (`.github/config.json`). Labels use the same naming convention (`type:core`, `type:database`, etc.) for consistency.

## Future Modules

When adding new modules:

1. **Determine the module type** based on its purpose → add `type:*` tag
2. **Determine the layer** (frontend/backend/shared) → add `layer:*` tag
3. **Identify capabilities** (entities/workflows/ui) → add `capability:*` tags
4. **Add all appropriate tags** to `project.json`
5. **Verify dependencies** comply with all applicable rules
6. **Run lint** to ensure boundaries are respected: `pnpm nx lint`

### Common Patterns

**Backend Extensions:**
```json
{
  "tags": ["type:extension", "layer:backend", "capability:entities", "capability:workflows"]
}
```

**Frontend Components:**
```json
{
  "tags": ["type:extension", "layer:frontend", "capability:ui"]
}
```

**Shared Types:**
```json
{
  "tags": ["type:core", "layer:shared"]
}
```

**Database Adapters:**
```json
{
  "tags": ["type:database", "layer:backend"]
}
```

**Platform Entry Points:**
```json
{
  "tags": ["type:platform", "layer:backend"]
}
```

## Related Documentation

- [Nx Module Boundaries](https://nx.dev/docs/features/enforce-module-boundaries)
- [Architecture Learnings](./architecture.md) - Overall system architecture
- [Conventions](./conventions.md) - Coding conventions and standards
