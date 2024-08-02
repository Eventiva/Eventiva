/*
 * Project: Eventiva
 * File: launchdarkly.node.runtime.ts
 * Last Modified: 02/08/2024, 16:39
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

import LaunchDarkly from '@launchdarkly/node-server-sdk'
import * as process from 'node:process'
import { Flag, type FlagSlot } from './flag.js'
import type { LaunchdarklyConfig } from './launchdarkly-config.js'

export class LaunchdarklyNode {
    static dependencies = []
    static defaultConfig: LaunchdarklyConfig = {
        LAUNCHDARKLY_SDK_KEY: process.env.LAUNCHDARKLY_SDK_KEY as string,
        globalKillFlag: 'global-kill',
        context: {
            kind: 'user',
            key: 'global-kill-user',
            name: 'Global Kill User'
        }
    }
    private ldClient: LaunchDarkly.LDClient


    constructor (
        private config: LaunchdarklyConfig,
        private flagSlot: FlagSlot
    ) {
        LaunchdarklyNode.checkConfig( config )
        this.ldClient = LaunchDarkly.init( config.LAUNCHDARKLY_SDK_KEY )
        this.ldClient
            .waitForInitialization()
            .then( () => {
                console.log( '*** SDK successfully initialized!' )
                this.registerFlags( [
                    {
                        name: config.globalKillFlag
                    }
                ] )
            } )
            .catch( ( error ) => {
                console.log( `*** SDK failed to initialize: ${ error }` )
                process.exit( 1 )
            } )
    }

    static async provider (
        []: [],
        config: LaunchdarklyConfig,
        [ flagSlot ]: [ FlagSlot ]
    ) {
        this.checkConfig( config )
        const launchdarkly = new LaunchdarklyNode( config, flagSlot )
        return launchdarkly
    }

    private static checkConfig ( config: LaunchdarklyConfig ): void {
        if ( !config.LAUNCHDARKLY_SDK_KEY ) {
            console.log( '*** Please edit your configuration or environment to set LAUNCHDARKLY_SDK_KEY to your'
                + ' LaunchDarkly SDK key first.' )
            process.exit( 1 )
        }
    }

    public printValue (
        flag: string,
        flagValue: unknown
    ) {
        console.log( `*** The '${ flag }' feature flag evaluates to ${ flagValue }.` )
        return this
    }

    /**
     * register a list of flag.
     */
    registerFlags ( flags: Flag[] ) {
        this.flagSlot.register( flags )
        for ( const flag of flags ) {
            const eventKey = `update:${ flag.name }`
            const context = {
                ...this.config.context,
                ...flag.context
            }

            this.ldClient.on( eventKey, () => {
                this.ldClient.variation( flag.name, context, false ).then( value => this.printValue(
                    flag.name,
                    value
                ) )
            } )

            this.ldClient.variation( flag.name, context, false ).then( ( flagValue ) => {
                this.printValue( flag.name, flagValue )
                if ( typeof process.env.CI !== 'undefined' ) {
                    process.exit( 0 )
                }
            } )
        }
        return this
    }

    /**
     * list all flag.
     */
    listFlags () {
        return this.flagSlot.flatValues()
    }
}

export default LaunchdarklyNode
