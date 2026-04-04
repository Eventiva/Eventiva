import { formatFiles, type Tree } from '@nx/devkit';
import { scaffoldPackageTests } from '../../lib/scaffold-package-tests';
import type { ScaffoldPackageTestsGeneratorSchema } from './schema';

export async function scaffoldPackageTestsGenerator(
    tree: Tree,
    schema: ScaffoldPackageTestsGeneratorSchema,
): Promise<void> {
    scaffoldPackageTests(tree, schema.directory ?? 'tests');
    await formatFiles(tree);
}

export default scaffoldPackageTestsGenerator;
