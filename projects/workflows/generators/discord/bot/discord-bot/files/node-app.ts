import { ComponentContext } from '@teambit/generator';

export const nodeAppFile = (context: ComponentContext) => {
  const { name } = context;

  return {
    relativePath: `${name}.bit-app.ts`,
    content: `import { NodeApp } from '@bitdev/node.node-app';

export default NodeApp.from({
  name: '${name}',
  mainPath: import.meta.resolve('./${name}.app-root.js'),
});
`,
  };
};
