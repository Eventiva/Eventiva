import { ComponentContext } from "@teambit/generator";

export function aspectFile(context: ComponentContext) {

  return {
    relativePath: `${context.name}.aspect.ts`,
    content: `import { Aspect } from '@bitdev/harmony.harmony';

export const ${context.namePascalCase}Aspect = Aspect.create({
  id: '${context.componentId.toStringWithoutVersion()}'
});

export default ${context.namePascalCase}Aspect;
    `
  };
}
