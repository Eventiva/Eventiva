/*
 * Project: Eventiva
 * File: node.bit-env.ts
 * Last Modified: 29/07/2024, 18:55
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

/**
 * this env extends the Bit official Harmony environment.
 * learn more: https://bit.cloud/bitdev/harmony/harmony-env
 */
import { HarmonyEnv } from '@bitdev/harmony.harmony-env'
import { NodeAppTemplate, NodeEnvTemplate, NodeModuleTemplate } from '@bitdev/node.generators.node-templates'
import { HarmonyWorkspaceStarter } from '@bitdev/symphony.generators.symphony-starters'
import { Generator } from '@eventiva/envs.generator'
import { DiscordChangelog } from '@eventiva/workflows.discord-changelog'
import { GenerateChangelogTask } from '@eventiva/workflows.generate-changelog'
import { Pipeline } from '@teambit/builder'
import { StarterList } from '@teambit/generator'

export class NodeEnv
    extends HarmonyEnv {
    /* shorthand name for the environment */
    name = 'Eventiva Node Environment'

    generators () {
        return Generator( {
            templates: [
                NodeEnvTemplate.from(),
                NodeModuleTemplate.from(),
                // PlatformTemplate.from(),
                NodeAppTemplate.from()
                // ExpressAppTemplate.from(),
                // BitAppTemplate.from(),
                // GraphQLServerTemplate.from()
            ]
        } )
    }

    starters () {
        return StarterList.from( [
            HarmonyWorkspaceStarter.from()
        ] )
    }

    snap () {
        return Pipeline.from( [] )
    }

    tag () {
        return Pipeline.from( [
            GenerateChangelogTask.from(),
            DiscordChangelog.from()
        ] )
    }
}

export default new NodeEnv()
