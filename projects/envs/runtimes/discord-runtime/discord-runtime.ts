/*
 * Project: Eventiva
 * File: discord-runtime.ts
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/23/24, 11:57 PM
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
 * 2024 Eventiva - All Rights Reserved
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
 * along with this program. If not, please write to: licensing@eventiva.co.uk,
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

import { HarmonyRuntimeContext, Runtime, RuntimeBuildContext } from '@bitdev/harmony.harmony-platform'
import { NodeServer } from '@bitdev/node.node-server'
// import { NodeApp } from '@bitdev/node.node-app';
import { AppBuildResult, ApplicationInstance } from '@teambit/application'
import { pathToFileURL } from 'node:url'
import { DiscordRuntimeOptions } from './discord-runtime-options.js'

/**
 * basic implementation of the Harmony backend runtime.
 */
export class DiscordRuntime implements Runtime {
  /**
   * Creates an instance of DiscordRuntime.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @constructor
   * @param {DiscordRuntimeOptions} [options={}]
   */
  constructor(private options: DiscordRuntimeOptions = {}) {}

  /**
   * The name property represents the value 'discord'.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @type {string}
   */
  name = 'discord';

  /**
   * The default value for this property is 'main'.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @type {string}
   */
  fallback = 'main';

  /**
   * Specifies whether to force run the operation or not. Default value is false.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @type {boolean}
   */
  forceRun = false;

  /**
   * A boolean flag indicating whether to force running a build process.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @type {boolean}
   */
  forceRunBuild = true;

  /**
   * A tuple representing a port range. The first element is the start port number and the second element is the end port number. Default value is [5001, 5010].
   * @author Jonathan Stevens (TGTGamer)
   *
   * @type {[number, number]}
   */
  portRange: [number, number] = [5001, 5010];

  /**
   * The property stores the resolved path to the 'discord-runtime.aspect.js' file using the import.meta.resolve method.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @type {*}
   */
  runtimeAspect = import.meta.resolve('./discord-runtime.aspect.js');

  /**
   * Creates an AppType using the provided runnerPath and appName. Converts the runnerPath to a file URL and creates a NodeServer with the specified properties such as name, mainPath, and artifactName. Returns the created NodeServer AppType.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @private
   * @param {string} runnerPath The path to the runner file
   * @param {string} appName The name of the app
   * @returns {*} Creates an application type using the provided runner path and application name. Returns a NodeServer instance with the specified name, main path, artifact name, and other options.
   */
  private createAppType(runnerPath: string, appName: string) {
    const path = pathToFileURL(runnerPath).toString();
    const nodeApp = NodeServer.from({
      name: this.name,
      mainPath: path,
      artifactName: `${appName}-${this.name}`,
      ...this.options,
    });

    return nodeApp;
  }

  /**
   * Gets the metadata based on the provided RuntimeBuildContext. Creates an app type using the runner path and app name from the context. Returns an object containing the name, output directory, and executable file of the app type.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @param {RuntimeBuildContext} context The RuntimeBuildContext parameter
   * @returns {{ name: any; outputDir: any; execFile: any; }} Gets metadata based on the provided RuntimeBuildContext.
   */
  getMetadata(context: RuntimeBuildContext) {
    const appType = this.createAppType(
      context.runnerPath,
      context.appName
    );
    return {
      name: appType.name,
      outputDir: appType.outputDir,
      execFile: appType.bundleFileName,
    };
  }

  /**
   * Asynchronously runs the given HarmonyRuntimeContext to create and run an ApplicationInstance. It creates an ApplicationType using the provided runnerPath and appName from the context. Then, it runs the created ApplicationType with the context and returns the resulting ApplicationInstance Promise.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @async
   * @param {HarmonyRuntimeContext} context The HarmonyRuntimeContext parameter
   * @returns {Promise<ApplicationInstance>} Asynchronously runs the HarmonyRuntimeContext and returns a Promise of type ApplicationInstance.
   */
  async run(context: HarmonyRuntimeContext): Promise<ApplicationInstance> {
    const appType = this.createAppType(context.runnerPath, context.appName);
    const appInstance = await appType.run(context);
    return appInstance;
  }

  /**
   * Asynchronously builds an application using the provided RuntimeBuildContext and returns a Promise that resolves to the AppBuildResult.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @async
   * @param {RuntimeBuildContext} context A RuntimeBuildContext object
   * @returns {Promise<AppBuildResult>} Asynchronously builds an application using the given runtime build context. Returns a Promise that resolves to an AppBuildResult.
   */
  async build(context: RuntimeBuildContext): Promise<AppBuildResult> {
    const appType = this.createAppType(context.runnerPath, context.appName);
    const appInstance = await appType.build(context);
    return appInstance;
  }

  /**
   * Creates a new instance of DiscordRuntime with the specified options. If no options are provided, an empty object is used as the default.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @static
   * @param {DiscordRuntimeOptions} [options={}]
   * @returns {DiscordRuntime} Creates a new DiscordRuntime instance with the provided options. If no options are provided, an empty object will be used as the default.
   */
  static from(options: DiscordRuntimeOptions = {}) {
    return new DiscordRuntime(options);
  }
}
