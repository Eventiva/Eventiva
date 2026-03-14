# Eventiva

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

Eventiva is an open-source platform for Event Planning and Production logistics, built as an [Nx monorepo](https://nx.dev).

## Getting Started

### Prerequisites

* Node.js 20 or later
* pnpm 9.14.2 (or compatible version)

### Installation

```sh
pnpm install
```

### Building

Build all packages:

```sh
pnpm nx run-many -t build
```

Build a specific package:

```sh
pnpm nx build <project-name>
```

For example, to build the core package:

```sh
pnpm nx build core
```

### Running Tasks

This workspace uses Nx for task orchestration. Common commands:

**Build all packages:**
```sh
pnpm nx run-many -t build
```

**Lint all packages:**
```sh
pnpm nx run-many -t lint
```

**Type check all packages:**
```sh
pnpm nx run-many -t typecheck
```

**Run tests for all packages:**
```sh
pnpm nx run-many -t test
```

**Run a specific target for a project:**
```sh
pnpm nx run <project-name>:<target>
```

For example:
```sh
pnpm nx run core:build
pnpm nx run core:test
pnpm nx run core:lint
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Visualizing the Project Graph

Explore the project dependency graph:

```sh
pnpm nx graph
```

This opens an interactive visualization of your workspace structure and dependencies.

## Project Structure

This workspace contains the following packages:

* `packages/core` - Core Eventiva functionality
* `packages/platforms/default` - Default platform implementation
* `packages/extensions/*` - Extension packages
* `packages/databases/pg` - PostgreSQL database package

Each package is a separate Nx project with its own build, test, and lint targets.

## Development

### CI/CD

The project uses GitHub Actions for CI. The main workflow runs:

* Linting (`lint`)
* Building (`build`)
* Type checking (`typecheck`)

Tests are configured but currently excluded from CI until Vitest is fully configured.

### Code Quality

**Format code:**
```sh
pnpm nx run eventiva:format
```

**Check formatting:**
```sh
pnpm nx run eventiva:format-check
```

**Fix linting issues:**
```sh
pnpm nx run eventiva:lint-fix
```

**Run all checks:**
```sh
pnpm nx run eventiva:check
```

**Fix all issues:**
```sh
pnpm nx run eventiva:fix
```

## Versioning and Releasing

To version and release packages:

```sh
pnpm nx release
```

Pass `--dry-run` to see what would happen without actually releasing.

[Learn more about Nx release &raquo;](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## TypeScript Project References

Nx automatically updates TypeScript [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) in `tsconfig.json` files to ensure they remain accurate based on your project dependencies (`import` or `require` statements). This sync is automatically done when running tasks such as `build` or `typecheck`, which require updated references to function correctly.

To manually trigger the sync:

```sh
pnpm nx sync
```

To check if project references are in sync (useful for CI):

```sh
pnpm nx sync:check
```

[Learn more about nx sync](https://nx.dev/reference/nx-commands#sync)

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/js?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
