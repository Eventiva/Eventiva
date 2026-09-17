# Graphify: a local knowledge graph of this repository

Graphify builds a queryable graph of the Eventiva codebase — symbols, files,
imports, calls and database schema — so you (or an agent) can ask "what touches
event scheduling?" and get the relevant slice of the repo instead of guessing at
file names.

Everything is local and optional. Nothing here runs in CI, nothing is installed
globally, and no repository content leaves your machine.

## Contents

- [What gets installed and where](#what-gets-installed-and-where)
- [Setup](#setup)
- [Building the graph](#building-the-graph)
- [Refreshing](#refreshing)
- [Querying](#querying)
- [Using it from an MCP client](#using-it-from-an-mcp-client)
- [What is excluded, and why](#what-is-excluded-and-why)
- [Security and privacy](#security-and-privacy)
- [Local overrides](#local-overrides)
- [Updating the pin](#updating-the-pin)
- [Teardown](#teardown)
- [Troubleshooting](#troubleshooting)
- [Measurements](#measurements)

## What gets installed and where

All state lives in `.graphify/` at the repository root, which is gitignored:

| Path | Contents |
|---|---|
| `.graphify/tools/` | The pinned Graphify install (~216 MiB) |
| `.graphify/bin/` | The `graphify` and `graphify-mcp` executables |
| `.graphify/index/` | The generated graph and its incremental manifest |
| `.graphify/home/` | An isolated `HOME` for the tool |

Delete that directory and every trace is gone. The tracked parts of this feature
are only `tools/graphify/`, `.graphifyignore` and this document.

## Setup

You need [`uv`](https://docs.astral.sh/uv/) on your `PATH`. The wrapper will not
install system tooling for you:

```sh
curl -LsSf https://astral.sh/uv/install.sh | sh   # macOS / Linux
brew install uv                                   # Homebrew
```

Then:

```sh
tools/graphify/graphify setup
```

This installs `graphifyy[mcp,ollama,sql]==0.9.63` on Python 3.13 into
`.graphify/`, using `uv`'s own managed Python so it does not depend on whatever
Python you happen to have. It does not touch your global environment.

## Building the graph

```sh
tools/graphify/graphify index
```

The default is **code-only**: local Tree-sitter parsers, no model, no network.
It reads TypeScript, JavaScript, SQL and the other supported languages directly.
This is the mode you want almost always — it takes a few seconds and has no
external dependency at all.

### Optional: semantic mode

```sh
tools/graphify/graphify index --semantic
```

This additionally reads Markdown and extracts relationships from prose using a
**local** model through [Ollama](https://ollama.com). It needs:

```sh
ollama serve                      # if not already running
ollama pull qwen2.5-coder:7b      # ~4.7 GB, one time
```

The wrapper always passes `--backend ollama` explicitly and clears provider API
keys from the environment first. Graphify's own default backend is "whichever
API key happens to be set", which would silently send repository content to a
paid remote provider; the wrapper makes that impossible.

## Refreshing

```sh
tools/graphify/graphify refresh            # incremental, same mode as the build
tools/graphify/graphify refresh --force    # full re-scan, ignores the cache
```

`refresh` re-runs `extract` with the same flags the graph was originally built
with, recorded in `.graphify/mode`. Extraction is already incremental — it
honours the manifest and cache — so this is fast without drifting between modes.

**Why this wrapper never calls `graphify update`.** The upstream `update`
command accepts neither `--code-only` nor `--backend`, and Graphify persists no
record of how a graph was originally built. Run against a code-only graph it
re-scans under its own default policy, silently widening the graph to documents
and potentially handing them to an auto-detected model backend. Replaying
`extract` avoids that entire class of surprise.

**Known incremental drift.** An incremental refresh produces six fewer nodes
than `--force` on this repository. The difference is entirely external package
reference nodes — `@effect/cluster/Entity`, `drizzle-orm/pg-core`,
`expo-secure-store`, `tailwindcss` and two others — whose defining import was
not re-scanned. No first-party code node and no edge is ever lost. Run
`refresh --force` occasionally if you care about dependency-level nodes.

## Querying

```sh
tools/graphify/graphify query "how are events scheduled and stored"
tools/graphify/graphify query "venue table columns"
tools/graphify/graphify status
```

Anything else the upstream CLI offers is available through the passthrough,
which applies the same hardened environment:

```sh
tools/graphify/graphify -- god-nodes --graph .graphify/index/graphify-out/graph.json
tools/graphify/graphify -- explain "crud-handlers.ts" --graph .graphify/index/graphify-out/graph.json
```

## Using it from an MCP client

```sh
tools/graphify/graphify mcp --print-config
```

That prints a config block with the absolute path of *your* clone. Paste it into
your MCP client. The server runs over **stdio only**, deliberately.

Graphify's MCP server exposes a `project_path` argument that selects which
project graph to read. It is a lookup key, not an authorization boundary: there
is no allowlist and no root confinement, so the server will read any
`graph.json` the process can reach on disk. Over stdio the blast radius is the
single client that spawned the process. **Do not add an HTTP transport to this
wrapper.** If you ever genuinely need one, it must bind loopback and set
`GRAPHIFY_API_KEY`, and that decision should be reviewed rather than improvised.

For the same reason this setup never uses `graphify global add`. A merged global
graph exposes every project inside it to every client of that server, so
Eventiva stays in its own graph, under its own directory.

## What is excluded, and why

`.graphifyignore` at the repository root holds the exclusion list. `.gitignore`
is applied automatically and takes precedence — a path excluded by `.gitignore`
cannot be re-included by `.graphifyignore`. Graphify also has built-in skips for
`.git`, `node_modules`, `dist`, `build`, virtualenv and cache directories,
`.env*`, key and certificate formats, and credential stores.

On top of that, `.graphifyignore` excludes:

- **Secrets**, restated explicitly rather than trusting built-ins alone.
- **Private and customer data** — `.data/`, dumps, `*.csv`, `private/`. The
  repository holds none today; this keeps it that way if an export is ever
  dropped into a clone.
- **Package managers and lockfiles** — no semantic value, large and noisy.
- **Build output, generated code and tool caches** — `dist/`, `coverage/`,
  `.nx/`, `tmp/` and friends.
- **Agent and editor configuration** — `.cursor/`, `.github/`, `.vscode/`.
  These are instructions about how to work, not descriptions of what the system
  does, and 214 rule files would swamp the graph.
- **Binary assets** — images, fonts, video, PDFs.

Verify the contract at any time:

```sh
tools/graphify/selftest
```

It checks 19 excluded path patterns and 8 secret markers against the built
graph and exits non-zero on any violation.

### One honest caveat about `node_modules`

No file under `node_modules` is ever read. However, because first-party code
imports third-party packages, the graph contains **edge endpoints** derived from
those import specifiers — under pnpm they look like
`apps_mobile_node_modules_expo_router_build_index`. These are identifiers
synthesised from import paths, carrying no file content. That is a dependency
graph doing its job, but it is worth knowing before you share a `graph.json`,
because it does reveal your dependency layout.

## Security and privacy

- **No network in the default path.** Code-only indexing uses local AST parsers
  and contacts nothing.
- **No paid or remote inference, ever.** Semantic mode pins `--backend ollama`
  against loopback, and the wrapper clears `OPENAI_API_KEY`,
  `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, `GOOGLE_API_KEY`, `DEEPSEEK_API_KEY`,
  `MOONSHOT_API_KEY`, `KIMI_API_KEY` and the AWS credential variables before
  invoking Graphify.
- **No global state.** `HOME` is redirected into `.graphify/home`, so Graphify's
  global graph at `~/.graphify/global-graph.json` is never written.
- **Query logging is disabled** via `GRAPHIFY_QUERY_LOG_DISABLE=1`. Upstream
  documentation and the 0.9.63 source disagree about the default, so the
  wrapper sets it rather than relying on either.
- **Never index a production or customer database.** Graphify's
  `extract --postgres DSN` can read a live schema. Do not point it at anything
  but a local throwaway instance.
- **Do not run `graphify install`, `hook install`, `claude install` or
  `cursor install`.** These write outside the repository into your platform
  config and install git hooks. This setup is deliberately self-contained; hook
  integration is being assessed separately.
- **The generated `graph.json` is source-derived.** Treat it with the same care
  as the source: it is gitignored, and it should not be pasted into third-party
  tools.

## Local overrides

Create `tools/graphify/graphify.local.env` — it is gitignored, so machine paths
never reach the repository:

```sh
# Example: a different local model, or a non-default Ollama port.
GRAPHIFY_MODEL='qwen2.5-coder:14b'
OLLAMA_ROOT='http://127.0.0.1:11500'
```

Overridable values are `GRAPHIFY_SPEC`, `GRAPHIFY_PYTHON`, `GRAPHIFY_MODEL` and
`OLLAMA_ROOT`. Overriding `GRAPHIFY_SPEC` locally is for experiments only; the
committed pin is what everyone else gets.

## Updating the pin

The version is pinned deliberately. Upstream is young and moves fast — 330
commits in the 30 days before the pin was chosen — so an unpinned install would
drift under you. To move it:

1. Change `GRAPHIFY_SPEC` in `tools/graphify/graphify`.
2. `tools/graphify/graphify setup && tools/graphify/graphify index --force`
3. `tools/graphify/selftest` must still pass.
4. Compare node and edge counts against the [measurements](#measurements) below
   and explain any large movement in the pull request.

Do not use the `[all]` extra. It pulls in PDF, Office, video/Whisper, database
clients, cloud and paid model SDKs and many niche grammars — a much larger
dependency and attack surface for no benefit here. The `sql` extra *is*
included: it costs nothing measurable and adds 40 nodes and 62 edges from the
Drizzle migrations, linking the schema to the TypeScript DDL layer.

## Teardown

```sh
tools/graphify/graphify clean --index-only   # drop the graph, keep the install
tools/graphify/graphify clean                # remove .graphify entirely
```

There is nothing else to undo — no global install, no hooks, no shell changes.

## Troubleshooting

**`uv is not on PATH`** — install `uv`, see [Setup](#setup).

**`not set up yet`** — run `tools/graphify/graphify setup`.

**`no graph yet`** — run `tools/graphify/graphify index`.

**`no Ollama server answering`** — start it with `ollama serve`, or drop
`--semantic` and use code-only indexing, which needs no model.

**`model 'qwen2.5-coder:7b' is not pulled`** — run
`ollama pull qwen2.5-coder:7b`.

**Semantic mode produces an empty or partial graph** — you are probably using a
*thinking* model. Reasoning tokens consume the completion budget before any JSON
is emitted, and Graphify drops the chunk as hollow. Use a non-thinking instruct
model; `qwen2.5-coder:7b` is Graphify's own default and is known to work.

**`.sql` files contribute nothing** — your install predates the `sql` extra.
Re-run `tools/graphify/graphify setup`.

**`1 file(s) skipped as potentially sensitive: .npmrc`** — expected and correct.
Graphify refuses to index it because it can hold a registry token.

**A query says the answer is truncated** — raise the budget or narrow the
question:
`tools/graphify/graphify query "..." --budget 8000`.

## Measurements

Taken on this repository at the time of writing: 362 code files accepted, 1.7 GB
working tree, 24 AST workers.

| Operation | Wall time | Peak child RSS | Result |
|---|---:|---:|---|
| `setup` (warm `uv` cache) | 1 s | — | 216 MiB installed |
| `index` (code-only, cold) | 3.0 s | 109,800 KiB | 2,598 nodes, 5,888 edges, 2.7 MB graph |
| `refresh` (incremental) | 1.7 s | 62,492 KiB | same edges, 6 external-package nodes fewer |
| `refresh --force` | 3.1 s | 115,432 KiB | identical to a cold build |

Semantic mode is substantially slower because every documentation chunk becomes
a local model call. Index code-only unless you specifically need the prose.
