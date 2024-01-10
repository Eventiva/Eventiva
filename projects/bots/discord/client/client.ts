/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: client.ts
 * Path: \projects\bots\discord\client\client.ts
 * Created Date: Tuesday, December 12th 2023
 * Author: Jonathan Stevens (Email: jonathan.stevens@eventiva.co.uk, Github: https://github.com/TGTGamer)
 * -----
 * Contributing: Please read through our contributing guidelines. Included are directions for opening
 * issues, coding standards, and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, version 2.0. Please interact in ways that contribute to an open,
 * welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 * -----
 * Copyright (c) 2023 - 2024 Eventiva - All Rights Reserved
 * LICENSE: GNU General Public License v3.0 only (GPL-3.0)
 * -----
 * This program has been provided under confidence of the copyright holder and is
 * licensed for copying, distribution and modification under the terms of
 * the GNU General Public License v3.0 only (GPL-3.0) published as the License,
 * or (at your option) any later version of this license.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License v3.0 only for more details.
 *
 * You should have received a copy of the GNU General Public License v3.0 only
 * along with this program. If not, please write to: jonathan.stevens@eventiva.co.uk,
 * or see https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE - PLEASE SEE THE LICENSE FILE FOR DETAILS
 */

import {
  type AppContext,
  type Application,
  type ApplicationInstance,
  // type AppDeployContext,
  // type AppBuildContext
} from '@teambit/application';
import {
  type ClientOptions as DiscordClientOptions,
  type SlashCommandBuilder,
  type ContextMenuCommandBuilder,
  type ChatInputCommandInteraction,
  type StringSelectMenuInteraction,
  type ButtonInteraction,
  type ClientEvents,
  type Awaitable,
  type Message,
  GatewayIntentBits,
  Collection,
  Events,
  Routes,
  Client as DiscordClient,
} from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import pino, { LoggerOptions } from 'pino';
import pinoCaller from 'pino-caller';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _pinoPretty from 'pino-pretty';
import dayjs from 'dayjs';
import i18next, { i18n } from 'i18next';
import Middleware from 'i18next-http-middleware';
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import allowPlugin, { AllowOptions } from 'fastify-allow';
import sensible from '@fastify/sensible';
import helmet from '@fastify/helmet';
import {
  FrappeApp,
  FrappeCall,
  FrappeDB,
  FrappeFileUpload,
} from 'frappe-js-sdk';
import { type TokenParams } from 'frappe-js-sdk/lib/frappe_app/types';
import {
  Version3Client,
  ServiceDeskClient,
  Config as AtlassianConfig,
} from 'jira.js';

// import all namespaces (for the default language, only)
// import ns1 from "locales/en/ns1.json";
// import ns2 from "locales/en/ns2.json";

/**
 * The default namespace for the property
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {"ns1"}
 */
export const defaultNS = 'ns1';
/**
 * An object that represents the available resources in different languages. The `resources` object has properties for each language, where the key is the language code and the value is an object representing the available namespaces for that language.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {{ readonly en: { readonly ns1: any; readonly ns2: any; }; }}
 */
export const resources = {
  en: {
    // ns1,
    // ns2,
  },
} as const;

/**
 * ClientOptions represents the options that can be provided when creating a client. It is a union of the DiscordClientOptions type and the following properties:
 * - token: A string representing the token for the client.
 * - clientId: A string representing the ID of the client.
 * - clientSecret: A string representing the secret for the client.
 * - guildId: A string representing the ID of the guild.
 * - api.port: A number representing the port for the API.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @typedef {ClientOptions}
 */
export type ClientOptions = {
  token: string;
  clientId: string;
  clientSecret: string;
  guildId: string;
  logger: LoggerOptions;
  api: {
    port: number;
  } & AllowOptions;
  frappe: {
    url: string;
    tokenParams?: TokenParams;
    name?: string;
  };
  atlassian: AtlassianConfig;
} & DiscordClientOptions;

/**
 * A type that represents different types of commands.
 * The `Command` type is a union of three possible command types: `slash`, `button`, and `selectMenu`.
 * - For `slash` commands, the `data` property should be an instance of `SlashCommandBuilder`, and the `execute` property should be a function that takes a `ChatInputCommandInteraction` parameter and returns a `Promise`.
 * - For `button` commands, the `data` property should be an instance of `ContextMenuCommandBuilder`, and the `execute` property should be a function that takes a `ButtonInteraction` parameter and returns a `Promise`.
 * - For `selectMenu` commands, the `data` property should be an instance of `ContextMenuCommandBuilder`, and the `execute` property should be a function that takes a `StringSelectMenuInteraction` parameter and returns a `Promise`.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @typedef {Command}
 */
export type Command =
  | {
    type: 'message';
    data: SlashCommandBuilder;
    execute: (this: Client, interaction: Message<boolean>) => Awaitable<void>;
  }
  | {
    type: 'slash';
    data: SlashCommandBuilder;
    execute: (
      this: Client,
      interaction: ChatInputCommandInteraction
    ) => Awaitable<void>;
    message?: (
      this: Client,
      interaction: Message<boolean>
    ) => Awaitable<void>;
  }
  | {
    type: 'button';
    data: ContextMenuCommandBuilder;
    execute: (
      this: Client,
      interaction: ButtonInteraction
    ) => Awaitable<void>;
    message?: (
      this: Client,
      interaction: Message<boolean>
    ) => Awaitable<void>;
  }
  | {
    type: 'selectMenu';
    data: ContextMenuCommandBuilder;
    execute: (
      this: Client,
      interaction: StringSelectMenuInteraction
    ) => Awaitable<void>;
    message?: (
      this: Client,
      interaction: Message<boolean>
    ) => Awaitable<void>;
  };

/**
 * A generic event type that corresponds to a specific event key from the `ClientEvents` interface.
 * Properties:
 * - `data`: An object containing the event name and optional `once` flag.
 * - `execute`: Function that is called when the event is triggered, with arguments matching the corresponding event key from the `ClientEvents` interface.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @typedef {Event}
 * @template {keyof ClientEvents} E The type of event
 */
export type Event<E extends keyof ClientEvents> = {
  data: {
    name: E;
    once?: boolean;
  };
  // make this the same as the discordjs event on and once methods
  execute: (this: Client, ...args: ClientEvents[E]) => Awaitable<void>;
};

/**
 * The Client class represents a Discord bot client that interacts with the Discord API and provides functionality for managing commands, events, and routes.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class Client
 * @typedef {Client}
 * @implements {Application}
 */
export class Client extends DiscordClient implements Application {
  /**
   * The server property is an instance of the Fastify class with logger enabled.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @private
   * @type {Fastify}
   * @see {@link https://fastify.dev/}
   */
  private server: FastifyInstance;

  /**
   * A private property that holds the configuration options for the client.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @private
   * @type {ClientOptions}
   */
  private config: ClientOptions;

  /**
   * public property named 'commands' of type 'Collection<string, any>'. It is initialized as a new instance of the 'Collection' class.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   * @type {Collection<string, any>}
   */
  public commands: Collection<string, Command> = new Collection();

  /**
   * A public property that represents a collection of events. It is a Collection object with keys of type string and values of type any.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   * @type {Collection<string, any>}
   */
  public events: Collection<string, Event<any>> = new Collection();

  /**
   * A logger object used for logging messages and error in the application. It is initialized with an instance of the `pino` logger.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   * @type {pino}
   * @see {@link https://getpino.io/}
   */
  // define the type to be the same as pino without initializing it
  public logger: pino.Logger;

  /**
   * This property stores the current date and time using the 'dayjs' library.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   * @type {dayjs}
   * @see {@link https://day.js.org/}
   */
  static day = dayjs();

  /**
   * The i18n property is used for internationalization. It is a reference to the i18next library.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   * @type {i18n}
   * @see {@link https://www.i18next.com/}
   */
  public i18n: i18n = i18next;

  /**
   * The `frappe` property is an instance of the `FrappeApp` class, which represents the Frappe application.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   * @type {FrappeApp}
   */
  public frappe: FrappeApp;

  /**
   * The db property represents a database and its value can be of any type.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {*}
   */
  public db: FrappeDB;

  /**
   * The `api` property is of type `any`.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {*}
   */
  public api: FrappeCall;

  /**
   * The file property represents a file that is associated with the current object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {*}
   */
  public file: FrappeFileUpload;

  /**
   * The atlassian property represents an instance of the Version3Client class, which is a client for making API requests to Atlassian services. This property is public, meaning it can be accessed from outside the class.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   * @type {Version3Client}
   */
  public atlassian: {
    jira: Version3Client;
    desk: ServiceDeskClient;
  };

  /**
   * The name of the client.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name = 'client';

  /**
   * Creates an instance of Client.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param {ClientOptions} [options={
   *       // The token to use for the bot
   *       token: process.env.TOKEN,
   *       // The client ID of the bot
   *       clientId: process.env.CLIENT_ID,
   *       // The client secret of the bot
   *       clientSecret: process.env.CLIENT_SECRET,
   *       // The guild ID to use for the bot as the development guild
   *       guildId: process.env.GUILD_ID,
   *       // The list of intents to use for the bot
   *       intents: [GatewayIntentBits.Guilds],
   *       // The API configuration
   *       api: {
   *         // The port to run the API on
   *         port: 4000,
   *       },
   *     }]
   */
  constructor(
    options: Partial<ClientOptions> = {
      // The token to use for the bot
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
      // The API configuration
      api: {
        // The port to run the API on
        port: 4000,
        send405: false,
        send405ForWildcard: true,
      },
      logger: {
        level: process.env.LOG_LEVEL,
        transport:
          process.env.NODE_ENV === 'development'
            ? {
              targets: [
                {
                  target: 'pino-pretty',
                },
              ],
            }
            : undefined,
      },
      frappe: {
        url: process.env.FRAPPE_URL ?? 'https://site1.localhost',
        tokenParams: process.env.FRAPPE_TOKEN ? {
          useToken: true,
          token: () => process.env.FRAPPE_TOKEN!,
          type: 'Bearer',
        } : undefined,
      },
      atlassian: {
        host: process.env.ATLASSIAN_HOST ?? 'https://eventiva.atlassian.net',
        authentication: (process.env.ATLASSIAN_API_TOKEN && process.env.ATLASSIAN_EMAIL) ? {
          basic: {
            email: process.env.ATLASSIAN_EMAIL,
            apiToken: process.env.ATLASSIAN_API_TOKEN,
          },
        } : undefined,
      },
    }
  ) {
    // Validate the options
    if (!options.token) {
      throw new Error('token is missing');
    }
    if (!options.clientId) {
      throw new Error('clientId is missing');
    }
    if (!options.clientSecret) {
      throw new Error('clientSecret is missing');
    }

    super(options as ClientOptions);

    this.logger =
      process.env.NODE_ENV === 'development'
        ? pinoCaller(pino({ level: 'debug' }))
        : pino({ level: 'debug' });

    this.i18n.use(Middleware.LanguageDetector).init({
      lng: 'en',
      // ns: ["ns1", "ns2"],
      defaultNS,
      resources,
    });

    // Store the options
    this.config = options as ClientOptions;

    this.logger.debug(`Creating FrappeApp instance...`);
    this.frappe = new FrappeApp(
      this.config.frappe.url,
      this.config.frappe.tokenParams,
      this.config.frappe.name
    );

    this.logger.debug(`Creating FrappeDB instance...`);
    this.db = this.frappe.db();

    this.logger.debug(`Creating FrappeCall instance...`);
    this.api = this.frappe.call();

    this.logger.debug(`Creating FrappeFileUpload instance...`);
    this.file = this.frappe.file();

    this.logger.debug(`Creating Atlassian instance...`);
    this.atlassian = {
      jira: new Version3Client(this.config.atlassian),
      desk: new ServiceDeskClient(this.config.atlassian),
    };
    // Create the server
    this.logger.debug(`Creating Server instance...`);
    this.server = Fastify({
      logger: this.logger,
    });
  }

  /**
   * Runs the application, initializing all necessary components and starting the server.
   * Parameters:
   * - context (optional): An optional AppContext object containing the context for the application.
   * Returns:
   * A Promise that resolves to an ApplicationInstance object containing the server information.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {?AppContext} [context]
   * @returns {Promise<ApplicationInstance>} Runs the application with the provided configuration and returns the server information.
   */
  async run(context?: AppContext): Promise<ApplicationInstance> {
    // Configure the port
    if (context?.port) this.config.api.port = context.port;

    this.logger.debug(`Loading commands...`);
    await this.loadCommands();
    this.logger.debug(`Loaded ${this.commands.size} commands.`);

    // Listen to events on client
    this.logger.debug(`Loading events...`);
    await this.loadEvents();
    this.logger.debug(`Loaded ${this.events.size} events.`);

    this.logger.debug(`Registering events...`);
    await this.registerEvents();

    // Start Discord client
    await this.login(this.config.token);
    this.rest.setToken(this.config.token);
    this.logger.debug(`Logged in!`);

    // Register fastify plugins
    this.logger.debug(`Registering plugins...`);
    await this.registerPlugins();

    // Register middlewere to fastify
    this.logger.debug(`Registering middleware...`);
    await this.registerMiddleware();

    // Register routes and events
    this.logger.debug(`Registering routes...`);
    await this.registerRoutes();

    // Start the server
    this.logger.debug(`Starting server...`);
    this.server.listen({ port: this.config.api.port }, () =>
      this.logger.info(
        `🚀  Server ready at: http://localhost:${this.config.api.port}`
      )
    );

    // Return the server information
    return {
      port: this.config.api.port,
      appName: this.name,
      url: `http://localhost:${this.config.api.port}`,
    };
  }

  /**
   * Registers the plugins. This method throws an error indicating that it is not implemented.
   * @author Jonathan Stevens (@TGTGamer)
   */
  async registerPlugins() {
    await this.server.register(allowPlugin, this.config);
    // await this.server.register(fastifyPrisma, {
    //   clientConfig: {
    //     log: [{ emit: 'event', level: 'query' }]
    //   }
    // });
    await this.server.register(sensible);
    await this.server.register(helmet);
  }

  /**
   * Register a middleware function.
   * Throws an error 'Method not implemented.'.
   * @author Jonathan Stevens (@TGTGamer)
   */
  async registerMiddleware() {
    this.server.register(Middleware.plugin, {
      i18next,
      // ignoreRoutes: ['/foo'] // or function(req, res, options, i18next) { /* return true to ignore */ }
    });
  }

  /**
   * Loads the local commands from the 'commands' folder and the remote commands.
   * @author Jonathan Stevens (@TGTGamer)
   */
  async loadCommands() {
    // loads the local commands
    this.commands = await this.localLoadFiles('commands', this.commands);

    // loads the remote commands
    // this.remoteCommands();
  }

  /**
   * This function throws an error with the message 'Method not implemented.'
   * @author Jonathan Stevens (@TGTGamer)
   */
  remoteCommands() {
    throw new Error('Method not implemented.');
  }

  /**
   * Refreshes and deploys all application (/) commands for the client.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @returns {*} Asynchronously deploys the application commands by refreshing them in the guild.
   */
  async deployCommands() {
    try {
      this.logger.info(
        `Started refreshing ${this.commands.size} application (/) commands.`
      );

      // Here we need to create a array of application commands by getting them from the Client.commands Collection and accessing their .data.toJSON() methods
      const commands = this.commands.map((command) => command.data.toJSON());

      // The put method is used to fully refresh all commands in the guild with the current set
      const result = await this.rest.put(
        Routes.applicationCommands(this.config.clientId),
        { body: commands }
      );

      this.logger.info(result);

      this.logger.info(
        `Successfully reloaded ${commands.length} application (/) commands.`
      );
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      this.logger.error(error);
    }
  }

  /**
   * Loads the events from the 'events' folder.
   * @author Jonathan Stevens (@TGTGamer)
   */
  async loadEvents() {
    this.events = await this.localLoadFiles('events', this.events);
  }

  /**
   * Registers event handlers for each event in the events collection. If an event is set to run only once, the corresponding event handler will be registered with the 'once' method, otherwise it will be registered with the 'on' method.
   * @author Jonathan Stevens (@TGTGamer)
   */
  registerEvents() {
    this.on(Events.ClientReady, () => this.logger.info('The bot is online'));
    this.on(Events.Debug, (m) => this.logger.debug(m));
    this.on(Events.Warn, (m) => this.logger.warn(m));
    this.on(Events.Error, (m) => this.logger.error(m));

    // for each event in the events collection register the event handler
    // eslint-disable-next-line no-restricted-syntax
    for (const event of this.events.values()) {
      if (event.data.once) {
        this.logger.debug(
          `Registering once event handler for ${event.data.name}`
        );
        this.once(Events.ClientReady, event.execute.bind(this));
        return;
      }
      this.logger.debug(`Registering event handler for ${event.data.name}`);
      this.on(event.data.name, event.execute.bind(this));
    }
  }

  /**
   * Loads resource files from the specified folders path and adds them to the provided collection. Each resource file must have a '.js' extension and contain a 'data' property and an 'execute' property.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @param {string} foldersPath The path to the folder where the resource folders are located.
   * @param {Collection<string, any>} collection A Collection to store the loaded resources.
   */
  async localLoadFiles(
    foldersPath: string,
    collection: Collection<string, any>
  ) {
    const resourceFolders = fs.readdirSync(foldersPath);
    this.logger.debug(
      `Loading ${resourceFolders.length} resources from ${foldersPath}`
    );

    const loadPromises = resourceFolders.map(async (folder) => {
      this.logger.debug(`Loading resources from ${folder}`);

      if (fs.lstatSync(path.join(foldersPath, folder)).isDirectory()) {
        const resourcesPath = path.join(foldersPath, folder);
        return this.localLoadFiles(resourcesPath, collection);
      }
      return this.loadFile(folder, foldersPath, collection);
    });

    await Promise.all(loadPromises);

    return collection;
  }

  /**
   * Loads a file and adds it as a resource to a collection.
   * - `file`: The filename of the file to load.
   * - `resourcesPath`: The path to the resources directory.
   * - `collection`: The collection where the resource will be added.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @private
   * @async
   * @param {string} file private async loadFile(file: string, resourcesPath: string, collection: Collection<string, any>)
   * @param {string} resourcesPath Loads a file and adds it to a collection.
   * @param {Collection<string, any>} collection The collection to add the file to.
   * @returns {*} Loads a file from the specified path and adds it to a collection.
   */
  private async loadFile(
    file: string,
    resourcesPath: string,
    collection: Collection<string, any>
  ) {
    this.logger.debug(`Loading ${file}`);
    const filePath = path.join(resourcesPath, file).replace(/\.ts$/, '.js');
    let resource = await import(`./${filePath}`);
    resource = resource.default;
    // Set a new item in the Collection with the key as the resource name and the value as the exported module
    if ('data' in resource && 'execute' in resource) {
      collection.set(resource.data.name, resource);
    } else if ('data' in resource) {
      this.logger.info(
        `[WARNING] The resource at ${filePath} is missing a required "execute" property.`
      );
      this.logger.debug(resource);
    } else {
      this.logger.info(
        `[WARNING] The resource at ${filePath} is missing a required "data" property.`
      );
      this.logger.debug(resource);
    }
    return collection;
  }

  /**
   * Builds the component using the given context. Returns an empty object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @returns {unknown} Builds the component asynchronously and returns an empty object.
   */
  async build() { // context: AppBuildContext
    // this is the component build path.
    // const componentPath = context.capsule.path;
    // your deployment function goes here
    return {};
  }

  /**
   * Deploys the component using the provided context. Returns the deployed URL.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @returns {unknown} Deploys the current component and returns the deployed URL.
   */
  async deploy() { // context: AppDeployContext
    // const componentPath = context.capsule.path;
    // use the context to access your component and deploy.
    return {
      url: `https://localhost:${this.config.api.port}/`,
    };
  }

  /**
   * Creates a new instance of the Client class.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   * @returns {Client} Creates and returns a new instance of the Client class.
   */
  static from() {
    return new Client();
  }

  /**
   * Asynchronously returns the string 'Hello World!'
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @returns {unknown} This is an asynchronous function that returns the string 'Hello World!'
   */
  async getHello() {
    return 'Hello World!';
  }

  /**
   * Registers routes for the server. This function sets up a route handler for a GET request to the root URL ('/'). When a request is received, it will asynchronously call the 'getHello' function to retrieve a greeting message. The retrieved message is then sent as the response.
   * @author Jonathan Stevens (@TGTGamer)
   */
  registerRoutes() {
    const opts: RouteShorthandOptions = {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              pong: {
                type: 'string',
              },
            },
          },
        },
      },
    };

    this.server.get('/ping', opts, async () => {
      return { pong: 'it worked!' };
    });

    this.server.get('/', async (req, res) => {
      const greeting = await this.getHello();
      res.send(greeting);
    });
  }
}
