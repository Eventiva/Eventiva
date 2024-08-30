/*
 * Project: Eventiva
 * File: postgres.node.runtime.ts
 * Last Modified: 29/08/2024, 10:24
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

import { DockerProviderAspect } from '@eventiva/deployers.terraform.docker.provider'
import { SymphonyAspect, SymphonyNode } from '@eventiva/deployers.terraform.symphony'
import { Construct } from 'constructs'
import type { PostgresConfig } from './postgres-config.js'


export class DockerPostgresNode
    extends Construct {
    static dependencies = [
        SymphonyAspect,
        DockerProviderAspect
    ]
    static defaultConfig: PostgresConfig = {
        name: 'dockerProvider'
    }

    constructor (
        private scope: Construct,
        private id: string,
        private config: PostgresConfig
    ) {
        super( scope, id )

    }

    static async provider (
        [ symphonyNode ]: [ SymphonyNode ],
        config: PostgresConfig
    ) {
        symphonyNode.registerConstructs( [
            {
                name: config.name,
                config: config,
                node: (
                    scope: Construct,
                    id: string,
                    config: PostgresConfig
                ) => {
                    return new DockerPostgresNode( scope, id, config )
                }
            }
        ] )
    }
}

export default DockerPostgresNode
