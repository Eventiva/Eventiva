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
 * Last Modified: 20-12-2023
 * By: Jonathan Stevens (Email: jonathan.stevens@eventiva.co.uk, Github: https://github.com/TGTGamer)
 */

import { GitSubrepoAspect } from './git-subrepo.aspect';
import { CLIAspect, CLIMain, MainRuntime, CommandOptions } from '@teambit/cli';
import { WorkspaceAspect, Workspace, BitmapMergeOptions } from '@teambit/workspace';
import { RuntimeDefinition, Aspect } from '@teambit/harmony';
import { execSync } from 'child_process';
import { SubRepoCmd } from './git-subrepo.cmd';
import { BranchCmd } from './branch.cmd';
import { CleanCmd } from './clean.cmd';
import { CloneCmd } from './clone.cmd';
import { CommitCmd } from './commit.cmd';
import { configCmd } from './config.cmd';
import { FetchCmd } from './fetch.cmd';
import { helpCmd } from './help.cmd';
import { InitCmd } from './init.cmd';
import { PullCmd } from './pull.cmd';
import { PushCmd } from './push.cmd';
import { StatusCmd } from './status.cmd';
import { UpgradeCmd } from './upgrade.cmd';
import { versionCmd } from './version.cmd';

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
    subRepoCmd.commands = [new BranchCmd(subMain), new CleanCmd(subMain), new CloneCmd(subMain), new CommitCmd(subMain), new configCmd(subMain), new FetchCmd(subMain), new helpCmd(subMain), new InitCmd(subMain), new PullCmd(subMain), new PushCmd(subMain), new StatusCmd(subMain), new UpgradeCmd(subMain), new versionCmd(subMain)];
    cli.register(subRepoCmd);
    return subMain;
  }

  getAspectDirectory() {
    // get the local path to this aspect
    return __dirname;
  }

  getWorkspaceRoot() {
    // get the root path of the workspace
    return this.workspace.path;
  }

  async runCommand(command: string, args: string[]) {
    try {
      const cmd = `bash ${this.getAspectDirectory()}/cmd/lib/git-subrepo ${command} ${args.join(' ')}`;
      const output = execSync(cmd, { stdio: 'inherit' });
      console.log(output);
    } catch (error) {
      console.error(`Error running command "${command}":`, error);
    }
  }

  async clone(repository: string, subdirectory: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the clone command and the repository and subdirectory arguments
    
    return execSync(`clone ${repository} ${this.getWorkspaceRoot}/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''}`, { stdio: 'inherit' });
  }

  async init(subdirectory: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the init command
    return execSync(`${this.getAspectDirectory()}/cmd/lib/git-subrepo init ${this.getWorkspaceRoot}/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''}`, { stdio: 'inherit' });
  }

  async pull(subdirectory: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the pull command and the subdirectory argument
    return execSync(`${this.getAspectDirectory()}/cmd/lib/git-subrepo pull ${this.getWorkspaceRoot}/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''}`, { stdio: 'inherit' });
  }

  async push(subdirectory: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the push command and the subdirectory argument
    return execSync(`${this.getAspectDirectory()}/cmd/lib/git-subrepo pu${this.getWorkspaceRoot}/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''}`, { stdio: 'inherit' });
  }

  async fetch(subdirectory: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the fetch command and the subdirectory argument
    return execSync(`${this.getAspectDirectory()}/cmd/lib/git-subrepo fetch ${this.getWorkspaceRoot}/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''}`, { stdio: 'inherit' });
  }

  async branch(subdirectory: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the branch command and the subdirectory argument
    return execSync(`${this.getAspectDirectory()}/cmd/lib/git-subrepo branch ${this.getWorkspaceRoot}/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''}`, { stdio: 'inherit' });
  }

  async commit(subdirectory: string, flags: string[]) { 
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the commit command and the subdirectory argument
    return execSync(`${this.getAspectDirectory()}/cmd/lib/git-subrepo commit ${this.getWorkspaceRoot}/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''}`, { stdio: 'inherit' });
  }

  async status(subdirectory: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the status command and the subdirectory argument
    return execSync(`${this.getAspectDirectory()}/cmd/lib/git-subrepo status ${this.getWorkspaceRoot}/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''}`, { stdio: 'inherit' });
  }
  
  async clean (subdirectory: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the clean command and the subdirectory argument
    return execSync(`${this.getAspectDirectory()}/cmd/lib/git-subrepo clean ${this.getWorkspaceRoot}/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''}`, { stdio: 'inherit' });
  }

  async config(subdirectory: string, option: string, value: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the config command and the subdirectory argument
    return execSync(`${this.getAspectDirectory()}/cmd/lib/git-subrepo config ${this.getWorkspaceRoot}/${subdirectory} ${option} ${value} ${Array.isArray(flags) ? flags.join(' ') : ''}`, { stdio: 'inherit' });
  }

  async help(command: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the help command
    return execSync(`${this.getAspectDirectory()}/cmd/lib/git-subrepo help ${command} ${Array.isArray(flags) ? flags.join(' ') : ''}`, { stdio: 'inherit' });
  }

  async version(flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the version command
    return execSync(`bash ${this.getAspectDirectory()}/cmd/lib/git-subrepo version ${Array.isArray(flags) ? flags.join(' ') : ''}`, { stdio: 'inherit' });
  }

  async upgrade(flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the upgrade command
    return execSync(`${this.getAspectDirectory()}/cmd/lib/git-subrepo upgrade ${Array.isArray(flags) ? flags.join(' ') : ''}`, { stdio: 'inherit' });
  }
}

GitSubrepoAspect.addRuntime(GitSubrepoMain);

export default GitSubrepoMain;
