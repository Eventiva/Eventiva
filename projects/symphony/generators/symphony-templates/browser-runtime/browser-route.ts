import { ComponentContext } from "@teambit/generator";

export function browserRuntimeProvider(context: ComponentContext) {
  return {
    relativePath: `${context.name}-route.tsx`,
    context: `import React from 'react';

export function ${context.namePascalCase}Route() {
  return <>render your component here</>;
}
`
  };
}
