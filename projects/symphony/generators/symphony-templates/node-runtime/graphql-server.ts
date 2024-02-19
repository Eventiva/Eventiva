import { ComponentContext } from "@teambit/generator";

export function graphQLServerFile(context: ComponentContext) {
  const runtimeIdentifier = `${context.namePascalCase}Node`;

  return {
    relativePath: `${context.name}.graphql.ts`,
    content: `import { GqlSchema } from '@bitdev/symphony.backends.backend-server';
import { gql } from 'graphql-tag';
import type { ${runtimeIdentifier} } from './${context.name}.node.runtime.js';

export function ${context.nameCamelCase}GqlSchema(${context.nameCamelCase}: ${runtimeIdentifier}): GqlSchema {
  return {
    typeDefs: gql\`

    type Something {
      name: String
    }

    type Query {
      getSomething(id: String): Something
    }
    \`,
    resolvers: {
      Query: {
        getSomething: async (req, { id }: { id: string }) => {
          const something = await ${context.nameCamelCase}.getSomething(id);
          return something;
        },
      }
    }
  };
}
`
  }
}
