import { ComponentContext } from "@teambit/generator";

export function indexFile(context: ComponentContext) {
  return {
    relativePath: 'index.ts',
    content: `export { ${context.namePascalCase} } from './${context.name}.bit-app.js';`
  };
}
