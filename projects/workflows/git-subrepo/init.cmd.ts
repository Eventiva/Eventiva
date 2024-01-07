/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: init.cmd.ts
 * Path: \projects\workflows\git-subrepo\init.cmd.ts
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
 * The name of the command to initialize a project.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {"init"}
 */
const COMMAND_NAME = 'init';

/**
 * This class represents an 'InitCmd' command, which is used to turn a current subdirectory into a subrepo in Git. It implements the 'Command' interface.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class InitCmd
 * @typedef {InitCmd}
 * @implements {Command}
 */
export class InitCmd implements Command {
  /**
   * The name of the command, which is a string template containing variables. The `${COMMAND_NAME}` variable is replaced with the name of the command. The `<subdir>` parameter is a required argument representing a directory name. The `[-r <remote>]` option is an optional flag with an argument representing a remote name. The `[-b <branch>]` option is an optional flag with an argument representing a branch name. The `[--method <merge|rebase>]` option is an optional flag with an argument representing a merge or rebase method.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name = `${COMMAND_NAME} <subdir> [-r <remote>] [-b <branch>] [--method <merge|rebase>]`;

  /**
   * The alias of the object. An alias is an alternative name or nickname for the object.
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
   * The options for the subrepo, obtained from the subrepoOptions property of the parent object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {CommandOptions}
   */
  options = this.subrepo.subrepoOptions;

  /**
   * The group property represents the git group.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  group = 'git';

  /**
   * An array of Command objects representing the available commands. Initially, it is an empty array.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {Command[]}
   */
  commands: Command[] = [];

  /**
   * Indicates whether the property is private or not. If true, the property can only be accessed within the class or module in which it is defined.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {boolean}
   */
  private = true;

  /**
   * The URL for the help documentation of the property. It points to the GitHub repository containing the Git Subrepo documentation.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  helpUrl = 'https://github.com/ingydotnet/git-subrepo';

  /**
   * Creates an instance of InitCmd.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param {GitSubrepoMain} subrepo The Git subrepository being passed to the constructor.
   */
  constructor(private subrepo: GitSubrepoMain) {}

  /**
   * This async function initializes a subrepository using the given subdirectory and flags. It returns a success message if initialization is successful, and an error message otherwise.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string[]} param0 An array of strings representing subdirectories.
   * @param {*} param0.subdirectory A subdirectory as a string.
   * @param {string[]} flags An array of strings representing flags.
   * @returns {unknown} Initializes a git subrepository in the specified subdirectory with the given flags. Returns a success message if the initialization was successful, otherwise returns an error message.
   */
  async report([subdirectory]: string[], flags: string[]) {
    const res = await this.subrepo.init(subdirectory, flags);
    if (res) {
      return chalk.green('git subrepo init was successful');
    }
    return chalk.red('git subrepo init was unsuccessful');
  }
}
