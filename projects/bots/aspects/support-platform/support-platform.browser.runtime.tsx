/**
* @format
* -----
* Project: @eventiva/eventiva
* File: support-platform.browser.runtime.tsx
* Path: \projects\bots\aspects\support-platform\support-platform.browser.runtime.tsx
* Created Date: Sunday, January 28th 2024
* Author: Jonathan Stevens, jonathan@resnovas.com
* Github: https://github.com/TGTGamer
* -----
* Contributing: Please read through our contributing guidelines.
* Included are directions for opening issues, coding standards,
* and notes on development. These can be found at
* https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
* -----
* Code of Conduct: This project abides by the Contributor Covenant, v2.0
* Please interact in ways that contribute to an open, welcoming, diverse,
* inclusive, and healthy community. Our Code of Conduct can be found at
* https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
* -----
* Copyright (c) 2024 Resnovas - All Rights Reserved
* LICENSE: Creative Commons Zero v1.0 Universal (CC0-1.0)
* -----
* This program has been provided under confidence of the copyright holder and
* is licensed for copying, distribution and modification under the terms of
* the Creative Commons Zero v1.0 Universal (CC0-1.0) published as the License,
* or (at your option) any later version of this license.
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* Creative Commons Zero v1.0 Universal for more details.
* You should have received a copy of the Creative Commons Zero v1.0 Universal
* along with this program. If not, please write to: jonathan@resnovas.com,
* or see https://creativecommons.org/publicdomain/zero/1.0/legalcode
* -----
* DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
*/

import { mount } from "./mount-client.js";
import { mountServer } from "./mount-server.js";
import { Route, RouteSlot } from "./route.js";
import { SupportPlatformConfig } from "./support-platform-config.js"; 

export class SupportPlatformBrowser {
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

  static defaultConfig: SupportPlatformConfig = {};

  static async provider(deps: [], config: SupportPlatformConfig, [routeSlot]: [RouteSlot]) {
    return new SupportPlatformBrowser(routeSlot);
  }
}

export default SupportPlatformBrowser;
