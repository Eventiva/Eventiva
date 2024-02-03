/**
* @format
* -----
* Project: @eventiva/eventiva
* File: ready.node.runtime.ts
* Path: \projects\bots\discord\events\ready\ready.node.runtime.ts
* Created Date: Tuesday, January 30th 2024
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
import { Events } from 'discord.js';
import DiscordjsAspect, { Command, DiscordJsModule, DiscordjsNode, Resources } from '@eventiva/bots.aspects.discordjs';
import type { ReadyConfig } from './ready-config.js';
import { Event } from '@eventiva/bots.aspects.discordjs';


/**
 * Represents a node in the Ready Aspect of a Discord.js application. This node handles the 'ready' event and logs a message with the client's user information upon initialization.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class
 */
export class ReadyNode extends DiscordJsModule<ReadyConfig> {
  /**
   * The name of the module that represents the 'ready' event.
   * @author Jonathan Stevens (@TGTGamer)
   */
  public name = "ReadyEvent"

  /**
   * Registers events for the Discord client.
   * Returns the object itself after registering the events.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   * @returns Registers events for the current instance of the application.
   */
  public registerEvents(reload?: true) {
    this.discord.registerEvent([
      // this.resources["ready"]
      // add any additional events here
    ] as Event<any>[])
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
  public registerCommands(reload?: true) {
    this.discord.registerCommand([
      // add any commands here
    ] as Command[])
    return this;
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
    "ready": {
      name: Events.ClientReady,
      once: true,
      async execute(client) {
        client.emit("info", `Logged in as ${client.user.tag} at ${new Date().toLocaleString()}`)
      }
    },
  };

  /**
   * An array of dependencies required by the current module. The elements of the array are instances of the DiscordjsAspect class.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   */
  static dependencies = [DiscordjsAspect];

  /**
   * The default configuration for the Ready class. It is an empty object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   */
  static defaultConfig: ReadyConfig = {};

  /**
 * Creates a provider for the given DiscordjsNode and ReadyConfig.
 * The provider registers the ready event using the given DiscordjsNode and configures it with the provided ReadyConfig.
 * @param discordjs The DiscordjsNode instance to use.
 * @param config The ReadyConfig instance to use.
 * @returns The created ReadyNode instance.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @static
 * @async
 * @param param0
 * @param param0.discordjs
 * @param config The configuration object for the ReadyNode.
 * @returns This function is a static async provider that takes in a DiscordjsNode instance and a ReadyConfig object. It creates a new ReadyNode instance using the discordjs and config parameters. It then registers the 'ready' event using the ready.resource property. It returns the created ReadyNode instance.
 */
  static async provider(
    [discordjs]: [DiscordjsNode|undefined],
    config: any,
  ) {
    if (!discordjs) throw new Error("DiscordJS not in dependancies")
    const module = new ReadyNode(discordjs, config);
    module.discord.registerModule(module)
    return module;
  }
}

export default ReadyNode;
