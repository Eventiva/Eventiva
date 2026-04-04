#!/usr/bin/env node
import { applyClusterSync } from '../src/index.js';

applyClusterSync(process.cwd()).then(
    (code) => process.exit(code),
    (e) => {
        console.error(e);
        process.exit(1);
    },
);
