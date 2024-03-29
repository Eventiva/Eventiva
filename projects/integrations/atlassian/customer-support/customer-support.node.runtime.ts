/*
 * Project: Eventiva
 * File: customer-support.node.runtime.ts
 * Last Modified: 3/29/24, 4:54 PM
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

import { DiscordJSAspect, type DiscordJSNode } from '@eventiva/discordjs.discordjs'
import type { CustomerSupportConfig } from './customer-support-config.js'


/**
 * This class represents an Atlassian Customer Support node. It is responsible for providing support for Atlassian customers through Discord. It depends on the DiscordJSNode class and requires a config object of type CustomerSupportConfig.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class
 */
export class CustomerSupportNode {
    /**
     * An array of dependencies for the static property. It includes only DiscordJSAspect.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @static
     */
    static dependencies = [ DiscordJSAspect ]

    /**
     * A static property that represents the default configuration for the CustomerSupportConfig. It is an empty object by default.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @static
     */
    static defaultConfig: CustomerSupportConfig = {}

    /**
     * A private property that holds an instance of the Discord.js client for interacting with the Discord API.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @private
     */
    private discordjs: DiscordJSNode

    /**
     * Creates an instance of CustomerSupportNode.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @constructor
     * @param param0 The Discord.js module.
     */
    constructor (
        [ discordjs ]: [ DiscordJSNode ]
        // private config: CustomerSupportConfig
    ) {
        this.discordjs = discordjs
    }

    /**
     * Creates a new instance of CustomerSupportNode and returns it.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @static
     * @async
     * @param param0 An instance of Discord.js client
     * @returns This function is a provider function that creates a new instance of the CustomerSupportNode class with the given DiscordJSNode instance and config. It then calls the listCommands method on the CustomerSupportNode instance. Finally, it returns the created CustomerSupportNode instance.
     */
    static async provider (
        [ discordjs ]: [ DiscordJSNode ]
        // config: CustomerSupportConfig
    ) {
        const customerSupport = new CustomerSupportNode(
            [ discordjs ]
            // config
        )

        customerSupport.discordjs.listCommands()

        return customerSupport
    }
}

export default CustomerSupportNode
