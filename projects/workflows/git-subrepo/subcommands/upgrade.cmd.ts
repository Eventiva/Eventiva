/**
* @format
* -----
* Project: @eventiva/eventiva
* File: upgrade.cmd.ts
* Path: \projects\workflows\git-subrepo\subcommands\upgrade.cmd.ts
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
 * The name of the command to perform an upgrade operation.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {"upgrade"}
 */
const COMMAND_NAME = 'upgrade';

/**
 * UpgradeCmd class represents a command to upgrade the git-subrepo software itself.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class UpgradeCmd
 * @typedef {UpgradeCmd}
 * @implements {Command}
 */
export class UpgradeCmd implements Command {
  /**
   * The name of the command.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name = `${COMMAND_NAME}`;

  /**
   * The alias for a particular entity. It is a string value.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  alias = '';

  /**
   * Upgrade the git-subrepo software itself.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  description = `Upgrade the git-subrepo software itself. `;

  /**
   * The `options` property is a reference to the `subrepoOptions` object of the `subrepo` submodule.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {CommandOptions}
   */
  options = this.subrepo.subrepoOptions;

  /**
   * The group name for the 'git' repository.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  group = 'git';

  /**
   * An array of Command objects. Represents the list of commands.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {Command[]}
   */
  commands: Command[] = [];

  /**
   * Boolean flag indicating if the property is private or not.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {boolean}
   */
  private = true;

  /**
   * The URL to the help page for the property. It should point to the documentation or guide related to the usage of the property.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  helpUrl = 'https://github.com/ingydotnet/git-subrepo';

  /**
   * Creates an instance of UpgradeCmd.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param {GitSubrepoMain} subrepo The GitSubrepoMain object representing the subrepository.
   */
  constructor(private subrepo: GitSubrepoMain) {}

  /**
   * Upgrades the subrepo with the given flags and returns a colored message indicating the success or failure.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string[]} param0 An array of strings
   * @param {string[]} flags An array of strings
   * @returns {unknown} This function reports the result of upgrading a subrepository using git subrepo upgrade. It takes an array of strings as the first argument, and an array of strings as the second argument representing the flags to be used in the upgrade command. The function returns a string indicating the success or failure of the upgrade.
   */
  async report(flags: string[]) {
    const res = await this.subrepo.upgrade(flags);
    if (res) {
      return chalk.green('git subrepo upgrade was successful');
    }
    return chalk.red('git subrepo upgrade was unsuccessful');
  }
}
