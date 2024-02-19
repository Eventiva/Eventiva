import { ComponentContext } from "@teambit/generator";

export function nodeTests(context: ComponentContext) {
  const aspectId = `${context.namePascalCase}Aspect`;
  const nodeId = `${context.namePascalCase}Node`;

  return {
    relativePath: `${context.name}.node.spec.tsx`,
    content: `import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import { ${aspectId} } from './${context.name}.aspect.js';
import type { ${nodeId} } from './${context.name}.node.runtime.js';

it('should have an existing node runtime', async () => {
  const ${context.nameCamelCase} = await loadAspect<${nodeId}>(${aspectId}, {
    runtime: 'node'
  });

  expect(${context.nameCamelCase}).toBeTruthy();
});
`
  };
}
