import { ComponentContext } from "@teambit/generator";

export function configFile(context: ComponentContext) {
  return {
    relativePath: `${context.name}-config.ts`,
    content: `
export type ${context.namePascalCase} ={
  gatewayPort?: [number, number],
  servicePortRange?: [number, number],
};    
`
  }
}
