import { ComponentContext } from '@teambit/generator';

export function testFile(context: ComponentContext) {
  return {
    relativePath: `${context.name}.spec.ts`,
    content: `import { ${context.nameCamelCase} } from './${context.name}';

it('renders with the correct text', () => {
  ok(${context.nameCamelCase}() === 'hello world');
});
`,
  };
}
