# Docs and APIs Learnings

## Current docs layout

- **Root:** AsciiDoc for high-level docs (README, CONTRIBUTING, CODE_OF_CONDUCT, etc.). Plan specifies **AsciiDoc as source of truth**.
- **Colocated:** `*.docs.mdx` with YAML frontmatter next to components (e.g. `style-dictionary.docs.mdx`, `pino.docs.mdx`).
- **JetClient / .jetclient** – Referenced in `qodana.yaml` as excluded path; `.idea` has JetBrains config. JetClient provided API/docs style that was liked but adds cost; goal is no cost barrier for contributors.

## Rebuild requirements

- **AsciiDoc as source** – Keep AsciiDoc for README, CONTRIBUTING, and other root docs.
- **Script: README.adoc → README.md** – When the main branch has a pull request that touches documentation, generate **README.md** from **README.adoc** (e.g. in CI or pre-push). Document this in the Linear issue for Documentation and Contributor Experience.
- **Replacing JetClient-style docs** – Use colocated MDX or similar with a free static generator; or Cursor rules + learnings for API contracts. No paid JetBrains/Qodana requirement for contributors.
- **API surface** – Rebuild will expose OpenAPI, GraphQL, MCP, gRPC; extensions mesh into all. Docs should describe how to discover and use these (e.g. OpenAPI spec, GraphQL schema, MCP tools).

## References

- Plan: Key constraints (“Documentation – Move to AsciiDoc… script that converts README.adoc → README.md”)
- `qodana.yaml` – excluded paths including `.jetclient`
