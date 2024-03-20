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
import { MikroORM, EntityManager, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

/**
 * A class representing a DatabaseNode in a system.
 * An array of dependencies required by the class. This property is static and its value is an array containing references to the CentralPlatformAspect class.
 * The default configuration object for the database. It is an instance of DatabaseConfig and is initialized as an empty object.
 * Creates and returns a new instance of DatabaseNode using the provided config. The DatabaseNode instance is wrapped in a Promise and returned.
 *
 * @export
 * @class DatabaseNode
 * @typedef {DatabaseNode}
 */
export class DatabaseNode {
  /**
   * A boolean flag indicating whether the property has been initialised or not.
   *
   * @protected
   * @type {boolean}
   */
  protected initialised = false

  /**
   * Public property orm of type MikroORM.
   *
   * @public
   * @type {MikroORM}
   */
  private orm: MikroORM

  /**
   * A public property representing an EntityManager.
   *
   * @public
   * @type {EntityManager}
   */
  private em: EntityManager

  /**
   * Creates an instance of DatabaseNode.
   *
   * @constructor
   * @param {DatabaseConfig} config The database configuration
   */
  constructor(
    private config: DatabaseConfig,
  ) {
    this.initialise()
  }

  /**
   * A public getter function that returns a forked instance of the entityManager (em) property.
   *
   * @public
   * @readonly
   * @type {*}
   */
  public get entityManager() {
    return this.em.fork()
  }

  /**
   * Initializes the function privately.
   *
   * @private
   * @returns {*} Initializes the private properties and state of the object.
   */
  private async initialise() {
    this.orm = await MikroORM.init(this.config)
    if (process.env.NODE_ENV == 'dev') await this.orm.schema.refreshDatabase();
    this.em = this.orm.em
    this.initialised = true
  }

  /**
   * Returns whether the property is initialised or not.
   *
   * @public
   * @readonly
   * @type {boolean}
   */
  public get isInitialised() {
    return this.initialised
  }

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
  static defaultConfig: DatabaseConfig = {
    driver: PostgreSqlDriver,
    dbName: 'sqlite.db',
    // // folder-based discovery setup, using common filename suffix
    // entities: ['dist/**/*.entity.js'],
    // entitiesTs: ['src/**/*.entity.ts'],
    // we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
    // check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
    metadataProvider: TsMorphMetadataProvider,
    // enable debug mode to log SQL queries and discovery information
    debug: true,
  };

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
