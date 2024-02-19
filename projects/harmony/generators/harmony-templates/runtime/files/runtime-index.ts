import { ComponentContext } from "@teambit/generator";


export function runtimeIndexFile(context: ComponentContext) {
  return {
    relativePath: `index.ts`,
    content: `export { ${context.namePascalCase} } from './${context.name}.js';
`
  }
}
