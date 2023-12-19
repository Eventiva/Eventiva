/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: clone.cmd.ts
 * Path: \projects\workflows\git-subrepo\clone.cmd.ts
 * Created Date: Tuesday, December 19th 2023
 * Author: Jonathan Stevens (Email: jonathan@resnovas.com, Github: https://github.com/TGTGamer)
 * -----
 * Contributing: Please read through our contributing guidelines. Included are directions for opening
 * issues, coding standards, and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 * 
 * Code of Conduct: This project abides by the Contributor Covenant, version 2.0. Please interact in ways that contribute to an open,
 * welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 * -----
 * Copyright (c) 2023 Resnovas - All Rights Reserved
 * LICENSE: Creative Commons Zero v1.0 Universal (CC0-1.0)
 * -----
 * This program has been provided under confidence of the copyright holder and is 
 * licensed for copying, distribution and modification under the terms of
 * the Creative Commons Zero v1.0 Universal (CC0-1.0) published as the License,
 * or (at your option) any later version of this license.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * Creative Commons Zero v1.0 Universal for more details.
 * 
 * You should have received a copy of the Creative Commons Zero v1.0 Universal
 * along with this program. If not, please write to: jonathan@resnovas.com,
 * or see https://creativecommons.org/publicdomain/zero/1.0/legalcode
 * 
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE - PLEASE SEE THE LICENSE FILE FOR DETAILS
 * -----
 * Last Modified: 19-12-2023
 * By: Jonathan Stevens (Email: jonathan@resnovas.com, Github: https://github.com/TGTGamer)
 */

import { Command, CommandOptions } from '@teambit/cli';
import chalk from 'chalk';
import { GitSubrepoMain } from './git-subrepo.main.runtime';

const COMMAND_NAME = 'merge-bitmaps';

export class MergeBitmapsCmd implements Command {
  name = `${COMMAND_NAME} <ancestor> <current> <other>`;
  alias = '';
  description = `a special command to merge conflicting bitmap files during git merge`;
  options = GitSubrepoMain.subrepoOptions;
  group = 'git';
  commands: Command[] = [];
  private = true;
  helpUrl = 'https://github.com/ingydotnet/git-subrepo';

  constructor(private subrepo: GitSubrepoMain) {}

  async report([repository, subdirectory]: string[]) {
    const res = await this.subrepo.clone(repository, subdirectory);
    if (res) {
      return chalk.green('git subrepo clone was successful');
    }
    return chalk.red('git subrepo clone was unsuccessful');
  }
}