/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: client.ts
 * Path: \projects\bots\discord\client\client.ts
 * Created Date: Sunday, December 10th 2023
 * Author: Jonathan Stevens (Email: jonathan.stevens@eventiva.co.uk, Github: https://github.com/TGTGamer)
 * -----
 * Contributing: Please read through our contributing guidelines. Included are directions for opening
 * issues, coding standards, and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 * 
 * Code of Conduct: This project abides by the Contributor Covenant, version 2.0. Please interact in ways that contribute to an open,
 * welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 * -----
 * Copyright (c) 2023 Eventiva - All Rights Reserved
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
 * -----
 * Last Modified: 10-12-2023
 * By: Jonathan Stevens (Email: jonathan.stevens@eventiva.co.uk, Github: https://github.com/TGTGamer)
 * Current Version: 0.0.0
 */

import type { 
  AppContext, 
  Application, 
  ApplicationInstance, 
  // AppDeployContext, 
  // AppBuildContext 
} from '@teambit/application';
import express from 'express';
import { Client as DiscordClient, Events, ClientOptions as DiscordClientOptions, GatewayIntentBits } from 'discord.js';


export type ClientOptions = {
  token?: string, 
  clientId?: string, 
  clientSecret?: string
  api: {
    port: number
  }
} & DiscordClientOptions

/**
 * client bot
 */
export class Client implements Application {

  private server: express.Application

  private config: ClientOptions
  
  public client: DiscordClient
  
  name = 'client';

  constructor(
    options: ClientOptions = {
      // The token to use for the bot
      token: process.env.TOKEN,
      // The client ID of the bot
      clientId: process.env.CLIENT_ID,
      // The client secret of the bot
      clientSecret: process.env.CLIENT_SECRET,
      // The list of intents to use for the bot
      intents: [GatewayIntentBits.Guilds],
      // The API configuration
      api: {
        // The port to run the API on
        port: 4000
      }
    }) {
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

    // Store the options
    this.config = options;

    // Create the express server
    this.server = express();

    // Create the discord client
    this.client = new DiscordClient(options);
  }


    async run(
    context?: AppContext
  ): Promise<ApplicationInstance> {
    // Configure the port
    if (context?.port) this.config.api.port = context.port;

    // Start Discord client
    this.client.login(this.config.token);

    // Register routes and events
    this.registerRoutes();
    this.registerEvents();

    // Start the server
    this.server.listen(this.config.api.port, () => {
      console.log(`🚀  Server ready at: http://localhost:${this.config.api.port}`);
    });

    // Return the server information
    return {
      port: 4000,
      appName: this.name,
      url: `http://localhost:${this.config.api.port}`
    }
  }

  /**
   * builds your application. if needed besides component build.
   */
  async build(
    // context: AppBuildContext
  ) {
    // this is the component build path.
    // const componentPath = context.capsule.path;
    // your deployment function goes here
    return {};
  }

  /**
   * use this function to deploy your component to the chosen destination.
   */
  async deploy(
    // context: AppDeployContext
  ) {
    // const componentPath = context.capsule.path;
    // use the context to access your component and deploy.
    return {
      url: 'https://localhost:4000'
    }
  }

  /**
   * a shorthand method for creating
   * an instance of your application and use this
   * as a type.
   */
  static from() {
    return new Client();
  }
  
  /**
   * say hello.
   */
  async getHello() {
    return 'Hello World!';
  }

  /**
   * register the server routes.
   */
  registerRoutes() {
    this.server.get('/', async (req, res) => {
      const greeting = await this.getHello();
      res.send(greeting);
    });
  }

  /**
   * register the client events.
   */
  registerEvents() {
    this.client.once(Events.ClientReady, readyClient => {
      console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    });
  }
}