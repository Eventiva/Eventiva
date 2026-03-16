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
                    allow: [
                        '^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$',
                    ],
                    depConstraints: [
                        // Test projects may depend on any implementation package
                        {
                            sourceTag: 'scope:tests',
                            onlyDependOnLibsWithTags: [
                                'type:core',
                                'type:database',
                                'type:extension',
                                'type:platform',
                                'type:shared',
                                'layer:backend',
                                'layer:shared',
                            ],
                        },
                        // Type-based constraints (primary architectural boundaries)
                        {
                            sourceTag: 'type:core',
                            onlyDependOnLibsWithTags: [],
                        },
                        {
                            sourceTag: 'type:database',
                            onlyDependOnLibsWithTags: ['type:core', 'type:shared'],
                        },
                        {
                            sourceTag: 'type:extension',
                            onlyDependOnLibsWithTags: ['type:core', 'type:shared', 'type:extension'],
                        },
                        {
                            sourceTag: 'type:platform',
                            onlyDependOnLibsWithTags: ['type:core', 'type:shared', 'type:database', 'type:extension', 'type:platform'],
                        },
                        {
                            sourceTag: 'type:shared',
                            onlyDependOnLibsWithTags: ['type:shared'],
                        },
                        // Layer-based constraints (frontend/backend separation)
                        {
                            sourceTag: 'layer:backend',
                            onlyDependOnLibsWithTags: ['layer:backend', 'layer:shared'],
                        },
                        {
                            sourceTag: 'layer:frontend',
                            onlyDependOnLibsWithTags: ['layer:frontend', 'layer:shared'],
                        },
                        {
                            sourceTag: 'layer:shared',
                            onlyDependOnLibsWithTags: ['layer:shared'],
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
    // Test files: relax rules that conflict with Effect/Vitest patterns
    {
        files: ['**/*.spec.ts', '**/*.spec.tsx'],
        rules: {
            'require-yield': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
];
