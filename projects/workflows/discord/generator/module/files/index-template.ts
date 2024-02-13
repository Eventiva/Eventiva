/**
* @format
* -----
* Project: @eventiva/eventiva
* File: index-template.ts
* Path: \projects\workflows\discord\generator\module\files\index-template.ts
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


import { capitalize } from "lodash";
import { ComponentContext } from "@teambit/generator";
import type { HarmonyTemplatesOptions } from "@bitdev/harmony.generators.harmony-templates";

/**
 * Generates the content for the index file of a component. The index file imports the component's main aspect and its runtime files if specified. It also exports the aspect.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @param context The component context.
 * @param options The generator options.
 * @param [runtimes]
 * @returns This function generates the content of an index file for a component. It imports the component's aspect and runtime files and exports the component's aspect.
 */
export function indexFile(context: ComponentContext, options: HarmonyTemplatesOptions, runtimes?: string[]) { 

  return {
    relativePath: 'index.ts',
    content: `import { ${context.namePascalCase}Aspect } from './${context.name}.aspect.js';

${runtimes?.map((runtime) => {
  const runtimeSuffix = capitalize(runtime);
  return `export type { ${context.namePascalCase}${runtimeSuffix} } from './${context.name}.${runtime}.runtime.js';`;
}).join('\n')}

export default ${context.namePascalCase}Aspect;
export { ${context.namePascalCase}Aspect };
`
  };
}
