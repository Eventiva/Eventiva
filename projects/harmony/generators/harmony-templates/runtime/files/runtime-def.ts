import { ComponentContext } from "@teambit/generator";


export function runtimeDefFile(context: ComponentContext) {
  const runtimeDefId = `${context.namePascalCase}Def`;

  return {
    relativePath: `${context.name}-definition.ts`,
    content: `import { RuntimeDefinition } from "@bitdev/harmony.harmony";

export const ${runtimeDefId} = new RuntimeDefinition('${context.name}');
`
  }
}
