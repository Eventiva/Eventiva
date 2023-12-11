import { ComponentContext } from '@teambit/generator';

export const indexFile = (context: ComponentContext) => {
  const { namePascalCase: Name, name } = context;

  return {
    relativePath: 'index.ts',
    content: `export { ${Name} } from './${name}.js';
    export { default as ${Name}App } from './${name}.bit-app.js';
`,
  };
};
