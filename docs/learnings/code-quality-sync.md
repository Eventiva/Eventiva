# Code quality: EditorConfig, Trunk, and Nx sync

Keep lint and format behaviour consistent across the editor, Trunk, and Nx so Trunk and CI don’t fail due to config drift.

## Single source of truth

| Concern                                  | Primary config                       | Consumed by                                                           |
| ---------------------------------------- | ------------------------------------ | --------------------------------------------------------------------- |
| Indent, line length, EOL, trailing comma | `.editorconfig` (root `[*]`)         | Editors, Prettier (via editorconfig-to-prettier where supported)      |
| Prettier (formatting)                    | `.prettierrc`                        | Nx `eventiva:format` / `eventiva:format-check`, Trunk (prettier), IDE |
| ESLint (linting)                         | `eslint.config.mjs` (flat config)    | Nx `lint` per project, Trunk (eslint), IDE                            |
| Which tools run                          | `trunk.yaml`                         | Trunk only                                                            |
| Workspace tasks                          | `project.json` (eventiva), `nx.json` | Nx only                                                               |

## Alignment rules

1. **Prettier vs EditorConfig**  
   `.prettierrc` should match EditorConfig for shared options:
    - `printWidth` = `max_line_length` (default 120)
    - `tabWidth` = `tab_width` / `indent_size` (default 4)
    - `endOfLine` = `end_of_line` (lf)
    - `useTabs` = from `indent_style` (space → false)

2. **Trunk**  
   Uses repo root configs by default (`eslint.config.mjs`, `.prettierrc`). No need to duplicate config in `.trunk/` unless you override. Keep `trunk.yaml` enabled list in sync with tools you also run in Nx (eslint, prettier, markdownlint, yamllint, actionlint).

3. **Nx**
    - Lint: `nx run-many -t lint` (and `nx run eventiva:lint-fix` with `-- --fix`).
    - Format: `nx run eventiva:format` and `nx run eventiva:format-check`.
    - `nx.json` `sharedGlobals` includes `.editorconfig`, `.prettierrc`, `.prettierignore`, `eslint.config.mjs`, `trunk.yaml` so cache invalidates when these change.

## Commands (run before commit / in CI)

- **Check only (no writes):**  
  `pnpm check` → lint all projects + format-check (or `trunk check` for Trunk).
- **Fix and format:**  
  `pnpm fix` → format then lint with `--fix` (or `trunk check --fix` / `trunk fmt`).

## Optional: pre-commit hook

To run checks before every commit you can add husky + lint-staged and wire `pnpm check` or `trunk check` to the pre-commit hook. Not added by default; document here if you add it.

## References

- [Trunk overview](https://docs.trunk.io/code-quality/overview)
- [Trunk init](https://docs.trunk.io/code-quality/overview/initialize-trunk)
- Prettier: [config](https://prettier.io/docs/configuration.html), [options](https://prettier.io/docs/options.html)
- Nx: `nx run-many -t lint -- --fix`, `nx run eventiva:format` / `eventiva:format-check` / `eventiva:fix`
