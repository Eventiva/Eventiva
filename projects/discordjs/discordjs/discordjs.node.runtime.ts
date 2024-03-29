/*
 * Project: Eventiva
 * File: discordjs.node.runtime.ts
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/25/24, 2:15 AM
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

import { I18NAspect, type I18NNode, Resource } from '@eventiva/utilities.i18n'
import type { PinoNode as LoggingNode } from '@eventiva/utilities.logging.pino'
import { PinoAspect as LoggingAspect } from '@eventiva/utilities.logging.pino'
import { Client, GatewayIntentBits } from 'discord.js'
import type { Command, CommandSlot } from './command.js'
import type { DiscordjsConfig } from './discordjs-config.js'
import type { Event, EventSlot, ExtendedClientEvents } from './event.js'
import discord from './locales/en/discord.js'
import errors from './locales/en/errors.js'
import type { DiscordJsModule } from './module.js'

/**
 * A class representing the DiscordJSNode.
 * This class provides methods for registering events and commands, listing events and commands, and initializing a Discord client.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class DiscordJSNode

 */
export class DiscordJSNode {

    /**
     * An array of dependencies that this aspect relies on. These dependencies are instances of classes that implement specific aspects, such as the I18NAspect and LoggingAspect.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @static
     */
    static readonly dependencies = [ I18NAspect, LoggingAspect ]
    /**
     * The default configuration for the DiscordJsClient class.
     * The default configuration includes the bot token, client ID, client secret, development guild ID, and list of intents to use for the bot.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @static
     */
    static readonly defaultConfig: DiscordjsConfig = {
        token: process.env[ 'DISCORD.TOKEN' ]!,
        startDelay: process.env[ 'DISCORD.START_DELAY' ]
            ? parseInt( process.env[ 'DISCORD.START_DELAY' ] )
            : 30000,
        // The client ID of the bot
        clientId: process.env[ 'DISCORD.CLIENT_ID' ]!,
        // The client secret of the bot
        clientSecret: process.env[ 'DISCORD.CLIENT_SECRET' ]!,
        // The guild ID to use for the bot as the development guild
        guildId: process.env[ 'DISCORD.GUILD_ID' ]!,
        // The list of intents to use for the bot
        intents: [
            GatewayIntentBits.AutoModerationConfiguration,
            GatewayIntentBits.AutoModerationExecution,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.GuildModeration,
            GatewayIntentBits.GuildScheduledEvents,
            GatewayIntentBits.MessageContent
        ],
        logger: {
            level: process.env[ 'DISCORD.LOGGER.LEVEL' ] ?? 'info'
        }
    }
    /**
     * The Discord client instance. This property is a reference to the Discord.js Client class and is used to interact with the Discord API.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @public
     */
    public client: Client

    /**
     * A public property that represents the analytics segment node's identity in the SegmentNode class.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @public
     */
    // public identity: {
    //   track: SegmentNode["analytics"]["track"],
    //   identify: SegmentNode["analytics"]["identify"],
    //   group: SegmentNode["analytics"]["group"],
    // }
    /**
     * The `i18n` property is a reference to the `i18next` object in the `I18NNode` interface. It is used for internationalization purposes.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @public
     */
    public i18n: I18NNode['i18next']
    /**
     * Indicates whether the object is initialised or not.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @public
     */
    public isInitialised = false
    /**
     * The log property is a reference to either the Log module or the Console object. It is marked as protected, meaning it is only accessible within the class and its subclasses.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @protected
     */
    protected log: LoggingNode['log'] | Console = console

