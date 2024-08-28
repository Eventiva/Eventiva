/*
 * Project: Eventiva
 * File: default_logging.node.runtime.ts
 * Last Modified: 28/08/2024, 18:01
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


import DiscordJSAspect, {
    Command,
    DiscordJsModule,
    DiscordJSNode,
    Event,
    Resources
} from '@eventiva/discordjs.discordjs'
import { Client } from 'discord.js'
import type { DefaultLoggingConfig } from './default_logging-config.js'


/**
 * Represents a node in the DefaultLogging Aspect of a Discord.js application. This node handles the 'default_logging' event and logs a message with the client's user information upon initialization.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class
 */
export class DefaultLoggingNode
    extends DiscordJsModule<DefaultLoggingConfig> {
    /**
     * An array of dependencies required by the current module. The elements of the array are instances of the DiscordJSAspect class.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @static
     */
    static readonly dependencies = [ DiscordJSAspect ]

    /**
     * The default configuration for the DefaultLogging class. It is an empty object.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @static
     */
    static readonly defaultConfig: DefaultLoggingConfig = {
        name: 'default_logging',
        logger: {
            level: 'info',
            module: 'discord:default_logging'
        }
    }

    /**
     * The resources object that holds all the event handlers for the client.
     * Each key represents an event name, and its corresponding value is an object with the name of the event and the handler function.
     * The handler function is an asynchronous function that takes the client object as an argument.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @public
     */
    public resources: Resources = {
        ready: {
            name: 'ready',
            once: true,
            async execute (
                this: DefaultLoggingNode,
                client: Client<true>
            ) {
                client.emit( 'info', `Logged in as ${ client.user.tag } at ${ new Date().toLocaleString() }` )
            }
        },
        trace: {
            name: 'trace',
            once: false,
            async execute (
                this: DefaultLoggingNode,
                message: string
            ) {
                this.log!.trace( message )
            }
        },
        debug: {
            name: 'debug',
            once: false,
            async execute (
                this: DefaultLoggingNode,
                message: string
            ) {
                this.log!.debug( message )
            }
        },
        info: {
            name: 'info',
            once: false,
            async execute (
                this: DefaultLoggingNode,
                message: string
            ) {
                this.log!.info( message )
            }
        },
        warn: {
            name: 'warn',
            once: false,
            async execute (
                this: DefaultLoggingNode,
                message: string
            ) {
                this.log!.warn( message )
            }
        },
        fatal: {
            name: 'fatal',
            once: false,
            async execute (
                this: DefaultLoggingNode,
                message: string
            ) {
                return this.log!.fatal( message )
            }
        },
        alert: {
            name: 'alert',
            once: false,
            async execute (
                this: DefaultLoggingNode,
                message: string
            ) {
                return this.log!.alert( message )
            }
        },
        emergency: {
            name: 'emergency',
            once: false,
            async execute (
                this: DefaultLoggingNode,
                message: string
            ) {
                return this.log!.emergency( message )
            }
        }
    }

    constructor (
        [ discordjs ]: [ DiscordJSNode ],
        config: DefaultLoggingConfig
    ) {
        super( config, discordjs )
    }


    /**
     * Provider method for creating a DefaultLoggingNode module.
     *
     * @param {DiscordJSNode | undefined} discordjs - The DiscordJSNode dependency.
     * @param {DefaultLoggingConfig} config - The configuration object for the DefaultLoggingNode module.
     * @throws {Error} Throws an error if DiscordJS is not present in the dependencies.
     * @returns {DefaultLoggingNode} Returns an instance of the DefaultLoggingNode module.
     */
    static async provider (
        [ discordjs ]: [ DiscordJSNode | undefined ],
        config: DefaultLoggingConfig
    ) {
        if ( !discordjs ) {
            throw new Error( 'DiscordJS not in dependencies' )
        }
        const module = new DefaultLoggingNode( [ discordjs ], config )
        // module.log!.trace( module.discord.i18n.t( 'discord:modules.registering', { name: module.name } ) )
        // module.discord.registerModule( module )
        // module.log!.trace( module.discord.i18n.t( 'discord:modules.registered', { name: module.name } ) )
        return module
    }

    /**
     * Registers events for the Discord client.
     * Returns the object itself after registering the events.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @public
     * @returns Registers events for the current instance of the application.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async registerEvents ( reload?: true ) {
        await this.discord.registerEvent( this, [
            this.resources.ready,
            this.resources.trace,
            this.resources.debug,
            this.resources.info,
            this.resources.warn,
            this.resources.fatal,
            this.resources.alert,
            this.resources.emergency
        ] as Event<any>[] )
        return this
    }

    /**
     * Registers commands in the discord object.
     * Returns the updated object.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @public
     * @returns Registers commands in the Discord client.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async registerCommands ( reload?: true ) {
        this.discord.registerCommand( this, [
            // add any commands here
        ] as Command[] )
        return this
    }
}

export default DefaultLoggingNode
