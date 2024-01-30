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
  Events,
  GatewayIntentBits,
  type ClientEvents,
} from 'discord.js';
import type { DiscordjsConfig } from './discordjs-config.js';
import { Event, EventSlot } from './event.js';
import { Command, CommandSlot } from './command.js';
import {LoggingAspect, LoggingNode} from '@eventiva/bots.aspects.logging';

export class DiscordjsNode {
  private client: Client
  constructor(
    private config: DiscordjsConfig,
    private eventSlot: EventSlot<any>,
    private commandSlot: CommandSlot,
    private logging: LoggingNode
  ) {
    if (!config.token) {
      throw new Error('token is missing');
    }
    if (!config.clientId) {
      throw new Error('clientId is missing');
    }
    if (!config.clientSecret) {
      throw new Error('clientSecret is missing');
    }
    this.client = new Client(config)
  }
  
  /**
   * register a list of event.
   */
  registerEvent<E extends keyof ClientEvents>(events: Event<E>[]) {
    this.logging.console.debug(`Registering events. ${events.length} events to be loaded. `)
    this.eventSlot.register(events);
    for (const event of events){
      console.debug(`Registering once event handler for ${event.name}`);
      if (event.once) this.client.once(event.name, event.execute)
      else this.client.on(event.name, event.execute)
    }
    return this;
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
    this.commandSlot.register(commands);
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
    [logging]: [LoggingNode],
    config: DiscordjsConfig,
    [eventSlot, commandSlot]: [EventSlot<any>, CommandSlot]
  ) {
    const discordjs = new DiscordjsNode(config, eventSlot, commandSlot, logging);
    logging.console.debug(`Registering logging events...`);
    discordjs.client.on(Events.ClientReady, () => logging.console.info('The bot is online'));
    discordjs.client.on(Events.Debug, (m) => logging.console.debug(m));
    discordjs.client.on(Events.Warn, (m) => logging.console.warn(m));
    discordjs.client.on(Events.Error, (m) => logging.console.error(m));
    await discordjs.client.login(config.token)
    logging.console.debug(`Logged in`);

    return discordjs;
  }
}

export default DiscordjsNode;
