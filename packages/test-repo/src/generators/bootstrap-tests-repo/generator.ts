import { formatFiles, type Tree } from '@nx/devkit';
import { bootstrapTestsRepo } from '../../lib/bootstrap-tests-repo';
import type { BootstrapTestsRepoGeneratorSchema } from './schema';

export async function bootstrapTestsRepoGenerator(tree: Tree, schema: BootstrapTestsRepoGeneratorSchema): Promise<void> {
    bootstrapTestsRepo(tree, schema.directory ?? 'tests-repo');
    await formatFiles(tree);
}

export default bootstrapTestsRepoGenerator;
