/*
 * Project: Eventiva
 * File: tailwind-to-style-dictionary.ts
 * Last Modified: 09/08/2024, 00:06
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
import type { DesignTokens } from 'style-dictionary/types'
import resolveConfig from 'tailwindcss/resolveConfig'
import type { Config as TailwindConfig } from 'tailwindcss/types/config.js'

export type T2sdResult = {}

type TailwindToStyleDictionaryOptions = {
    name?: string,
    aspectId?: string
}

export class TailwindToStyleDictionary
    implements BuildTask {

    constructor (
        readonly aspectId: string = 'eventiva.workflows/tailwind-to-style-dictionary',
        readonly name = 'TailwindToStyleDictionary',
        readonly configPath: string = './tailwind.config.js'
    ) {
    }

    static from (
        configPath?: string,
        options?: TailwindToStyleDictionaryOptions
    ): TaskHandler {
        const name = options?.name ?? 'TailwindToStyleDictionary'
        const aspectId: string = options?.aspectId ?? 'eventiva.workflows/tailwind-to-style-dictionary'
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const handler = ( context: EnvContext ) => {
            return new TailwindToStyleDictionary( aspectId, name, configPath )
        }
        return {
            name,
            handler
        }
    }

    async execute ( context: BuildContext ): Promise<BuiltTaskResult> {
        const componentsResults: ComponentResult[] = []

        for ( const component of context.components ) {
            const errors: Error[] = []
            const tokens: DesignTokens = {}

            try {

                const configFile = path.join( component.mainFile.dirname, this.configPath )

                if ( !component.filesystem.existsSync( configFile ) ) {
                    continue
                }

                const tailwindConfig: TailwindConfig = await import( configFile )

                const { theme } = resolveConfig( tailwindConfig )

                // A helper function that inserts a value at the correct position in the tokens object, creating the required structure if it doesn't exist.
                const addToTokensObject = (
                    position: string[],
                    value: any
                ) => {
                    let current = tokens
                    for ( let i = 0; i < position.length; i++ ) {
                        if ( i === position.length - 1 ) {
                            current[ position[ i ] ] = { value: value }
                        } else {
                            current[ position[ i ] ] = current[ position[ i ] ] || {}
                            current = current[ position[ i ] ] as { [ key: string ]: DesignTokens; }
                        }
                    }
                }

                // Loop over the theme data
                for ( let key in theme ) {
                    if ( !theme.hasOwnProperty( key ) ) {
                        continue
                    }

                    switch (key) {
                        case 'fontFamily':
                            // Font family data is in an array, so we create a single string for each font family.
                            for ( let fontFamilyKey in theme.fontFamily ) {
                                const typedKey = fontFamilyKey as keyof typeof theme.fontFamily

                                if ( !theme.fontFamily.hasOwnProperty( typedKey ) ) {
                                    continue
                                }
                                addToTokensObject(
                                    [ 'fontFamily', typedKey ],
                                    theme.fontFamily[ typedKey ].join( ',' )
                                )
                            }
                            break

                        case 'fontSize':
                            // Font size data contains both the font size and a recommended line-length, so we create two tokens for each font size.
                            for ( let fontSizeKey in theme.fontSize ) {
                                const typedKey = fontSizeKey as keyof typeof theme.fontSize

                                if ( !theme.fontSize.hasOwnProperty( typedKey ) ) {
                                    continue
                                }
                                addToTokensObject(
                                    [ 'fontSize', typedKey ],
                                    theme.fontSize[ typedKey ][ 0 ]
                                )
                                addToTokensObject(
                                    [ 'fontSize', `${ typedKey }--lineHeight` ],
                                    theme.fontSize[ typedKey ][ 1 ].lineHeight
                                )
                            }
                            break

                        default:
                            // For non-objects (simple key/value pairs) we can add them to our tokens object.
                            const typedKey = key as keyof typeof theme
                            let themedKeyObject: Record<string, any> = theme[ typedKey ] as Record<string, any>

                            for ( let secondLevelKey in themedKeyObject ) {

                                if ( !theme[ typedKey ].hasOwnProperty( secondLevelKey ) ) {
                                    continue
                                }

                                // If the value is not an object, add it directly to the tokens object.
                                if ( typeof themedKeyObject[ secondLevelKey ] !== 'object' ) {
                                    addToTokensObject( [ key, secondLevelKey ], themedKeyObject[ secondLevelKey ] )
                                } else {
                                    // Skip 'raw' CSS media queries.
                                    if ( themedKeyObject[ secondLevelKey ].raw !== undefined ) {
                                        continue
                                    }

                                    // For objects (like color shades) we need to add everything in the correct format.
                                    for ( let thirdLevelKey in themedKeyObject[ secondLevelKey ] ) {
                                        if ( !themedKeyObject[ secondLevelKey ].hasOwnProperty( thirdLevelKey ) ) {
                                            continue
                                        }
                                        addToTokensObject(
                                            [ typedKey, secondLevelKey, thirdLevelKey ],
                                            themedKeyObject[ secondLevelKey ][ thirdLevelKey ]
                                        );
                                    }
                                }
                            }
                    }
                }
            } catch ( err: any ) {
                errors.push( err )
            }

            componentsResults.push( { component, errors } )
        }

        return {
            componentsResults
        }
    }
}
