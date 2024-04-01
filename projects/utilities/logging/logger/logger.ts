/*
 * Project: Eventiva
 * File: logger.ts
 * Last Modified: 3/29/24, 5:45 PM
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

import type { SlotRegistry } from '@bitdev/harmony.harmony'
import type { LoggerConfig } from './logger-config.js'
import LoggerNode, { LoggerType } from './logger.node.runtime.js'

export type Logger<TLevels extends string> = {
    name: string,
    options?: LoggerConfig<TLevels>
    logger: LoggerType<TLevels>
}

export type LoggerSlot<TLevels extends string> = SlotRegistry<Logger<TLevels>>;

export class LoggerInstance<CustomLevels extends string = never> {

    static from = LoggerInstance.create

    constructor (
        protected config: LoggerConfig<CustomLevels>,
        private manager?: LoggerNode<CustomLevels>
    ) {
        if ( config.customLevels ) {
            config.customLevels.forEach( this.getLoggingFunction )
        }
    }

    static async create<CustomLevels extends string = never> (
        manager: LoggerNode<CustomLevels>,
        config: LoggerConfig<CustomLevels>
    ): Promise<LoggerType<CustomLevels>> {
        return new LoggerInstance( config, manager ) as LoggerType<CustomLevels>
    }

    debug = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) =>
        this.executeLogging( 'debug', msg, obj, ...args )

    info = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) =>
        this.executeLogging( 'info', msg, obj, ...args )

    notice = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) =>
        this.executeLogging( 'notice', msg, obj, ...args )

    warning = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) =>
        this.executeLogging( 'warning', msg, obj, ...args )

    warn = this.warning

    error = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) =>
        this.executeLogging( 'error', msg, obj, ...args )

    critical = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) =>
        this.executeLogging( 'critical', msg, obj, ...args )

    fatal = this.critical

    trace = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) =>
        this.executeLogging( 'trace', msg, obj, ...args )

    alert = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) =>
        this.executeLogging( 'alert', msg, obj, ...args )

    emergency = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) =>
        this.executeLogging( 'emergency', msg, obj, ...args )

    log = (
        msg: string,
        obj?: object,
        ...args: any[]
    ) =>
        this.executeLogging( this.config.level, msg, obj, ...args )

    private getLoggingFunction ( level: string ) {
        this[ level ] = (
            msg: string,
            obj?: object,
            ...args: any[]
        ) =>
            this.executeLogging( level, msg, obj, ...args )
    }

    private executeLogging (
        loggingLevel: string,
        msg: string,
        obj?: object,
        ...args: any[]
    ) {
        this.manager?.listUtils().forEach( utilSlot => {
            if ( loggingLevel in utilSlot.util ) {
                utilSlot.util[ loggingLevel ]( msg, obj, ...args )
            }
        } )
    }

}