import { ComponentContext } from '@teambit/generator';
import { replace } from 'lodash';

export const appSpecFile = (context: ComponentContext) => {
  const { name, namePascalCase, nameCamelCase } = context;
  const spaced = replace(name, new RegExp('-', 'g'), ' ');

  return {
    relativePath: `${name}.spec.ts`,
    content: `import { ok } from 'node:assert';
import { ${namePascalCase} } from './${name}.js';

describe('${spaced}', () => {
  it('should say hello', async () => {
    const ${nameCamelCase} = ${namePascalCase}.from();
    const greeting = await ${nameCamelCase}.getHello();
    ok(greeting === 'Hello World!');
  })
});
    `,
  };
};
