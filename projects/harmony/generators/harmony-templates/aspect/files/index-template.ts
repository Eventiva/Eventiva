import { capitalize } from "lodash";
import { ComponentContext } from "@teambit/generator";
import type { HarmonyTemplatesOptions } from "../../harmony-templates-options.js";

export function indexFile(context: ComponentContext, options: HarmonyTemplatesOptions, runtimes?: string[]) {

  return {
    relativePath: 'index.ts',
    content: `import { ${context.namePascalCase}Aspect } from './${context.name}.aspect.js';

${runtimes?.map((runtime) => {
  const runtimeSuffix = capitalize(runtime);
  return `export type { ${context.namePascalCase}${runtimeSuffix} } from './${context.name}.${runtime}.runtime.js';`;
}).join('\n')}

export default ${context.namePascalCase}Aspect;
export { ${context.namePascalCase}Aspect };
`
  };
}
