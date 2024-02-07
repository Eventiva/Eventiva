/**
* @format
* -----
* Project: @eventiva/eventiva
* File: fetch.cmd.ts
* Path: \projects\workflows\git-subrepo\subcommands\fetch.cmd.ts
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
 * The command name for the fetch command.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {"fetch"}
 */
const COMMAND_NAME = 'fetch';

/**
 * FetchCmd class represents a command that fetches the remote/upstream content for a subrepo.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class FetchCmd
 * @typedef {FetchCmd}
 * @implements {Command}
 */
export class FetchCmd implements Command {
  /**
   * The name of the command. It is a template string that includes placeholders for specifying the command name, the desired subdirectory, and optional parameters such as the remote and branch names. The placeholders are surrounded by curly braces and their corresponding values are provided when invoking the command.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name = `${COMMAND_NAME} <subdir>|--all [-r <remote>] [-b <branch>]`;

  /**
   * The alias property is a string that represents an alternative name for something.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  alias = '';

  /**
   * Fetch the remote/upstream content for a subrepo.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  description = `Fetch the remote/upstream content for a subrepo.`;

  /**
   * The options for the subrepository. It contains the subrepository options to be used.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {CommandOptions}
   */
  options = this.subrepo.subrepoOptions;

  /**
   * The group that a git repository belongs to.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  group = 'git';

  /**
   * An array of Command objects representing the commands available to be executed.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {Command[]}
   */
  commands: Command[] = [];

  /**
   * The property is set to true when it is private.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {boolean}
   */
  private = true;

  /**
   * The URL for the help documentation of the property. It points to the GitHub repository where the documentation can be found.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  helpUrl = 'https://github.com/ingydotnet/git-subrepo';

  /**
   * Creates an instance of FetchCmd.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param {GitSubrepoMain} subrepo The subrepository being used
   */
  constructor(private subrepo: GitSubrepoMain) {}

  /**
   * Asynchronously reports the result of fetching a subdirectory from a subrepo using git subrepo fetch.
   * If no subdirectory is provided, fetches all subdirectories.
   * Parameters:
   * - subdirectory: An optional string array representing the subdirectory to fetch.
   * - flags: A string array representing the flags to be passed to git subrepo fetch.
   * Returns a promise that resolves to a string indicating the result of the fetch operation.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string[]} param0 An array of strings representing subdirectories.
   * @param {*} param0.subdirectory The subdirectory to fetch from. If not provided, '--all' will be used.
   * @param {string[]} flags An array of strings representing command line flags.
   * @returns {unknown} Asynchronously reports the result of fetching a subrepo in git.
   */
  async report([subdirectory]: string[], flags: string[]) {
    const sub = subdirectory || '--all';
    const res = await this.subrepo.fetch(sub, flags);
    if (res) {
      return chalk.green('git subrepo fetch was successful');
    }
    return chalk.red('git subrepo fetch was unsuccessful');
  }
}
