/**
* @format
* -----
* Project: @eventiva/eventiva
* File: pull.cmd.ts
* Path: \projects\workflows\git-subrepo\subcommands\pull.cmd.ts
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
 * The name of the command to pull data.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {"pull"}
 */
const COMMAND_NAME = 'pull';

/**
 * Update the subrepo subdir with the latest upstream changes.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class PullCmd
 * @typedef {PullCmd}
 * @implements {Command}
 */
export class PullCmd implements Command {
  /**
   * The name property specifies the command name and its available options in a string format. The command name is dynamically generated using the constant COMMAND_NAME and can be followed by an optional <subdir> argument. The available options are specified using various flags and their corresponding values. These flags include: --all, which includes all files and folders; -M, which includes modified files; -R, which includes renamed files; -f, which includes files; -m, which specifies a custom message for the commit; --file=<msg file>, which specifies a file containing the commit message; -e, which indicates that an empty commit should be made; -b <branch>, which specifies the branch where the commit should be made; -r <remote>, which specifies the remote repository; and -u, which updates the current branch to the latest commit before committing.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name = `${COMMAND_NAME} <subdir>|--all [-M|-R|-f] [-m <msg>] [--file=<msg file>] [-e] [-b <branch>] [-r <remote>] [-u]`;

  /**
   * The alias for the property.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  alias = '';

  /**
   * Update the subrepo subdir with the latest upstream changes.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  description = `Update the subrepo subdir with the latest upstream changes.`;

  /**
   * The options property is a reference to the subrepoOptions property of the GitSubrepoMain class, which contains various options and settings for the subrepo.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {*}
   */
  options = this.subrepo.subrepoOptions;

  /**
   * The group property specifies the name of the git group.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  group = 'git';

  /**
   * An array of Command objects. This property stores a list of commands that can be executed.
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
   * The URL to the help documentation for this property.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  helpUrl = 'https://github.com/ingydotnet/git-subrepo';

  /**
   * Creates an instance of PullCmd.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param {GitSubrepoMain} subrepo The subrepo object
   */
  constructor(private subrepo: GitSubrepoMain) {}

  /**
   * Asynchronously reports the result of pulling a git subrepo.
   * - `subdirectory`: An optional string array specifying the subdirectories to pull.
   * - `flags`: An array of strings specifying the flags to be passed to the `subrepo.pull` function.
   * Returns a promise that resolves to a string indicating the result of the pull operation.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string[]} param0 An array of strings representing the subdirectories
   * @param {*} param0.subdirectory A string representing the subdirectory
   * @param {string[]} flags An array of strings representing the flags
   * @returns {unknown} Asynchronously pulls the specified subdirectories using git subrepo and returns a success message if the pull operation was successful, otherwise returns an error message.
   */
  async report([subdirectory]: string[], flags: string[]) {
    const res = await this.subrepo.pull(subdirectory, flags);
    if (res) {
      return chalk.green('git subrepo pull was successful');
    }
    return chalk.red('git subrepo pull was unsuccessful');
  }
}
