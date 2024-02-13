/**
* @format
* -----
* Project: @eventiva/eventiva
* File: help.cmd.ts
* Path: \projects\workflows\git-subrepo\subcommands\help.cmd.ts
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
 * The name of the command used to display the help information.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {"help"}
 */
const COMMAND_NAME = 'help';

/**
 * This class represents the help command in the application. It implements the Command interface.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class helpCmd
 * @typedef {HelpCmd}
 * @implements {Command}
 */
export class HelpCmd implements Command {
  /**
   * The name of the command. It is a string that consists of the `COMMAND_NAME` variable followed by an optional `<command>` argument or `--all` flag.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name = `${COMMAND_NAME} [<command>|--all]`;

  /**
   * The alias for the property.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  alias = '';

  /**
   * Same as git help subrepo. Will launch the manpage. For the shorter usage, use git subrepo -h.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  description = `Same as git help subrepo. Will launch the manpage. For the shorter usage, use git subrepo -h.`;

  /**
   * The options for the subrepo. This property gives access to the subrepoOptions object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {CommandOptions}
   */
  options = this.subrepo.subrepoOptions;

  /**
   * The group of the git property. It determines the category or classification that the git property belongs to.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  group = 'git';

  /**
   * An array that stores the available commands. It is initially an empty array.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {Command[]}
   */
  commands: Command[] = [];

  /**
   * The property is private and can only be accessed within the class or module.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {boolean}
   */
  private = true;

  /**
   * The URL to the help documentation for the property. This URL points to the GitHub repository where the documentation for using git-subrepo is located.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  helpUrl = 'https://github.com/ingydotnet/git-subrepo';

  /**
   * Creates an instance of helpCmd.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param {GitSubrepoMain} subrepo The Git subrepository main instance.
   */
  constructor(private subrepo: GitSubrepoMain) {}

  /**
   * Asynchronously reports the help message for the given subcommand and flags using the subrepo. If the help message is received successfully, it returns a green success message. Otherwise, it returns a red error message.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string[]} param0 The subcommand for the report
   * @param {*} param0.subcommand The subcommand as a string array
   * @param {string[]} flags The flags for the report
   * @returns {unknown} Executes the `git subrepo help` command with the specified subcommand and flags.
   * @param subcommand - The subcommand to execute with `git subrepo help`.
   * @param flags - The flags to use with the `git subrepo help` command.
   * @returns A Promise that resolves to a success message if the `git subrepo help` command was successful, or an error message if it was unsuccessful.
   */
  async report([subcommand]: string[], flags: string[]) {
    const res = await this.subrepo.help(subcommand, flags);
    if (res) {
      return chalk.green('git subrepo help was successful');
    }
    return chalk.red('git subrepo help was unsuccessful');
  }
}
