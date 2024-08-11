/*
 * Project: Eventiva
 * File: style.dictionary.task.ts
 * Last Modified: 11/08/2024, 23:34
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
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { default as SD } from 'style-dictionary'
import type { Config, DesignTokens } from 'style-dictionary/types'

export type StyleDictionaryResult = {}

type StyleDictionaryOptions = {
    name?: string
    aspectId?: string
}

export class StyleDictionary
    implements BuildTask {

    constructor (
        readonly aspectId: string = 'eventiva.workflows/style-dictionary',
        readonly name = 'StyleDictionaryTask',
        readonly configPath: string = './style-dictionary.config.js'
    ) {
    }

    static from (
        configPath?: string,
        options?: StyleDictionaryOptions
    ): TaskHandler {
        const name = options?.name || 'StyleDictionaryTask'
        const aspectId: string = options?.aspectId ?? 'eventiva.workflows/style-dictionary'

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const handler = ( context: EnvContext ) => {
            return new StyleDictionary( aspectId, name, configPath )
        }
        return {
            name,
            handler
        }
    }

    async execute ( context: BuildContext ): Promise<BuiltTaskResult> {
        const errors: Error[] = []
        const componentsResults: ComponentResult[] = []

        const tailwindMeta = context.previousTasksResults.filter( task => task.task.aspectId === 'eventiva.workflows/tailwind-to-style-dictionary' )[ 0 ].componentsResults

        for ( const component of context.components ) {

            try {
                const capsule = context.capsuleNetwork.seedersCapsules.find( value => value.component.displayName === component.displayName )

                if ( !capsule ) {
                    errors.push( new Error( `Capsule not found for ${ component.displayName }` ) )
                    continue
                }

                const configFile = path.join( capsule.path, './dist', this.configPath )

                console.log( `Config File: `, configFile )

                const configFileUrl = pathToFileURL( configFile )

                const styleConfigFile: Config = ( await import( configFileUrl.href ) ).config( component.mainFile.dirname )

                if ( !styleConfigFile ) {
                    console.log( 'Skipping: ', component.displayName, ' - no config found.' )
                    continue
                }

                const tailwindTokens: DesignTokens = tailwindMeta.find( value => value.component.displayName === component.displayName )?.metadata?.t2sd

                console.log( tailwindTokens )

                const sd = new SD( {
                    ...styleConfigFile,
                    tokens: tailwindTokens
                } )

                await sd.buildAllPlatforms()

            } catch ( err: any ) {
                console.log( err )
                errors.push( err )
            }

            componentsResults.push( {
                component,
                errors
            } )
        }


        return {
            componentsResults
        }
    }
}
