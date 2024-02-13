/**
* @format
* -----
* Project: @eventiva/eventiva
* File: branch.cmd.ts
* Path: \projects\workflows\git-subrepo\subcommands\branch.cmd.ts
* Created Date: Monday, January 29th 2024
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

import { Command } from '@teambit/cli';
import chalk from 'chalk';
import type { GitSubrepoMain } from '../git-subrepo.main.runtime';

/**
 * The name of the command to create a new branch.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {"branch"}
 */
const COMMAND_NAME = 'branch';

/**
 * The BranchCmd class represents a command for creating a branch with local subrepo commits.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class BranchCmd
 * @typedef {BranchCmd}
 * @implements {Command}
 */
export class BranchCmd implements Command {
  /**
   * The name of the command. It is a string that should be in the format `${COMMAND_NAME} <subdir>|--all [-f] [-F]`.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name = `${COMMAND_NAME} <subdir>|--all [-f] [-F]`;

  /**
   * The alias property represents the specified alias for a value. It is a string type and initially set to an empty string.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  alias = '';

  /**
   * Create a branch with local subrepo commits.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  description = `Create a branch with local subrepo commits.`;

  /**
   * The options for the GitSubrepoMain subrepo. These options dictate how the subrepo behaves and interacts with the parent repo.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {*}
   */
  options = this.subrepo.subrepoOptions;

  /**
   * The group property represents the group to which the object belongs. In this case, it represents the git group.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  group = 'git';

  /**
   * An array of commands. Initially set to an empty array.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {Command[]}
   */
  commands: Command[] = [];

  /**
   * Specifies that the property is private.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {boolean}
   */
  private = true;

  /**
   * The URL for the help documentation of the property. You can find more information about this property at the following link: 'https://github.com/ingydotnet/git-subrepo'.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  helpUrl = 'https://github.com/ingydotnet/git-subrepo';

  /**
   * Creates an instance of BranchCmd.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param {GitSubrepoMain} subrepo The subrepo object for this class.
   */
  constructor(private subrepo: GitSubrepoMain) {}

  /**
   * Asynchronously reports the result of executing the 'git subrepo branch' command.
   * - `subdirectory` (optional): A string array specifying the subdirectory where the 'git subrepo branch' command should be executed.
   * - `flags`: A string array specifying the flags/options to be passed to the 'git subrepo branch' command.
   * If `subdiectory` is not provided, the command will be executed in the entire repository.
   * Returns a Promise that resolves with a string indicating the result of the command execution.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string[]} param0 An array of subdirectories
   * @param {*} param0.subdirectory The subdirectory to branch from
   * @param {string[]} flags An array of flags to pass to the branch command
   * @returns {unknown} Reports the result of a Git subrepo branch operation.
   */
  async report([subdirectory]: string[], flags: string[]) {
    const sub = subdirectory || '--all';
    const res = await this.subrepo.branch(sub, flags);
    if (res) {
      return chalk.green('git subrepo branch was successful');
    }
    return chalk.red('git subrepo branch was unsuccessful');
  }
}
