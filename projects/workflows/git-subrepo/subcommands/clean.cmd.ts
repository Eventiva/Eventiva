/**
* @format
* -----
* Project: @eventiva/eventiva
* File: clean.cmd.ts
* Path: \projects\workflows\git-subrepo\subcommands\clean.cmd.ts
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
 * The name of the command to clean a project.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {"clean"}
 */
const COMMAND_NAME = 'clean';

/**
 * Remove artifacts created by fetch and branch commands.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class CleanCmd
 * @typedef {CleanCmd}
 * @implements {Command}
 */
export class CleanCmd implements Command {
  /**
   * The name of the command, which is a string that represents the command name followed by an optional argument. The command name is defined by the `COMMAND_NAME` constant and the argument can be a path to a subdirectory, the `--all` flag, the `--ALL` flag, or the `-f` flag.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name = `${COMMAND_NAME} <subdir>|--all|--ALL [-f]`;

  /**
   * The alias of the property. It can be used to give a shorter or alternate name to the property.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  alias = '';

  /**
   * Remove artifacts created by fetch and branch commands.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  description = `Remove artifacts created by fetch and branch commands.`;

  /**
   * The options property represents the subrepo options of the current instance.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {CommandOptions}
   */
  options = this.subrepo.subrepoOptions;

  /**
   * The group to which the property belongs. Its value is 'git'.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  group = 'git';

  /**
   * An array of Command objects representing the commands that can be executed.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {Command[]}
   */
  commands: Command[] = [];

  /**
   * The property 'private' is a boolean value indicating whether the item is private or not.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {boolean}
   */
  private = true;

  /**
   * The URL that provides help or documentation for the property. It should point to the GitHub repository for git-subrepo.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  helpUrl = 'https://github.com/ingydotnet/git-subrepo';

  /**
   * Creates an instance of CleanCmd.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param {GitSubrepoMain} subrepo The GitSubrepoMain instance for the subrepository.
   */
  constructor(private subrepo: GitSubrepoMain) {}

  /**
   * Reports the result of cleaning the subdirectory using git subrepo clean command. If successful, returns 'git subrepo clean was successful', otherwise returns 'git subrepo clean was unsuccessful'.
   * @param subdirectory The subdirectory to clean. If not provided, all subdirectories will be cleaned.
   * @param flags An array of flags to pass to the git subrepo clean command.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string[]} param0 An array containing the subdirectories to be cleaned
   * @param {*} param0.subdirectory The subdirectory to be cleaned (optional, default is '--all')
   * @param {string[]} flags An array of flags to pass to the clean command
   * @returns {unknown} Reports the result of the git subrepo clean operation.
   */
  async report([subdirectory]: string[], flags: string[]) {
    const sub = subdirectory || '--all';
    const res = await this.subrepo.clean(sub, flags);
    if (res) {
      return chalk.green('git subrepo clean was successful');
    }
    return chalk.red('git subrepo clean was unsuccessful');
  }
}
