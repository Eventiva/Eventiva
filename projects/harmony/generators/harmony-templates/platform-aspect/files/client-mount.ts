import { ComponentContext } from "@teambit/generator";

export function clientMounterFile(context: ComponentContext) {
  const platformApp = `${context.namePascalCase}App`;
  const platformAppProps = `${context.namePascalCase}AppProps`;

  return {
    relativePath: `mount-client.tsx`,
    content: `import { hydrateRoot } from 'react-dom/client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { ${platformApp}, type ${platformAppProps} } from './${context.name}-app.js';

export function mount(options: ${platformAppProps}) {
  const localWindow = window as any;
  const gatewayUri = process.env.NODE_RUNTIME_URL;
  const client = new ApolloClient({
    uri: gatewayUri,
    cache: new InMemoryCache().restore(localWindow.__APOLLO_STATE__),
    ssrForceFetchDelay: 100
  });

  hydrateRoot(
    document.getElementById("root") as HTMLElement,
    <ApolloProvider client={client}>
      <BrowserRouter>
        <${platformApp} {...options} />
      </BrowserRouter>
    </ApolloProvider>
  );  
}        
`
  }
}
