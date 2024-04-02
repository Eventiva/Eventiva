/*
 * Project: Eventiva
 * File: discordjs.node.runtime.ts
 * Last Modified: 4/2/24, 1:23 AM
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

import { I18NAspect, type I18NNode, Resource } from '@eventiva/utilities.i18n'
import { LoggerAspect, LoggerConfig, LoggerNode, LoggerType } from '@eventiva/utilities.logging.logger'
import { Client, GatewayIntentBits } from 'discord.js'
import type { Command, CommandSlot } from './command.js'
import type { DiscordjsConfig } from './discordjs-config.js'
import type { Event, EventSlot, ExtendedClientEvents } from './event.js'
import discord from './locales/en/discord.js'
import errors from './locales/en/errors.js'
import type { DiscordJsModule } from './module.js'

const defaultToken = process.env[ 'DISCORD.TOKEN' ]!
const defaultStartDelay = process.env[ 'DISCORD.START_DELAY' ]
const parsedDefaultStartDelay = defaultStartDelay
    ? parseInt( defaultStartDelay, 10 )
    : 30000

export class DiscordJSNode {
    static readonly dependencies = [ I18NAspect, LoggerAspect ]

    static readonly defaultConfig: DiscordjsConfig = {
        token: defaultToken,
        startDelay: parsedDefaultStartDelay,
        clientId: process.env[ 'DISCORD.CLIENT_ID' ]!,
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
            level: process.env[ 'DISCORD.LOGGER.LEVEL' ] as DiscordjsConfig['logger']['level'] ?? 'info'
        }
    }

    public client: Client

    public i18n: I18NNode['i18next']

    public isInitialised = false

    protected log: LoggerType<never>

    constructor (
        protected config: DiscordjsConfig,
        protected eventSlot: EventSlot<any>,
        protected commandSlot: CommandSlot,
        protected i18nModule: I18NNode,
        protected logging?: LoggerNode
    ) {
        this.initialize()
    }

    static async provider (
        [ i18n, logging ]: [ I18NNode, LoggerNode | undefined ],
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
    public async registerModule (
        module: DiscordJsModule,
        reload?: true
    ) {
        if ( this.logging ) {
            const log = await this.setupLogger(
                `discord:${ module.name }`,
                { level: 'trace', ...module.getConfig().logger }
            )
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

    public async registerEvent (
        module: DiscordJsModule,
        events: Event<any>[]
    ) {
        if ( events.length === 0 ) {
            return this
        }

        this.logEventRegistrationStart( events.length )

        this.eventSlot.register( events )

        events.forEach.bind( this )( ( event: Event<any> ) => {
            this.registerEventToClient( module, event )
        } )

        this.logEventRegistrationEnd( this.eventSlot.length )

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
    ): DiscordJSNode {
        if ( commands.length === 0 ) {
            return this
        }
        this.log.trace( this.i18n.t( 'discord:commands.multi.registering', { count: commands.length } ) )
        commands.forEach.bind( this )( ( command: Command ) => {
            this.log.trace( this.i18n.t( 'discord:commands.single.binding', { name: command.name } ) )
            this.bindCommandToModule( module, command )
        } )
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

    private async initialize () {
        await this.setupLogger()
        this.log.trace( 'Waiting on i18nModule to initialize' )
        this.log.trace( 'Registering i18nModule resources' )
        this.registerLocale( [
            { name: 'discord', lng: 'en', ns: 'discord', resources: discord },
            { name: 'errors', lng: 'en', ns: 'errors', resources: errors }
        ] )

        this.i18n = this.i18nModule.i18next
        this.log.trace( this.i18n.t(
            'discord:init.logging.module',
            {
                context: this.logging
                    ? undefined
                    : 'notFound', defaultValue: ''
            }
        ) )

        this.log.trace( this.i18n.t( 'discord:checks', { context: 'searching', key: 'token' } ) )
        if ( !this.config.token ) {
            this.log.warn( this.i18n.t( 'discord:checks.notFound', { key: 'token' } ) )
        } else {
            this.log.trace( this.i18n.t( 'discord:checks', { context: 'found', key: 'token' } ) )
        }

        this.log.trace( this.i18n.t( 'discord:checks', { context: 'searching', key: 'clientId' } ) )
        if ( !this.config.clientId ) {
            this.log.warn( this.i18n.t( 'discord:checks.notFound', { key: 'clientId' } ) )
        } else {
            this.log.trace( this.i18n.t( 'discord:checks', { context: 'found', key: 'clientId' } ) )
        }

        this.log.trace( this.i18n.t( 'discord:checks', { context: 'searching', key: 'clientSecret' } ) )
        if ( !this.config.clientSecret ) {
            this.log.warn( this.i18n.t( 'discord:checks.notFound', { key: 'clientSecret' } ) )
        } else {
            this.log.trace( this.i18n.t( 'discord:checks', { context: 'found', key: 'clientSecret' } ) )
        }

        this.log.trace( this.i18n.t( 'discord:client.creating' ) )

        this.client = new Client( this.config )

        this.log.trace( this.i18n.t( 'discord:client.created' ) )

        this.log.trace( this.i18n.t( 'discord:init.loggingIn' ) )

        await delay(this.config.startDelay);
        if (this.config.token) {
            await this.client.login(this.config.token);
        } else {
            this.log.warn(this.i18n.t('discord:init.faked'));
        }
        this.log.trace(this.i18n.t('discord:init.loggedIn'));

        this.isInitialised = true
    }

    private async setupLogger (
        name: string = 'discord:client',
        config: LoggerConfig = this.config.logger
    ) {
        await this.logging.registerLogger( [
            {
                name,
                options: config
            }
        ] )
        this.log = this.logging.getLogger( name ).logger
    }

    /**
     * Do the binding of commands actions (execute and message) to the module
     * Log tracing information about the bindings
     * @param module
     * @param command The command to bind
     */
    private bindCommandToModule (
        module: DiscordJsModule,
        command: Command
    ): void {
        const mutableCommand = command
        if ( mutableCommand?.execute ) {
            mutableCommand.execute = mutableCommand.execute.bind( module )
            if ( 'message' in mutableCommand ) {
                mutableCommand.message = mutableCommand.message?.bind( module )
            }
            this.log.trace( this.i18n.t( 'discord:commands.single.bound', { name: command.name } ) )
        }
    }

    private logEventRegistrationStart ( eventCount: number ) {
        this.log.trace( this.i18n.t( 'discord:events.multi.registering', { count: eventCount } ) )
        this.log.trace( this.i18n.t( 'discord:events.multi.registerEventSlot' ) )
    }

    private logEventRegistrationEnd ( eventSlotLength: number ) {
        this.log.trace( this.i18n.t( 'discord:events.multi.registered', { count: eventSlotLength } ) )
    }

    private async registerEventToClient (
        module: DiscordJsModule,
        event: Event<any>
    ) {
        if ( !event ) {
            return
        }

        this.logSingleEventRegistration( event )

        const eventFn = await event.execute.bind( module )
        if ( event.once ) {
            this.client.once( event.name as string, eventFn )
        } else {
            this.client.on( event.name as string, eventFn )
        }

        this.logEventRegistered( event )
    }

    private logSingleEventRegistration ( event: Event<any> ) {
        this.log.trace( this.i18n.t(
            'discord:events.single.registering',
            {
                name: event.name,
                type: event.once
                    ? 'Once'
                    : 'repeat'
            }
        ) )

        this.log.trace( `Getting the event from EventSlot using getByName ${
            JSON.stringify( this.eventSlot.getByName( event.name ) ) }`
        )
    }

    private logEventRegistered ( event: Event<any> ) {
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
}

export default DiscordJSNode
