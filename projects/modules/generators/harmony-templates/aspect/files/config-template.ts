/*
 * Project: Eventiva
 * File: config-template.ts
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/23/24, 11:57 PM
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
export function configFile(context: ComponentContext, config?: {imports?: string, configExtends?: string}) {
  return {
    relativePath: `${context.name}-config.ts`,
    content: `${config?.imports}
// use this type for your aspect config.
export type ${context.namePascalCase}Config = {

}${config && config.configExtends ? ` & ${config.configExtends}` : ''};

`
  };
}
