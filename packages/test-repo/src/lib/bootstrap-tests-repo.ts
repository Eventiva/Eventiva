import { readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { joinPathFragments, type Tree } from '@nx/devkit';

const templatesToolsDir = join(
    fileURLToPath(new URL('.', import.meta.url)),
    '..',
    '..',
    'templates',
    'tools',
);

function readToolTemplate(name: string): string {
    return readFileSync(join(templatesToolsDir, name), 'utf8');
}

/** Seed projects for a standalone tests repo; aligned with main repo `tests/cluster-e2e`. */
export const BOOTSTRAP_PROJECTS = [
    {
        name: 'tests-cluster-e2e',
        packageName: '@eventiva/tests.cluster-e2e',
        root: 'cluster-e2e',
        distPrefixes: [] as string[],
    },
] as const;

function readJsonIfExists(tree: Tree, filePath: string): Record<string, unknown> | undefined {
    if (!tree.exists(filePath)) return undefined;
    const raw = tree.read(filePath, 'utf-8');
    if (raw === null) return undefined;
    return JSON.parse(raw) as Record<string, unknown>;
}

function writeJson(tree: Tree, filePath: string, value: unknown): void {
    tree.write(filePath, `${JSON.stringify(value, null, 4)}\n`);
}

function writeText(tree: Tree, filePath: string, value: string): void {
    tree.write(filePath, value);
}

const projectTemplate = ({
    projectName,
    projectRoot,
    checkScriptPath,
}: {
    projectName: string;
    projectRoot: string;
    checkScriptPath: string;
}) => ({
    name: projectName,
    $schema: '../../node_modules/nx/schemas/project-schema.json',
    projectType: 'library',
    tags: ['scope:tests'],
    targets: {
        test: {
            executor: 'nx:run-commands',
            options: {
                command: 'pnpm exec vitest run --config {projectRoot}/vitest.config.ts',
            },
            cache: true,
            outputs: ['{projectRoot}/coverage'],
        },
        'contracts:coverage': {
            executor: 'nx:run-commands',
            options: {
                command: `pnpm exec node {projectRoot}/${checkScriptPath} --project-root {projectRoot}`,
            },
            cache: false,
        },
    },
});

const vitestConfigTemplate = () => `import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineProject } from 'vitest/config';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineProject({
    test: {
        root: projectRoot,
        include: ['src/**/*.spec.ts'],
        environment: 'node',
        globals: false,
        coverage: {
            enabled: true,
            provider: 'v8',
            all: false,
            include: ['src/**/*.spec.ts'],
            reportsDirectory: path.join(projectRoot, 'coverage'),
            reporter: ['text', 'json-summary'],
            thresholds: {
                lines: 80,
                functions: 80,
                branches: 80,
            },
        },
    },
});
`;

const tsconfigTemplate = (depthToRoot: number) => {
    const rootPath = '../'.repeat(depthToRoot);
    return `{
    "extends": "${rootPath}tsconfig.base.json",
    "compilerOptions": {
        "types": ["node", "vitest/globals"],
        "noEmit": true
    },
    "include": ["src/**/*.ts", "vitest.config.ts"]
}
`;
};

const contractSpecTemplate = ({
    projectName,
    distPrefixes,
    toolsImportPath,
}: {
    projectName: string;
    distPrefixes: readonly string[];
    toolsImportPath: string;
}) => `import { describe, expect, it } from 'vitest';
import { Effect } from 'effect';
import * as TestRunner from '@effect/cluster/TestRunner';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    collectProjectCallables,
    computeCoverage,
    loadCoverageManifest,
} from '${toolsImportPath}';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const distPrefixes = ${JSON.stringify(distPrefixes)};
const manifestPath = path.join(projectRoot, 'api-surface-coverage.json');

const callables = collectProjectCallables(projectRoot, distPrefixes);
const manifest = loadCoverageManifest(manifestPath);
const coverage = computeCoverage(callables, manifest);

describe('${projectName} contract suite', () => {
    it('integrates with Effect cluster test primitives', () => {
        Effect.runSync(Effect.sync(() => expect(TestRunner).toBeDefined()));
    });

    it('integrates with StepCI runner dependency', async () => {
        const module = await import('@stepci/runner');
        expect(module).toBeDefined();
    });

    it('discovers callable API surfaces', () => {
        expect(Array.isArray(callables)).toBe(true);
    });

    it('tracks 100% callable coverage from declarations', () => {
        expect(coverage.uncovered).toEqual([]);
    });

    for (const callable of callables) {
        it(\`\${callable.id} includes @example\`, () => {
            expect(callable.hasExample).toBe(true);
        });

        it(\`\${callable.id} includes @remarks\`, () => {
            expect(callable.hasRemarks).toBe(true);
        });

        if (callable.parameters.length > 0) {
            it(\`\${callable.id} documents all params\`, () => {
                const missing = callable.parameters.filter((param) => !callable.paramTags.includes(param));
                expect(missing).toEqual([]);
            });
        }

        if (callable.returnType !== 'void') {
            it(\`\${callable.id} includes @returns\`, () => {
                expect(callable.hasReturns).toBe(true);
            });
        }
    }
});
`;

const STEP_CI_WORKFLOW = `schema: 1.1
name: eventiva-contract-workflow
tests:
    - name: contract-placeholder
      steps:
          - name: placeholder
            http:
                url: https://example.com
                method: GET
`;

const rootReadme = `# Eventiva/tests seed

This repository is managed by the main Eventiva TDD workflow.

## Rules

- Tests are authored by the test-creator agent which has full read access to the main repo implementation (packages/).
- Existing tests are never deleted.
- Test changes should only touch test files, test workflows, and test configuration.
- API-surface coverage tracks exported callables from the main repo.

## Commands

- \`pnpm nx run-many -t test --projects='tests-*' --outputStyle=static\`
- \`pnpm nx run-many -t contracts:coverage --projects='tests-*' --outputStyle=static\`
- \`pnpm contracts:coverage:generate\` (refreshes per-project coverage manifests)
`;

const guardrailsDoc = `# TDD guardrails

## Source of truth

- Test-creator has full read access to main repo source code (packages/**/*.ts).
- Use the complete implementation plus docstrings to write exhaustive tests.
- Tests should cover all code paths, edge cases, and error conditions.

## Test mutation policy

- Never delete existing tests.
- Add or update tests only.
- Keep tests under \`<projectRoot>/src/**/*.spec.ts\`.

## Coverage policy

- Contract coverage must be 100% for exported callable API surfaces.
- Runtime code coverage threshold remains enforced by main repo CI when tests execute against implementation.
`;

function buildGenerateScript(): string {
    const projectsJson = JSON.stringify(
        BOOTSTRAP_PROJECTS.map((project) => ({
            name: project.name,
            root: project.root,
            distPrefixes: project.distPrefixes,
        })),
        null,
        4,
    );
    return `import fs from 'node:fs/promises';
import path from 'node:path';
import { collectProjectCallables } from './contract-utils.mjs';

const PROJECTS = ${projectsJson};

const main = async () => {
    const repoRoot = path.resolve(process.argv[2] ?? process.cwd());

    for (const project of PROJECTS) {
        const projectRoot = path.join(repoRoot, project.root);
        const callables = collectProjectCallables(projectRoot, project.distPrefixes);
        const manifestPath = path.join(projectRoot, 'api-surface-coverage.json');
        const manifest = {
            project: project.name,
            distPrefixes: project.distPrefixes,
            entries: callables.map((entry) => ({
                id: entry.id,
                testCases: ['docs-example', 'docs-remarks', 'docs-params', 'docs-returns'],
            })),
        };
        await fs.writeFile(manifestPath, \`\${JSON.stringify(manifest, null, 4)}\\n\`, 'utf8');
        console.log(\`Wrote \${manifest.entries.length} callable entries to \${manifestPath}\`);
    }
};

await main();
`;
}

function buildRootConfig(tree: Tree, directory: string): void {
    const packageJsonPath = joinPathFragments(directory, 'package.json');
    const existingPackage = readJsonIfExists(tree, packageJsonPath) ?? {};
    const mergedPackage = {
        ...existingPackage,
        name: (existingPackage.name as string | undefined) ?? '@eventiva/tests',
        private: true,
        type: 'module',
        packageManager: 'pnpm@9.14.2',
        pnpm: {
            ...((existingPackage.pnpm as Record<string, unknown> | undefined) ?? {}),
            overrides: {
                ...((existingPackage.pnpm as { overrides?: Record<string, string> } | undefined)?.overrides ?? {}),
                'jsonpath-plus':
                    (existingPackage.pnpm as { overrides?: Record<string, string> } | undefined)?.overrides?.[
                        'jsonpath-plus'
                    ] ?? '^10.3.0',
                'parse-duration':
                    (existingPackage.pnpm as { overrides?: Record<string, string> } | undefined)?.overrides?.[
                        'parse-duration'
                    ] ?? '^2.1.5',
            },
        },
        scripts: {
            ...((existingPackage.scripts as Record<string, string> | undefined) ?? {}),
            test: "nx run-many -t test --projects='tests-*' --outputStyle=static",
            'contracts:coverage': "nx run-many -t contracts:coverage --projects='tests-*' --outputStyle=static",
            'contracts:coverage:generate': 'node tools/generate-api-surface-coverage.mjs',
        },
        devDependencies: {
            ...((existingPackage.devDependencies as Record<string, string> | undefined) ?? {}),
            nx: (existingPackage.devDependencies as Record<string, string> | undefined)?.nx ?? '^22.5.4',
            '@nx/vitest':
                (existingPackage.devDependencies as Record<string, string> | undefined)?.['@nx/vitest'] ?? '^22.5.4',
            vitest: (existingPackage.devDependencies as Record<string, string> | undefined)?.vitest ?? '^2.1.9',
            '@vitest/coverage-v8':
                (existingPackage.devDependencies as Record<string, string> | undefined)?.['@vitest/coverage-v8'] ??
                '^2.1.9',
            '@effect/vitest':
                (existingPackage.devDependencies as Record<string, string> | undefined)?.['@effect/vitest'] ?? '^0.27.0',
            typescript: (existingPackage.devDependencies as Record<string, string> | undefined)?.typescript ?? '^5.9.2',
            '@stepci/runner':
                (existingPackage.devDependencies as Record<string, string> | undefined)?.['@stepci/runner'] ?? '^2.0.7',
        },
    };

    const nxJsonPath = joinPathFragments(directory, 'nx.json');
    const existingNxJson = readJsonIfExists(tree, nxJsonPath) ?? {};
    const existingPlugins = (existingNxJson.plugins as unknown[]) ?? [];
    const mergedNxJson = {
        ...existingNxJson,
        $schema: './node_modules/nx/schemas/nx-schema.json',
        plugins: [
            ...existingPlugins.filter(
                (plugin) => !(typeof plugin === 'object' && plugin !== null && 'plugin' in plugin && (plugin as { plugin: string }).plugin === '@nx/vitest'),
            ),
            {
                plugin: '@nx/vitest',
                options: {
                    testTargetName: 'test',
                },
            },
        ],
    };

    writeJson(tree, packageJsonPath, mergedPackage);
    writeJson(tree, nxJsonPath, mergedNxJson);
    writeJson(tree, joinPathFragments(directory, 'tsconfig.base.json'), {
        compilerOptions: {
            strict: true,
            target: 'ES2022',
            module: 'NodeNext',
            moduleResolution: 'NodeNext',
            noEmit: true,
            types: ['node'],
        },
    });

    writeText(tree, joinPathFragments(directory, 'README.md'), rootReadme);
    writeText(tree, joinPathFragments(directory, 'docs/TDD_GUARDRAILS.md'), guardrailsDoc);
    writeText(tree, joinPathFragments(directory, 'tools/contract-utils.mjs'), readToolTemplate('contract-utils.mjs'));
    writeText(tree, joinPathFragments(directory, 'tools/check-api-surface-coverage.mjs'), readToolTemplate('check-api-surface-coverage.mjs'));
    writeText(tree, joinPathFragments(directory, 'tools/generate-api-surface-coverage.mjs'), buildGenerateScript());
}

function generateManifest(tree: Tree, directory: string, project: (typeof BOOTSTRAP_PROJECTS)[number]): void {
    const projectRoot = joinPathFragments(directory, project.root);
    const manifest = {
        project: project.name,
        distPrefixes: project.distPrefixes,
        entries: [],
    };
    writeJson(tree, joinPathFragments(projectRoot, 'api-surface-coverage.json'), manifest);
}

function writeProjectFiles(tree: Tree, directory: string, project: (typeof BOOTSTRAP_PROJECTS)[number]): void {
    const projectRoot = joinPathFragments(directory, project.root);
    const depth = project.root.split('/').length;
    const checkScriptPath = relative(
        projectRoot,
        joinPathFragments(directory, 'tools/check-api-surface-coverage.mjs'),
    ).replaceAll('\\', '/');
    const srcDir = joinPathFragments(projectRoot, 'src');
    let toolsImportPath = relative(srcDir, joinPathFragments(directory, 'tools/contract-utils.mjs')).replaceAll('\\', '/');
    if (!toolsImportPath.startsWith('.')) {
        toolsImportPath = `./${toolsImportPath}`;
    }

    writeJson(tree, joinPathFragments(projectRoot, 'package.json'), {
        name: project.packageName,
        version: '0.0.1',
        private: true,
        type: 'module',
    });

    writeJson(
        tree,
        joinPathFragments(projectRoot, 'project.json'),
        projectTemplate({
            projectName: project.name,
            projectRoot: project.root,
            checkScriptPath,
        }),
    );

    writeText(tree, joinPathFragments(projectRoot, 'tsconfig.json'), tsconfigTemplate(depth));
    writeText(tree, joinPathFragments(projectRoot, 'vitest.config.ts'), vitestConfigTemplate());
    writeText(
        tree,
        joinPathFragments(projectRoot, 'src/contract.spec.ts'),
        contractSpecTemplate({
            projectName: project.name,
            distPrefixes: project.distPrefixes,
            toolsImportPath,
        }),
    );
    writeText(tree, joinPathFragments(projectRoot, 'workflows/contract.stepci.yml'), STEP_CI_WORKFLOW);
    generateManifest(tree, directory, project);
}

export function bootstrapTestsRepo(tree: Tree, directory: string): void {
    buildRootConfig(tree, directory);
    for (const project of BOOTSTRAP_PROJECTS) {
        writeProjectFiles(tree, directory, project);
    }
}
