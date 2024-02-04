/**
* @format
* -----
* Project: @eventiva/eventiva
* File: default_logging.node.runtime.ts
* Path: \projects\bots\packages\default_logging\default_logging.node.runtime.ts
* Created Date: Saturday, February 3rd 2024
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
* LICENSE: GNU General Public License v2.0 or later (GPL-2.0-or-later)
* -----
* This program has been provided under confidence of the copyright holder and
* is licensed for copying, distribution and modification under the terms
* of the GNU General Public License v2.0 or later (GPL-2.0-or-later) published as the License,
* or (at your option) any later version of this license.
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License v2.0 or later for more details.
* You should have received a copy of the GNU General Public License v2.0 or later
* along with this program. If not, please write to: jonathan@resnovas.com,
* or see https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html
* -----
* This project abides by the GPL Cooperation Commitment.
* Before filing or continuing to prosecute any legal proceeding or claim
* (other than a Defensive Action) arising from termination of a Covered
* License, we commit to extend to the person or entity ('you') accused
* of violating the Covered License the following provisions regarding
* cure and reinstatement, taken from GPL version 3.
* For further details on the GPL Cooperation Commitment please visit
* the official website: https://gplcc.github.io/gplcc/
* -----
* DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
*/


import DiscordjsAspect, { Event, Command, DiscordJsModule, DiscordjsNode, Resources } from '@eventiva/bots.aspects.discordjs';
import type { DefaultLoggingConfig } from './default_logging-config.js';


/**
 * Represents a node in the DefaultLogging Aspect of a Discord.js application. This node handles the 'default_logging' event and logs a message with the client's user information upon initialization.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class
 */
export class DefaultLoggingNode extends DiscordJsModule<DefaultLoggingConfig> {
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
      name: "ready",
      once: true,
      async execute(this: DefaultLoggingNode, client) {
        client.emit("info", `Logged in as ${client.user.tag} at ${new Date().toLocaleString()}`)
      }
    },
    trace: {
      name: "trace",
      once: false,
      async execute(this: DefaultLoggingNode, message: string) {
        this.log.trace(message)
      }
    },
    debug: {
      name: "debug",
      once: false,
      async execute(this: DefaultLoggingNode, message: string) {
        this.log.debug(message)
      }
    },
    info: {
      name: "info",
      once: false,
      async execute(this: DefaultLoggingNode, message: string) {
        this.log.info(message)
      }
    },
    warn: {
      name: "warn",
      once: false,
      async execute(this: DefaultLoggingNode, message: string) {
        this.log.warn(message)
      }
    }, 
    fatal: {
      name: "fatal",
      once: false,
      async execute(this: DefaultLoggingNode, message: string) {
        if ('fatal' in this.log)  return this.log.fatal(message)
        return this.log.error(message)
      }
    },
    alert: {
      name: "alert",
      once: false,
      async execute(this: DefaultLoggingNode, message: string) {
        if ('alert' in this.log)  return this.log.alert(message) 
        return this.log.error(message)
      }
    },
    emergency: {
      name: "emergency",
      once: false,
      async execute(this: DefaultLoggingNode, message: string) {
        if ('emergency' in this.log)  return this.log.emergency(message)
        return this.log.error(message)
      }
    }
  };

  /**
   * Registers events for the Discord client.
   * Returns the object itself after registering the events.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   * @returns Registers events for the current instance of the application.
   */
  public registerEvents(reload?: true) {
    this.discord.registerEvent(this, [
      this.resources.ready,
      this.resources.trace,
      this.resources.debug,
      this.resources.info,
      this.resources.warn,
      this.resources.fatal,
      this.resources.alert,
      this.resources.emergency
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
    this.discord.registerCommand(this, [
      // add any commands here
    ] as Command[])
    return this;
  }

  /**
   * An array of dependencies required by the current module. The elements of the array are instances of the DiscordjsAspect class.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   */
  static dependencies = [DiscordjsAspect];

  /**
   * The default configuration for the DefaultLogging class. It is an empty object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   */
  static defaultConfig: DefaultLoggingConfig = {
    name: "default_logging",
    logger: {
      level: "info",
    }
  };

  /**
 * Creates a provider for the given DiscordjsNode and DefaultLoggingConfig.
 * The provider registers the default_logging event using the given DiscordjsNode and configures it with the provided DefaultLoggingConfig.
 * @param discordjs The DiscordjsNode instance to use.
 * @param config The DefaultLoggingConfig instance to use.
 * @returns The created DefaultLoggingNode instance.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @static
 * @async
 * @param param0
 * @param param0.discordjs
 * @param config The configuration object for the DefaultLoggingNode.
 * @returns This function is a static async provider that takes in a DiscordjsNode instance and a DefaultLoggingConfig object. It creates a new DefaultLoggingNode instance using the discordjs and config parameters. It then registers the 'default_logging' event using the default_logging.resource property. It returns the created DefaultLoggingNode instance.
 */
  static async provider(
    [discordjs]: [DiscordjsNode|undefined],
    config: DefaultLoggingConfig,
  ) {
    if (!discordjs) throw new Error("DiscordJS not in dependencies")
    const module = new DefaultLoggingNode(discordjs, config);
    module.log.trace(module.discord.i18n.t("discord:modules.registering", { name: module.name }))
    module.discord.registerModule(module)
    module.log.trace(module.discord.i18n.t("discord:modules.registered", { name: module.name }))
    return module;
  }
}

export default DefaultLoggingNode;
