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

import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServer } from "@apollo/server";
import type { ApplicationInstance } from '@teambit/application';

export type StartGatewayOptions = {
  /**
   * port the range.
   */
  port?: number;
};

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