    /**
     * Creates an instance of DiscordJSNode.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @constructor
     * @param config The DiscordJS config object.
     * @param moduleSlot The module slot.
     * @param eventSlot The event slot.
     * @param commandSlot The command slot.
     * @param i18nModule The i18n module.
     * @param [logging]
     */
    constructor (
        protected config: DiscordjsConfig,
        protected eventSlot: EventSlot<any>,
        protected commandSlot: CommandSlot,
        protected i18nModule: I18NNode,
        // protected database?: DatabaseNode,
        protected logging?: LoggingNode
        // protected segment?: SegmentNode
    ) {
        this.log = logging
            ? logging.registerLogger( [
                {
                    name: 'discord:client',
                    options: { level: 'trace', ...this.config.logger }
                }
            ] ).getLogger( 'discord:client' ).logger
            : console

        this.log.trace( 'Waiting on i18nModule to initialize' )
        const startTime = Date.now()
        while ( !i18nModule.i18next.isInitialized ) {
            if ( Date.now() - startTime > this.config.startDelay ) {
                throw new Error( 'i18nModule failed to initialize within the specified startDelay' )
            }
        }
        this.log.trace( 'Registering i18nModule resources' )
        this.registerLocale( [
            { name: 'discord', lng: 'en', ns: 'discord', resources: discord },
            { name: 'errors', lng: 'en', ns: 'errors', resources: errors }
        ] )

        this.i18n = i18nModule.i18next
        this.log.trace( this.i18n.t(
            'discord:init.logging.module',
            {
                context: logging
                    ? undefined
                    : 'notFound', defaultValue: ''
            }
        ) )

        // this.identity = this.segment.registerInstance([{
        //   name: "discordjs",
        //   initialized: false,
        //   writeKey: this.config.segment.writeKey,
        //   analytics: null
        // }]).getInstance("discordjs").analytics

        this.log.trace( this.i18n.t( 'discord:checks', { context: 'searching', key: 'token' } ) )
        if ( !config.token ) {
            this.log.warn( this.i18n.t( 'discord:checks.notFound', { key: 'token' } ) )
        } else {
            this.log.trace( this.i18n.t( 'discord:checks', { context: 'found', key: 'token' } ) )
        }

        this.log.trace( this.i18n.t( 'discord:checks', { context: 'searching', key: 'clientId' } ) )
        if ( !config.clientId ) {
            this.log.warn( this.i18n.t( 'discord:checks.notFound', { key: 'clientId' } ) )
        } else {
            this.log.trace( this.i18n.t( 'discord:checks', { context: 'found', key: 'clientId' } ) )
        }

        this.log.trace( this.i18n.t( 'discord:checks', { context: 'searching', key: 'clientSecret' } ) )
        if ( !config.clientSecret ) {
            this.log.warn( this.i18n.t( 'discord:checks.notFound', { key: 'clientSecret' } ) )
        } else {
            this.log.trace( this.i18n.t( 'discord:checks', { context: 'found', key: 'clientSecret' } ) )
        }

        this.log.trace( this.i18n.t( 'discord:client.creating' ) )

        this.client = new Client( this.config )

        this.log.trace( this.i18n.t( 'discord:client.created' ) )

        this.log.trace( this.i18n.t( 'discord:init.loggingIn' ) )

        setTimeout( async () => {
            if ( config.token ) {
                await this.client.login( this.config.token )
            } else {
                this.log.warn( this.i18n.t( 'discord:init.faked' ) )
            }
            this.log.trace( this.i18n.t( 'discord:init.loggedIn' ) )
        }, config.startDelay )

        this.isInitialised = true
    }

    /**
     * Creates a new instance of DiscordJSNode and returns it.
     *
     * @param {I18NNode} i18n - The I18NNode instance for language localization.
     * @param {LoggingNode | undefined} logging - The LoggingNode instance for logging purposes.
     * @param {DiscordjsConfig} config - The configuration object for DiscordJSNode.
     * @param {EventSlot<any>} eventSlot - The EventSlot to handle Discord events.
     * @param {CommandSlot} commandSlot - The CommandSlot to handle Discord commands.
     * @returns {DiscordJSNode} - The newly created instance of DiscordJSNode.
     */
    static async provider (
        [ i18n, logging ]: [ I18NNode, LoggingNode | undefined ],
        config: DiscordjsConfig,
        [ eventSlot, commandSlot ]: [ EventSlot<any>, CommandSlot ]
    ) {
        return new DiscordJSNode( config, eventSlot, commandSlot, i18n, logging )
    }

    /**
     * Registers the given resources as locales. Logs the registration of locales before and after registering the resources.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @public
     * @param resources An array of resources
     */
    public registerLocale ( resources: Resource[] ) {
        // this.log.trace(this.i18n.t("discord:registeringLocales", {count: resources.length}))
        return this.i18nModule.registerResource( resources )
        // this.log.trace(this.i18n.t("discord:registeredLocales", {count: resources.length}))
    }

    /**
     * Registers a module in the DiscordJsManager.
     * - `module`: The module to register.
     * Returns the DiscordJsManager instance.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @template E The type parameter for the module
     * @param module The module to be registered
     * @param reload
     * @returns Registers a module in the Discord bot. The module will be added to the list of registered modules and will be available for use.
     */
    public registerModule (
        module: DiscordJsModule,
        reload?: true
    ) {
        if ( this.logging ) {
            const log = this.logging.registerLogger( [
                {
                    name: `discord:${ module.name }`,
                    options: { level: 'trace', ...module.getConfig().logger }
                }
            ] ).getLogger( `discord:${ module.name }` ).logger
            module.setLog( log )
        }
        this.log.trace( this.i18n.t( 'discord:modules.init', { context: 'start', name: module.name } ) )
        module.registerCommands( reload )
        module.registerEvents( reload )
        // module.registerLocales(reload)
        this.log.trace( this.i18n.t( 'discord:modules.init', { context: 'complete', name: module.name } ) )

        this.client.emit( 'moduleRegistered', module, reload )

        return this
    }

