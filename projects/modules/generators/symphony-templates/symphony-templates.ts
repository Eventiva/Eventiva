/*
 * Project: Eventiva
 * File: symphony-templates.ts
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/25/24, 1:51 AM
 * -----
 * Contributing: Please read through our contributing guidelines.
 * Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 * -----
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0
 * Please interact in ways that contribute to an open, welcoming, diverse,
 * inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 * -----
 * 2024 Eventiva - All Rights Reserved
 * LICENSE: Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * -----
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution
 * and modification under the terms of the Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * published as the License, or (at your option) any later version of this license. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the Functional Source License, Version 1.1, MIT Future License for more
 * details. You should have received a copy of the Functional Source License, Version 1.1, MIT Future License along
 * with this program. If not, please write to: licensing@eventiva.co.uk, see the official website
 * https://fsl.software/ or Review the GitHub repository https://github.com/getsentry/fsl.software/
 * -----
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before
 * filing or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from
 * termination of a Covered License, we commit to adhering to the Eventiva Cooperation Commitment. You should have
 * received a copy of the Eventiva Cooperation Commitment along with this program. If not, please write to:
 * licensing@eventiva.co.uk, or see https://eventiva.co.uk/licensing/ecc
 * -----
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import { HarmonyTemplates } from '@eventiva/modules.generators.harmony-templates'
import { aspectDocsFile } from './aspect-docs'
import { browserRuntimeProvider } from './browser-runtime/browser-provider'
import { graphQLServerFile } from './node-runtime/graphql-server'
import { generateImports, getDummyMethod, nodeRuntimeProvider } from './node-runtime/node-runtime-provider'
import { SymphonyPlatformTemplate } from './symphony-platform/symphony-platform-template'
import { SymphonyTemplatesOptions } from './symphony-templates-options'

/**
 * Creates Symphony templates with the provided options. It includes specified options and overrides default values as needed. The function returns Harmony templates with the Symphony-specific configurations applied such as platformName, docsFile, disableHarmonyPlatform, harmonyEnvId, templates, and runtimes.
 *
 * @export
 * @param {SymphonyTemplatesOptions} [options={}]
 * @returns {*} Creates Symphony templates by extending HarmonyTemplates with Symphony specific configurations and templates.
 */
export function SymphonyTemplates ( options: SymphonyTemplatesOptions = {} ) {
    return HarmonyTemplates( {
        ...options, // include the options to ensure they are always applied then override with the below

        platformName: options.platformName ?? 'symphony-platform',

        docsFile: options.docsFile ?? aspectDocsFile,

        disableHarmonyPlatform: options.disableHarmonyPlatform ?? true,

        harmonyEnvId: options.symphonyEnvId,

        templates: [
            ...( options.templates ?? [] ), // include the options templates if any
            SymphonyPlatformTemplate.from( { env: options.symphonyEnvId } )
        ],

        runtimes: [
            ...( options.runtimes ?? [] ), // include the options runtimes if any
            {
                name: 'browser',
                provider: browserRuntimeProvider,
                dependencies: [
                    'bitdev.symphony/symphony-platform'
                ],
                extension: 'tsx'
            },
            {
                name: 'node',
                provider: nodeRuntimeProvider,
                dependencies: [
                    'bitdev.symphony/symphony-platform'
                ],
                imports: generateImports,
                files: ( context ) => [
                    graphQLServerFile( context )
                ],
                methods: getDummyMethod
            }
        ]
    } )
}
