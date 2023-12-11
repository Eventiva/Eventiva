import { ComponentContext } from '@teambit/generator';

export const AppRootFile = (context: ComponentContext) => {
  const { name, namePascalCase, nameCamelCase } = context;
  return {
    relativePath: `${name}.app-root.ts`,
    content: `import express from 'express';
import { ${namePascalCase} } from "./${name}.js";

export function create${namePascalCase}() {
  const app = express();
  const ${nameCamelCase} = ${namePascalCase}.from();
  const port = process.env.PORT || 3000;

  /**
   * learn more on the express docs:
   * https://expressjs.com/en/starter/hello-world.html
   */
  app.get('/', async (req, res) => {
    const greeting = await ${nameCamelCase}.getHello();
    res.send(greeting);
  });
  
  app.listen(port, () => {
    console.log(\`🚀  Server ready at: http://localhost:\${port}\`);
  });
}
/**
 * bootstrap your app
 */
create${namePascalCase}();
`,
  };
};
