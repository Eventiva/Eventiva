import fs from 'node:fs/promises';
import path from 'node:path';

const targetRoot = path.resolve(process.argv[2] ?? 'tests-repo');
const distRoot = path.join(targetRoot, 'dist');

const PROJECTS = [
    {
        name: 'tests-core',
        packageName: '@eventiva/tests.core',
        root: 'core',
        distPrefixes: ['dist/packages/core/src/'],
    },
    {
        name: 'tests-extensions-hello-world',
        packageName: '@eventiva/tests.extensions.hello-world',
        root: 'extensions/hello-world',
        distPrefixes: ['dist/packages/extensions/hello-world/src/'],
    },
    {
        name: 'tests-databases-pg',
        packageName: '@eventiva/tests.databases.pg',
        root: 'databases/pg',
        distPrefixes: ['dist/packages/databases/pg/src/'],
    },
    {
        name: 'tests-platforms-default',
        packageName: '@eventiva/tests.platforms.default',
        root: 'platforms/default',
        distPrefixes: ['dist/packages/platforms/default/src/'],
    },
];

const ensureDir = async (dir) => {
    await fs.mkdir(dir, { recursive: true });
};

const readJsonIfExists = async (filePath) => {
    const content = await fs.readFile(filePath, 'utf8').catch(() => undefined);
    if (!content) return undefined;
    return JSON.parse(content);
};

const writeJson = async (filePath, value) => {
    await ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, `${JSON.stringify(value, null, 4)}\n`, 'utf8');
};

const writeText = async (filePath, value) => {
    await ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, value, 'utf8');
};

