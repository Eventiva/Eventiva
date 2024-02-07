/**
* @format
* -----
* Project: @eventiva/eventiva
* File: git-subrepo.main.runtime.ts
* Path: \projects\workflows\git-subrepo\git-subrepo.main.runtime.ts
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

import { CLIAspect, CLIMain, MainRuntime, CommandOptions } from '@teambit/cli';
import { WorkspaceAspect, Workspace } from '@teambit/workspace';
import { RuntimeDefinition, Aspect } from '@teambit/harmony';
import { spawnSync } from 'child_process';
import { GitSubrepoAspect } from './git-subrepo.aspect';
import { SubRepoCmd } from './subcommands/git-subrepo.cmd';
import { BranchCmd } from './subcommands/branch.cmd';
import { CleanCmd } from './subcommands/clean.cmd';
import { CloneCmd } from './subcommands/clone.cmd';
import { CommitCmd } from './subcommands/commit.cmd';
import { ConfigCmd } from './subcommands/config.cmd';
import { FetchCmd } from './subcommands/fetch.cmd';
import { HelpCmd } from './subcommands/help.cmd';
import { InitCmd } from './subcommands/init.cmd';
import { PullCmd } from './subcommands/pull.cmd';
import { PushCmd } from './subcommands/push.cmd';
import { StatusCmd } from './subcommands/status.cmd';
import { UpgradeCmd } from './subcommands/upgrade.cmd';
import { VersionCmd } from './subcommands/version.cmd';

/**
 * This class represents the main entry point for the Git Subrepo aspect. It provides various methods for managing subrepositories, such as cloning, initializing, pulling, pushing, fetching, branching, committing, checking status, cleaning, configuring, showing help, showing version, and upgrading.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class GitSubrepoMain
 * @typedef {GitSubrepoMain}
 */
export class GitSubrepoMain {
  /**
   * An array that contains the list of available slots.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   * @type {{}}
   */
  static slots = [];

  // define your aspect dependencies here.
  // in case you need to use another aspect API.
  /**
   * // define your aspect dependencies here.
   * // in case you need to use another aspect API.
   * static dependencies: Aspect[] = [CLIAspect, WorkspaceAspect];
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   * @type {Aspect[]}
   */
  static dependencies: Aspect[] = [CLIAspect, WorkspaceAspect];


  /**
   * The runtime property represents the current runtime of the application.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   * @type {RuntimeDefinition}
   */
  static runtime: RuntimeDefinition = MainRuntime;

  /**
   * This property represents the options available for the 'subrepoOptions' property. It is an array of command options, each option consisting of two elements: a short option and a long option. Each option has a description.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   * @type {CommandOptions}
   */
  public subrepoOptions: CommandOptions = [
    ['a', 'all', 'Perform command on all current subrepos'],
    ['A', 'ALL', 'Perform command on all subrepos and subsubrepos'],
    ['b', 'branch', 'Specify the upstream branch to push/pull/fetch'],
    ['e', 'edit', 'Edit commit message'],
    ['f', 'force', 'Force certain operations'],
    ['F', 'fetch', 'Fetch the upstream content first'],
    [
      'M',
      'method',
      'The --method option will decide how the join process between branches are performed. The default option is merge.',
    ],
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
    ['h', 'help', 'Show help'],
  ];

  /**
   * Creates an instance of GitSubrepoMain.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param {Workspace} workspace The workspace object that represents the current workspace.
   */
  constructor(private workspace: Workspace) { }

