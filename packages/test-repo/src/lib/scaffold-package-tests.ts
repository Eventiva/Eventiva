import { joinPathFragments, type Tree } from '@nx/devkit';

const PACKAGES = [
    { rel: 'core', nx: 'tests-core', importPath: '@eventiva/core' },
    { rel: 'cluster-tooling', nx: 'tests-cluster-tooling', importPath: '@eventiva/cluster-tooling' },
    {
        rel: 'platforms/postgresql',
        nx: 'tests-platforms-postgresql',
        importPath: '@eventiva/platforms.postgresql',
    },
    { rel: 'platforms/mysql', nx: 'tests-platforms-mysql', importPath: '@eventiva/platforms.mysql' },
    { rel: 'extensions/runner', nx: 'tests-extensions-runner', importPath: '@eventiva/extensions.runner' },
    { rel: 'extensions/shooter', nx: 'tests-extensions-shooter', importPath: '@eventiva/extensions.shooter' },
    {
        rel: 'extensions/speed-shooter',
        nx: 'tests-extensions-speed-shooter',
        importPath: '@eventiva/extensions.speed-shooter',
    },
    {
        rel: 'extensions/slow-shooter',
        nx: 'tests-extensions-slow-shooter',
        importPath: '@eventiva/extensions.slow-shooter',
    },
    {
        rel: 'extensions/copyright-notice',
        nx: 'tests-extensions-copyright-notice',
        importPath: '@eventiva/extensions.copyright-notice',
    },
    {
        rel: 'extensions/example-transform',
        nx: 'tests-extensions-example-transform',
        importPath: '@eventiva/extensions.example-transform',
    },
    {
        rel: 'extensions/hooks-kafka-demo',
        nx: 'tests-extensions-hooks-kafka-demo',
        importPath: '@eventiva/extensions.hooks-kafka-demo',
    },
    {
        rel: 'integrations/kafka',
        nx: 'tests-integrations-kafka',
        importPath: '@eventiva/integrations.kafka',
    },
] as const;

const vitestUnit = (levelsUpToWorkspace: number, packagesSubpath: string) => {
    const presetImport = `${'../'.repeat(packagesSubpath.split('/').length)}`;
    return `import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineProject } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import { implementationCoverage, workspaceLinkedPackagesVite } from '${presetImport}vitest-coverage-preset.js';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const workspaceRoot = path.resolve(projectRoot, '${'../'.repeat(levelsUpToWorkspace)}');

export default defineProject({
    ...workspaceLinkedPackagesVite,
    plugins: [
        tsconfigPaths({
            root: workspaceRoot,
            projects: [path.join(workspaceRoot, 'tsconfig.base.json'), path.join(projectRoot, 'tsconfig.json')],
        }),
    ],
    test: {
        root: projectRoot,
        include: ['src/**/*.spec.ts'],
        exclude: ['src/**/*.e2e.spec.ts'],
        environment: 'node',
        globals: false,
        passWithNoTests: true,
        coverage: implementationCoverage(workspaceRoot, projectRoot, '${packagesSubpath}'),
    },
});
`;
};

const vitestE2e = (levelsUpToWorkspace: number) => `import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineProject } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const workspaceRoot = path.resolve(projectRoot, '${'../'.repeat(levelsUpToWorkspace)}');

process.env.EVENTIVA_CLUSTER_E2E ??= '1';

export default defineProject({
    plugins: [
        tsconfigPaths({
            root: workspaceRoot,
            projects: [path.join(workspaceRoot, 'tsconfig.base.json'), path.join(projectRoot, 'tsconfig.json')],
        }),
    ],
    test: {
        root: projectRoot,
        include: ['src/**/*.e2e.spec.ts'],
        environment: 'node',
        globals: false,
        passWithNoTests: true,
        testTimeout: 120_000,
    },
});
`;

const tsconfig = (depthToBase: number) => `{
    "extends": "${'../'.repeat(depthToBase)}tsconfig.base.json",
    "compilerOptions": {
        "noEmit": true
    },
    "include": ["src/**/*.ts", "vitest.config.ts", "vitest.e2e.config.ts"]
}
`;

const unitTodo = (importPath: string, label: string) => `import { describe } from 'vitest';

describe.todo('${label} — add unit tests for ${importPath} (public API and pure helpers)');
`;

const e2eSpec = (label: string) => `/** Extend with in-cluster checks when EVENTIVA_CLUSTER_E2E=1. */
import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

const cluster = process.env.EVENTIVA_CLUSTER_E2E === '1';

describe.skipIf(!cluster)('${label} — cluster E2E', () => {
    it.live('cluster gate is active for live tests', () =>
        Effect.gen(function* () {
            expect(process.env.EVENTIVA_CLUSTER_E2E).toBe('1');
        }),
    );
});
`;

const projectJson = (nx: string, rel: string) => {
    const configPath = `tests/${rel}/vitest.config.ts`;
    const e2ePath = `tests/${rel}/vitest.e2e.config.ts`;
    const depth = rel.split('/').length;
    const schemaUp = depth + 1;
    return {
        name: nx,
        $schema: `${'../'.repeat(schemaUp)}node_modules/nx/schemas/project-schema.json`,
        projectType: 'library',
        tags: ['scope:tests'],
        sourceRoot: `tests/${rel}/src`,
        targets: {
            test: {
                executor: '@nx/vitest:test',
                options: {
                    configFile: configPath,
                },
                outputs: [`{workspaceRoot}/coverage/tests/${rel}`],
                cache: true,
            },
            'test:e2e': {
                executor: '@nx/vitest:test',
                options: {
                    configFile: e2ePath,
                },
                outputs: [`{workspaceRoot}/coverage/tests/${rel}/e2e`],
                cache: false,
            },
        },
    };
};

export function scaffoldPackageTests(tree: Tree, directory: string): void {
    for (const p of PACKAGES) {
        const testRoot = joinPathFragments(directory, p.rel);
        const depth = p.rel.split('/').length;
        const levelsUpToWorkspace = depth + 1;
        const depthToBase = depth + 1;

        tree.write(joinPathFragments(testRoot, 'vitest.config.ts'), vitestUnit(levelsUpToWorkspace, p.rel));
        tree.write(joinPathFragments(testRoot, 'vitest.e2e.config.ts'), vitestE2e(levelsUpToWorkspace));
        tree.write(joinPathFragments(testRoot, 'tsconfig.json'), tsconfig(depthToBase));
        tree.write(joinPathFragments(testRoot, 'project.json'), `${JSON.stringify(projectJson(p.nx, p.rel), null, 4)}\n`);
        const label = p.rel.replace(/\//g, ' ');
        tree.write(joinPathFragments(testRoot, 'src/unit.spec.ts'), unitTodo(p.importPath, label));
        tree.write(joinPathFragments(testRoot, 'src/cluster.e2e.spec.ts'), e2eSpec(label));
    }
}
