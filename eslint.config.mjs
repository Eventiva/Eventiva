import nx from '@nx/eslint-plugin';

export default [
    ...nx.configs['flat/base'],
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/javascript'],
    {
        ignores: [
            // original ignores
            '**/dist',
            '**/out-tsc',
            '**/vitest.config.*.timestamp*',
            // migrated from .eslintignore
            '**/*.log',
            '**/.DS_Store',
            '*.',
            '.vscode/settings.json',
            '.history',
            '.yarn',
            'bazel-*',
            'bazel-bin',
            'bazel-out',
            'bazel-qwik',
            'bazel-testlogs',
            'dist-dev',
            'lib',
            'lib-types',
            'etc',
            'external',
            'node_modules',
            'temp',
            'tsc-out',
            'tsdoc-metadata.json',
            'target',
            'output',
            'rollup.config.js',
            'build',
            '.cache',
            '.vscode',
            '.rollup.cache',
            'tsconfig.tsbuildinfo',
            'vite.config.ts',
            '*.spec.tsx',
            '*.spec.ts',
            '.netlify',
            'pnpm-lock.yaml',
            'package-lock.json',
            'yarn.lock',
            'server',
            '.devcontainer',
            '.github',
            'common',
        ],
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
                    depConstraints: [
                        {
                            sourceTag: 'type:core',
                            onlyDependOnLibsWithTags: [],
                        },
                        {
                            sourceTag: 'type:database',
                            onlyDependOnLibsWithTags: ['type:core'],
                        },
                        {
                            sourceTag: 'type:extension',
                            onlyDependOnLibsWithTags: ['type:core', 'type:extension'],
                        },
                        {
                            sourceTag: 'type:platform',
                            onlyDependOnLibsWithTags: ['type:core', 'type:database', 'type:extension', 'type:platform'],
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
        // Override or add rules here
        rules: {},
    },
];
