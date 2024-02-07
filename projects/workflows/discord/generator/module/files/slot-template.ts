/**
* @format
* -----
* Project: @eventiva/eventiva
* File: slot-template.ts
* Path: \projects\bots\aspects\harmony-bot-generator\aspect\files\slot-template.ts
* Created Date: Sunday, February 4th 2024
* Author: Jonathan Stevens, jonathan@resnovas.com
* Github: https://github.com/TGTGamer
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
* Copyright (c) 2024 Resnovas - All Rights Reserved
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
* along with this program. If not, please write to: jonathan@resnovas.com,
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


import { camelCase, startCase, kebabCase } from "lodash";

/**
 * Generates various name formats based on the given slot name.
 * The name formats generated are:
 * - camelCase
 * - PascalCase
 * - kebab-case
 * - display name with spaces
 * @param {string} slot - The slot name.
 * @return {object} - An object containing the various name formats.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @param slot The input slot name
 * @returns Generates various name variations based on the given slot name.
 */
/**
 * Generates formatted names based on a provided slot name.
 * The slot name is converted to kebab case and then transformed into camel case and pascal case.
 * @param {string} slot - The slot name.
 * @return {object} - An object containing the formatted names.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @param slot The input string from which to generate the names.
 * @returns Generates various name formats based on the given slot name.
 */
export function generateName(slot: string) { 
  const kebabCaseName = kebabCase(slot);
  const camelCaseSlot = camelCase(kebabCaseName);
  const pascalCase = startCase(camelCaseSlot).replace(/ /g, '');
  const displayName = kebabCaseName.replace('-', ' ');

  return {
    camelCaseSlot: `${camelCaseSlot}Slot`,
    pascalCaseSlot: `${pascalCase}Slot`,
    pascalCase,
    displayName,
    name: kebabCaseName,
    camelCase: camelCaseSlot,
  };
}

/**
 * This function generates the JSDoc for a slot file. It takes a slot string as input and returns an object with two properties: relativePath and content. The relativePath property is a string that represents the file path of the slot file. The content property is a string that represents the content of the slot file, which includes an import statement and an interface declaration with a name property and a type declaration for a SlotRegistry of an array of the interface type.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @param slot The name of the slot.
 * @returns This function generates a slot file for a given slot name. It takes a string parameter 'slot', uses it to generate PascalCase representations of the slot name and slot name with the 'Slot' suffix. It then returns an object containing a relative file path and the content of the slot file, which includes an import statement and interfaces for the slot and the slot registry.
 */
export function slotFile(slot: string) {
  const { pascalCaseSlot, pascalCase } = generateName(slot);

  return {
    relativePath: `${slot}.ts`,
    content: `import type { SlotRegistry } from '@bitdev/harmony.harmony';

export interface ${pascalCase} {
  /**
   * name of the item
   */
  name: string;
}

export type ${pascalCaseSlot} = SlotRegistry<${pascalCase}[]>;
`
  };
}
