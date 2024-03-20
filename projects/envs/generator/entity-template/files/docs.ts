import { ComponentContext } from '@teambit/generator';
import { replace } from 'lodash';

export const docsFile = (context: ComponentContext) => {
  const { name, nameCamelCase, namePascalCase } = context;
  const spaced = replace(name, new RegExp('-', 'g'), ' ');

  return {
    relativePath: `${name}.docs.mdx`,
    content: `---
labels: ['${spaced}', 'entity']
description: 'A ${namePascalCase} entity.'
---

A component for a ${namePascalCase} entity, supports serialization and de-serialization of ${namePascalCase} objects and can be used from
both backend and frontend.

## Get started

Install and use the entity to create a new instance:

\`\`\`ts
const ${nameCamelCase} = ${namePascalCase}.from({
  name: 'hello'
});
\`\`\`
`,
  };
};
