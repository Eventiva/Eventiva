/**
* @format
* -----
* Project: @eventiva/eventiva
* File: ping-command.node.runtime.ts
* Path: \projects\bots\aspects\ping-command\ping-command.node.runtime.ts
* Created Date: Sunday, February 4th 2024
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
import type { PingCommandConfig } from './ping-command-config.js';
import { Endpoint, EndpointSlot } from './endpoint.js';

/**
 * This class represents a Ping command node.
 * The Ping command node is responsible for registering and listing endpoints.
 * Example usage:
 * ```ts
 * const config: PingCommandConfig = {...};
 * const endpointSlot: EndpointSlot = {...};
 * const pingCommand = new PingCommandNode(config, endpointSlot);
 * pingCommand.registerEndpoint([...]);
 * pingCommand.listEndpoints();
 * ```
 * 
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class
 */
export class PingCommandNode extends DiscordJsModule<PingCommandConfig> {
  /**
   * Creates an instance of PingCommandNode.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param config The configuration object for the PingCommand
   * @param endpointSlot The endpoint slot for the PingCommand
   */
  constructor(
    public discord: DiscordjsNode,
    protected config: PingCommandConfig,
    private endpointSlot: EndpointSlot,
  ) {
    super(discord, config)
  }

  /**
   * The resources property represents a collection of resources. It is a public property that has a default value of an empty object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   */
  public resources: Resources = {};

  /**
   * Registers events for this object.
   * If reload parameter is set to true, it will reload the events.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   * @param [reload]
   * @returns Registers the events for this object.
   * If the 'reload' parameter is set to true, the events will be reloaded.
   */
  public registerEvents(reload?: true) {
    this.discord.registerEvent(this, [
      // add any events here
    ] as Event<any>[])
    return this
  }

  /**
   * 
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   * @param [reload]
   * @returns Registers commands for the registered Discord instance.
   */
  public registerCommands(reload?: true) {
    this.discord.registerCommand(this, [
      // add any commands here
    ] as Command[])
    return this;
  }
  

  /**
   * Registers an array of endpoints. The endpoints will be stored in the endpoint slot. Returns the current object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @param endpoints An array of endpoints to register.
   * @returns Registers the given array of endpoints
   */
  registerEndpoint(endpoints: Endpoint[]) {
    this.endpointSlot.register(endpoints);
    return this;
  }

  /**
   * Returns a list of all endpoints.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @returns Lists all the endpoints
   */
  listEndpoints() {
    return this.endpointSlot.flatValues();
  }

  /**
   * An array that stores the dependencies of the class. It is initially empty.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   */
  static dependencies = [DiscordjsAspect];

  /**
   * The default configuration for the PingCommand. It is an object of type PingCommandConfig.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   */
  static defaultConfig: PingCommandConfig = {
    name: "Ping Command",
    logger: {
      level: "info",
    }
  };

  /**
   * Creates and returns a new instance of the PingCommandNode class with the specified configuration and endpoint slot.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   * @async
   * @param deps The dependencies of the provider function
   * @param config The configuration for the PingCommand
   * @param param0 The endpointSlot parameter
   * @param param0.endpointSlot
   * @returns This function is a provider function that creates a PingCommandNode instance with the provided configuration and endpoint slot. It returns the created PingCommandNode instance.
   */
  static async provider(
    [discordjs]: [DiscordjsNode|undefined],
    config: PingCommandConfig,
    [endpointSlot]: [EndpointSlot]
  ) {
    if (!discordjs) throw new Error("DiscordJS not in dependencies")
    const module = new PingCommandNode(discordjs, config, endpointSlot);

    module.log.trace(module.discord.i18n.t("discord:modules.registering", { name: module.name }))
    module.discord.registerModule(module)
    module.log.trace(module.discord.i18n.t("discord:modules.registered", { name: module.name }))
    return module;
  }
}

export default PingCommandNode;
