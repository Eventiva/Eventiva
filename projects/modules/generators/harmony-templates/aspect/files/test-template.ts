import { capitalize } from "lodash";
import { ComponentContext } from "@teambit/generator";

export function testFile(context: ComponentContext, runtime: string) {
  const runtimeSuffix = capitalize(runtime);
  const runtimeType = `${context.namePascalCase}${runtimeSuffix}`;

  return {
    relativePath: `${context.name}.${runtime}.spec.ts`,
    content: `import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { ${runtimeType} } from './${context.name}.${runtime}.runtime.js';
import { ${context.namePascalCase}Aspect } from './${context.name}.aspect.js';

it('should retrieve the aspect', async () => {
  const ${context.nameCamelCase} = await loadAspect<${runtimeType}>(${context.namePascalCase}Aspect, {
    runtime: '${runtime}',
  });

  expect(${context.nameCamelCase}).toBeTruthy();
});    
`
  };
}
