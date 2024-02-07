/**
* @format
* -----
* Project: @eventiva/eventiva
* File: my-build-task.ts
* Path: \projects\workflows\git-subrepo\my-build-task.ts
* Created Date: Tuesday, February 6th 2024
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

import {
  BuildTask,
  BuildContext,
  BuiltTaskResult,
  ComponentResult,
} from '@teambit/builder';

/**
 * The MyBuildTask class is an implementation of the BuildTask interface. It represents a build task that executes a set of components in parallel or sequentially.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class
 * @implements {BuildTask}
 */
export class MyBuildTask implements BuildTask {
  /**
   * name of the task.
   */
  readonly name = 'my build task';
  
  /**
   * execute method
   */
  async execute(context: BuildContext): Promise<BuiltTaskResult> {
    // Prepare the component results array which will be used to report back the components processed
    // as well as any additional data regarding this build task execution
    const componentsResults: ComponentResult[] = [];
    // The 'seeder capsules' are capsules for components that are built for their own sake - 
    // not for the sake of other components that have them as their dependencies
    const capsules = context.capsuleNetwork.originalSeedersCapsules;

    capsules.forEach((capsule) => {
      // Prepare an 'errors' array to report back of any errors during execution (this will be part of the 'Component Results' data)
      const errors: Error[] = [];
      // Each 'capsule' provides data regarding the component as well as the capsule itself
      const componentName = capsule.component.id.name;
      const capsuleDir = capsule.path;

      const artifactContent = `The component name is ${componentName}`

      // try {
      //   // Generate the artifact inside the capsule's directory
      //   fs.writeFileSync(
      //     path.join(capsuleDir, 'output.my-artifact.txt'),
      //     artifactContent
      //   );
      // } catch (err: any) {
      //   errors.push(err);
      // }
      componentsResults.push({ component: capsule.component, errors });
    });


    return {
      artifacts: [
        {
          generatedBy: this.aspectId,
          name: this.name,
          // The glob pattern for artifacts to include in the component version
          globPatterns: ['**/*.my-artifact.txt'],
        },
      ],
      componentsResults,
    };
  }
}