import { ComponentContext } from "@teambit/generator";

export function configFile(context: ComponentContext, config?: {imports?: string, configExtends?: string}) {
  return {
    relativePath: `${context.name}-config.ts`,
    content: `${config?.imports}
// use this type for your aspect config.
export type ${context.namePascalCase}Config = {

}${config ? ` & ${config.configExtends}` : ''};

`
  };
}
