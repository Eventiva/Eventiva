import { ComponentContext } from "@teambit/generator";


export function indexFile(context: ComponentContext) {
  return {
    relativePath: `index.ts`,
    content: `import { ${context.namePascalCase}Aspect } from './${context.name}.aspect.js';

export type { BackendServer, ${context.namePascalCase}Context } from './backend.js';
export type { Route } from './route.js';
export type { ${context.namePascalCase}Browser } from './${context.name}.browser.runtime.js';
export type { ${context.namePascalCase}Node } from './${context.name}.node.runtime.js';

export default ${context.namePascalCase}Aspect;
export { ${context.namePascalCase}Aspect };    
`
  };
}
