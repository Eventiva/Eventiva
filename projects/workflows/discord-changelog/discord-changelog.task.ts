/*
 * Project: Eventiva
 * File: discord-changelog.task.ts
 * Last Modified: 06/09/2024, 16:21
 *
 * Contributing: Please read through our contributing guidelines. Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0. Please interact in ways that contribute to an open,
 * welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution and
 * modification under the terms of the Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT) published as the License, or
 * (at your option) any later version of this license. You must not move, change, disable, or circumvent the license key functionality
 * in the Software; or modify any portion of the Software protected by the license key to: enable access to the protected
 * functionality without a valid license key; or remove the protected functionality.This program is distributed in the hope that it will
 * be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the Fair Core License, Version 1.0, MIT Future License for more details. You should have received a
 * copy of the Fair Core License, Version 1.0, MIT Future License along with this program. If not, please write to:
 * licensing@eventiva.co.uk, see the official website https://fcl.dev/ or Review the GitHub repository
 * https://github.com/keygen-sh/fcl.dev/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before filing
 * or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from termination of a Covered
 * License, we commit to adhering to the Eventiva Cooperation Commitment. You should have received a copy of the Eventiva
 * Cooperation Commitment along with this program. If not, please write to: licensing@eventiva.co.uk, or see
 * https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import { ChangelogResult } from '@eventiva/workflows.generate-changelog'
import { BuildContext, BuildTask, BuiltTaskResult, ComponentResult, TaskHandler } from '@teambit/builder'
import { EnvContext } from '@teambit/envs'
import { sendToDiscord, SendToDiscordConfig } from './discord-changelog.js'

export class DiscordChangelog
    implements BuildTask {
    readonly name = 'DiscordChangelog'

    constructor (
        private readonly config: SendToDiscordConfig,
        readonly aspectId: string = 'eventiva.workflows/generate-changelog'
    ) {
    }

    static from ( options: SendToDiscordConfig = {
        name: 'GenerateChangelogTask',
        channelId: process.env.CHANGELOG_ID as string,
        authorName: 'Eventiva Software Delivery Change Manager',
        config: {
            features: {
                title: 'Features, Enhancements & Deprecations',
                description: 'Features & enhancements refer to new functions added to make our software more useful and'
                    + ' efficient, or improvements made to existing functions to enhance your user experience.',
                color: null,
                included: [
                    'feat',
                    'remove',
                    'revert'
                ]
            },
            patches: {
                title: 'Patches',
                description:
                    'Patches are small updates that fix issues, enhance performance, and ensure the smooth running'
                    + ' of our software without changing its core functions.',
                color: null,
                included: [
                    'fix'
                ]
            },
            refactors: {
                title: 'Refactors',
                description:
                    'Refactors refer to internal code modifications to improve efficiency and readability, without altering the'
                    + ' software\'s external behavior.',
                color: null,
                included: [
                    'maint',
                    'style',
                    'refactor',
                    'pref',
                    'deprecate'
                ]
            },
            misc: {
                title: 'Miscellaneous',
                description:
                    'Miscellaneous includes assorted updates, minor adjustments, and changes that do not specifically'
                    + ' fall into other major categories like patches, features, enhancements, or refactors.',
                color: null,
                included: [
                    'build',
                    'chore',
                    'ci',
                    'docs',
                    'test'
                ]
            }
        }
    } ): TaskHandler {
        const name = options?.name || 'GenerateChangelogTask'
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const handler = ( context: EnvContext ) => {
            return new DiscordChangelog( options )
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


        context.previousTasksResults.filter( task => task.task.aspectId === 'eventiva.workflows/generate-changelog' )[ 0 ].componentsResults.forEach(
            ( component ) => {
                // Prepare an 'errors' array to report back of any errors during execution (this will be part of the 'Component Results' data)
                const errors: Error[] = []
                try {
                    if ( !component.metadata ) {
                        return
                    }
                    const changelogResult = component.metadata.changelogResult as ChangelogResult
                    sendToDiscord( changelogResult, this.config )

                } catch ( err: any ) {
                    errors.push( err )
                }
                componentsResults.push( { component: component.component, errors } )
            } )

        return {
            componentsResults
        }
    }
}
