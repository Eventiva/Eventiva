/**
* @format
* -----
* Project: @eventiva/eventiva
* File: status.cmd.ts
* Path: \projects\workflows\git-subrepo\subcommands\status.cmd.ts
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
 * The name of the command that is used to check the status.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {"status"}
 */
const COMMAND_NAME = 'status';

/**
 * A class representing the status command for Git subrepos.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class StatusCmd
 * @typedef {StatusCmd}
 * @implements {Command}
 */
export class StatusCmd implements Command {
  /**
   * The name of the command, including options and arguments. It is a string that follows the format `${COMMAND_NAME} [<subdir>|--all|--ALL] [-F] [-q|-v]`. The value of `COMMAND_NAME` will be replaced with the actual name of the command when the command is executed. The `<subdir>` argument is optional and represents a directory path. The `--all` and `--ALL` options can be used to specify whether to perform the command on all subdirectories. The `-F` option is used to force the command to execute, ignoring any prompts or confirmations. The `-q` option is used for quiet mode, suppressing unnecessary output. The `-v` option is used for verbose mode, providing additional detailed output. The name is used as a unique identifier for the command.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name = `${COMMAND_NAME} [<subdir>|--all|--ALL] [-F] [-q|-v]`;

  /**
   * The alias of an item, represented as a string.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  alias = '';

  /**
   * Get status of a subrepo (or all of them)
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  description = `Get status of a subrepo (or all of them)`;

  /**
   * The `options` property is assigned the `subrepoOptions` property of the `subrepo` object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {CommandOptions}
   */
  options = this.subrepo.subrepoOptions;

  /**
   * The group property represents the group of the git repository.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  group = 'git';

  /**
   * An array of commands. Each command is of type Command and can be executed.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {Command[]}
   */
  commands: Command[] = [];

  /**
   * The private flag indicates whether the property is accessible outside of the class or not.
   * By setting it to true, the property becomes inaccessible from outside the class.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {boolean}
   */
  private = true;

  /**
   * The URL of the help documentation for the property. Visit this URL for more information and guidance.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  helpUrl = 'https://github.com/ingydotnet/git-subrepo';

  /**
   * Creates an instance of StatusCmd.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param {GitSubrepoMain} subrepo The GitSubrepoMain object for managing the subrepository.
   */
  constructor(private subrepo: GitSubrepoMain) {}

  /**
   * Reports the status of a git subrepo in a specified subdirectory using specified flags.
   * If the subdirectory is not provided, it defaults to '--all'.
   * Returns a message indicating the success or failure of the operation.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string[]} param0 The subdirectories to report on.
   * @param {*} param0.subdirectory The single subdirectory to report on, or '--all' to report on all subdirectories.
   * @param {string[]} flags The flags to pass to the 'git subrepo status' command.
   * @returns {unknown} This function asynchronously reports the status of a subdirectory using `git subrepo status` command. It takes a subdirectory path and an array of flags as arguments. If no subdirectory path is provided, it defaults to '--all'. The function returns a string indicating the success or failure of the status report.
   */
  async report([subdirectory]: string[], flags: string[]) {
    const sub = subdirectory || '--all';
    const res = await this.subrepo.status(sub, flags);
    if (res) {
      return chalk.green('git subrepo status was successful');
    }
    return chalk.red('git subrepo status was unsuccessful');
  }
}
