import { ComponentContext } from "@teambit/generator";

export function indexHtmlFile(context: ComponentContext) {
  return {
    relativePath: `index.html`,
    content: `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!--ssr-head-outlet-->
    <!--scripts-->
    <title>${context.name}</title>
  </head>
  <body>
    <!--ssr-outlet-->
  </body>
</html>        
`
  }
}
