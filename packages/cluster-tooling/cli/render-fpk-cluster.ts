#!/usr/bin/env node
/**
 * Renders FPK manifests to packages/cluster-tooling/fpk/out (thin CLI for @eventiva/cluster-tooling).
 */
import { renderClusterSync } from '../src/index.js';

renderClusterSync(process.cwd()).then(
    (code) => process.exit(code),
    (e) => {
        console.error(e);
        process.exit(1);
    },
);
