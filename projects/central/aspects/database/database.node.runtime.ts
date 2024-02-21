/**
* @format
* -----
* Project: database
* File: database.node.runtime.ts
* Path: \database.node.runtime.ts
* Created Date: Friday, February 16th 2024
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

import type { DatabaseConfig } from './database-config.js';
import { PrismaClient } from '@prisma/client';
import { enhance } from '@zenstackhq/runtime';

/**
 * This class represents a node in a database.
 * The node is created with a given configuration.
 * It has a static property 'dependencies' which is an array of dependencies of type 'CentralPlatformAspect'.
 * It also has a static property 'defaultConfig' which is of type 'DatabaseConfig' and is set to an empty object by default.
 * The 'provider' method is an async method that creates a new instance of 'DatabaseNode' with the given configuration and returns it.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class
 */
export class DatabaseNode {
  /**
   * The Prisma Client instance used to interact with the database. It is instantiated as a private property.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @private
   */
  private prisma = new PrismaClient();
  /**
   * The property `db` is a public property that is enhanced using the function `enhance`. It is initialized with the value `enhance(this.prisma)`, where `this.prisma` is a reference to the `prisma` object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   */
  public db = enhance(this.prisma);

  /**
   * Creates an instance of DatabaseNode.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param config The configuration object for the database.
   */
  constructor(
    private config: DatabaseConfig,
  ) {}
  
  /**
   * An array of dependencies required by the class. This property is static and its value is an array containing references to the CentralPlatformAspect class.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   */
  static dependencies = [];

  /**
   * The default configuration object for the database. It is an instance of DatabaseConfig and is initialized as an empty object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   */
  static defaultConfig: DatabaseConfig = {};

  /**
   * Creates and returns a new instance of DatabaseNode using the provided config. The DatabaseNode instance is wrapped in a Promise and returned.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   * @async
   * @param param0 The CentralPlatformNode parameter
   * @param param0.CentralPlatform The CentralPlatform instance
   * @param config The DatabaseConfig parameter
   * @returns Creates a database instance based on the given configuration and returns it.
   */
  static async provider(
    []: [],
    config: DatabaseConfig,
  ) {
    const database = new DatabaseNode(config);

    return database;
  }
}

export default DatabaseNode;
