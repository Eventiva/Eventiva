#!/usr/bin/env node
import { deleteClusterSync } from '../src/delete-cluster.js';

deleteClusterSync(process.cwd()).then(
    (code) => process.exit(code),
    (e) => {
        console.error(e);
        process.exit(1);
    },
);
