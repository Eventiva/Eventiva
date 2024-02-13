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
* LICENSE: GNU General Public License v2.0 or later (GPL-2.0-or-later)
* -----
* This program has been provided under confidence of the copyright holder and
* is licensed for copying, distribution and modification under the terms
* of the GNU General Public License v2.0 or later (GPL-2.0-or-later) published as the License,
* or (at your option) any later version of this license.
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License v2.0 or later for more details.
* You should have received a copy of the GNU General Public License v2.0 or later
* along with this program. If not, please write to: jonathan@resnovas.com,
* or see https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html
* -----
* This project abides by the GPL Cooperation Commitment.
* Before filing or continuing to prosecute any legal proceeding or claim
* (other than a Defensive Action) arising from termination of a Covered
* License, we commit to extend to the person or entity ('you') accused
* of violating the Covered License the following provisions regarding
* cure and reinstatement, taken from GPL version 3.
* For further details on the GPL Cooperation Commitment please visit
* the official website: https://gplcc.github.io/gplcc/
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

  /**
   * Creates a new instance of SupportPlatformBrowser using the provided dependencies, configuration, and route slot.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   * @async
   * @param deps The dependencies array.
   * @param config The SupportPlatformConfig object.
   * @param param0 The array containing the route slot.
   * @param param0.routeSlot The route slot parameter.
   * @returns Creates a new instance of SupportPlatformBrowser using the given routeSlot.
   */
  static async provider(deps: [], config: SupportPlatformConfig, [routeSlot]: [RouteSlot]) {
    return new SupportPlatformBrowser(routeSlot);
  }
}

export default SupportPlatformBrowser;
