/*
 * Project: Eventiva
 * File: mikro.node.runtime.ts
 * Last Modified: 4/2/24, 2:00 AM
 *
 * Contributing: Please read through our contributing guidelines.
 * Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0
 * Please interact in ways that contribute to an open, welcoming, diverse,
 * inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution
 * and modification under the terms of the Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * published as the License, or (at your option) any later version of this license. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the Functional Source License, Version 1.1, MIT Future License for more
 * details. You should have received a copy of the Functional Source License, Version 1.1, MIT Future License along
 * with this program. If not, please write to: licensing@eventiva.co.uk, see the official website
 * https://fsl.software/ or Review the GitHub repository https://github.com/getsentry/fsl.software/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before
 * filing or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from
 * termination of a Covered License, we commit to adhering to the Eventiva Cooperation Commitment. You should have
 * received a copy of the Eventiva Cooperation Commitment along with this program. If not, please write to:
 * licensing@eventiva.co.uk, or see https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import { EntityManager, MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import type { MikroConfig } from './mikro-config.js'

/**
 * A class representing a MikroNode in a system.
 * An array of dependencies required by the class. This property is static and its value is an array containing references to the CentralPlatformAspect class.
 * The default configuration object for the mikro. It is an instance of MikroConfig and is initialized as an empty object.
 * Creates and returns a new instance of MikroNode using the provided config. The MikroNode instance is wrapped in a Promise and returned.
 *
 * @export
 * @class MikroNode

 */
export class MikroNode {
    /**
     * An array of dependencies required by the class. This property is static and its value is an array containing references to the CentralPlatformAspect class.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @static
     */
    static readonly dependencies = []

    /**
     * The default configuration object for the mikro. It is an instance of MikroConfig and is initialized as an empty object.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @static
     */
    static readonly defaultConfig: MikroConfig = {
        driver: PostgreSqlDriver,
        dbName: 'sqlite.db',
        // // folder-based discovery setup, using common filename suffix
        // entities: ['dist/**/*.entity.js'],
        // entitiesTs: ['src/**/*.entity.ts'],
        // we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
        // check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
        metadataProvider: TsMorphMetadataProvider,
        // enable debug mode to log SQL queries and discovery information
        debug: true
    }

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
     * Creates an instance of MikroNode.
     *
     * @constructor
     * @param {MikroConfig} config The mikro configuration
     */
    constructor (
        private config: MikroConfig
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
    public get entityManager () {
        return this.em.fork()
    }

    /**
     * Returns whether the property is initialised or not.
     *
     * @public
     * @readonly
     * @type {boolean}
     */
    public get isInitialised () {
        return this.initialised
    }

    static async provider (
        // eslint-disable-next-line no-empty-pattern
        []: [],
        config: MikroConfig
    ) {
        const mikro = new MikroNode( config )

        return mikro
    }

    /**
     * Initializes the function privately.
     *
     * @private
     * @returns {*} Initializes the private properties and state of the object.
     */
    private async initialise () {
        this.orm = await MikroORM.init( this.config )

        this.em = this.orm.em
        this.initialised = true
    }
}

export default MikroNode
