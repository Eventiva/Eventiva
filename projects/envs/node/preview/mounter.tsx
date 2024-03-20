import React from 'react';
import { createMounter } from '@teambit/react.mounter';

/**
 * use the mounter to inject and wrap your component previews
 * with common needs like [routing](), [theming]() and [data fetching]().
 */
// eslint-disable-next-line react/prop-types
export function MyReactProvider({ children }) {
  return <>{children}</>;
}

/**
 * to replace that mounter component for different purposes, just return a function
 * that uses ReactDOM to render a node to a div.
 */
// @ts-ignore
export default createMounter(MyReactProvider) as any;
