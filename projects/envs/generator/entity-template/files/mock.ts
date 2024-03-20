import { ComponentContext } from "@teambit/generator";

export function mockEntityFile(context: ComponentContext) {
  return {
    relativePath: `${context.name}.mock.ts`,
    content: `

export const ${context.nameCamelCase}Mock = {
  ${context.nameCamelCase}: ${context.namePascalCase}.from({
    name: '${context.name}'
  });
};
`
  }
}
