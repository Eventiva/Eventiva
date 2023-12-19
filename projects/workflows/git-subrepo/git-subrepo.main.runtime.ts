/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: git-subrepo.main.runtime.ts
 * Path: \projects\workflows\git-subrepo\git-subrepo.main.runtime.ts
 * Created Date: Tuesday, December 19th 2023
 * Author: Jonathan Stevens (Email: jonathan.stevens@eventiva.co.uk, Github: https://github.com/TGTGamer)
 * -----
 * Contributing: Please read through our contributing guidelines. Included are directions for opening
 * issues, coding standards, and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 * 
 * Code of Conduct: This project abides by the Contributor Covenant, version 2.0. Please interact in ways that contribute to an open,
 * welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 * -----
 * Copyright (c) 2023 Eventiva - All Rights Reserved
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
 * Last Modified: 19-12-2023
 * By: Jonathan Stevens (Email: jonathan.stevens@eventiva.co.uk, Github: https://github.com/TGTGamer)
 */

import { GitSubrepoAspect } from './git-subrepo.aspect';
import { CLIAspect, CLIMain, MainRuntime, CommandOptions } from '@teambit/cli';
import { WorkspaceAspect, Workspace, BitmapMergeOptions } from '@teambit/workspace';
import { RuntimeDefinition, Aspect } from '@teambit/harmony';
import { execSync } from 'child_process';
import { SubRepoCmd } from './git-subrepo.cmd';

export class GitSubrepoMain {
  static slots = [];
  // define your aspect dependencies here.
  // in case you need to use another aspect API.
  static dependencies: Aspect[] = [CLIAspect, WorkspaceAspect];;

  static runtime: RuntimeDefinition = MainRuntime;

  static subrepoOptions: CommandOptions = [
    ['a', 'all', 'Perform command on all current subrepos'],
    ['A', 'ALL', 'Perform command on all subrepos and subsubrepos'],
    ['b', 'branch', 'Specify the upstream branch to push/pull/fetch'],
    ['e', 'edit', 'Edit commit message'],
    ['f', 'force', 'Force certain operations'],
    ['F', 'fetch', 'Fetch the upstream content first'],
    ['M', 'method', 'The --method option will decide how the join process between branches are performed. The default option is merge.'],
    ['m', 'message', 'Specify a commit message'],
    ['file', 'file', 'Specify a commit message file'],
    ['r', 'remote', 'Specify the upstream remote to push/pull/fetch'],
    ['s', 'squash', 'Squash commits on push'],
    ['u', 'update', 'Add the --branch and/or --remote overrides to .gitrepo'],
    ['q', 'quiet', 'Show minimal output'],
    ['v', 'verbose', 'Show verbose output'],
    ['V', 'version', 'Show version'],
    ['d', 'debug', 'Show the actual commands used'],
    ['x', 'DEBUG', 'Turn on -x Bash debugging'], 
    ['h', 'help', 'Show help']
  ]

  constructor(
    private workspace: Workspace
  ) {}

  static async provider([cli, workspace]: [CLIMain, Workspace]) {
    const subMain = new GitSubrepoMain(workspace);
    const subRepoCmd = new SubRepoCmd();
    // subRepoCmd.commands = [new SetGitMergeDriverCmd(gitMain), new MergeBitmapsCmd(gitMain)];
    cli.register(subRepoCmd);
    return subMain;
  }

  async clone(repository: string, subdirectory: string) {
    // exec git subrepo clone <repository> <subdirectory> with options
    return execSync(`git subrepo clone ${repository} ${subdirectory}`);
  }
}

GitSubrepoAspect.addRuntime(GitSubrepoMain);

export default GitSubrepoMain;
