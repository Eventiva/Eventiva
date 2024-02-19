import { ComponentContext } from "@teambit/generator";

export function platformGateway(context: ComponentContext) {
  return {
    relativePath: `${context.name}-gateway.ts`,
    content: `import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServer } from "@apollo/server";
import type { ApplicationInstance } from '@teambit/application';

export type StartGatewayOptions = {
  /**
   * port the range.
   */
  port?: number;
};

export async function startGateway(services: ApplicationInstance[], options: StartGatewayOptions) {
  const port = options.port || 4001;
  if (!services.length) return { port };
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      /**
       * include all the running services in the super-graph.
       */
      subgraphs: services.map((service) => {
        return {
          name: service.appName,
          url: service.url || \`http://localhost:\${service.port}/graphql\`
        } 
      })
    }),
  });

  const server = new ApolloServer({ gateway });

  // Note the top-level await!
  const { url } = await startStandaloneServer(server, {
    listen: {
      port,
    }
  });

  return {
    url,
    port
  };
}   
`
  }
}
