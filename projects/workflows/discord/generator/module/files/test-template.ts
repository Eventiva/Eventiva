/**
* @format
* -----
* Project: @eventiva/eventiva
* File: test-template.ts
* Path: \projects\bots\aspects\harmony-bot-generator\aspect\files\test-template.ts
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

/**
 * This function generates the content of a test file based on the given component context and runtime. It creates a relative path for the test file and imports necessary dependencies. Then it defines a test case that loads the aspect and expects it to be truthy.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @param context The context parameter which contains information about the component
 * @param runtime The runtime parameter which specifies the type of runtime
 * @returns This function takes a ComponentContext and a runtime string as input and returns an object with the relativePath and content properties. The relativePath property is a string that represents the relative path of the file to be tested. The content property is a string that represents the content of the test file to be generated.
 */
export function testFile(context: ComponentContext, runtime: string) {
  const runtimeSuffix = capitalize(runtime);
  const runtimeType = `${context.namePascalCase}${runtimeSuffix}`;

  return {
    relativePath: `${context.name}.${runtime}.spec.ts`,
    content: `import { loadAspect } from '@bitdev/harmony.testing.load-aspect';
import type { ${runtimeType} } from './${context.name}.${runtime}.runtime.js';
import { ${context.namePascalCase}Aspect } from './${context.name}.aspect.js';

it('should retrieve the aspect', async () => {
  const ${context.nameCamelCase} = await loadAspect<${runtimeType}>(${context.namePascalCase}Aspect, {
    runtime: '${runtime}',
  });

  expect(${context.nameCamelCase}).toBeTruthy(); 
});    
`
  };
}
