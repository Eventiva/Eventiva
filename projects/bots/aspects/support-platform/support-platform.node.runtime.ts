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

import type { ApplicationInstance } from '@teambit/application';
import { Port } from '@teambit/toolbox.network.get-port';
import type { SupportPlatformConfig } from './support-platform-config.js';
import { BackendServer, BackendSlot } from './backend.js';
import { startGateway } from './support-platform-gateway.js';

export class SupportPlatformNode {
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

  static defaultConfig: SupportPlatformConfig = {
    gatewayPort: [5000, 5010],
    servicePortRange: [5100, 5200],
  }

  static dependencies = [];

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
