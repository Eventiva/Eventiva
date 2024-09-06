/*
 * Project: Eventiva
 * File: gateway.ts
 * Last Modified: 06/09/2024, 08:12
 *
 * Contributing: Please read through our contributing guidelines. Included are directions for opening issues, coding standards,
 *  and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0. Please interact in ways that contribute to an open,
 *  welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at
 *  https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution and
 * modification under the terms of the Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT) published as the License, or
 *  (at your option) any later version of this license. You must not move, change, disable, or circumvent the license key functionality
 *   in the Software; or modify any portion of the Software protected by the license key to: enable access to the protected
 *   functionality without a valid license key; or remove the protected functionality.This program is distributed in the hope that it will
 *   be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 *   PARTICULAR PURPOSE. See the Fair Core License, Version 1.0, MIT Future License for more details. You should have received a
 *   copy of the Fair Core License, Version 1.0, MIT Future License along with this program. If not, please write to:
 *   licensing@eventiva.co.uk, see the official website https://fcl.dev/ or Review the GitHub repository
 *   https://github.com/keygen-sh/fcl.dev/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before filing
 *  or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from termination of a Covered
 *  License, we commit to adhering to the Eventiva Cooperation Commitment. You should have received a copy of the Eventiva
 *  Cooperation Commitment along with this program. If not, please write to: licensing@eventiva.co.uk, or see
 *  https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApplicationInstance } from '@teambit/application'
import cors from 'cors'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { createServer } from 'node:http'
import { Gateway, GatewayContext } from './gateway-types.js'

export type StartGatewayOptions = {
    /**
     * port the range.
     */
    port?: number;

    /**
     * X-Auth
     */
    platformHeaders?: Record<string, string>;
};

export class DefaultGateway
    implements Gateway {

    constructor (
        /**
         * name of the app.
         */
        readonly name = 'default-gateway'
    ) {
    }

    /**
     * run the symphony gateway.
     */
    async run ( context: GatewayContext ): Promise<ApplicationInstance> {
        const port = context.port || 3000
        if ( !context.services.length ) {
            return { port }
        }
        const app = express()
        const httpServer = createServer( app )
        // Filter services that are actually available
        const availableServices = await Promise.all(
            context.services.map( async ( service ) => {
                console.log( service )
                const serviceUrl = ( service.url || `http://localhost:${ service.port }` ) + '/graphql'
                const isAvailable = await this.isServiceAvailable( serviceUrl )
                if ( isAvailable ) {
                    return { name: service.appName || '', url: serviceUrl }
                } else {
                    console.warn( `Skipping unavailable service: ${ service.appName }` )
                    return null
                }
            } )
        )

        const subgraphs = availableServices.filter( (
            service: { name: string; url: string; } | null
        ): service is { name: string; url: string; } => {
            return service !== null
        } )

        console.log( subgraphs )

        if ( subgraphs.length == 0 ) {
            console.error( 'No services available to build the supergraph. Exiting.' )
            return { port }
        }

        // Create Apollo Gateway with the available services
        const gateway = new ApolloGateway( {
            supergraphSdl: new IntrospectAndCompose( { subgraphs } )
        } )
        const server = new ApolloServer( {
            gateway,
            plugins: [ ApolloServerPluginDrainHttpServer( { httpServer } ) ]
        } )

        await server.start()

        app.use(
            cors<cors.CorsRequest>( {
                origin (
                    origin,
                    callback
                ) {
                    callback( null, true )
                },
                credentials: true
            } )
        )

        app.use(
            '/graphql',
            express.json(),
            // expressMiddleware accepts the same arguments:
            // an Apollo Server instance and optional configuration options
            expressMiddleware( server, {
                context: async ( { req } ) => req
            } )
        )

        // proxy all REST requests.
        context.services.forEach( ( { appName, port: servicePort, url } ) => {
            app.use( `/${ appName }`, createProxyMiddleware( {
                proxyTimeout: 3000,
                timeout: 3000,
                target: url || `http://localhost:${ servicePort }`,
                changeOrigin: true,
                pathRewrite: { [ `/${ appName }/` ]: '/' },
                onProxyRes: (
                    proxyRes,
                    _,
                    res
                ) => {
                    if ( proxyRes.statusCode === 404 ) {
                        res.status( 404 )
                        res.json( {
                            message: `${ appName } reported no resource found`
                        } )
                    }
                }
            } ) )
        } )

        app.get(
            '/',
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

        app.get(
            '*',
            (
                _,
                res
            ) => {
                res.status( 404 )
                return res.json( {
                    message: 'no resource found on gateway'
                } )
            }
        )

        await new Promise<void>( ( resolve ) => httpServer.listen( { port }, resolve ) )
        console.log( `🚀 API Gateway server ready at: http://localhost:${ port }` )

        return {
            // url: `http://localhost:${port}`,
            port,
            // @ts-ignore until releasing bit
            stop: async () => {
                httpServer.closeAllConnections()
                httpServer.close()
            }
        }
    }

    private async isServiceAvailable ( serviceUrl: string ): Promise<boolean> {
        try {
            const response = await fetch( serviceUrl, {
                method: 'POST',
                body: JSON.stringify( { query: '{ __typename }' } ),
                headers: { 'Content-Type': 'application/json' }
            } )
            return response.ok
        } catch ( error ) {
            console.warn(
                `Service at ${ serviceUrl } is not available:`,
                error instanceof Error
                    ? error.message
                    : JSON.stringify( error )
            )
            return false
        }
    }
}
