/*
 * Project: Eventiva
 * File: module.ts
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

import { SlotRegistry } from '@bitdev/harmony.harmony'
import { Logger, LoggerConfig, LoggerNode } from '@eventiva/utilities.logging.logger'
import type { Command } from './command.js'
import { DiscordJSAspect } from './discordjs.aspect.js'
import type { DiscordJSNode } from './discordjs.node.runtime.js'
import type { Event, ExtendedClientEvents } from './event.js'


/**
 * An object that represents a collection of resources. Each resource is identified by a key that corresponds to an event or command name from the ExtendedClientEvents interface. The value for each key can be either an Event object or a Command object.
 * @author Jonathan Stevens (@TGTGamer)
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
 */
export type ModuleConfig = {
    name: string
    logger: LoggerNode['config']
}


export type ModuleSlot<C extends ModuleConfig = ModuleConfig> = SlotRegistry<Module[]>

export type Module<C extends ModuleConfig = ModuleConfig> = {
    name: C['name'],
    config: C
    node: DiscordJsModule<C>
}
/**
 * The DiscordJsModule class represents a module for the Discord.js library. It provides methods for initializing the module, registering events and commands, and setting the log for the module instance.
 * @author Jonathan Stevens (@TGTGamer)
 * @template C The type parameter for the DiscordJsModule class
 */
export class DiscordJsModule<C extends ModuleConfig = ModuleConfig> {
    /**
     * The default configuration for the module. It specifies the name of the module and the logger level.
     * @author Jonathan Stevens (@TGTGamer)
     */
    static readonly defaultConfig: ModuleConfig = {
        name: 'unnamed_module',
        logger: {
            level: 'info',
            module: 'discord:unnamed_module'
        }
    }

    /**
     * An array of dependencies required by the current module. The elements of the array are instances of the DiscordJSAspect class.
     * @author Jonathan Stevens (@TGTGamer)
     */
    static readonly dependencies = [ DiscordJSAspect ]

    /**
     * The `log` property is a public property that stores an instance of either the `Log` or `Console` class. By default, it is initialized with the `console` object. It can be used to log messages or debug information.
     * @author Jonathan Stevens (@TGTGamer)
     */
    public log: Logger<never>['logger']

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
     */
    public resources: Resources = {}

    private isInitialised = false

    /**
     * Creates an instance of ReadyNode.
     * @author Jonathan Stevens (@TGTGamer)
     * @param discord The DiscordJSNode instance to use.
     * @param config The configuration object for the ready event.
     */
    constructor (
        protected config: C,
        public discord: DiscordJSNode
    ) {
        this.name = config.name
    }

    async start ( reload?: true ) {
        console.trace( 'Waiting on discord module to initialize' )
        await this.setupLogger( this.config.name, this.config.logger )
        this.log!.trace( this.discord.i18n!.t( 'discord:modules.init', { context: 'start', name: this.name } ) )

        await this.registerCommands( reload )
        await this.registerEvents( reload )

        this.log!.trace( this.discord.i18n!.t( 'discord:modules.init', { context: 'complete', name: this.name } ) )
        this.discord.client!.emit( 'moduleRegistered', module, reload )

    }

    /**
     * Registers events for the Discord client.
     * Returns the object itself after registering the events.
     * @param reload
     * @author Jonathan Stevens (@TGTGamer)
     * @returns Registers events for the current instance of the application.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async registerEvents ( reload?: true ) {
        return this
    }

    /**
     * Get the configuration object.
     * @author Jonathan Stevens (@TGTGamer)
     * @returns Returns the configuration object.
     */
    public getConfig () {
        return this.config
    }

    /**
     * Registers events for the Discord client.
     * Returns the object itself after registering the events.
     * @param reload
     * @author Jonathan Stevens (@TGTGamer)
     * @returns Registers events for the current instance of the application.
     */
    public async registerCommands ( reload?: true ) {
        return this
    }

    /**
     * Sets the log for the DiscordJsModule instance and returns the modified instance.
     * @author Jonathan Stevens (@TGTGamer)
     * @param log The log to set.
     * @returns Sets the log for the DiscordJsModule and returns the module instance.
     */
    public setLog ( log: Logger<never>['logger'] ) {
        this.log = log
        return this
    }

    private async setupLogger (
        module: string,
        config: LoggerConfig
    ): Promise<void> {
        await this.discord.setupLogger(
            `discord:${ module }`,
            { ...config, level: 'trace' }
        )
        this.isInitialised = true
    }
}
