/*
 * Project: Eventiva
 * File: logger.node.runtime.ts
 * Last Modified: 3/29/24, 7:11 PM
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

import type { LoggerConfig } from './logger-config.js'
import { Logger, LoggerInstance, LoggerSlot } from './logger.js'
import { Util, UtilSlot } from './util.js'

export const DefaultLevels = [
    'trace',
    'debug',
    'info',
    'notice',
    'warning',
    'error',
    'critical',
    'alert',
    'emergency'
] as const

export type LogFunction = (
    customLevel: string,
    msg: string,
    obj?: object,
    ...args: any[]
) => void

export type LoggerType<CustomLevels extends string = never> = LoggerInstance<CustomLevels> & LoggingModule<CustomLevels>

export type LoggingModule<CustomLevels extends string> = { [level in CustomLevels]?: LogFunction }

export class LoggerNode<CustomLevels extends string = never> {

    [ key: string ]: any;

    // eslint-disable-next-line no-empty-pattern
    static dependencies = []

    static defaultConfig: LoggerConfig = {
        level: 'info',
        module: 'LogManager'
    }

    static from = LoggerNode.provider

    private console: Console | null = console

    constructor (
        protected config: LoggerConfig<CustomLevels>,
        private utilSlot: UtilSlot,
        private loggerSlot: LoggerSlot<CustomLevels>
    ) {
    }

    static async provider<CustomLevels extends string = never> (
        deps: [],
        config: LoggerConfig,
        [ utilSlot, loggerSlot ]: [ UtilSlot, LoggerSlot<CustomLevels> ]
    ) {
        return new LoggerNode<CustomLevels>( config, utilSlot, loggerSlot )
    }

    registerUtil ( utils: Util[] ) {
        this.utilSlot.register( utils )
        return this
    }

    listUtils () {
        return this.utilSlot.flatValues()
    }

    async registerLogger ( loggers: Partial<Logger<CustomLevels>>[] ) {
        this.console.debug( `Registering loggers. ${ loggers.length } loggers to be loaded.` )
        const promises = loggers.map( async ( logger ) => {
            this.console.debug( `Registering logger ${ logger.name }, with level: ${ logger.options?.level }.` )
            const newLogger = {
                ...logger,
                logger: await LoggerInstance.from<CustomLevels>( this, logger.options ),
                options: {
                    ...logger.options,
                    module: logger.name
                }
            } as Logger<CustomLevels>
            return this.loggerSlot.register( newLogger )
        } )

        await Promise.all( promises )
        this.console.debug( `Loggers registered against LoggerSlot. Now hosting ${ this.loggerSlot.length } Loggers` )
        return this
    }

    listLoggers () {
        return this.loggerSlot.flatValues()
    }

    getLogger ( name: string ): Logger<CustomLevels> | undefined {
        console.log( this.listLoggers() )

        const logger = this.loggerSlot.getByName( name )
        if ( logger ) {
            return logger
        }
        this.console.error( `Logger ${ name } not found.` )
        throw new Error( `Logger ${ name } not found.` )
    }
}

export default LoggerNode
