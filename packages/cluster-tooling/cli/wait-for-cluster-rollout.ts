#!/usr/bin/env node
/**
 * Waits for required deployments to roll out (uses @eventiva/cluster-tooling rollout resolution).
 */
import { waitRolloutSync } from '../src/index.js';

waitRolloutSync(process.cwd()).then(
    (code) => process.exit(code),
    (e) => {
        console.error(e);
        process.exit(1);
    },
);
