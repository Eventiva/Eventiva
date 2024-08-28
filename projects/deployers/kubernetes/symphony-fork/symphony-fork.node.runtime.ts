/*
 * Project: Eventiva
 * File: symphony-fork.node.runtime.ts
 * Last Modified: 28/08/2024, 18:18
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

import { Docker } from '@backend/docker.docker'
import {
    PlatformDeployerContext,
    SymphonyPlatformAspect,
    type SymphonyPlatformNode
} from '@bitdev/symphony.symphony-platform'
import {
    CoreV1Api,
    KubeConfig,
    KubernetesObject,
    KubernetesObjectApi,
    loadAllYaml,
    NetworkingV1Api,
    VersionApi
} from '@kubernetes/client-node'
import { LaneId } from '@teambit/lane-id'
import retry from 'async-retry'
import bluebird from 'bluebird'
import fs from 'fs-extra'
import { compact } from 'lodash-es'
import fetch from 'node-fetch'
import yaml from 'yaml'
import { CertManager } from './cert.js'
import { IngressNginx } from './ingress.js'
import { SetupInstructions, SetupInstructionsSlot } from './setup-Instructions-slot.js'
import { Setup } from './setup.js'

import type { SymphonyForkConfig } from './symphony-fork-config.js'

export class SymphonyForkNode {
    static dependencies = [ SymphonyPlatformAspect ]
    static defaultConfig: SymphonyForkConfig = {
        baseImage: 'node:20.10.0'
    }

    constructor (
        /**
         * config
         */
        private config: SymphonyForkConfig,
        /**
         * setup instructions slot
         */
        private setupInstructions: SetupInstructionsSlot
    ) {
    }

    static async provider (
        [ symphonyPlatformNode ]: [ SymphonyPlatformNode ],
        config: SymphonyForkConfig,
        [ setupInstructions ]: [ SetupInstructionsSlot ]
    ) {
        const kube = new SymphonyForkNode( config, setupInstructions )
        kube.registerSetup( [ CertManager, IngressNginx ] )
        symphonyPlatformNode.registerDeplorers( [
            {
                deploy: async ( context: PlatformDeployerContext ) => {
                    await kube.deploy( context )
                    // docker.buildImage();
                    return {}
                }
            }
        ] )
        return kube
    }

    /*
     * register a setup instructions
     */
    registerSetup ( setupInstructions: SetupInstructions[] ) {
        this.setupInstructions.register( setupInstructions )
        return this
    }

    /*
     * get Instructions
     */
    getInstructions () {
        return this.setupInstructions.flatValues()
    }

    async deploy ( deployContext: PlatformDeployerContext ) {
        const { appName, version, runtimesContext, inSecure, laneId } =
            deployContext
        const namespace = this.generateNamespaceId( appName, laneId )
        await this.createNamespace( namespace )
        await this.runSetupInstructions( deployContext )

        const { imagePrefix } = this.config.docker!
        const allSetups = await Promise.all(
            runtimesContext.map( async ( context ) => {
                const { name, execFile, rootDir, servers } = context
                const dockerFile = this.createDockerFile()
                const runtimeName = `${ appName }-${ name }`
                const dockerfileName = `Dockerfile-${ runtimeName }`

                const dockerImageName = `${
                    !imagePrefix
                        ? ''
                        : `${ imagePrefix }`
                }/${ runtimeName }:${ version }`

                await fs.writeFile( `${ rootDir }/Dockerfile-${ runtimeName }`, dockerFile )
                const docker = new Docker()
                await docker.build( dockerImageName, rootDir, dockerfileName )
                await docker.push( dockerImageName, this.config.docker!.auth )

                const setups = servers.map( ( server ) => {
                    return new Setup(
                        `${ appName }-${ server.name }`,
                        dockerImageName,
                        execFile,
                        server.args,
                        {
                            namespace,
                            inSecure,
                            domain: server?.deployOptions?.domain,
                            minReplicas: server.deployOptions?.scale?.minReplicas || 1,
                            maxReplicas: server.deployOptions?.scale?.maxReplicas || 1
                        }
                    )
                } )

                await bluebird.map(
                    setups,
                    async ( setup ) => {
                        await this.applyJson( setup.specs )
                    },
                    { concurrency: 10 }
                )
                return setups
            } )
        )
        this.printIps( allSetups.flat() )
    }

    private createDockerFile () {
        return [
            `FROM --platform=linux/amd64 ${ this.config.baseImage }`,
            `WORKDIR /app`,
            `COPY ./ /app/`
        ].join( '\n' )
    }

    private getKubeConfig () {
        if ( !this.config.auth ) {
            return
        }
        const { kubeConfig, basic } = this.config.auth
        const kc = new KubeConfig()

        if ( !kubeConfig && !basic?.server ) {
            kc.loadFromDefault()
            return kc
        }

        if ( kubeConfig && basic?.server ) {
            throw new Error( 'can not set multiple kube methods' )
        }

        if ( kubeConfig ) {
            const buff = Buffer.from( kubeConfig, 'base64' )
            const kubeConfigStr = buff.toString( 'utf-8' )
            kc.loadFromString( kubeConfigStr )
            return kc
        }

        if ( basic?.server ) {
            const config = this.buildKubeConfig(
                'cluster',
                basic?.server,
                basic?.certificate,
                basic?.token
            )
            const yamlConfig = yaml.stringify( config )
            kc.loadFromString( yamlConfig )
            return kc
        }

        throw new Error( 'no kube config has been set' )
    }

    private buildKubeConfig (
        name: string,
        server: string,
        cert: string,
        userToken: string
    ) {
        return {
            apiVersion: 'v1',
            kind: 'Config',
            clusters: [
                {
                    name,
                    cluster: {
                        server,
                        'certificate-authority-data': cert
                    }
                }
            ],
            users: [
                {
                    name: `${ name }-user`,
                    user: {
                        token: userToken
                    }
                }
            ],
            contexts: [
                {
                    context: {
                        cluster: name,
                        user: `${ name }-user`
                    },
                    name: `${ name }-user`
                }
            ],
            'current-context': `${ name }-user`
        }
    }

    private async applyYaml ( strYaml: string ) {
        const loadedYamls = loadAllYaml( strYaml )
        const kc = this.getKubeConfig()
        const client = KubernetesObjectApi.makeApiClient( kc! )
        await bluebird.mapSeries( loadedYamls, async ( str ) => {
            try {
                await client.create( str )
            } catch ( error ) {
                // console.error(error.error.message);
            }
        } )
    }

    /**
     * @param spec JSON SymphonyFork spec.
     * @return Array of resources created
     */
    private async applyJson ( specs: KubernetesObject[] ) {
        const kc = this.getKubeConfig()
        const client = KubernetesObjectApi.makeApiClient( kc! )
        const versionApi = kc!.makeApiClient( VersionApi )
        const version = await versionApi.getCode()
        if ( !version ) {
            throw new Error( 'kube auth error' )
        }
        // console.log(`SymphonyFork Server Version ${version.body.gitVersion}`);

        const created: KubernetesObject[] = []
        // const errors: any = [];
        const validSpecs = specs.filter( ( s ) => s && s.kind && s.metadata )
        await bluebird.mapSeries( validSpecs, async ( spec ) => {
            try {
                // try to get the resource, if it does not exist an error will be thrown and we will end up in the catch
                // block.
                // if (!spec.metadata.name) return;
                // if (!spec.metadata.namespace) return;

                // @ts-ignore
                await client.read( spec )
                // required to avoid HTTP 415 errors
                // const headers = { 'content-type': 'application/json-patch+json' };
                const response = await client.patch(
                    spec,
                    undefined,
                    undefined,
                    undefined,
                    undefined
                )
                created.push( response.body )
            } catch ( e ) {
                try {
                    // we did not get the resource, so it does not exist, so create it
                    const response = await client.create( spec )
                    created.push( response.body )
                } catch ( error: any ) {
                    // const e = error?.body?.message || error?.body || error;
                    // console.log(error);
                    // errors.push(error?.body?.message || error?.body || error);
                }
            }
        } )
        return created
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private async runSetupInstructions ( deployContext: PlatformDeployerContext ) {
        const instructions = this.getInstructions()
        const kc = this.getKubeConfig()

        const yamlPaths = await Promise.all(
            instructions.map( async ( instruction ) => {
                const shouldRun = instruction?.shouldRun
                if ( shouldRun && !( await shouldRun( kc! ) ) ) {
                    return undefined
                }
                return instruction.yamlPaths
            } )
        )

        const yamls = compact(
            await Promise.all(
                compact( yamlPaths.flat() ).map( async ( path ) => {
                    const res = await fetch( path )
                    if ( res.ok ) {
                        const text = await res.text()
                        return text
                    }
                    return undefined
                } )
            )
        )

        await Promise.all( yamls.map( ( y ) => this.applyYaml( y ) ) )
    }

    private async createNamespace ( namespace: string ) {
        const kc = this.getKubeConfig()

        const k8sApi = kc!.makeApiClient( CoreV1Api )
        try {
            await k8sApi.createNamespace( {
                metadata: { name: namespace }
            } )
        } catch ( error ) {
            //
        }
    }

    private generateNamespaceId (
        appName: string,
        laneId?: LaneId
    ) {
        if ( !laneId ) {
            return 'main'
        }
        const safeLaneId = laneId
            .toString()
            .toString()
            .replaceAll( '.', '-' )
            .replaceAll( '/', '-' )

        return `${ appName }-${ safeLaneId }`
    }

    private async printIps ( setups: Setup[] ) {
        const ingress = compact(
            setups.map( ( setup ) => {
                if ( !setup.ingress ) {
                    return undefined
                }
                return {
                    name: setup.ingress?.metadata?.name,
                    namespace: setup?.ingress?.metadata?.namespace
                }
            } )
        )

        const kc = this.getKubeConfig()
        const k8sApi = kc!.makeApiClient( NetworkingV1Api )

        const ingressStatus = await bluebird.mapSeries(
            ingress,
            async ( { name, namespace } ) => {
                const status = await retry(
                    async () => {
                        const res = await k8sApi.readNamespacedIngress( name!, namespace! )
                        const ing = res.body.status?.loadBalancer?.ingress
                        const ips = ing?.map( ( { ip } ) => ip ) || []
                        if ( !ips.length ) {
                            return undefined
                        }
                        return {
                            hosts: res.body.spec?.rules?.map( ( { host } ) => host ),
                            ips: ing?.map( ( { ip } ) => ip ) || []
                        }
                    },
                    { retries: 5, minTimeout: 10000 }
                )

                return status
            }
        )

        ingressStatus.forEach( ( opts ) => {
            if ( !opts ) {
                return
            }
            const { hosts, ips } = opts
            const fgGreen = '\x1b[32m';
            console.log( fgGreen, `🌍 ${ hosts?.join( ',' ) } : ${ ips.join( ',' ) } 🌍` );
        } );
    }
}

export default SymphonyForkNode;
