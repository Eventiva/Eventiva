import { ComponentContext } from '@teambit/generator';

export const indexFile = (context: ComponentContext) => {
  const { name, namePascalCase } = context;

  return {
    relativePath: 'index.ts',
    content: `export { ${namePascalCase} } from './${name}.js';
export type { Plain${namePascalCase} } from './${name}.js';
`,
  };
};
