/*
 * Project: Eventiva
 * File: generate-changelog.task.ts
 * Last Modified: 4/2/24, 12:41 AM
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

export type ChangelogResult = {
    moduleName: string
    latestTag?: string
    releaseDate?: string
    changes: {
        [ changeType: string ]: ChangeField[]
    }
}

export type ChangeField = {
    name: string
    value: string
}

type GenerateChangelogOptions = {
    name: string
}

export class GenerateChangelogTask
    implements BuildTask {
    readonly name = 'GenerateChangelogTask'

    constructor (
        readonly aspectId: string = 'eventiva.workflows/generate-changelog'
    ) {
    }

    static from ( options?: GenerateChangelogOptions ): TaskHandler {
        const name = options?.name || 'GenerateChangelogTask'
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const handler = ( context: EnvContext ) => {
            return new GenerateChangelogTask()
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

        // eslint-disable-next-line no-restricted-syntax
        for ( const component of context.components ) {
            const errors: Error[] = []
            const metadata: {
                [ key: string ]: any;
                changelogResult?: ChangelogResult;
            } = {}
            try {
                // eslint-disable-next-line no-await-in-loop
                const logs = await component.getLogs()
                let tagCount = 0
                metadata.changelogResult = logs.reverse().reduce( (
                    agg,
                    curr,
                    _index,
                    array
                ) => {
                    const returnableAgg = agg
                    if ( curr.tag ) {
                        if ( tagCount === 1 ) {
                            array.splice( 1 )
                            return returnableAgg
                        } // this will terminate the iteration
                        // set the current tag for use in the changelog
                        returnableAgg.latestTag = curr.tag
                        const date = new Date( parseInt( curr.date!, 10 ) ?? Date.now() )
                        const [ releaseDate ] = date.toISOString().split( 'T' )
                        returnableAgg.releaseDate = releaseDate
                        tagCount += 1
                    }

                    const commitType = curr.message.split( ':' )[ 0 ]

                    // todo refactor to make this configurable - string join maybe?!
                    if ( /(fix:|feat:|build:|maint:|chore:|ci:|docs:|style:|refactor:|pref:|test:|remove:|revert:|deprecate:)/.test(
                        `${ commitType }:` ) ) {

                        const [ title, message ] = curr.message.split( '\n' )

                        // Create a changeField object
                        const change = {
                            name: `- ${ title } - ${ curr.username }`,
                            value: message
                        } as ChangeField

                        // If the changes object does not have a field of commitType, create one
                        if ( !returnableAgg.changes ) {
                            returnableAgg.changes = {}
                        }
                        if ( !returnableAgg.changes[ commitType ] ) {
                            returnableAgg.changes[ commitType ] = []
                        }
                        // Add the changeField object to the changes under the commitType field
                        returnableAgg.changes[ commitType ].push( change )
                    }
                    return returnableAgg
                }, {
                    moduleName: component.displayName,
                    changes: {}
                } as ChangelogResult )
            } catch ( err: any ) {
                errors.push( err )
            }
            componentsResults.push( { component, metadata, errors } )
        }
        return {
            componentsResults
        }
    }
}
