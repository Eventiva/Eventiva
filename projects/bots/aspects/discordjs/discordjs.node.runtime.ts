/**
* @format
* -----
* Project: @eventiva/eventiva
* File: discordjs.node.runtime.ts
* Path: \projects\bots\aspects\discordjs\discordjs.node.runtime.ts
* Created Date: Monday, January 29th 2024
* Author: Jonathan Stevens, jonathan@resnovas.com
* Github: https://github.com/TGTGamer
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
* Copyright (c) 2024 Resnovas - All Rights Reserved
* LICENSE: Creative Commons Zero v1.0 Universal (CC0-1.0)
* -----
* This program has been provided under confidence of the copyright holder and
* is licensed for copying, distribution and modification under the terms of
* the Creative Commons Zero v1.0 Universal (CC0-1.0) published as the License,
* or (at your option) any later version of this license.
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* Creative Commons Zero v1.0 Universal for more details.
* You should have received a copy of the Creative Commons Zero v1.0 Universal
* along with this program. If not, please write to: jonathan@resnovas.com,
* or see https://creativecommons.org/publicdomain/zero/1.0/legalcode
* -----
* DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
*/
import {
  Client,
  GatewayIntentBits,
} from 'discord.js';
import type { DiscordjsConfig } from './discordjs-config.js';
import { Event, EventSlot, ExtendedClientEvents } from './event.js';
import { Command, CommandSlot } from './command.js';
import {LoggingAspect, LoggingNode, LogLevels} from '@eventiva/bots.aspects.logging';
import { LogEvents, LogEventsTypes } from './logEvents.js';

export class DiscordjsNode {
  protected client: Client

  constructor(
    private config: DiscordjsConfig,
    protected eventSlot: EventSlot<any>,
    protected commandSlot: CommandSlot,
    protected logging?: LoggingNode
  ) {
    if (logging) { 
      this.logging.console.trace(`Checking token exists on configuration`)
      if (!config.token) this.logging.console.warn(`No token found on config`)
      else this.logging.console.trace(`Token found.`)
      
      this.logging.console.trace(`Checking clientId exists on configuration`)
      if (!config.clientId) this.logging.console.warn(`No clientId found on config`)
      else this.logging.console.trace(`clientId found.`)
      
      this.logging.console.trace(`Checking clientSecret exists on configuration`)
      if (!config.clientSecret) this.logging.console.warn(`No clientSecret found on config`)
      else this.logging.console.trace(`clientSecret found.`)
      
      this.logging.console.trace(`Creating new client.`)
    }

    this.client = new Client(config)
    if (logging) this.logging.console.trace(`Client created.`)
  }
  
  /**
   * register a list of event.
   */
  registerEvent<E extends keyof ExtendedClientEvents>(events: Event<E>[]) {
    this.logging.console.trace(`Registering events. ${events.length} events to be loaded.`)
    this.eventSlot.register(events);
    this.logging.console.trace(`Events registered against EventSlot. Now hosting ${this.eventSlot.length} events`)
    
    for (const event of events){
      this.logging.console.trace(`Registering Event - ${event.name} - on ${event.once ? "Once" : "repeat"} emitter.`)
      if (event.once) this.client.once(event.name as string, event.execute.bind(this))
      else this.client.on(event.name as string, event.execute.bind(this))
      this.logging.console.info(`Registered Event - ${event.name}`)
    }
    return this;
  }

  /**
   * register default logging event.
   */
  registerLoggingEvents() {
    if (!this.logging) throw new Error("Can not create default logging events without logging module")
    return this.registerEvent<LogEventsTypes>(LogEvents)
  }

  /**
   * list all event.
   */
  listEvents() {
    return this.eventSlot.flatValues();
  }

  /**
   * register a list of command.
   */
  registerCommand(commands: Command[]) {
    this.logging.console.trace(`Registering commands. ${commands.length} commands to be loaded.`)
    this.commandSlot.register(commands);
    this.logging.console.trace(`commands registered against commandSlot. Now hosting ${this.commandSlot.length} commands`)
    return this;
  }

  /**
   * list all command.
   */
  listCommands() {
    return this.commandSlot.flatValues();
  }

  static dependencies = [LoggingAspect];

  static defaultConfig: DiscordjsConfig = {
    token: process.env.TOKEN,
      // The client ID of the bot
      clientId: process.env.CLIENT_ID,
      // The client secret of the bot
      clientSecret: process.env.CLIENT_SECRET,
      // The guild ID to use for the bot as the development guild
      guildId: process.env.GUILD_ID,
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
        GatewayIntentBits.MessageContent,
      ],
  };

  static async provider(
    [logging]: [LoggingNode|undefined],
    config: DiscordjsConfig,
    [eventSlot, commandSlot]: [EventSlot<any>, CommandSlot]
  ) {
  
    const discordjs = new DiscordjsNode(config, eventSlot, commandSlot, logging);

    if (logging) {
      logging.console.trace(`Registering logging events...`);
      await discordjs.registerLoggingEvents()
    }
    
    if (logging) logging.console.trace(`loggin into client...`);
    await discordjs.client.login(config.token)
    
    if (logging) logging.console.trace(`Logged in`);

    return discordjs;
  }
}

export default DiscordjsNode;
