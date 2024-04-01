/*
 * Project: Eventiva
 * File: discord-changelog.task.ts
 * Last Modified: 4/1/24, 4:02 PM
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

import { BuildContext, BuildTask, BuiltTaskResult, ComponentResult, TaskHandler } from '@teambit/builder'
import { EnvContext } from '@teambit/envs'

type DiscordChangelogOptions = {
    name: string
}

export class DiscordChangelog
    implements BuildTask {
    readonly name = 'DiscordChangelog'

    constructor (
        readonly aspectId: string = 'eventiva.workflows/generate-changelog'
    ) {
    }

    static from ( options?: DiscordChangelogOptions ): TaskHandler {
        const name = options?.name || 'GenerateChangelogTask'
        const handler = ( context: EnvContext ) => {
            return new DiscordChangelog()
        }
        return {
            name,
            handler
        }
    }

    async execute ( context: BuildContext ): Promise<BuiltTaskResult> {
        // Prepare the component results array which will be used to report back the components processed
        // as well as any additional data regarding this build task execution
        const componentsResults: ComponentResult[] = []

        context.components.forEach( ( component ) => {
            // Prepare an 'errors' array to report back of any errors during execution (this will be part of the 'Component Results' data)
            const errors: Error[] = []

            try {
                // this will be added shortly
            } catch ( err: any ) {
                errors.push( err )
            }
            componentsResults.push( { component, errors } )
        } )

        return {
            artifacts: [
                {
                    generatedBy: this.aspectId,
                    name: this.name,
                    // The glob pattern for artifacts to include in the component version
                    globPatterns: [ '**/*.my-artifact.txt' ]
                }
            ],
            componentsResults
        }
    }
}
