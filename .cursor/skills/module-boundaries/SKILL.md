---
name: module-boundaries
description: Configure and enforce module boundaries in Nx workspace. Use when creating new packages, adding dependencies, or when module boundary violations occur. Applies tags, updates ESLint rules, and ensures dependency constraints are respected.
---

# Module Boundaries Configuration

Configure and enforce module boundaries for Eventiva packages using Nx tags and ESLint rules.

## Quick Reference

### Module Types

- **`type:core`** - Core functionality, can be depended on by any module
- **`type:database`** - Database implementations, only platforms can depend on (runtime)
- **`type:extension`** - Feature modules, can depend on core and other extensions
- **`type:platform`** - Top-level entry points, nothing can depend on these

### Dependency Matrix

| Source | Can Depend On |
|--------|---------------|
| `type:core` | (nothing) |
| `type:database` | `type:core` |
| `type:extension` | `type:core`, `type:extension` |
| `type:platform` | `type:core`, `type:database`, `type:extension`, `type:platform` |

## Adding Tags to Projects

When creating or modifying packages, add the appropriate tag to `project.json`:

```json
{
  "tags": ["type:extension"]
}
```

## ESLint Configuration

Module boundaries are enforced in `eslint.config.mjs`:

```javascript
'@nx/enforce-module-boundaries': [
  'error',
  {
    depConstraints: [
      { sourceTag: 'type:core', onlyDependOnLibsWithTags: [] },
      { sourceTag: 'type:database', onlyDependOnLibsWithTags: ['type:core'] },
      { sourceTag: 'type:extension', onlyDependOnLibsWithTags: ['type:core', 'type:extension'] },
      { sourceTag: 'type:platform', onlyDependOnLibsWithTags: ['type:core', 'type:database', 'type:extension', 'type:platform'] },
    ],
  },
],
```

## Common Tasks

### Adding a New Extension

1. Create the package structure
2. Add tag to `project.json`: `"tags": ["type:extension"]`
3. Add dependencies (only `type:core` and `type:extension`)
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

Module type tags are synchronized with GitHub labels via `.github/config.json`. Labels use the same naming (`type:core`, `type:database`, etc.).

## Reference

- Full documentation: `docs/learnings/module-boundaries.md`
- Nx documentation: https://nx.dev/docs/features/enforce-module-boundaries
