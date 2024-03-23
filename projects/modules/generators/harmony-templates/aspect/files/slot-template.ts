/*
 * Project: Eventiva
 * File: slot-template.ts
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/23/24, 11:56 PM
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
 * LICENSE: GNU General Public License v2.0 or later (GPL-2.0-or-later)
 * -----
 * This program has been provided under confidence of the copyright holder and
 * is licensed for copying, distribution and modification under the terms
 * of the GNU General Public License v2.0 or later (GPL-2.0-or-later) published as the License,
 * or (at your option) any later version of this license.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License v2.0 or later for more details.
 * You should have received a copy of the GNU General Public License v2.0 or later
 * along with this program. If not, please write to: licensing@eventiva.co.uk,
 * or see https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html
 * -----
 * This project abides by the GPL Cooperation Commitment.
 * Before filing or continuing to prosecute any legal proceeding or claim
 * (other than a Defensive Action) arising from termination of a Covered
 * License, we commit to extend to the person or entity ('you') accused
 * of violating the Covered License the following provisions regarding
 * cure and reinstatement, taken from GPL version 3.
 * For further details on the GPL Cooperation Commitment please visit
 * the official website: https://gplcc.github.io/gplcc/
 * -----
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
