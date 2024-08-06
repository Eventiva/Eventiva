/*
 * Project: Eventiva
 * File: logger.node.runtime.ts
 * Last Modified: 06/08/2024, 22:32
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
import { Logger, LoggerSlot } from './logger.js'
import { Util, UtilSlot } from './util.js'

export const DefaultLevels = [
    'trace',
    'debug',
    'info',
    'notice',
    'warn',
    'error',
    'critical',
    'alert',
    'fatal',
    'emergency'
] as const

export type LogFunction = (
    customLevel: string,
    msg: string,
    obj?: object,
    ...args: any[]
) => void

export type LoggingModule<CustomLevels extends string> = { [level in CustomLevels]?: LogFunction }

export class LoggerNode<CustomLevels extends string = never> {

    static readonly dependencies = []

    static readonly defaultConfig: LoggerConfig = {
        level: 'info',
        module: 'utilities:logging:LogManager'
    }

    static readonly from = LoggerNode.provider
    private output: Console | null = console

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

    async registerLogger ( loggers: Logger<CustomLevels>[] ) {
        this.output.debug( `Registering loggers. ${ loggers.length } loggers to be loaded.` )

        for ( const logger of loggers ) {
            this.output.debug( `Registering logger ${ logger.name }, with level: ${ logger.options?.level }.` )
            const newLogger = {
                ...logger,
                logger: {
                    trace: this.executeLogging.bind( this, `${ logger.name }`, 'trace' ),
                    debug: this.executeLogging.bind( this, `${ logger.name }`, 'debug' ),
                    info: this.executeLogging.bind( this, `${ logger.name }`, 'info' ),
                    notice: this.executeLogging.bind( this, `${ logger.name }`, 'notice' ),
                    warning: this.executeLogging.bind( this, `${ logger.name }`, 'warning' ),
                    warn: this.executeLogging.bind( this, `${ logger.name }`, 'warn' ),
                    error: this.executeLogging.bind( this, `${ logger.name }`, 'error' ),
                    critical: this.executeLogging.bind( this, `${ logger.name }`, 'critical' ),
                    alert: this.executeLogging.bind( this, `${ logger.name }`, 'alert' ),
                    fatal: this.executeLogging.bind( this, `${ logger.name }`, 'fatal' ),
                    emergency: this.executeLogging.bind( this, `${ logger.name }`, 'emergency' ),
                    log: this.executeLogging.bind( this, `${ logger.name }`, `${ logger.options.level }` )
                }
            } as Logger<CustomLevels>
            return this.loggerSlot.register( newLogger )
        }

        this.output.debug( `Loggers registered against LoggerSlot. Now hosting ${ this.loggerSlot.length } Loggers` )
        return this
    }

    listLoggers () {
        return this.loggerSlot.flatValues()
    }

    getLogger ( name: string ): Logger<CustomLevels>['logger'] | undefined {
        const logger = this.loggerSlot.getByName( name )
        if ( logger ) {
            return logger.logger
        }
        this.output.error( `Logger ${ name } not found.` )
        throw new Error( `Logger ${ name } not found.` )
    }

    public executeLogging (
        module: string,
        loggingLevel: string,
        msg: string,
        obj?: object,
        ...args: any[]
    ) {
        console.log( module )
        this.listUtils().forEach( utilSlot => {
            if ( loggingLevel in utilSlot.util ) {
                utilSlot.util[ loggingLevel ]( `[${ module }]: ` + msg, obj, ...args )
            }
        } )
    }
}

export default LoggerNode
