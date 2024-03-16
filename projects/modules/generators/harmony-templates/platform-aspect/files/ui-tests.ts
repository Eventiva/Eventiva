import { ComponentContext } from "@teambit/generator";

export function uiTests(context: ComponentContext) {
  const aspectId = `${context.namePascalCase}Aspect`;
  const uiId = `${context.namePascalCase}Browser`;

  return {
    relativePath: `${context.name}.browser.spec.tsx`,
    content: `import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import { ${aspectId} } from './${context.name}.aspect.js';
import type { ${uiId} } from './${context.name}.browser.runtime.js';

it('should have no routes registered', async () => {
  const ${context.nameCamelCase} = await loadAspect<${uiId}>(${aspectId}, {
    runtime: 'browser'
  });

  expect(${context.nameCamelCase}.listRoutes().length).toEqual(0);
});
`
  };
}
