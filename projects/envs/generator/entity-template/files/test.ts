import { ComponentContext } from '@teambit/generator';

export const testFile = (context: ComponentContext) => {
  const { name, namePascalCase } = context;

  return {
    relativePath: `${name}.spec.ts`,
    content: `import { ${namePascalCase} } from './${name}.js';

it('has a ${namePascalCase}.from() method', () => {
  expect(${namePascalCase}.from).toBeTruthy();
});
`,
  };
};