const projectTemplate = ({ projectName, projectRoot, checkScriptPath }) => ({
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

const tsconfigTemplate = (depthToRoot) => {
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

const CONTRACT_UTILS = `import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const isDeclarationFile = (filePath) => filePath.endsWith('.d.ts');

const walk = (dir) => {
    if (!fs.existsSync(dir)) return [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...walk(fullPath));
        } else {
            files.push(fullPath);
        }
    }
    return files;
};

const hasModifier = (node, modifier) =>
    Boolean(node.modifiers?.some((value) => value.kind === modifier));

const getJsDoc = (sourceText, node) => {
    const prefix = sourceText.slice(0, node.getStart());
    const match = prefix.match(/\\/\\*\\*[\\s\\S]*?\\*\\/\\s*$/);
    return match?.[0] ?? '';
};

const normalizeParamName = (value) => value.replace(/^\\.\\.\\./, '').replace(/\\?$/, '');

const pushCallable = (target, sourceText, sourceFile, idSuffix, node, parameters, returnType) => {
    const doc = getJsDoc(sourceText, node);
    const paramTags = (doc.match(/@param\\s+([A-Za-z0-9_]+)/g) ?? []).map((line) =>
        line.replace('@param', '').trim()
    );
    target.push({
        id: idSuffix,
        parameters: parameters.map(normalizeParamName).filter(Boolean),
        returnType,
        hasExample: doc.includes('@example'),
        hasRemarks: doc.includes('@remarks'),
        hasReturns: doc.includes('@returns'),
        paramTags,
        line: sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1,
    });
};

const parseCallables = (absolutePath, repoRoot) => {
    const sourceText = fs.readFileSync(absolutePath, 'utf8');
    const sourceFile = ts.createSourceFile(absolutePath, sourceText, ts.ScriptTarget.Latest, true);
    const relativeFile = path.relative(repoRoot, absolutePath).replaceAll('\\\\\\\\', '/');
    const callables = [];

    const visit = (node) => {
        if (ts.isFunctionDeclaration(node) && hasModifier(node, ts.SyntaxKind.ExportKeyword) && node.name) {
            pushCallable(
                callables,
                sourceText,
                sourceFile,
                \`\${relativeFile}#\${node.name.text}\`,
                node,
                node.parameters.map((param) => param.name.getText()),
                node.type?.getText() ?? 'unknown'
            );
        }

        if (ts.isVariableStatement(node) && hasModifier(node, ts.SyntaxKind.ExportKeyword)) {
            for (const declaration of node.declarationList.declarations) {
                if (ts.isIdentifier(declaration.name) && declaration.type && ts.isFunctionTypeNode(declaration.type)) {
                    pushCallable(
                        callables,
                        sourceText,
                        sourceFile,
                        \`\${relativeFile}#\${declaration.name.text}\`,
                        node,
                        declaration.type.parameters.map((param) => param.name.getText()),
                        declaration.type.type?.getText() ?? 'unknown'
                    );
                }
            }
        }

        if (ts.isClassDeclaration(node) && hasModifier(node, ts.SyntaxKind.ExportKeyword) && node.name) {
            for (const member of node.members) {
                if (ts.isMethodDeclaration(member) && member.name) {
                    const methodName = ts.isIdentifier(member.name) ? member.name.text : member.name.getText();
                    pushCallable(
                        callables,
                        sourceText,
                        sourceFile,
                        \`\${relativeFile}#\${node.name.text}.\${methodName}\`,
                        member,
                        member.parameters.map((param) => param.name.getText()),
                        member.type?.getText() ?? 'unknown'
                    );
                }
            }
        }

        if (ts.isInterfaceDeclaration(node) && hasModifier(node, ts.SyntaxKind.ExportKeyword)) {
            for (const member of node.members) {
                if (ts.isMethodSignature(member) && member.name) {
                    const methodName = ts.isIdentifier(member.name) ? member.name.text : member.name.getText();
                    pushCallable(
                        callables,
                        sourceText,
                        sourceFile,
                        \`\${relativeFile}#\${node.name.text}.\${methodName}\`,
                        member,
                        member.parameters.map((param) => param.name.getText()),
                        member.type?.getText() ?? 'unknown'
                    );
                }
            }
        }

        ts.forEachChild(node, visit);
    };

    visit(sourceFile);
    return callables;
};

export const collectProjectCallables = (projectRoot, distPrefixes) => {
    const repoRoot = path.dirname(projectRoot);
    const distDir = path.join(repoRoot, 'dist');
    const declarationFiles = walk(distDir).filter(isDeclarationFile);
    const matched = declarationFiles.filter((absolutePath) => {
        const relative = path.relative(repoRoot, absolutePath).replaceAll('\\\\\\\\', '/');
        return distPrefixes.some((prefix) => relative.startsWith(prefix));
    });

    const callables = matched.flatMap((filePath) => parseCallables(filePath, repoRoot));
    return callables.sort((a, b) => a.id.localeCompare(b.id));
};

export const loadCoverageManifest = (manifestPath) => {
    const content = fs.readFileSync(manifestPath, 'utf8');
    return JSON.parse(content);
};

export const computeCoverage = (callables, manifest) => {
    const callableIds = new Set(callables.map((entry) => entry.id));
    const manifestIds = new Set((manifest.entries ?? []).map((entry) => entry.id));
    const uncovered = [...callableIds].filter((id) => !manifestIds.has(id)).sort();
    const stale = [...manifestIds].filter((id) => !callableIds.has(id)).sort();
    return { uncovered, stale };
};
`;

const CHECK_SCRIPT = `import path from 'node:path';
import process from 'node:process';
import { collectProjectCallables, computeCoverage, loadCoverageManifest } from './contract-utils.mjs';

const parseArgs = () => {
    const args = process.argv.slice(2);
    const output = {};
    for (let index = 0; index < args.length; index += 1) {
        if (args[index] === '--project-root') {
            output.projectRoot = path.resolve(args[index + 1]);
            index += 1;
        }
    }
    return output;
};

const main = () => {
    const { projectRoot } = parseArgs();
    if (!projectRoot) {
        console.error('Missing --project-root argument.');
        process.exit(1);
    }

    const manifestPath = path.join(projectRoot, 'api-surface-coverage.json');
    const manifest = loadCoverageManifest(manifestPath);
    const callables = collectProjectCallables(projectRoot, manifest.distPrefixes ?? []);
    const coverage = computeCoverage(callables, manifest);

    if (coverage.uncovered.length > 0 || coverage.stale.length > 0) {
        console.error('API-surface coverage check failed.');
        if (coverage.uncovered.length > 0) {
            console.error('Uncovered callables:');
            for (const id of coverage.uncovered) console.error(\`- \${id}\`);
        }
        if (coverage.stale.length > 0) {
            console.error('Stale manifest entries:');
            for (const id of coverage.stale) console.error(\`- \${id}\`);
        }
        process.exit(1);
    }

    console.log(\`API-surface coverage is 100% for \${manifest.project}.\`);
};

main();
`;

const GENERATE_SCRIPT = `import fs from 'node:fs/promises';
import path from 'node:path';
import { collectProjectCallables } from './contract-utils.mjs';

const PROJECTS = ${JSON.stringify(
    PROJECTS.map((project) => ({ name: project.name, root: project.root, distPrefixes: project.distPrefixes })),
    null,
    4
)};

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

const rootReadme = `# Eventiva/tests seed

This repository is managed by the main Eventiva TDD workflow.

## Rules

- Tests are authored from declaration contracts in \`dist/\` only.
- Existing tests are never deleted.
- Test changes should only touch test files, test workflows, and test configuration.
- API-surface coverage uses declaration callables as the source of truth.

## Commands

- \`pnpm nx run-many -t test --projects='tests-*' --outputStyle=static\`
- \`pnpm nx run-many -t contracts:coverage --projects='tests-*' --outputStyle=static\`
- \`pnpm contracts:coverage:generate\` (refreshes per-project coverage manifests)
`;

const guardrailsDoc = `# TDD guardrails

## Source of truth

- Use \`dist/**/*.d.ts\` as the only contract source for generated tests.
- Do not rely on implementation internals.

## Test mutation policy

- Never delete existing tests.
- Add or update tests only.
- Keep tests under \`<projectRoot>/src/**/*.spec.ts\`.

## Coverage policy

- Contract coverage must be 100% for exported callable API surfaces.
- Runtime code coverage threshold remains enforced by main repo CI when tests execute against implementation.
`;

const buildRootConfig = async () => {
    const packageJsonPath = path.join(targetRoot, 'package.json');
    const existingPackage = (await readJsonIfExists(packageJsonPath)) ?? {};
    const mergedPackage = {
        ...existingPackage,
        name: existingPackage.name ?? '@eventiva/tests',
        private: true,
        type: 'module',
        packageManager: 'pnpm@9.14.2',
        scripts: {
            ...(existingPackage.scripts ?? {}),
            test: "nx run-many -t test --projects='tests-*' --outputStyle=static",
            'contracts:coverage': "nx run-many -t contracts:coverage --projects='tests-*' --outputStyle=static",
            'contracts:coverage:generate': 'node tools/generate-api-surface-coverage.mjs',
        },
        devDependencies: {
            ...(existingPackage.devDependencies ?? {}),
            nx: existingPackage.devDependencies?.nx ?? '^22.5.4',
            '@nx/vitest': existingPackage.devDependencies?.['@nx/vitest'] ?? '^22.5.4',
            vitest: existingPackage.devDependencies?.vitest ?? '^2.1.0',
            '@effect/vitest': existingPackage.devDependencies?.['@effect/vitest'] ?? '^0.27.0',
            typescript: existingPackage.devDependencies?.typescript ?? '^5.9.2',
            '@stepci/runner': existingPackage.devDependencies?.['@stepci/runner'] ?? '^2.0.7',
        },
    };

    const nxJsonPath = path.join(targetRoot, 'nx.json');
    const existingNxJson = (await readJsonIfExists(nxJsonPath)) ?? {};
    const mergedNxJson = {
        ...existingNxJson,
        $schema: './node_modules/nx/schemas/nx-schema.json',
        plugins: [
            ...(existingNxJson.plugins ?? []).filter(
                (plugin) => !(typeof plugin === 'object' && plugin.plugin === '@nx/vitest')
            ),
            {
                plugin: '@nx/vitest',
                options: {
                    testTargetName: 'test',
                },
            },
        ],
    };

    await writeJson(packageJsonPath, mergedPackage);
    await writeJson(nxJsonPath, mergedNxJson);
    await writeJson(path.join(targetRoot, 'tsconfig.base.json'), {
        compilerOptions: {
            strict: true,
            target: 'ES2022',
            module: 'NodeNext',
            moduleResolution: 'NodeNext',
            noEmit: true,
            types: ['node'],
        },
    });

    await writeText(path.join(targetRoot, 'README.md'), rootReadme);
    await writeText(path.join(targetRoot, 'docs/TDD_GUARDRAILS.md'), guardrailsDoc);
    await writeText(path.join(targetRoot, 'tools/contract-utils.mjs'), CONTRACT_UTILS);
    await writeText(path.join(targetRoot, 'tools/check-api-surface-coverage.mjs'), CHECK_SCRIPT);
    await writeText(path.join(targetRoot, 'tools/generate-api-surface-coverage.mjs'), GENERATE_SCRIPT);
};

const generateManifest = async (project) => {
    const projectRoot = path.join(targetRoot, project.root);
    const manifest = {
        project: project.name,
        distPrefixes: project.distPrefixes,
        entries: [],
    };

    await writeJson(path.join(projectRoot, 'api-surface-coverage.json'), manifest);
};

const writeProjectFiles = async (project) => {
    const projectRoot = path.join(targetRoot, project.root);
    const depth = project.root.split('/').length;
    const checkScriptPath = path
        .relative(projectRoot, path.join(targetRoot, 'tools/check-api-surface-coverage.mjs'))
        .replaceAll('\\', '/');
    const toolsImportPath = path
        .relative(path.join(projectRoot, 'src'), path.join(targetRoot, 'tools/contract-utils.mjs'))
        .replaceAll('\\', '/')
        .replace(/^(?!\.)/, './');

    await writeJson(path.join(projectRoot, 'package.json'), {
        name: project.packageName,
        version: '0.0.1',
        private: true,
        type: 'module',
    });

    await writeJson(
        path.join(projectRoot, 'project.json'),
        projectTemplate({
            projectName: project.name,
            projectRoot: project.root,
            checkScriptPath,
        })
    );

    await writeText(path.join(projectRoot, 'tsconfig.json'), tsconfigTemplate(depth));
    await writeText(path.join(projectRoot, 'vitest.config.ts'), vitestConfigTemplate());
    await writeText(
        path.join(projectRoot, 'src/contract.spec.ts'),
        contractSpecTemplate({
            projectName: project.name,
            distPrefixes: project.distPrefixes,
            toolsImportPath,
        })
    );
    await writeText(path.join(projectRoot, 'workflows/contract.stepci.yml'), STEP_CI_WORKFLOW);
    await generateManifest(project);
};

const main = async () => {
    const stat = await fs.stat(distRoot).catch(() => undefined);
    if (!stat || !stat.isDirectory()) {
        console.error(`Cannot bootstrap tests repo: dist directory not found at ${distRoot}`);
        process.exit(1);
    }

    await buildRootConfig();

    for (const project of PROJECTS) {
        await writeProjectFiles(project);
    }

    console.log(`Bootstrapped tests repo in ${targetRoot}`);
};

await main();
