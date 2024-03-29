/*
 * Project: Eventiva
 * File: slot-template.ts
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

import { camelCase, kebabCase, startCase } from 'lodash'

/**
 * Generates name variations based on the slot name provided. Converts the slot name to kebab case, camel case, and pascal case. Returns an object containing the following properties: camelCaseSlot, pascalCaseSlot, pascalCase, displayName, name, camelCase.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @export
 * @param {string} slot A string value representing a slot
 * @returns {{ camelCaseSlot: string; pascalCaseSlot: string; pascalCase: any; displayName: any; name: any; camelCase: any; }} Generates various case variations of the given slot string and returns an object containing the camel case, pascal case, display name, and original kebab case names.
 */
export function generateName ( slot: string ) {
    const kebabCaseName = kebabCase( slot )
    const camelCaseSlot = camelCase( kebabCaseName )
    const pascalCase = startCase( camelCaseSlot ).replace( / /g, '' )
    const displayName = kebabCaseName.replace( '-', ' ' )

    return {
        camelCaseSlot: `${ camelCaseSlot }Slot`,
        pascalCaseSlot: `${ pascalCase }Slot`,
        pascalCase,
        displayName,
        name: kebabCaseName,
        camelCase: camelCaseSlot
    }
}

/**
 * A function that takes a slot name as parameter and generates a pascal case slot name and pascal case name based on the input slot name. It then returns an object with relativePath and content properties. The content is a string that includes an interface definition with a name property and a type definition using the generated pascal case names for SlotRegistry.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @export
 * @param {string} slot A function that generates JSDoc for a given slot
 * @returns {{ relativePath: string; content: string; }} A function that generates a TypeScript file for a given slot name and returns an object with a relative path and content
 */
export function slotFile ( slot: string ) {
    const { pascalCaseSlot, pascalCase } = generateName( slot )

    return {
        relativePath: `${ slot }.ts`,
        content: `import type { SlotRegistry } from '@bitdev/harmony.harmony';

export interface ${ pascalCase } {
  /**
   * name of the item
   */
  name: string;
}

export type ${ pascalCaseSlot } = SlotRegistry<${ pascalCase }[]>;
`
    }
}
