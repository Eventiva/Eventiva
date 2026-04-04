#!/usr/bin/env node
/**
 * Regression helper: ensure aggregated cluster logs contain expected demo substrings.
 * Reads stdin if no file arg; otherwise reads the given file (UTF-8).
 *
 * Usage:
 *   pnpm exec nx run cluster-tooling:compose-logs | pnpm exec tsx packages/cluster-tooling/cli/verify-cluster-demo-logs.ts
 *   pnpm exec tsx packages/cluster-tooling/cli/verify-cluster-demo-logs.ts /tmp/cluster.log
 */
import { readFileSync } from 'node:fs';

const needles = ['Boom!', 'Shooting at', 'Shot at', 'Shots fired:'] as const;

function readStdinUtf8(): Promise<string> {
    return new Promise((resolve, reject) => {
        let data = '';
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', (chunk) => {
            data += chunk;
        });
        process.stdin.on('end', () => resolve(data));
        process.stdin.on('error', reject);
    });
}

async function main(): Promise<void> {
    const path = process.argv[2];
    const text = path ? readFileSync(path, 'utf8') : await readStdinUtf8();
    const missing = needles.filter((n) => !text.includes(n));
    if (missing.length > 0) {
        console.error('verify-cluster-demo-logs: missing substrings:', missing.join(', '));
        process.exit(1);
    }
    console.error('verify-cluster-demo-logs: ok (all demo substrings present)');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
