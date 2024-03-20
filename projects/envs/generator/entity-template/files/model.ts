/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: model.ts
 * Path: /projects/envs/generator/entity-template/files/model.ts
 * Created Date: Monday, March 18th 2024
 * Author: Jonathan Stevens (Email: jonathan@resnovas.com
 * Github: https://github.com/TGTGamer)
 * -----
 * Contributing: Please read through our contributing guidelines.
 * Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, version 2.0.
 * Please interact in ways that contribute to an open, welcoming, diverse,
 * inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 * -----
 * Copyright (c) 2024 Resnovas - All Rights Reserved
 * LICENSE: GNU General Public License v2.0 or later (GPL-2.0-or-later)
 * -----
 * This program has been provided under confidence of the copyright holder and
 * is licensed for copying, distribution and modification under the terms
 * of the GNU General Public License v2.0 or later (GPL-2.0-or-later)
 * published as the License, or (at your option) any later
 * version of this license.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
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

import { ComponentContext } from '@teambit/generator';

/**
 * A function that takes a ComponentContext as a parameter and returns an object with the relativePath and content properties. The content property is a string containing export statements for the component's name and name in PascalCase, along with type export statements for Plain name in PascalCase. The relativePath property is set to 'index.ts'.
 *
 * @param {ComponentContext} context A ComponentContext object containing name and namePascalCase
 * @returns {{ relativePath: string; content: string; }} Returns an object with the relative path and content for exporting and defining types based on the provided ComponentContext parameters.
 */
export const modelFile = (context: ComponentContext) => {
  const { name, namePascalCase } = context;

  return {
    relativePath: 'model.zmodel',
    content: `import '@eventiva/entities.base.base/model'
model ${namePascalCase} extends Base {

}
`,
  };
};
