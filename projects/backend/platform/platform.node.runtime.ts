/*
 * Project: Eventiva
 * File: platform.node.runtime.ts
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

import { DefaultGateway, type Gateway } from '@eventiva/backend.gateway'
import { BackendContext, BackendServerDefinition, BackendSlot, DefaultServer, Server } from '@eventiva/backend.server'
import type { ApplicationInstance } from '@teambit/application'
import { ComponentID } from '@teambit/component-id'
import { LaneId } from '@teambit/lane-id'
import { Port } from '@teambit/toolbox.network.get-port'
import { compact } from 'lodash'
import { join } from 'path'
import type { PlatformConfig } from './platform-config.js'
import { PlatformDeployer, PlatformDeployerSlot, RuntimeContext, ServerContext } from './platform-deployer.js'

export class PlatformNode {
    static defaultConfig: PlatformConfig = {
        gatewayPort: [ 5000, 5010 ],
        domain: 'eventiva.local',
        inSecure: false,
        servicePortRange: [ 5100, 5200 ]
    }
    static dependencies = []
    private _gateway: Gateway = new DefaultGateway()
    private _defaultBackendServer: Server = new DefaultServer()

    constructor (
        private backendSlot: BackendSlot,
        private config: PlatformConfig,
        private platformDeployer: PlatformDeployerSlot
    ) {
    }

    static async provider (
        deps: [],
        config: PlatformConfig,
        [ backendSlot, platformDeployer ]: [ BackendSlot, PlatformDeployerSlot ]
    ) {
        const platform = new PlatformNode(
            backendSlot,
            config,
            platformDeployer
        )

        return platform
    }

    /**
     * run the app in the node runtime.
     */
    async run () {
        const args = process.argv.slice( 2 )
        const [ action ] = args
        if ( action === 'deploy' ) {
            return this.deploy()
        }
        if ( action === 'run' ) {
            return this.start( args )
        }

        return this.runServices()
    }

    /**
     * run services
     */
    async runServices () {
        const [ gatewayFrom, gatewayTo ] = this.config.gatewayPort || []
        const gatewayPort = await Port.getPort( gatewayFrom || 5000, gatewayTo || 5010 )
        const platformPort = process.env.NODE_RUNTIME_PORT
            ? parseInt( process.env.NODE_RUNTIME_PORT, 10 )
            : gatewayPort

        const services = await this.runBackendServers()
        const gateway = this._gateway

        const gatewayInstance = await gateway.run( {
            port: platformPort,
            services
        } )

        console.log( `gateway server is listening on ${ gatewayInstance.port }` )

        return {
            port: platformPort,
            stop: async (): Promise<void> => {
                await Promise.all(
                    services.map( ( service: any ) => {
                        if ( !service?.stop ) {
                            return undefined
                        }
                        return service.stop()
                    } )
                )
                // @ts-ignore
                if ( !gatewayInstance?.stop ) {
                    return
                }
                // @ts-ignore
                await gatewayInstance.stop()
            }
        }
    }

    async deploy () {
        const BUILD_METADATA = this.getBuildMetadata()
        const deployers = this.platformDeployer.flatValues()
        const runtimesContext = this.getRuntimeContext()
        const laneId = BUILD_METADATA?.LANE_ID
        await Promise.all(
            deployers.map( async ( deployer ) => {
                await deployer.deploy( {
                    inSecure: this.config.inSecure,
                    appName: BUILD_METADATA.APP_NAME,
                    version: BUILD_METADATA.APP_VERSION,
                    laneId: laneId
                        ? LaneId.parse( laneId )
                        : undefined,
                    runtimesContext
                } )
            } )
        )
    }

    /**
     * register a new gateway server.
     * implement the gateway server interface.
     */
    registerGateway ( gatewayServer: Gateway ) {
        this._gateway = gatewayServer
        return this
    }

    /**
     * register a new default backend server to use.
     * implement the backend server interface.
     */
    registerDefaultBackendServer ( backendServer: Server ) {
        this._defaultBackendServer = backendServer
        return this
    }

    /**
     * register a backend server.
     */
    registerBackendServer ( backends: BackendServerDefinition[] ) {
        this.backendSlot.register( backends )
        return this
    }

    /**
     * register a Deployer
     */
    registerDeployers ( deployers: PlatformDeployer[] ) {
        this.platformDeployer.register( deployers )
        return this
    }

    /**
     * list backends.
     */
    listBackendServers (): BackendServerDefinition[] {
        const servers = this.backendSlot.toArray()
        return servers.flatMap( ( [ id, backendServers ] ) => {
            const componentId = ComponentID.fromString( id )
            return backendServers.map( ( server ) => {
                const { name } = componentId
                return {
                    ...server,
                    name: server.name || name
                }
            } )
        } )
    }

    private async start ( args: string[] ): Promise<ApplicationInstance | undefined> {
        const BUILD_METADATA = this.getBuildMetadata()
        const [ , type ] = args
        if ( type === 'service' ) {
            const [ , , service, port ] = args
            return this.runService( service, parseInt( port, 10 ) )
        }

        if ( type === 'gateway' ) {
            const [ , , port ] = args
            const backendServers = this.listBackendServers()
            const services = backendServers.map( ( server ) => ( {
                appName: server.name,
                url: `http://${ BUILD_METADATA.APP_NAME }-${ server.name }/graphql`
            } ) )
            return this.runGateway( services, parseInt( port, 10 ) )
        }
        throw new Error( 'no action type has been defined for run' )
    }

    private getRuntimeContext (): RuntimeContext[] {
        const BUILD_METADATA = this.getBuildMetadata()
        const runtimes = BUILD_METADATA?.RUNTIMES?.split( ',' ) || [ 'node' ]
        const rootPath = join( __dirname, '../..' )
        return runtimes.map( ( name ): RuntimeContext => {
            const execFile = BUILD_METADATA[ `${ name.toUpperCase() }_EXEC_FILE` ]
            const rootDir = decodeURI( BUILD_METADATA[ `${ name.toUpperCase() }_OUTPUT_DIR` ] )
            return {
                name,
                execFile,
                rootDir: join( rootPath, rootDir ),
                servers: this.getRuntimeServers( name )
                // TODO: think if this is the right way to do it
                // gatewayServer: name === 'node' ? this._gateway : undefined,
            }
        } )
    }

    private getRuntimeServers ( runtime: string ) {
        const BUILD_METADATA = this.getBuildMetadata()

        if ( runtime === 'browser' ) {
            const uiDomain = BUILD_METADATA[ `${ runtime.toUpperCase() }_UI_DOMAIN` ]
            const servers: ServerContext[] = [
                {
                    name: `${ runtime }-def`,

                    deployOptions: { domain: uiDomain }
                }
            ]
            return servers
        }

        if ( runtime === 'node' ) {
            const backendServers = this.listBackendServers()
            const gateway = this._gateway
            const servers = backendServers.map( ( server ): ServerContext => {
                return {
                    name: server.name!,
                    args: [ 'run', 'service', server.name! ],
                    deployOptions: server.deploy
                }
            } )
            const domain = BUILD_METADATA[ `${ runtime.toUpperCase() }_API_URL` ]
            const gatewayServer: ServerContext[] = [
                {
                    name: gateway.name || 'gateway-server',
                    args: [ 'run', 'gateway' ],
                    deployOptions: { domain }
                }
            ]

            return [ ...servers, ...gatewayServer ]
        }
        return []
    }

    private async runGateway (
        services: ApplicationInstance[],
        port: number
    ) {
        const gatewayServer = this._gateway
        const gateway = await gatewayServer.run( {
            port,
            services
        } )
        console.log( 'gateway port', gateway.port )
        return gateway
    }

    private getBuildMetadata (): Record<string, string> {
        const metadata = process.env.HARMONY_BUILD_METADATA as any
        return metadata
    }

    private async runService (
        service: string,
        port?: number
    ) {
        const [ fromPort, toPort ] = this.config.servicePortRange || []
        const backendServers = this.listBackendServers()
        const backendServer = backendServers.find( ( { name } ) => name === service )
        const defaultServer = this._defaultBackendServer
        const server = backendServer?.server || defaultServer
        if ( !backendServer || !server.run ) {
            return undefined
        }
        const servicePort = port || ( await Port.getPort( fromPort || 5000, toPort || 5010 ) )
        const context: BackendContext = {
            name: backendServer.name,
            routes: backendServer.routes || {},
            gql: backendServer.gql,
            port: servicePort,
            middlewares: backendServer.middlewares
        }

        return server.run( context )
    }

    private async runBackendServers (): Promise<ApplicationInstance[]> {
        const backendServers = this.listBackendServers()
        const services = await Promise.all(
            backendServers.map( async ( backendServer ) => {
                return this.runService( backendServer.name! )
            } )
        )

        return compact( services )
    }
}

export default PlatformNode
