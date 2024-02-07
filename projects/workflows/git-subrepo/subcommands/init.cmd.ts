/**
* @format
* -----
* Project: @eventiva/eventiva
* File: init.cmd.ts
* Path: \projects\workflows\git-subrepo\subcommands\init.cmd.ts
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
 * The name of the command to initialize a project.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {"init"}
 */
const COMMAND_NAME = 'init';

/**
 * This class represents an 'InitCmd' command, which is used to turn a current subdirectory into a subrepo in Git. It implements the 'Command' interface.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class InitCmd
 * @typedef {InitCmd}
 * @implements {Command}
 */
export class InitCmd implements Command {
  /**
   * The name of the command, which is a string template containing variables. The `${COMMAND_NAME}` variable is replaced with the name of the command. The `<subdir>` parameter is a required argument representing a directory name. The `[-r <remote>]` option is an optional flag with an argument representing a remote name. The `[-b <branch>]` option is an optional flag with an argument representing a branch name. The `[--method <merge|rebase>]` option is an optional flag with an argument representing a merge or rebase method.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name = `${COMMAND_NAME} <subdir> [-r <remote>] [-b <branch>] [--method <merge|rebase>]`;

  /**
   * The alias of the object. An alias is an alternative name or nickname for the object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  alias = '';

  /**
   * Turn a current subdirectory into a subrepo
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  description = `Turn a current subdirectory into a subrepo`;

  /**
   * The options for the subrepo, obtained from the subrepoOptions property of the parent object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {CommandOptions}
   */
  options = this.subrepo.subrepoOptions;

  /**
   * The group property represents the git group.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  group = 'git';

  /**
   * An array of Command objects representing the available commands. Initially, it is an empty array.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {Command[]}
   */
  commands: Command[] = [];

  /**
   * Indicates whether the property is private or not. If true, the property can only be accessed within the class or module in which it is defined.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {boolean}
   */
  private = true;

  /**
   * The URL for the help documentation of the property. It points to the GitHub repository containing the Git Subrepo documentation.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  helpUrl = 'https://github.com/ingydotnet/git-subrepo';

  /**
   * Creates an instance of InitCmd.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param {GitSubrepoMain} subrepo The Git subrepository being passed to the constructor.
   */
  constructor(private subrepo: GitSubrepoMain) {}

  /**
   * This async function initializes a subrepository using the given subdirectory and flags. It returns a success message if initialization is successful, and an error message otherwise.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string[]} param0 An array of strings representing subdirectories.
   * @param {*} param0.subdirectory A subdirectory as a string.
   * @param {string[]} flags An array of strings representing flags.
   * @returns {unknown} Initializes a git subrepository in the specified subdirectory with the given flags. Returns a success message if the initialization was successful, otherwise returns an error message.
   */
  async report([subdirectory]: string[], flags: string[]) {
    const res = await this.subrepo.init(subdirectory, flags);
    if (res) {
      return chalk.green('git subrepo init was successful');
    }
    return chalk.red('git subrepo init was unsuccessful');
  }
}
