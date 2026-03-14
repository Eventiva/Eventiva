---
name: module-boundaries
description: Configure and enforce module boundaries in Nx workspace. Use when creating new packages, adding dependencies, or when module boundary violations occur. Applies tags, updates ESLint rules, and ensures dependency constraints are respected.
---

# Module Boundaries Configuration

Configure and enforce module boundaries for Eventiva packages using Nx tags and ESLint rules.

## Quick Reference

### Tag Structure

Projects should have 2-3 tags:
1. **Type** (required): `type:core`, `type:database`, `type:extension`, `type:platform`
2. **Layer** (required): `layer:backend`, `layer:frontend`, `layer:shared`
3. **Capability** (optional, multiple): `capability:entities`, `capability:workflows`, `capability:ui`

### Type-Based Dependency Matrix

| Source | Can Depend On |
|--------|---------------|
| `type:core` | (nothing) |
| `type:database` | `type:core` |
| `type:extension` | `type:core`, `type:extension` |
| `type:platform` | `type:core`, `type:database`, `type:extension`, `type:platform` |

### Layer-Based Dependency Matrix

| Source | Can Depend On |
|--------|---------------|
| `layer:backend` | `layer:backend`, `layer:shared` |
| `layer:frontend` | `layer:frontend`, `layer:shared` |
| `layer:shared` | `layer:shared` |

**Note**: Projects with multiple tags must satisfy ALL applicable constraints.

## Adding Tags to Projects

When creating or modifying packages, add 2-3 tags to `project.json`:

```json
{
  "tags": ["type:extension", "layer:backend", "capability:entities", "capability:workflows"]
}
```

**Tag Selection:**
1. Choose one type tag based on module purpose
2. Choose one layer tag (backend/frontend/shared)
3. Add capability tags for what the module provides (entities, workflows, UI)

## ESLint Configuration

Module boundaries are enforced in `eslint.config.mjs` with both type and layer constraints:

```javascript
'@nx/enforce-module-boundaries': [
  'error',
  {
    depConstraints: [
      // Type-based constraints
      { sourceTag: 'type:core', onlyDependOnLibsWithTags: [] },
      { sourceTag: 'type:database', onlyDependOnLibsWithTags: ['type:core'] },
      { sourceTag: 'type:extension', onlyDependOnLibsWithTags: ['type:core', 'type:extension'] },
      { sourceTag: 'type:platform', onlyDependOnLibsWithTags: ['type:core', 'type:database', 'type:extension', 'type:platform'] },
      // Layer-based constraints
      { sourceTag: 'layer:backend', onlyDependOnLibsWithTags: ['layer:backend', 'layer:shared'] },
      { sourceTag: 'layer:frontend', onlyDependOnLibsWithTags: ['layer:frontend', 'layer:shared'] },
      { sourceTag: 'layer:shared', onlyDependOnLibsWithTags: ['layer:shared'] },
    ],
  },
],
```

## Common Tasks

### Adding a New Extension

1. Create the package structure
2. Add tags to `project.json`: `"tags": ["type:extension", "layer:backend", "capability:entities", "capability:workflows"]`
3. Add dependencies (must satisfy both type and layer constraints)
4. Run `pnpm nx lint` to verify

### Moving Database Dependency to DevDependencies

If an extension needs database types but cannot have runtime dependency:

1. Remove from `dependencies` in `package.json`
2. Add to `devDependencies` in `package.json`
3. Verify lint passes

### Fixing Boundary Violations

When ESLint reports a violation:

1. Check the error message for the violated constraint
2. Either:
   - Remove the invalid dependency, or
   - Move to `devDependencies` if only types are needed, or
   - Reconsider the package's type tag if the dependency is necessary

## GitHub Labels

All tags (type, layer, capability) are synchronized with GitHub labels via `.github/config.json`. Labels use the same naming convention for consistency.

## Reference

- Full documentation: `docs/learnings/module-boundaries.md`
- Nx documentation: https://nx.dev/docs/features/enforce-module-boundaries
