/**
* @format
* -----
* Project: @eventiva/eventiva
* File: git-subrepo.cmd.ts
* Path: \projects\workflows\git-subrepo\git-subrepo.cmd.ts
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

/**
 * The name of the command for subrepositories.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {"subrepo"}
 */
const COMMAND_NAME = 'subrepo';

/**
 * SubRepoCmd class represents a command for performing sub repo operations.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class SubRepoCmd
 * @typedef {SubRepoCmd}
 * @implements {Command}
 */
export class SubRepoCmd implements Command {
  /**
   * The name property represents the command name along with the sub-command placeholder enclosed in backticks.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name = `${COMMAND_NAME} <sub-command>`;

  /**
   * The alias for the property. It is an empty string by default.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  alias = '';

  /**
   * Perform sub repo operations
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  description = 'Perform sub repo operations';

  /**
   * An array of options.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {{}}
   */
  options = [];

  /**
   * The group that the property belongs to is 'git'.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  group = 'git';

  /**
   * An array of commands.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {Command[]}
   */
  commands: Command[] = [];

  /**
   * The URL that provides help and documentation for the property. It points to the GitHub repository for git-subrepo.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  helpUrl = 'https://github.com/ingydotnet/git-subrepo';

  /**
   * Asynchronously generates and returns an error message for an unrecognized subcommand.
   * - `unrecognizedSubcommand` - The unrecognized subcommand.
   * Returns:
   * - A string error message.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {[string]} param0 [unrecognizedSubcommand]: The unrecognized subcommand.
   * @param {string} param0.unrecognizedSubcommand The unrecognized subcommand value.
   * @returns {unknown} This function takes an array containing an unrecognized subcommand as its parameter and returns a string message in red color indicating that the subcommand is not valid for the 'subrepo' command. The message also advises the user to run 'bit subrepo --help' to get a list of valid subcommands.
   */
  async report([unrecognizedSubcommand]: [string]) {
    return chalk.red(
      `"${unrecognizedSubcommand}" is not a subcommand of "subrepo", please run "bit subrepo --help" to list the subcommands`
    );
  }
}
