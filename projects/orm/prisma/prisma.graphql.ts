import { GqlSchema } from '@bitdev/symphony.backends.backend-server';
import { gql } from 'graphql-tag';
import type { PrismaNode } from './prisma.node.runtime.js';

export function prismaGqlSchema(prisma: PrismaNode): GqlSchema {
  return {
    typeDefs: gql`

    type Something {
      name: String
    }

    type Query {
      getSomething(id: String): Something
    }
    `,
    resolvers: {
      Query: {
        getSomething: async (req, { id }: { id: string }) => {
          const something = await prisma.getSomething(id);
          return something;
        },
      }
    }
  };
}
