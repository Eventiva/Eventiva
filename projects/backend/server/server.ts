/*
 * Project: Eventiva
 * File: server.ts
 * Last Modified: 05/09/2024, 01:42
 *
 * Contributing: Please read through our contributing guidelines.
 * Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0
 * Please interact in ways that contribute to an open, welcoming, diverse,
 * inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution
 * and modification under the terms of the Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * published as the License, or (at your option) any later version of this license. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the Functional Source License, Version 1.1, MIT Future License for more
 * details. You should have received a copy of the Functional Source License, Version 1.1, MIT Future License along
 * with this program. If not, please write to: licensing@eventiva.co.uk, see the official website
 * https://fsl.software/ or Review the GitHub repository https://github.com/getsentry/fsl.software/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before
 * filing or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from
 * termination of a Covered License, we commit to adhering to the Eventiva Cooperation Commitment. You should have
 * received a copy of the Eventiva Cooperation Commitment along with this program. If not, please write to:
 * licensing@eventiva.co.uk, or see https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { buildSubgraphSchema } from '@apollo/subgraph'
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
            (
                _,
                res
            ) => {
                res.status( 200 )
                return res.json( {
                    message: 'ok'
                } )
            }
        )

        if ( context.routes ) {
            initRouting( {
                app,
                routing: context.routes,
                parsers: context.parsers
            } )
        }

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
