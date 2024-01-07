/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: config.cmd.ts
 * Path: \projects\workflows\git-subrepo\config.cmd.ts
 * Created Date: Tuesday, December 19th 2023
 * Author: Jonathan Stevens (Email: jonathan.stevens@eventiva.co.uk, Github: https://github.com/TGTGamer)
 * -----
 * Contributing: Please read through our contributing guidelines. Included are directions for opening
 * issues, coding standards, and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, version 2.0. Please interact in ways that contribute to an open,
 * welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 * -----
 * Copyright (c) 2023 - 2024 Eventiva - All Rights Reserved
 * LICENSE: GNU General Public License v3.0 only (GPL-3.0)
 * -----
 * This program has been provided under confidence of the copyright holder and is
 * licensed for copying, distribution and modification under the terms of
 * the GNU General Public License v3.0 only (GPL-3.0) published as the License,
 * or (at your option) any later version of this license.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * Creative Commons Zero v1.0 Universal for more details.
 *
 * You should have received a copy of the GNU General Public License v3.0 only
 * along with this program. If not, please write to: jonathan.stevens@eventiva.co.uk,
 * or see https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE - PLEASE SEE THE LICENSE FILE FOR DETAILS
 * -----
 * Last Modified: Sat Jan 06 2024
 * By: Jonathan Stevens (Email: jonathan.stevens@eventiva.co.uk, Github: https://github.com/TGTGamer)
 */

import { Command } from '@teambit/cli';
import chalk from 'chalk';
import type { GitSubrepoMain } from './git-subrepo.main.runtime';

/**
 * The name of the command, 'config'.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {"config"}
 */
const COMMAND_NAME = 'config';

/**
 * Read or update configuration values in the subdir/.gitrepo file.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class configCmd
 * @typedef {ConfigCmd}
 * @implements {Command}
 */
export class ConfigCmd implements Command {
  /**
   * The name property represents the command name with its corresponding parameters and options. It follows a specific format: `${COMMAND_NAME} <subdir> <option> [<value>] [-f]`. The `COMMAND_NAME` placeholder is replaced with the actual command name. The `<subdir>` parameter represents the subdirectory where the command will be executed. The `<option>` parameter represents a command option. The `[<value>]` parameter is optional and represents a value associated with the command. The `[-f]` option is also optional and can be used to force execution without prompting for confirmation.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name = `${COMMAND_NAME} <subdir> <option> [<value>] [-f]`;

  /**
   * The alias for the property, an optional string that can be used as an alternate name or identifier.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  alias = '';

  /**
   * Read or update configuration values in the subdir/.gitrepo file.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  description = `Read or update configuration values in the subdir/.gitrepo file.`;

  /**
   * The options for the subrepo, which includes various configuration settings.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {CommandOptions}
   */
  options = this.subrepo.subrepoOptions;

  /**
   * The group property specifies the group to which the item belongs. The value of this property is 'git', indicating that the item is related to the Git system.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  group = 'git';

  /**
   * An array of Command objects. Represents the list of commands that can be executed.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {Command[]}
   */
  commands: Command[] = [];

  /**
   * Indicates whether the property is private or not.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {boolean}
   */
  private = true;

  /**
   * The help URL for this property. It points to the GitHub repository where more information about git-subrepo can be found.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  helpUrl = 'https://github.com/ingydotnet/git-subrepo';

  /**
   * Creates an instance of configCmd.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param {GitSubrepoMain} subrepo The Git subrepo instance.
   */
  constructor(private subrepo: GitSubrepoMain) {}

  /**
   * Asynchronously configures a subrepo by setting a specified option to a specified value within a specified subdirectory.
   * The function takes an array of strings containing the subdirectory, option, and value.
   * The function also takes an array of strings containing flags to be passed to the 'config' command.
   * If the configuration is successful, it returns a green success message. Otherwise, it returns a red error message.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string[]} param0 An array of strings containing the subdirectory, option, and value
   * @param {*} param0.subdirectory The subdirectory to which the configuration applies
   * @param {*} param0.option The configuration option to set
   * @param {*} param0.value The value to set for the configuration option
   * @param {string[]} flags An array of strings representing additional flags
   * @returns {unknown} A function that reports the configuration of a subdirectory in a git subrepo
   */
  async report([subdirectory, option, value]: string[], flags: string[]) {
    const res = await this.subrepo.config(subdirectory, option, value, flags);
    if (res) {
      return chalk.green('git subrepo config was successful');
    }
    return chalk.red('git subrepo config was unsuccessful');
  }
}
