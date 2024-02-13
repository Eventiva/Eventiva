/**
* @format
* -----
* Project: @eventiva/eventiva
* File: support-platform.node.runtime.ts
* Path: \projects\bots\aspects\support-platform\support-platform.node.runtime.ts
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


import type { ApplicationInstance } from '@teambit/application';
import { Port } from '@teambit/toolbox.network.get-port';
import type { SupportPlatformConfig } from './support-platform-config.js';
import { BackendServer, BackendSlot } from './backend.js';
import { startGateway } from './support-platform-gateway.js';

/**
 * SupportPlatformNode is a class that represents a support platform node.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class
 */
export class SupportPlatformNode {
  /**
   * Creates an instance of SupportPlatformNode.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param backendSlot The backend slot used for communication.
   * @param config The support platform configuration.
   */
  constructor(
    private backendSlot: BackendSlot,
    private config: SupportPlatformConfig
  ) {}

  /**
   * run the app in the node runtime.
   */
  async run() {
    const [gatewayFrom, gatewayTo] = this.config.gatewayPort;
    const gatewayPort = await Port.getPort(gatewayFrom, gatewayTo);
    const platformPort = process.env.NODE_RUNTIME_PORT 
      ? parseInt(process.env.NODE_RUNTIME_PORT, 10) 
      : gatewayPort;
      
    const services = await this.runBackendServers();
    const gateway = await startGateway(services, {
      port: platformPort,
    });

    console.log(`gateway server is listening on ${gateway.port}`);
  }

  /**
   * Runs the backend servers asynchronously. It retrieves the service port range from the configuration and gets a list of backend servers. Then, it uses the service port range to get a unique port for each backend server. Finally, it runs each backend server with its corresponding port.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @private
   * @returns Runs the backend servers and returns a promise that resolves to an array of application instances.
   */
  private runBackendServers(): Promise<ApplicationInstance[]> {
    const [fromPort, toPort] = this.config.servicePortRange;
    const backendServers = this.listBackendServers();

    return Promise.all(backendServers.map(async (backendServer) => {
      const servicePort = await Port.getPort(fromPort, toPort);
      const context = {
        port: servicePort
      };

      return backendServer.run(context);
    }));
  }

  /**
   * register a backend server.
   */
  registerBackendServer(backends: BackendServer[]) {
    this.backendSlot.register(backends);
    return this;
  }

  /**
   * list backends.
   */
  listBackendServers() {
    return this.backendSlot.flatValues();
  }

  /**
   * The default configuration for the support platform.
   * The default configuration includes the gateway port range and the service port range.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   */
  static defaultConfig: SupportPlatformConfig = {
    gatewayPort: [5000, 5010],
    servicePortRange: [5100, 5200],
  }

  /**
   * An array containing the static dependencies of the class.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   */
  static dependencies = [];

  /**
   * Creates a new SupportPlatformNode instance and returns it.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   * @async
   * @param deps An array of dependencies
   * @param config The configuration for the SupportPlatform
   * @param param0 The backend slot
   * @param param0.backendSlot The backend slot
   * @returns A static asynchronous function that creates and returns a new SupportPlatformNode instance.
   */
  static async provider(
    deps: [],
    config: SupportPlatformConfig,
    [backendSlot]: [BackendSlot]
  ) {
    const supportPlatform = new SupportPlatformNode(
      backendSlot,
      config
    );

    return supportPlatform;
  }
}

export default SupportPlatformNode;
