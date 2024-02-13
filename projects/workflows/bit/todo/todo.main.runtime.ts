/**
* @format
* -----
* Project: @eventiva/eventiva
* File: todo.main.runtime.ts
* Path: \projects\workflows\bit\todo\todo.main.runtime.ts
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

import { MainRuntime, CLIMain, CLIAspect } from '@teambit/cli';
import { Workspace, WorkspaceAspect } from '@teambit/workspace';
import { getTodos } from '@learnbit/extending-bit.metadata.component-todos.modules.get-todos';
import { ToDosCmd } from './todo.cmd';
import { TodoAspect } from './todo.aspect';

/**
 * this is the aspect's 'main' runtime. it runs in a node environment,
 * along with all other Bit server-side aspects
 * (which are loaded by default or as extensions that are added to your workspace/remote scope)
 */
export class TodoMain {
  /**
   * list the aspects that are used by this aspect (in the main runtime)
   * these aspects will be instantiated and inject to this aspect
   */
  static dependencies = [WorkspaceAspect, CLIAspect];

  /**
   * The `runtime` property is a static property that represents the main runtime of the application. It is of type `MainRuntime`.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   */
  static runtime = MainRuntime;
  /**
   * the 'provider' method is responsible for receiving the instances
   * of other aspects (that are used by this aspect), and for returning an instance of this aspect
   * (in this case, the instance to run in a node environment)
   */
  static async provider([workspace, cli]: [Workspace, CLIMain]) {
    /**
     *  execute some logic during processes that retrieve information from components in the workspace.
     *  */
    workspace.onComponentLoadSlot.register(async (component) => {
      const todos = getTodos(component);
      /**
       * the returned value is added to the component's metadata
       * this data is persisted when the component is snapped
       *  */
      return {
        todos,
      };
    });
    /* register a Bit command using the CLI aspect */
    cli.register(new ToDosCmd(workspace));
    return new TodoMain();
  }
}

TodoAspect.addRuntime(TodoMain);

export default TodoMain;
