import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineProject } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const workspaceRoot = path.resolve(projectRoot, '../..');

export default defineProject({
    plugins: [
        tsconfigPaths({
            root: workspaceRoot,
            projects: [path.join(workspaceRoot, 'tsconfig.base.json')],
        }),
    ],
    resolve: {
        alias: [
            {
                find: /^@eventiva\/core$/,
                replacement: path.resolve(workspaceRoot, 'packages/core/src/index.ts'),
            },
            {
                find: /^@eventiva\/core\/(.+)$/,
                replacement: path.resolve(workspaceRoot, 'packages/core/src/$1.ts'),
            },
            {
                find: /^@eventiva\/databases\.shared$/,
                replacement: path.resolve(workspaceRoot, 'packages/databases/shared/src/index.ts'),
            },
            {
                find: /^@eventiva\/databases\.shared\/(.+)$/,
                replacement: path.resolve(workspaceRoot, 'packages/databases/shared/src/$1.ts'),
            },
            {
                find: /^@eventiva\/extensions\.hello-world$/,
                replacement: path.resolve(workspaceRoot, 'packages/extensions/hello-world/src/index.ts'),
            },
            {
                find: /^@eventiva\/extensions\.hello-world\/(.+)$/,
                replacement: path.resolve(workspaceRoot, 'packages/extensions/hello-world/src/$1.ts'),
            },
        ],
    },
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
