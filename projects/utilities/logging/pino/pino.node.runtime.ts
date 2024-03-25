/*
 * Project: Eventiva
 * File: pino.node.runtime.ts
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/25/24, 2:22 AM
 * -----
 * Contributing: Please read through our contributing guidelines.
 * Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 * -----
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0
 * Please interact in ways that contribute to an open, welcoming, diverse,
 * inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 * -----
 * 2024 Eventiva - All Rights Reserved
 * LICENSE: Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * -----
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution
 * and modification under the terms of the Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * published as the License, or (at your option) any later version of this license. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the Functional Source License, Version 1.1, MIT Future License for more
 * details. You should have received a copy of the Functional Source License, Version 1.1, MIT Future License along
 * with this program. If not, please write to: licensing@eventiva.co.uk, see the official website
 * https://fsl.software/ or Review the GitHub repository https://github.com/getsentry/fsl.software/
 * -----
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before
 * filing or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from
 * termination of a Covered License, we commit to adhering to the Eventiva Cooperation Commitment. You should have
 * received a copy of the Eventiva Cooperation Commitment along with this program. If not, please write to:
 * licensing@eventiva.co.uk, or see https://eventiva.co.uk/licensing/ecc
 * -----
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */


import { pino } from 'pino'
import { pinoCaller } from 'pino-caller'
import { PinoPretty } from 'pino-pretty'
import { Log, Logger, LoggerSlot } from './logger.js'
import type { PinoConfig } from './pino-config.js'

/**
 * A class representing a pino node. It provides pino functionalities using the pino library.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class PinoNode
 */
export class PinoNode {
    /**
     * An array containing the dependencies of the class.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @static
     * @type {{}}
     */
    static dependencies = []
    /**
     * The default configuration for pino. It includes the pino level and custom levels.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @static
     * @type {PinoConfig}
     */
    static defaultConfig: PinoConfig = {
        level: 'trace',
        customLevels: {
            alert: 70,
            emergency: 80
        }
    }
    /**
     * A property that returns a readable stream of the formatted output. The stream is configured with options to enable colorization, with the 'colorize' parameter set to true.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @type {*}
     */
    stream = PinoPretty( {
        colorize: true
    } )
    /**
     * The `console` object provides access to the browser's debugging console. You can use it to output messages, debug code, and track the execution of your JavaScript code. The console object also provides various methods, such as log, warn, and error, for different types of messages.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @type {Log}
     */
    console: Log
    /**
     * This property is a reference to the pino object used by the application. It can be either an instance of the Log class or the Console object. By default, it is set to the Console object.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @private
     * @type {(Log | Console)}
     */
    private readonly log: Log | Console = console

    /**
     * Creates an instance of PinoNode.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @constructor
     * @param {PinoConfig} config The pino configuration.
     * @param {LoggerSlot} loggerSlot The logger slot to use.
     */
    constructor (
        private config: PinoConfig,
        private loggerSlot: LoggerSlot
    ) {
        this.console = process.env.NODE_ENV === 'development'
            ? pinoCaller( pino<'alert' | 'emergency'>( this.config, this.stream ) ) as Log
            : pino<'alert' | 'emergency'>( this.config, this.stream )

        this.log = this.registerLogger( [ { name: 'logger:main', options: { level: config.level } } ] ).getLogger(
            'logger:main' ).logger
    }


    /**
     * Creates a new instance of PinoNode using the provided configuration and logger.
     *
     * @param {Array} [] An empty array.
     * @param {PinoConfig} config The configuration object for PinoNode.
     * @param {Array} [ Logger ] The logger slot for PinoNode.
     * @return {PinoNode} A new instance of PinoNode.
     */
    static async provider (
        []: [],
        config: PinoConfig,
        [ Logger ]: [ LoggerSlot ]
    ): Promise<PinoNode> {
        return new PinoNode( config, Logger )
    }

    /**
     * Registers an array of loggers.
     * Creates a new child logger on each logger argument.
     * Logs debug messages for each step of the registration process.
     * Registers each logger against the LoggerSlot.
     * Returns the current instance of the object.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @param {Logger[]} loggers An array of Logger objects.
     * @returns {this} Registers an array of loggers and adds them to the logger slot.
     */
    registerLogger ( loggers: Partial<Logger>[] ) {
        // create a new child logger on each logger arg
        if ( this.log ) {
            this.log.debug( `Registering loggers. ${ loggers.length } loggers to be loaded.` )
        }
        for ( let logger of loggers ) {
            if ( this.log ) {
                this.log.debug( `Registering logger ${ logger.name }, with level: ${ logger.options?.level }.` )
            }
            logger.logger = this.console.child( { module: logger.name } )
            if ( this.log ) {
                this.log.debug( `Registering logger ${ logger.name } against LoggerSlot` )
            }
            this.loggerSlot.register( logger as Logger )
            if ( this.log ) {
                this.log.debug( `Logger ${ logger.name } registered.` )
            }
        }
        if ( this.log ) {
            this.log.debug( `Loggers registered against LoggerSlot. Now hosting ${ this.loggerSlot.length } Loggers` )
        }

        return this
    }

    /**
     * Returns the list of loggers. Each logger is represented as a value in an array.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @returns {*} Returns the list of loggers.
     */
    listLoggers () {
        return this.loggerSlot.flatValues()
    }

    /**
     * Returns the logger for the specified module.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @param {string} module The name of the module from which to get the logger
     * @returns {*} This function takes a module name as input and returns a logger for that module.
     */
    getLogger ( module: string ): Logger {
        const logger = this.loggerSlot.getByName( module )
        if ( logger ) {
            return logger
        }
        this.log.error( `Logger ${ module } not found. Returning default logger.` )
        throw new Error( `Logger ${ module } not found. Returning default logger.` )
    }
}

export default PinoNode
