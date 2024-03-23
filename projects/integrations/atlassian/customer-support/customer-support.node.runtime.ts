/*
 * Project: Eventiva
 * File: customer-support.node.runtime.ts
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/23/24, 11:56 PM
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
 * along with this program. If not, please write to: licensing@eventiva.co.uk,
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

import { DiscordjsAspect, type DiscordjsNode } from '@eventiva/discordjs.discordjs'
import type { CustomerSupportConfig } from './customer-support-config.js'


/**
 * This class represents an Atlassian Customer Support node. It is responsible for providing support for Atlassian customers through Discord. It depends on the DiscordjsNode class and requires a config object of type CustomerSupportConfig.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class
 */
export class CustomerSupportNode {
  /**
   * A private property that holds an instance of the Discord.js client for interacting with the Discord API.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @private
   */
  private discordjs: DiscordjsNode
  /**
   * Creates an instance of CustomerSupportNode.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param param0 The Discord.js module.
   * @param param0.discordjs An instance of the Discord.js Node module.
   * @param config The configuration for Atlassian Customer Support.
   */
  constructor(
    [discordjs]: [DiscordjsNode],
    private config: CustomerSupportConfig,
  ) {
    this.discordjs = discordjs
  }

  /**
   * An array of dependencies for the static property. It includes only DiscordjsAspect.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   */
  static dependencies = [DiscordjsAspect];

  /**
   * A static property that represents the default configuration for the CustomerSupportConfig. It is an empty object by default.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   */
  static defaultConfig: CustomerSupportConfig = {};

  /**
   * Creates a new instance of CustomerSupportNode and returns it.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   * @async
   * @param param0 An instance of Discord.js client
   * @param param0.discordjs An instance of Discord.js client
   * @param config The configuration object for the Atlassian Customer Support module
   * @returns This function is a provider function that creates a new instance of the CustomerSupportNode class with the given DiscordjsNode instance and config. It then calls the listCommands method on the CustomerSupportNode instance. Finally, it returns the created CustomerSupportNode instance.
   */
  static async provider(
    [discordjs]: [DiscordjsNode],
    config: CustomerSupportConfig,
  ) {
    const customerSupport = new CustomerSupportNode([discordjs], config);

    customerSupport.discordjs.listCommands()

    return customerSupport;
  }
}

export default CustomerSupportNode;