    /**
     * Registers multiple events to the client.
     * The events parameter is an array of Event objects.
     * The function logs the registration process and binds the event execution to the client.
     * Returns the instance of the class.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @template E The type parameter that represents the event name
     * @param module
     * @param events An array of events to register
     * @returns Registers multiple events to be handled by the client.
     */
    public async registerEvent (
        module: DiscordJsModule,
        events: Event<any>[]
    ) {
        if ( events.length === 0 ) {
            return this
        }
        this.log.trace( this.i18n.t( 'discord:events.multi.registering', { count: events.length } ) )
        this.log.trace( this.i18n.t( 'discord:events.multi.registerEventSlot' ) )
        this.eventSlot.register( events )
        for ( const event of events ) {
            if ( !event ) {
                continue
            }
            this.log.trace( this.i18n.t(
                'discord:events.single.registering',
                {
                    name: event.name,
                    type: event.once
                        ? 'Once'
                        : 'repeat'
                }
            ) )
            this.log.trace( `Getting the event from EventSlot using getByName ${ JSON.stringify( this.eventSlot.getByName(
                event.name ) ) }` )
            if ( event.once ) {
                this.client.once( event.name as string, await event.execute.bind( module ) )
            } else {
                this.client.on( event.name as string, await event.execute.bind( module ) )
            }
            this.log.info( this.i18n.t(
                'discord:events.single.registered',
                {
                    name: event.name,
                    type: event.once
                        ? 'Once'
                        : 'repeat'
                }
            ) )
        }
        this.log.trace( this.i18n.t( 'discord:events.multi.registered', { count: this.eventSlot.length } ) )
        return this
    }

    /**
     * Returns a list of all events. This function calls the 'flatValues' method of the 'eventSlot' object and returns the result.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @returns Returns a list of events.
     */
    public listEvents () {
        this.log.trace( this.i18n.t( 'discord:events.listing', { count: this.eventSlot.length } ) )
        const list = this.eventSlot.flatValues()
        this.log.trace( this.i18n.t( 'discord:events.listed', { flatmap: JSON.stringify( list ) } ) )
    }

    /**
     * Retrieves an event with the given name.
     * If multiple events with the same name exist, it returns the first event.
     * @see DiscordJSNode.getEvents for a list of all events with the given name.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @param name The name of the event to get.
     */
    public getEvent<E extends keyof ExtendedClientEvents> ( name: E ): Event<E>[] {
        this.log.trace( this.i18n.t( 'discord:events.single.getting', { name, module } ) )
        const event = this.eventSlot.getByName( name )
        this.log.trace( this.i18n.t( 'discord:events.single.got', { name, event: JSON.stringify( event ) } ) )
        if ( event ) {
            return event
        }
        this.log.trace( this.i18n.t( 'discord:events.single.notFound', { name } ) )
        throw new Error( this.i18n.t( 'discord:events.single.notFound', { name } ) )
    }

    /**
     * Registers multiple commands in the command slot.
     * @param module
     * @param commands An array of Command objects.
     * @return void
     * @author Jonathan Stevens (@TGTGamer)
     */
    public registerCommand (
        module: DiscordJsModule,
        commands: Command[]
    ) {
        if ( commands.length === 0 ) {
            return this
        }
        this.log.trace( this.i18n.t( 'discord:commands.multi.registering', { count: commands.length } ) )
        // for each command, bind execute and message to the module
        for ( const command of commands ) {
            if ( !command ) {
                continue
            }
            this.log.trace( this.i18n.t( 'discord:commands.single.binding', { name: command.name } ) )
            command.execute = command.execute.bind( module )
            if ( 'message' in command ) {
                command.message = command.message?.bind( module )
            }
            this.log.trace( this.i18n.t( 'discord:commands.single.bound', { name: command.name } ) )
        }
        this.commandSlot.register( commands )
        this.log.trace( this.i18n.t( 'discord:commands.multi.registered', { count: this.commandSlot.length } ) )
        return this
    }

    /**
     * Returns an array of all commands currently stored in the command slot.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @returns Returns a list of commands by flatting the command slot values.
     */
    public listCommands () {
        this.log.trace( this.i18n.t( 'discord:commands.listing', { count: this.commandSlot.length } ) )
        const list = this.commandSlot.flatValues()
        this.log.trace( this.i18n.t( 'discord:commands.listed', { flatmap: JSON.stringify( list ) } ) )
        return list
    }

    /**
     * Returns the command with the specified name.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @param name The name of the command
     * @returns Get the command with the specified name
     */
    public getCommand ( name: string ): Command[] {
        this.log.trace( this.i18n.t( 'discord:commands.single.getting', { name } ) )
        const command = this.commandSlot.getByName( name )
        this.log.trace( this.i18n.t( 'discord:commands.single.got', { name, command: JSON.stringify( command ) } ) )
        if ( command ) {
            return command
        }
        this.log.trace( this.i18n.t( 'discord:commands.single.notFound', { name } ) )
        throw new Error( this.i18n.t( 'discord:commands.single.notFound', { name } ) )
    }
}

export default DiscordJSNode
