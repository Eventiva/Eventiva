import { ComponentContext } from "@teambit/generator";

export function browserRuntimeProvider(context: ComponentContext) {
  return `
    symphonyPlatform.registerRoute([
      {
        path: '/${context.name}',
        component: () => {
          return <>render your route here</>;
        }
      }
    ])
`;
}

export function generateImports(context: ComponentContext) {
  return `import { ${context.namePascalCase}Route } from ./${context.name}-route.js`;
}
