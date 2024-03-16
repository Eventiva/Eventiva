
export function routeTypeFile() {
  return {
    relativePath: `route.ts`,
    content: `import type { SlotRegistry } from "@bitdev/harmony.harmony";
import type { ComponentType } from "react";

export type Route = {
  path: string;
  component: ComponentType;
};

export type RouteSlot = SlotRegistry<Route[]>;    
`
  }
}