import { defineProject } from 'vitest/config';

export default defineProject({
    test: {
        include: ['src/**/*.spec.ts'],
        environment: 'node',
        globals: false,
        coverage: {
            enabled: true,
            provider: 'v8',
            reporter: ['text', 'json-summary'],
            thresholds: {
                lines: 80,
                functions: 80,
                branches: 80,
            },
        },
    },
});
