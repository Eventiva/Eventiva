import { ComponentContext } from "@teambit/generator";

export function platformAppFile(context: ComponentContext) {
  const platformApp = `${context.namePascalCase}App`;
  const platformAppProps = `${context.namePascalCase}AppProps`;

  return {
    relativePath: `${context.name}-app.tsx`,
    content: `import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Route as RouteType } from './route';

export type ${platformAppProps} = {
  /**
   * root routes to use.
   */
  routes: RouteType[],
}

export function ${platformApp}({ routes }: ${platformAppProps}) {
  return (
    <div>
      <div>Header</div>
      <Routes>
        {routes.map((route) => {
          const RouteComponent = route.component;
          return <Route key={route.path} path={route.path} element={<RouteComponent />} />;
        })}
        <Route path='*' element={<>Page not found!</>} />
      </Routes>
      <div>Footer</div>
    </div>
  );
}    
`
  }
}
