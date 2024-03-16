import { ComponentContext } from "@teambit/generator";

export function nodeRuntimeProvider(context: ComponentContext) {
  return `const gqlSchema = ${context.nameCamelCase}GqlSchema(${context.nameCamelCase});

    symphonyPlatform.registerBackendServer([
      {
        gql: gqlSchema,
      }
    ]);
`;
}

export function generateImports(context: ComponentContext) {
  return [`import { ${context.nameCamelCase}GqlSchema } from './${context.name}.graphql.js'`];
}

export function getDummyMethod() {
  return `
  /**
   * retrieve something.
   */
  async getSomething(id: string) {
    return id;
  }  
  `;
}
