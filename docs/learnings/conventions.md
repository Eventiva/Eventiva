# Conventions Learnings

## File headers (licensing)

- **Every file** has the long **FCL-1.0-MIT** header with:
  - Contributing link (CONTRIBUTING.md)
  - Code of Conduct link (CODE_OF_CONDUCT.md)
  - Copyright Eventiva Ltd
  - FCL-1.0-MIT license text and key-functionality warning
  - Eventiva Cooperation Commitment
  - "DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE"
- **Rebuild requirement:** Keep **one canonical header** (identical in every file except file-specific lines: file name, "Last modified"). No variation in license text.

## Naming

- **Aspect:** `*.aspect.ts` (e.g. `database.aspect.ts`). Exported as `XxxAspect`, e.g. `DatabaseAspect`.
- **Docs:** `*.docs.mdx` with YAML frontmatter; colocated with component.
- **Main file:** `index.ts` as the component's mainFile (see Bit `rootDir`/mainFile).
- **Runtime:** `*.node.runtime.ts` for Node runtimes (e.g. `platform.node.runtime.ts`).
- **Config:** `*-config.ts` (e.g. `logger-config.ts`, `pino-config.ts`).

## Scopes and component boundaries

- **Scopes** (from Bit): `eventiva.utilities`, `eventiva.backend`, `eventiva.entities`, `eventiva.modules` (defaultScope in workspace.jsonc).
- **Directory pattern:** `projects/{scope}/{name}` (e.g. `projects/utilities/database`, `projects/backend/platform`).
- **Component = folder** – Bit's per-component `rootDir` and tracking define which files belong to which module. Rebuild: use Nx project boundaries or package boundaries to achieve the same (one "module" = one Nx lib or package).

## Aspect creation

- `Aspect.create({ id: 'eventiva.utilities/database' })`. Id format: `scope/name`.
- No business logic in the aspect file itself; it's the hook for Bit. Rebuild: equivalent is an Effect Layer or a "module descriptor" that can be listed in a manifest.

## Rebuild requirements

- One canonical FCL-MIT header in every file.
- Naming: keep `*.runtime.ts`, `index.ts` as entry where appropriate; drop `*.aspect.ts` in favour of Effect/Nx project names.
- Preserve component boundaries as Nx projects or packages so "include/exclude" is still config- or list-driven.

## Type safety

- **Never use `any` types.** Use proper generics, Effect Schema types, and branded types so deployments and RPC boundaries stay type-safe. If the type system forces a cast, prefer `unknown` and a type guard or a narrow generic; document the escape hatch. Exception: Effect Schema’s `Schema<T, Encoded, Context>` may use `any` for Encoded/Context when they are not relevant (e.g. `Schema<Id, any, any>`); avoid `any` in runtime values and public API boundaries.
- **Reference:** common-crm `projects/entities/abstraction` for typesafe entity/table patterns (Effect Schema, validated columns, `BaseClass`/`AllFields`); Effect migration notes for Schema/Layer typing.
