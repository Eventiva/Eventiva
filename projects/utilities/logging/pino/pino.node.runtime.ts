/*
 * Project: Eventiva
 * File: pino.node.runtime.ts
 * Last Modified: 29/07/2024, 20:46
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

import { LoggerAspect, LoggerConfig, LoggerInstance, LoggerNode } from '@eventiva/utilities.logging.logger'
import { pino } from 'pino'
import { pinoCaller } from 'pino-caller'
import { build, PrettyStream } from 'pino-pretty'
import { ExtendedConfig, Log, PinoConfig } from './pino-config.js'

export class PinoNode
    extends LoggerInstance {
    static readonly dependencies = [ LoggerAspect ]

    static readonly defaultConfig: LoggerConfig<ExtendedConfig> = {
        level: 'info'
    }

    stream: PrettyStream = build( {
        colorize: true
    } )

    private readonly pino: Log = process.env.NODE_ENV === 'development'
        ? pinoCaller( pino<ExtendedConfig>( {
            ...this.config,
            name: this.config.module,
            customLevels: {
                trace: 5,
                debug: 10,
                info: 20,
                notice: 30,
                alert: 70,
                emergency: 80
            }
        }, this.stream ) ) as Log
        : pino<ExtendedConfig>( {
            ...this.config,
            name: this.config.module,
            customLevels: {
                trace: 5,
                debug: 10,
                info: 20,
                notice: 30,
                alert: 70,
                emergency: 80
            }
        }, this.stream )

    static async provider (
        [ logger ]: [ LoggerNode ],
        config: PinoConfig
    ) {
        const pinoUtil = new PinoNode( config )
        logger.registerUtil(
            [
                {
                    name: 'console',
                    util: pinoUtil
                }
            ]
        )
        return pinoUtil
    }

    trace = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) =>
        this.pino.trace( obj, msg, ...args )

    debug = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) =>
        this.pino.debug( obj, msg, ...args )

    info = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) =>
        this.pino.info( obj, msg, ...args )

    notice = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) =>
        this.pino.notice( obj, msg, ...args )

    warning = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) =>
        this.pino.warn( obj, msg, ...args )

    error = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) =>
        this.pino.error( obj, msg, ...args )

    critical = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) => this.pino.fatal( obj, msg, ...args )

    alert = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) => this.pino.alert( obj, msg, ...args )

    emergency = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) => this.pino.emergency( obj, msg, ...args )
}

export default PinoNode
