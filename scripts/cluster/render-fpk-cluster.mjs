#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { rmSync } from 'node:fs';

rmSync('tools/cluster/out', { recursive: true, force: true });

const result = spawnSync(
    'pnpm',
    ['exec', 'fpk', '-d', 'tools/cluster/src', '-o', 'tools/cluster/out', '-f', 'yaml', '-i', 'package.json'],
    { stdio: 'inherit', cwd: process.cwd() }
);

process.exit(result.status ?? 1);
