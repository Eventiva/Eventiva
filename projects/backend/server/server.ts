/*
 * Project: Eventiva
 * File: server.ts
 * Last Modified: 06/09/2024, 16:23
 *
 * Contributing: Please read through our contributing guidelines. Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0. Please interact in ways that contribute to an open,
 * welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution and
 * modification under the terms of the Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT) published as the License, or
 * (at your option) any later version of this license. You must not move, change, disable, or circumvent the license key functionality
 * in the Software; or modify any portion of the Software protected by the license key to: enable access to the protected
 * functionality without a valid license key; or remove the protected functionality.This program is distributed in the hope that it will
 * be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the Fair Core License, Version 1.0, MIT Future License for more details. You should have received a
 * copy of the Fair Core License, Version 1.0, MIT Future License along with this program. If not, please write to:
 * licensing@eventiva.co.uk, see the official website https://fcl.dev/ or Review the GitHub repository
 * https://github.com/keygen-sh/fcl.dev/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before filing
 * or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from termination of a Covered
 * License, we commit to adhering to the Eventiva Cooperation Commitment. You should have received a copy of the Eventiva
 * Cooperation Commitment along with this program. If not, please write to: licensing@eventiva.co.uk, or see
 * https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { buildSubgraphSchema } from '@apollo/subgraph'
import { createHealthCheckHandler } from '@eventiva/utilities.helpers.handler-health-check'
import { initRouting, type Routing } from '@eventiva/utilities.helpers.routing'
import { mergeTypeDefs } from '@graphql-tools/merge'
import cors from 'cors'
import express from 'express'
import { gql } from 'graphql-tag'
import http from 'node:http'
import type { BackendContext, Server } from './server-types.js'

export type DefaultServerOptions = {
    /**
     * name of the backend server.
     */
    name: string;

    /**
     * routes to load.
     */
    routes?: Routing,

    /**
     * enables cors.
     */
    cors?: boolean;
};

export class DefaultServer
    implements Server {
    // name = 'symphony-server';

    async run ( { name, ...context }: BackendContext ) {
        const port = context.port || 3000
        const app = express()
        const httpServer = http.createServer( app )

        const typeDefs = [
            gql`
              type Query {
                healthCheck: HealthCheckStatus!
              }

              type HealthCheckStatus {
                message: String!
              }
            `
        ]
        if ( context.gql?.typeDefs ) {
            typeDefs.push( context.gql?.typeDefs )
        }

        const resolvers = {
            Query: {
                healthCheck: () => ( {
                    message: 'ok'
                } )
            },
            ...context.gql?.resolvers
        }

        // The ApolloServer constructor requires two parameters: your schema
        // definition and your set of resolvers.
        const server = new ApolloServer( {
            schema: buildSubgraphSchema( {
                typeDefs: mergeTypeDefs( typeDefs ),
                resolvers: resolvers
            } ),
            plugins: [ ApolloServerPluginDrainHttpServer( { httpServer } ) ]
        } )

        await server.start()

        app.use( cors<cors.CorsRequest>( {
            origin (
                origin,
                callback
            ) {
                callback( null, true )
            },
            credentials: true
        } ) )

        context.middlewares?.forEach( ( middleware ) => {
            app.use( middleware )
        } )

        app.use(
            '/graphql',
            express.json(),
            // expressMiddleware accepts the same arguments:
            // an Apollo Server instance and optional configuration options
            expressMiddleware( server, {
                context: async ( { req } ) => req
            } )
        )

        app.get(
            '/health-check',
            createHealthCheckHandler()
        )

        if ( context.routes ) {
            initRouting( {
                app,
                routing: context.routes,
                parsers: context.parsers
            } )
        }

        context.middlewaresPostRouting?.forEach( ( middleware ) => {
            app.use( middleware )
        } )

        await new Promise<void>( ( resolve ) => httpServer.listen( { port }, resolve ) )

        return {
            appName: name,
            port,
            url: `http://localhost:${ port }`,
            stop: async () => {
                httpServer.closeAllConnections()
                httpServer.close()
            }
        }
    }
}
