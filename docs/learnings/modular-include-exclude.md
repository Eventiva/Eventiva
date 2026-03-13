# Modular Include/Exclude Learnings

## How it worked with Bit

- **Aspect list in default app** – `projects/platforms/default/default.bit-app.ts` lists the aspects that are “included” in the default platform: `DatabaseAspect`, `GraphqlAspect`, `RestAspect`. Other aspects (LoggerAspect, ConsoleAspect, PinoAspect, DiscordJSAspect, I18NAspect, etc.) are commented out, so they are **excluded**.
- **Component = folder** – Bit’s per-component `rootDir` and tracking define which files belong to which component. Each aspect is tied to a component; including an aspect means that component’s runtime and config are part of the built app.
- **No global “enabled/disabled”** – Inclusion is by **listing** in the platform’s aspect array. To add a feature, uncomment or add the aspect; to remove it, comment it out or remove it.

## Rebuild requirements

- **Config-driven or package-list-driven inclusion** – The rebuild must support a way to “include” or “exclude” modules without editing code in many places. Options:
    - **Manifest/config file** – e.g. `extensions.json` or workspace config listing which extensions (packages) are enabled. Core reads this and composes only those Layers.
    - **Package list** – Only install or build certain packages (e.g. Nx project graph or pnpm workspace filter); the app only wires what’s present.
- **Odoo-style auto-install** – Plan Part D: if all dependencies of an extension exist on the server, the extension can be automatically installed. So “inclusion” can be dependency-driven as well as explicit.
- **Single place to toggle** – Avoid scattering “if (featureFlags.x)” across the codebase for structural inclusion; prefer one manifest or one list that defines which modules run.

## References

- `projects/platforms/default/default.bit-app.ts` – aspect array
- Plan Part D (Execution) – extensions, auto-install, core = framework only
