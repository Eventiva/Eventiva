# Conventional Commits Title Requirements

## Title Format

Commit titles should follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>
```

## Type Requirements

- **feat**: A new feature (triggers minor version bump)
- **fix**: A bug fix (triggers patch version bump)
- **chore**: Changes that don't affect the codebase (no version bump)
- **docs**: Documentation only changes (no version bump)
- **style**: Code style changes (formatting, missing semicolons, etc.) (no version bump)
- **refactor**: Code refactoring without feature changes or bug fixes (no version bump)
- **perf**: Performance improvements (no version bump)
- **test**: Adding or updating tests (no version bump)
- **ci**: CI/CD configuration changes (no version bump)
- **build**: Build system or external dependencies changes (no version bump)

## Scope Requirements

- Scope should be the package or component name (e.g., `core`, `extensions.hello-world`, `extensions.contact`)
- Use lowercase with dots for package names (e.g., `extensions.hello-world`)
- Scope is optional but recommended for clarity

## Description Requirements

- **Concise**: Title should be concise and descriptive, ideally under 50 characters
- **Imperative mood**: Use imperative mood ("add feature" not "added feature" or "adds feature")
- **No period**: Do not end the title with a period
- **Lowercase**: Start with lowercase letter (except for proper nouns)
- **Clear**: Clearly describe what the commit does

## Examples

✅ **Good:**
- `feat(core): add entity registry service`
- `fix(extensions.hello-world): resolve workflow initialization error`
- `chore: update dependencies`
- `docs: add API documentation for cluster config`
- `refactor(core): simplify schema finalizer implementation`

❌ **Bad:**
- `Added new feature` (missing type and scope)
- `fix: Fixed the bug` (redundant "Fixed", should be "fix")
- `feat(core): Add entity registry service.` (ends with period, starts with capital)
- `FEAT(CORE): ADD ENTITY REGISTRY` (all caps)
- `feat(core): This commit adds a new entity registry service that will be used to manage entities in the system` (too long)

## Breaking Changes

For breaking changes, add `!` after the type/scope and include `BREAKING CHANGE:` in the body:

```
feat(core)!: change entity API structure

BREAKING CHANGE: Entity.get() now returns Effect instead of Promise
```

This triggers a major version bump.

## Multi-line Format

If needed, add a blank line after the title and provide a detailed description:

```
feat(core): add entity registry service

The entity registry provides a centralized way to manage
and access entities across the application. It supports
dependency injection and type-safe entity retrieval.
```