  /**
   * Creates a provider function that registers a GitSubrepoMain instance with a CLI instance and returns the instance.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   * @async
   * @param {[CLIMain, Workspace]} param0 An array containing the CLI and Workspace objects.
   * @param {CLIMain} param0.cli The CLI object.
   * @param {Workspace} param0.workspace The Workspace object.
   * @returns {unknown} This function is a static asynchronous method that takes an array of two parameters: cli of type CLIMain and workspace of type Workspace. It initializes a new instance of GitSubrepoMain using the workspace parameter. It then creates a new instance of SubRepoCmd and sets its commands property to an array containing instances of various command classes related to Git operations. Finally, it registers the subRepoCmd with the cli and returns the subMain instance.
   */
  static async provider([cli, workspace]: [CLIMain, Workspace]) {
    const subMain = new GitSubrepoMain(workspace);
    const subRepoCmd = new SubRepoCmd();
    subRepoCmd.commands = [
      new BranchCmd(subMain),
      new CleanCmd(subMain),
      new CloneCmd(subMain),
      new CommitCmd(subMain),
      new ConfigCmd(subMain),
      new FetchCmd(subMain),
      new HelpCmd(subMain),
      new InitCmd(subMain),
      new PullCmd(subMain),
      new PushCmd(subMain),
      new StatusCmd(subMain),
      new UpgradeCmd(subMain),
      new VersionCmd(subMain),
    ];
    cli.register(subRepoCmd);
    return subMain;
  }

  /**
   * Get the local path to this aspect
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @returns {*} Get the local path to this aspect
   */
  getAspectDirectory() {
    // get the local path to this aspect
    return __dirname;
  }

  /**
   * Get the root path of the workspace.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @returns {*} Returns the root path of the workspace.
   */
  getWorkspaceRoot() {
    // get the root path of the workspace
    return this.workspace.path;
  }

