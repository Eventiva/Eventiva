/*
 * Project: Eventiva
 * File: config-template.ts
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

import { ComponentContext } from '@teambit/generator'

/**
 * A function that generates a configuration file for a component.
 * The function takes a ComponentContext object as the first parameter and an optional object containing import strings and configuration extension string as the second parameter.
 * The generated configuration file includes a relative path based on the context name, content with imports, and aspect configuration type definition based on the context's PascalCase name and optional configuration extension.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @export
 * @param {ComponentContext} context The context parameter representing the component context.
 * @param {?{imports?: string, configExtends?: string}} [config]
 * @returns {{ relativePath: string; content: string; }} Function that generates a configuration file for a component.
 * @param context - The component context
 * @param config - Optional configuration parameters for imports and configuration extension.
 * @return An object containing the relative path and content of the configuration file.
 */
export function configFile (
    context: ComponentContext,
    config?: { imports?: string, configExtends?: string }
) {
    return {
        relativePath: `${ context.name }-config.ts`,
        content: `${ config?.imports }
// use this type for your aspect config.
export type ${ context.namePascalCase }Config = {

}${ config && config.configExtends
            ? ` & ${ config.configExtends }`
            : '' };

`
    }
}
