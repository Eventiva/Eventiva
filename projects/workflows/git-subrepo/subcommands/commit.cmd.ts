/**
* @format
* -----
* Project: @eventiva/eventiva
* File: commit.cmd.ts
* Path: \projects\workflows\git-subrepo\subcommands\commit.cmd.ts
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
 * The name of the command constant used for the commit command.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {"commit"}
 */
const COMMAND_NAME = 'commit';

/**
 * Add subrepo branch to current history as a single commit.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class CommitCmd
 * @typedef {CommitCmd}
 * @implements {Command}
 */
export class CommitCmd implements Command {
  /**
   * The name property represents the command name and its corresponding arguments. It includes the command name, followed by an optional <subdir> argument, an optional [<subrepo-ref>] argument, and several optional flags. The available flags are: -m <msg>, --file=<msg file>, -e, -f, and -F.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name = `${COMMAND_NAME} <subdir> [<subrepo-ref>] [-m <msg>] [--file=<msg file>] [-e] [-f] [-F]`;

  /**
   * The alias property represents the name or nickname given to a certain object or entity. It is of type string and can be empty or contain a string value.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  alias = '';

  /**
   * Add subrepo branch to current history as a single commit.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  description = `Add subrepo branch to current history as a single commit.`;

  /**
   * The `options` property contains the subrepo options for the current instance of the `subrepo` class.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {CommandOptions}
   */
  options = this.subrepo.subrepoOptions;

  /**
   * The group to which the property belongs. In this case, it is 'git'.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  group = 'git';

  /**
   * An array of commands. Each command is represented as an instance of the Command type.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {Command[]}
   */
  commands: Command[] = [];

  /**
   * The private flag indicates whether the property is private or not. When the private flag is set to true, it means the property is private and cannot be accessed or modified from outside of the class or object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {boolean}
   */
  private = true;

  /**
   * The URL to the help page for the property. This URL points to the GitHub repository for git-subrepo.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  helpUrl = 'https://github.com/ingydotnet/git-subrepo';

  /**
   * Creates an instance of CommitCmd.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param {GitSubrepoMain} subrepo The subrepo for the constructor
   */
  constructor(private subrepo: GitSubrepoMain) {}

  /**
   * Asynchronously commits changes to a git subrepo.
   * @param subdirectory - A string array representing the subdirectory path(s) within the main repository.
   * @param flags - A string array representing the additional command-line flags to be passed to the commit command.
   * @returns A Promise that resolves to a string indicating the status of the commit operation.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string[]} param0 An array of strings representing subdirectories
   * @param {*} param0.subdirectory The subdirectory to commit
   * @param {string[]} flags An array of strings representing flags
   * @returns {unknown} Asynchronously performs a git subrepo commit on the specified subdirectories with the given flags. Returns a string indicating the success or failure of the commit.
   */
  async report([subdirectory]: string[], flags: string[]) {
    const res = await this.subrepo.commit(subdirectory, flags);
    if (res) {
      return chalk.green('git subrepo commit was successful');
    }
    return chalk.red('git subrepo commit was unsuccessful');
  }
}