  /**
   * Executes a command with the given arguments using git-subrepo. The command is executed in a bash shell and the output is logged to the console. If an error occurs, it is logged to the console as well.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string} command The command to be executed.
   * @param {string[]} args The arguments for the command.
   * @returns {*} Runs a command with arguments using the git-subrepo library
   */
  async runCommand(command: string, args: string[]) {
    try {
      const cmd = `bash ${this.getAspectDirectory()}/cmd/lib/git-subrepo ${command} ${args.join(
        ' '
      )}`;
      const output = spawnSync(cmd, { stdio: 'inherit', shell: false });
      // eslint-disable-next-line no-console
      console.log(output);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error running command "${command}":`, error);
    }
  }

  /**
   * Asynchronously clones a repository into a subdirectory with optional flags.
   * Args:
   * - repository: The repository URL to clone.
   * - subdirectory: The subdirectory to clone the repository into.
   * - flags: Optional flags to be passed to the clone command.
   * Returns:
   * - The result of the clone operation.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string} repository The URL of the repository to clone.
   * @param {string} subdirectory The subdirectory in which to clone the repository.
   * @param {string[]} flags Optional flags to pass to the clone command.
   * @returns {unknown} Asynchronously clones a repository into a subdirectory using the 'git clone' command.
   */
  async clone(repository: string, subdirectory: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the clone command and the repository and subdirectory arguments

    return spawnSync(
      `clone ${repository} ${this.getWorkspaceRoot}/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''
      }`,
      { stdio: 'inherit', shell: false }
    );
  }

  /**
   * Asynchronously initializes a subdirectory with git-subrepo. Executes the sh file located at projectsworkflows\git-subrepo\cmd\lib\git-subrepo with the init command, passing the given subdirectory and flags as arguments. Returns the result of the execution.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string} subdirectory The subdirectory where the init command will be executed.
   * @param {string[]} flags An array of flags for the init command.
   * @returns {unknown} Asynchronously initializes a subdirectory with git-subrepo.
   */
  async init(subdirectory: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the init command
    return spawnSync(
      `${this.getAspectDirectory()}/cmd/lib/git-subrepo init ${this.getWorkspaceRoot
      }/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''}`,
      { stdio: 'inherit', shell: false }
    );
  }

  /**
   * Executes the pull command for a subdirectory with optional flags. The pull command is executed synchronously using the `sh` file located at projects/workflows/git-subrepo/cmd/lib/git-subrepo. The subdirectory argument specifies the subdirectory to pull from. The `flags` argument is an array of optional flags. If `flags` is an array, it will be joined with a space delimiter.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string} subdirectory The subdirectory of the git repository to pull changes from
   * @param {string[]} flags An array of additional flags to pass to the pull command
   * @returns {unknown} Asynchronously pulls changes from a subdirectory using the git-subrepo command.
   */
  async pull(subdirectory: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the pull command and the subdirectory argument
    return spawnSync(
      `${this.getAspectDirectory()}/cmd/lib/git-subrepo pull ${this.getWorkspaceRoot
      }/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''}`,
      { stdio: 'inherit', shell: false }
    );
  }

  /**
   * Executes the push command for the git-subrepo tool in a specified subdirectory with additional flags.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string} subdirectory The subdirectory path where the git subrepo is located.
   * @param {string[]} flags An array of additional flags for the push command.
   * @returns {unknown} This function executes the push command for the git-subrepo tool on the specified subdirectory with the given flags.
   */
  async push(subdirectory: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the push command and the subdirectory argument
    return spawnSync(
      `${this.getAspectDirectory()}/cmd/lib/git-subrepo pu${this.getWorkspaceRoot
      }/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''}`,
      { stdio: 'inherit', shell: false }
    );
  }

  /**
   * Executes the fetch command of the git-subrepo library on the specified subdirectory.
   * @param subdirectory - The subdirectory on which to run the fetch command.
   * @param flags - An optional array of flags to pass to the fetch command.
   * @returns The output of the fetch command.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string} subdirectory The subdirectory to fetch from
   * @param {string[]} flags An array of flags to pass to the fetch command
   * @returns {unknown} Fetches the specified subdirectory using the Git Subrepo tool.
   */
  async fetch(subdirectory: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the fetch command and the subdirectory argument
    return spawnSync(
      `${this.getAspectDirectory()}/cmd/lib/git-subrepo fetch ${this.getWorkspaceRoot
      }/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''}`,
      { stdio: 'inherit', shell: false }
    );
  }

  /**
   * Executes the `branch` command of the `git-subrepo` library for the specified `subdirectory` and with the provided `flags`. Returns the result of the command execution.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string} subdirectory The subdirectory in the workspace.
   * @param {string[]} flags An array of flags to pass to the `branch` command.
   * @returns {unknown} Executes the branch command of the git-subrepo library on a specified subdirectory with optional flags. Returns the result of the command execution.
   */
  async branch(subdirectory: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the branch command and the subdirectory argument
    return spawnSync(
      `${this.getAspectDirectory()}/cmd/lib/git-subrepo branch ${this.getWorkspaceRoot
      }/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''}`,
      { stdio: 'inherit', shell: false }
    );
  }

  /**
   * Executes the commit command using the git-subrepo library. The commit is performed in the specified subdirectory with the given flags. Returns the result of the commit operation.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string} subdirectory The subdirectory path to commit changes
   * @param {string[]} flags An array of flags to pass to the commit command
   * @returns {unknown} Performs a git commit in the specified subdirectory
   */
  async commit(subdirectory: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the commit command and the subdirectory argument
    return spawnSync(
      `${this.getAspectDirectory()}/cmd/lib/git-subrepo commit ${this.getWorkspaceRoot
      }/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''}`,
      { stdio: 'inherit', shell: false }
    );
  }

  /**
   * Executes the git-subrepo status command with the specified subdirectory and flags.
   * @param {string} subdirectory - The subdirectory argument for the status command.
   * @param {string[]} flags - The flags for the status command.
   * @returns {Promise<void>} - A Promise that resolves when the status command is executed.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string} subdirectory The subdirectory to run the status command in
   * @param {string[]} flags An array of flags to pass to the status command
   * @returns {unknown} Executes the status command for a given subdirectory using `git-subrepo`.
   */
  async status(subdirectory: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the status command and the subdirectory argument
    return spawnSync(
      `${this.getAspectDirectory()}/cmd/lib/git-subrepo status ${this.getWorkspaceRoot
      }/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''}`,
      { stdio: 'inherit', shell: false }
    );
  }

  /**
   * Executes the clean command of the sh file located at projects/workflows/git-subrepo/cmd/lib/git-subrepo, with the specified subdirectory and flags.
   * - param subdirectory: The subdirectory to run the clean command on.
   * - param flags: An array of additional flags to be passed to the clean command.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string} subdirectory The subdirectory to clean
   * @param {string[]} flags Optional flags to pass to the clean command
   * @returns {unknown} Cleans the specified subdirectory using the 'git-subrepo' command with the 'clean' command and the specified flags.
   */
  async clean(subdirectory: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the clean command and the subdirectory argument
    return spawnSync(
      `${this.getAspectDirectory()}/cmd/lib/git-subrepo clean ${this.getWorkspaceRoot
      }/${subdirectory} ${Array.isArray(flags) ? flags.join(' ') : ''}`,
      { stdio: 'inherit', shell: false }
    );
  }

  /**
   * Executes a synchronous command to configure a git subrepo.
   * @param {string} subdirectory - The subdirectory of the workspace to configure.
   * @param {string} option - The configuration option to set.
   * @param {string} value - The value to set for the configuration option.
   * @param {string[]} flags - An optional array of flags to include in the command.
   * @returns {string} - The output of the command.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string} subdirectory The subdirectory to run the config command in
   * @param {string} option The configuration option to set
   * @param {string} value The value to set for the configuration option
   * @param {string[]} flags An array of additional flags to pass to the config command
   * @returns {unknown} Configures a git subrepository with the specified option, value, and flags in the given subdirectory.
   */
  async config(
    subdirectory: string,
    option: string,
    value: string,
    flags: string[]
  ) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the config command and the subdirectory argument
    return spawnSync(
      `${this.getAspectDirectory()}/cmd/lib/git-subrepo config ${this.getWorkspaceRoot
      }/${subdirectory} ${option} ${value} ${Array.isArray(flags) ? flags.join(' ') : ''
      }`,
      { stdio: 'inherit', shell: false }
    );
  }

  /**
   * Executes a help command for the `git-subrepo` library.
   * - `command`: The help command to be executed.
   * - `flags`: An array of flags to be passed to the command.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string} command The command to get help for.
   * @param {string[]} flags Optional flags to pass to the help command.
   * @returns {unknown} Executes the help command for a given command and flags using the git-subrepo library.
   */
  async help(command: string, flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the help command
    return spawnSync(
      `${this.getAspectDirectory()}/cmd/lib/git-subrepo help ${command} ${Array.isArray(flags) ? flags.join(' ') : ''
      }`,
      { stdio: 'inherit', shell: false }
    );
  }

  /**
   * Executes the version command of the git-subrepo library synchronously.
   * The command is executed by synchronously running the sh file located at projectsworkflows\git-subrepo\cmd\lib\git-subrepo with the version command.
   * @param flags - An array of strings representing optional flags to be passed to the version command.
   * @returns The output of the version command.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string[]} flags An array of string flags.
   * @returns {unknown} Executes the version command of the `git-subrepo` CLI tool. Returns the output of the command execution as a string.
   */
  async version(flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the version command
    return spawnSync(
      `bash ${this.getAspectDirectory()}/cmd/lib/git-subrepo version ${Array.isArray(flags) ? flags.join(' ') : ''
      }`,
      { stdio: 'inherit', shell: false }
    );
  }

  /**
   * Executes a synchronous shell command to upgrade the git-subrepo library.
   * @param {string[]} flags - An optional array of flags to pass to the upgrade command.
   * @return {Promise<void>} - A promise that resolves when the command is executed.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param {string[]} flags An array of strings representing the upgrade flags
   * @returns {unknown} Asynchronously upgrades a git-subrepo module.
   * @param flags The flags to pass to the upgrade command.
   * @returns A promise that resolves with the result of the upgrade command.
   */
  async upgrade(flags: string[]) {
    // exec sync the sh file located at projects\workflows\git-subrepo\cmd\lib\git-subrepo with the upgrade command
    return spawnSync(
      `${this.getAspectDirectory()}/cmd/lib/git-subrepo upgrade ${Array.isArray(flags) ? flags.join(' ') : ''
      }`,
      { stdio: 'inherit', shell: false }
    );
  }
}

GitSubrepoAspect.addRuntime(GitSubrepoMain);

export default GitSubrepoMain;
