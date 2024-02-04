/**
* @format
* -----
* Project: @eventiva/eventiva
* File: support-platform-gateway.ts
* Path: \projects\bots\aspects\support-platform\support-platform-gateway.ts
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

import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServer } from "@apollo/server";
import type { ApplicationInstance } from '@teambit/application';

/**
 * The options for starting a gateway.
 * - `port` - The port range to use.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 */
export type StartGatewayOptions = {
  /**
   * port the range.
   */
  port?: number;
};

/**
 * Starts the Gateway server.
 * Parameters:
 * - services: An array of ApplicationInstance objects representing the services to be included in the Gateway.
 * - options: An object containing options for starting the Gateway, including the port to listen on.
 * Returns:
 * - An object containing the URL and port of the Gateway server.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @async
 * @param services An array of application instances.
 * @param options The options for starting the gateway.
 * @returns Starts a gateway server using Apollo Gateway with the given services and options.
 */
export async function startGateway(services: ApplicationInstance[], options: StartGatewayOptions) {
  const port = options.port || 4001;
  if (!services.length) return { port };
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      /**
       * include all the running services in the super-graph.
       */
      subgraphs: services.map((service) => {
        return {
          name: service.appName,
          url: service.url || `http://localhost:${service.port}/graphql`
        } 
      })
    }),
  });

  const server = new ApolloServer({ gateway });

  // Note the top-level await!
  const { url } = await startStandaloneServer(server, {
    listen: {
      port,
    }
  });

  return {
    url,
    port
  };
}   
