/*
 * Project: Eventiva
 * File: style.dictionary.task.ts
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

import { BuildContext, BuildTask, BuiltTaskResult, ComponentResult, TaskHandler } from '@teambit/builder'
import { EnvContext } from '@teambit/envs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { default as SD } from 'style-dictionary'
import type { Config, DesignTokens, PreprocessedTokens, Preprocessor } from 'style-dictionary/types'

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

                const fixNamesProcessor: Preprocessor = {
                    name: 'fix-prop-names',
                    preprocessor: async (
                        dictionary,
                        options
                    ): Promise<PreprocessedTokens> => {
                        function deepCopy ( obj: unknown ): unknown {
                            if ( typeof obj !== 'object' || obj === null ) {
                                // Return if not object or if it's null
                                return obj
                            }
                            if ( Array.isArray( obj ) ) {
                                // Copy array
                                return obj.map( ( value ) => deepCopy( value ) )
                            }

                            // If object, then copy each property
                            const copy: any = {}
                            for ( const propName in obj ) {
                                if ( obj.hasOwnProperty( propName ) ) {
                                    copy[ propName ] = deepCopy( ( obj as any )[ propName ] )
                                }
                            }
                            return copy
                        }

                        function deepReplace ( obj: PreprocessedTokens ): void {
                            // Iterate over each property in the object
                            for ( const propName in obj ) {
                                if ( !obj.hasOwnProperty( propName ) ) {
                                    continue
                                }

                                // Check if the property name includes a slash
                                if ( propName.includes( '/' ) ) {
                                    // Replace the slash with an underscore
                                    const newPropName = propName.replace( '/', '_' ) + 'fraction'
                                    // Assign the property value to the new key
                                    obj[ newPropName ] = deepCopy( obj[ propName ] )  // Copy the content to the new key
                                    // Delete the old key
                                    delete obj[ propName ]
                                }

                                // If given property is an object or has "name" field, apply changes recursively
                                if ( typeof obj[ propName ] === 'object' && obj[ propName ] !== null ) {
                                    deepReplace( obj[ propName ] )
                                }
                                if ( ( obj[ propName ] )?.name && ( obj[ propName ] ).name.includes( '/' ) ) {
                                    ( obj[ propName ] ).name = ( obj[ propName ] ).name.replace(
                                        '/',
                                        '_'
                                    ) + 'fraction'
                                }
                            }
                        }

                        if ( options.log.verbosity === 'verbose' ) {
                            console.log(
                                'Deep fixing fraction names from tailwind' )
                        }
                        deepReplace( dictionary )
                        return dictionary
                    }
                }

                SD.registerPreprocessor( fixNamesProcessor )

                const sd = new SD( {
                    ...styleConfigFile,
                    tokens: tailwindTokens,
                    preprocessors: [
                        'fix-prop-names'
                    ]
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
