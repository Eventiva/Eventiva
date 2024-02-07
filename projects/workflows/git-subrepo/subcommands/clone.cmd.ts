/**
* @format
* -----
* Project: @eventiva/eventiva
* File: clone.cmd.ts
* Path: \projects\workflows\git-subrepo\subcommands\clone.cmd.ts
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
 * The name of the command for cloning a repository.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {"clone"}
 */
const COMMAND_NAME = 'clone';

/**
 * CloneCmd is a class that represents a command for cloning a remote repository into a local subdirectory.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class CloneCmd
 * @typedef {CloneCmd}
 * @implements {Command}
 */
export class CloneCmd implements Command {
  /**
   * The name of the command string. It includes the COMMAND_NAME followed by the repository argument, an optional subdir argument, and various optional flags and parameters. The repository argument is required, while the subdir argument, branch flag and parameter, message flag and parameter, file flag and parameter, and method flag are all optional.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name = `${COMMAND_NAME} <repository> [<subdir>] [-b <branch>] [-f] [-m <msg>] [--file=<msg file>] [-e] [--method <merge|rebase>]`;

  /**
   * The alias for this property. It is an empty string by default.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  alias = '';

  /**
   * Clone a remote repository into a local subdirectory
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  description = `Clone a remote repository into a local subdirectory`;

  /**
   * The options for the subrepo, accessed through `this.subrepo.subrepoOptions`.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {CommandOptions}
   */
  options = this.subrepo.subrepoOptions;

  /**
   * The group to which the item belongs (e.g., 'git', 'database', 'network').
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  group = 'git';

  /**
   * An array of commands. The commands can be of type Command, which represents a set of instructions to be executed.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {Command[]}
   */
  commands: Command[] = [];

  /**
   * This property indicates whether an item is private or not.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {boolean}
   */
  private = true;

  /**
   * The URL to the help documentation for the property.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  helpUrl = 'https://github.com/ingydotnet/git-subrepo';

  /**
   * Creates an instance of CloneCmd.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param {GitSubrepoMain} subrepo The git subrepo.
   */
  constructor(private subrepo: GitSubrepoMain) {}

  /**
   * Clones a subrepository using git subrepo.
   * Resolves with a success message if the clone was successful, or with an error message if the clone was unsuccessful.
   * @param repository - The URL of the repository to clone.
   * @param subdirectory - The subdirectory in which to clone the repository.
   * @param flags - Optional flags to pass to the git subrepo command.
   * @return A promise that resolves with a message indicating the success or failure of the clone operation.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string[]} param0 An array containing the repository and subdirectory to clone
   * @param {*} param0.repository The URL of the repository to clone
   * @param {*} param0.subdirectory The subdirectory where the repository will be cloned
   * @param {string[]} flags An array of flags to pass to the clone command
   * @returns {unknown} Asynchronously clones a git subrepo from a given repository and subdirectory with the specified flags. Returns a string indicating the success or failure of the clone operation.
   */
  async report([repository, subdirectory]: string[], flags: string[]) {
    const res = await this.subrepo.clone(repository, subdirectory, flags);
    if (res) {
      return chalk.green('git subrepo clone was successful');
    }
    return chalk.red('git subrepo clone was unsuccessful');
  }
}
