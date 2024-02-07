/**
* @format
* -----
* Project: @eventiva/eventiva
* File: push.cmd.ts
* Path: \projects\workflows\git-subrepo\subcommands\push.cmd.ts
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
 * The name of the command 'push'.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {"push"}
 */
const COMMAND_NAME = 'push';

/**
 * Turn a current subdirectory into a subrepo
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class PushCmd
 * @typedef {PushCmd}
 * @implements {Command}
 */
export class PushCmd implements Command {
  /**
   * The name property specifies the name of the command. It is a template string that includes various options and placeholders. The available options include:
   * - `<subdir>`: Specifies the subdirectory for the command.
   * - `--all`: Specifies that the command should be applied to all branches.
   * - `[<branch>]`: Specifies an optional branch.
   * - `-m msg`: Specifies a commit message.
   * - `--file=<msg file>`: Specifies a file containing a commit message.
   * - `-r <remote>`: Specifies a remote repository.
   * - `-b <branch>`: Specifies a branch.
   * - `-M|-R`: Specifies a merge or rebase command.
   * - `-u`: Specifies an upstream repository.
   * - `-f`: Specifies a force flag.
   * - `-s`: Specifies a squash flag.
   * - `-N`: Specifies a no commit flag.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name = `${COMMAND_NAME} <subdir>|--all [<branch>] [-m msg] [--file=<msg file>] [-r <remote>] [-b <branch>] [-M|-R] [-u] [-f] [-s] [-N]`;

  /**
   * The alias for the property.
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
   * The options for the subrepo, obtained from this.subrepo.subrepoOptions.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {CommandOptions}
   */
  options = this.subrepo.subrepoOptions;

  /**
   * The group property represents the name of the group assigned to the element. This property is used in the context of git, indicating the group to which the element belongs.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  group = 'git';

  /**
   * An array of commands. Each command is an instance of the Command class.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {Command[]}
   */
  commands: Command[] = [];

  /**
   * The property is marked as private.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {boolean}
   */
  private = true;

  /**
   * The URL to the help page for git-subrepo on GitHub.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  helpUrl = 'https://github.com/ingydotnet/git-subrepo';

  /**
   * Creates an instance of PushCmd.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param {GitSubrepoMain} subrepo The subrepo object passed to the constructor.
   */
  constructor(private subrepo: GitSubrepoMain) {}

  /**
   * Asynchronously reports the result of pushing a subdirectory to a subrepo.
   * @param subdirectory - The subdirectory to push.
   * @param flags - The flags to use when pushing.
   * @returns A string indicating the success of the push.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string[]} param0 An array of strings representing subdirectories
   * @param {*} param0.subdirectory The subdirectory to push to the subrepo
   * @param {string[]} flags An array of strings representing flags
   * @returns {unknown} This function asynchronously pushes changes in the subdirectory to the subrepository using git. It takes two parameters: an array of subdirectories and an array of flags. It returns a string indicating the success or failure of the operation.
   */
  async report([subdirectory]: string[], flags: string[]) {
    const res = await this.subrepo.push(subdirectory, flags);
    if (res) {
      return chalk.green('git subrepo push was successful');
    }
    return chalk.red('git subrepo push was unsuccessful');
  }
}
