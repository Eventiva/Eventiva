/*
 * Project: Eventiva
 * File: module.ts
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/25/24, 1:47 AM
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

import type { Logger, PinoNode as LoggerNode } from '@eventiva/utilities.logging.pino'
import type { Command } from './command.js'
import { DiscordjsAspect } from './discordjs.aspect.js'
import type { DiscordjsNode } from './discordjs.node.runtime.js'
import type { Event, ExtendedClientEvents } from './event.js'

/**
 * An object that represents a collection of resources. Each resource is identified by a key that corresponds to an event or command name from the ExtendedClientEvents interface. The value for each key can be either an Event object or a Command object.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 */
export type Resources = {
    [K in keyof ExtendedClientEvents]?: Event<K>
} | {
    [ index: string ]: Command
}

/**
 * A type representing the configuration for a module.
 * The module configuration consists of the name property.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 */
export type ModuleConfig = {
    name: string
    logger: Logger['options']
}

/**
 * The DiscordJsModule class represents a module for the Discord.js library. It provides methods for initializing the module, registering events and commands, and setting the log for the module instance.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class
 * @template C The type parameter for the DiscordJsModule class
 * @implements {DiscordJsModule<C>}
 */
export class DiscordJsModule<C extends ModuleConfig = {
    name: string,
    logger: Logger['options']
}> {
    /**
     * The default configuration for the module. It specifies the name of the module and the logger level.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @static
     */
    static defaultConfig: ModuleConfig = {
        name: 'unnamed_module',
        logger: {
            level: 'info'
        }
    }
    /**
     * An array of dependencies required by the current module. The elements of the array are instances of the DiscordjsAspect class.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @static
     */
    static dependencies = [ DiscordjsAspect ]
    /**
     * The `log` property is a public property that stores an instance of either the `Log` or `Console` class. By default, it is initialized with the `console` object. It can be used to log messages or debug information.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @public
     */
    public log: LoggerNode['log'] | Console = console
    /**
     * The name of the entity. It must be a string.
     * @author Jonathan Stevens (@TGTGamer)
     */
    name: string
    /**
     * The resources object that holds all the event handlers for the client.
     * Each key represents an event name, and its corresponding value is an object with the name of the event and the handler function.
     * The handler function is an asynchronous function that takes the client object as an argument.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @public
     */
    public resources: Resources = {}

    /**
     * Registers a locale for the bot. If the 'reload' parameter is provided and set to 'true', the locale resources will be reloaded.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @public
     * @param [reload]
     */
    // public registerLocales(reload?: true) {
    //   // TODO add a locale file loader method using file system
    //   this.discord.i18nModule.registerResource()
    // }

    /**
     * Creates an instance of ReadyNode.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @constructor
     * @param discord The DiscordjsNode instance to use.
     * @param config The configuration object for the ready event.
     */
    constructor (
        protected config: C,
        public discord: DiscordjsNode
    ) {
        this.log.trace( 'Waiting on discord module to initialize' )
        this.name = config.name
        while ( !discord.isInitialised ) {
        }
        this.log.trace( discord.i18n.t( 'discord:clientStarted' ) )
    }

    /**
     * Registers events for the Discord client.
     * Returns the object itself after registering the events.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @public
     * @returns Registers events for the current instance of the application.
     */
    public registerEvents ( reload?: true ) {
        return this
    }

    /**
     * Get the configuration object.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @public
     * @returns Returns the configuration object.
     */
    public getConfig () {
        return this.config
    }

    /**
     * Registers events for the Discord client.
     * Returns the object itself after registering the events.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @public
     * @returns Registers events for the current instance of the application.
     */
    public registerCommands ( reload?: true ) {
        return this
    }

    /**
     * Sets the log for the DiscordJsModule instance and returns the modified instance.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @public
     * @param log The log to set.
     * @returns Sets the log for the DiscordJsModule and returns the module instance.
     */
    public setLog ( log: LoggerNode['log'] ) {
        this.log = log
        return this
    }
}
