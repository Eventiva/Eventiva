import { ComponentContext } from "@teambit/generator";


export function serverMountFile(context: ComponentContext) {
  const platformApp = `${context.namePascalCase}App`;
  const platformAppProps = `${context.namePascalCase}AppProps`;

  return {
    relativePath: `mount-server.tsx`,
    content: `import ReactDOMServer from 'react-dom/server';
// eslint-disable-next-line import/extensions
import { getDataFromTree } from '@apollo/client/react/ssr/index.js';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// eslint-disable-next-line import/extensions
import { StaticRouter } from 'react-router-dom/server.js';
import {
  ${platformApp},
  ${platformAppProps},
} from './${context.name}-app.js';

export async function mountServer(
  path: string,
  cookie: string,
  options: ${platformAppProps}
) {
  const gatewayUri = process.env.NODE_RUNTIME_URL;
  const client = new ApolloClient({
    uri: gatewayUri,
    cache: new InMemoryCache(),
    ssrMode: true,
    credentials: 'same-origin',
    headers: {
      cookie,
    },
  });

  const App = () => {
    return (
      <ApolloProvider client={client}>
        <StaticRouter location={path}>
          <${platformApp} {...options} />
        </StaticRouter>
      </ApolloProvider>
    );
  };

  
  const content = await getDataFromTree(<App />);
  const initialState = client.extract();

  return ReactDOMServer.renderToString(
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: \`window.__APOLLO_STATE__=\${JSON.stringify(
            initialState
          ).replace(/</g, '\\u003c')};\`,
        }}
      />
    </>
  );
}
`
  };
}
