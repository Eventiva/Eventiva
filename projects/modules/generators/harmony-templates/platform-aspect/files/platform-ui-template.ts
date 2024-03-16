import { ComponentContext } from "@teambit/generator";

export function platformUiTemplate(context: ComponentContext) {
  const uiId = `${context.namePascalCase}Browser`;
  const configId = `${context.namePascalCase}Config`;

  return {
    relativePath: `${context.name}.browser.runtime.tsx`,
    content: `import { mount } from "./mount-client.js";
import { mountServer } from "./mount-server.js";
import { Route, RouteSlot } from "./route.js";
import { ${configId}Config } from "./${context.name}-config.js";

export class ${uiId} {
  constructor(
    /**
     * slot for routes provided by other aspects.
     */
    private routeSlot: RouteSlot
  ) {}

  /**
   * render the app in the browser.
   */
  async render() {
    const routes = this.listRoutes();
    return mount({
      routes
    });
  }

  /**
   * render the app ssr.
   */
  async renderSsr(aspectId: string, { path, cookie }: { path: string, cookie: string }) {
    const routes = this.listRoutes();
    return mountServer(path, cookie, {
      routes,
    });
  }

  /**
   * register a new route.
   */
  registerRoute(routes: Route[]) {
    this.routeSlot.register(routes);
    return this;
  }

  /**
   * list all routes.
   */
  listRoutes() {
    return this.routeSlot.flatValues();
  }

  static dependencies = [];

  static defaultConfig: ${configId} = {};

  static async provider(deps: [], config: ${configId}, [routeSlot]: [RouteSlot]) {
    return new ${uiId}(routeSlot);
  }
}

export default ${uiId};
`
  }
}
