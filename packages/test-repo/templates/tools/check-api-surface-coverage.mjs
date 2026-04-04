import path from 'node:path';
import process from 'node:process';
import { collectProjectCallables, computeCoverage, loadCoverageManifest } from './contract-utils.mjs';

const parseArgs = () => {
    const args = process.argv.slice(2);
    const output = {};
    for (let index = 0; index < args.length; index += 1) {
        if (args[index] === '--project-root') {
            output.projectRoot = path.resolve(args[index + 1]);
            index += 1;
        }
    }
    return output;
};

const main = () => {
    const { projectRoot } = parseArgs();
    if (!projectRoot) {
        console.error('Missing --project-root argument.');
        process.exit(1);
    }

    const manifestPath = path.join(projectRoot, 'api-surface-coverage.json');
    const manifest = loadCoverageManifest(manifestPath);
    const callables = collectProjectCallables(projectRoot, manifest.distPrefixes ?? []);
    const coverage = computeCoverage(callables, manifest);

    if (coverage.uncovered.length > 0 || coverage.stale.length > 0) {
        console.error('API-surface coverage check failed.');
        if (coverage.uncovered.length > 0) {
            console.error('Uncovered callables:');
            for (const id of coverage.uncovered) console.error(`- ${id}`);
        }
        if (coverage.stale.length > 0) {
            console.error('Stale manifest entries:');
            for (const id of coverage.stale) console.error(`- ${id}`);
        }
        process.exit(1);
    }

    console.log(`API-surface coverage is 100% for ${manifest.project}.`);
};

main();
