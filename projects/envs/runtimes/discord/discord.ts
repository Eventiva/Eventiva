/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: discord.ts
 * Path: /projects/envs/runtimes/discord/discord.ts
 * Created Date: Sunday, March 17th 2024
 * Author: Jonathan Stevens (Email: jonathan@resnovas.com
 * Github: https://github.com/TGTGamer)
 * -----
 * Contributing: Please read through our contributing guidelines.
 * Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, version 2.0.
 * Please interact in ways that contribute to an open, welcoming, diverse,
 * inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 * -----
 * Copyright (c) 2024 Resnovas - All Rights Reserved
 * LICENSE: GNU General Public License v2.0 or later (GPL-2.0-or-later)
 * -----
 * This program has been provided under confidence of the copyright holder and
 * is licensed for copying, distribution and modification under the terms
 * of the GNU General Public License v2.0 or later (GPL-2.0-or-later)
 * published as the License, or (at your option) any later
 * version of this license.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
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

import type { AppBuildResult } from "@teambit/application";
import { pathToFileURL } from 'node:url';
import { NodeApp } from '@bitdev/node.node-app';
import { HarmonyRuntimeContext, RuntimeBuildContext, Runtime } from "@bitdev/harmony.harmony-platform";
import { DiscordDef } from "./discord-definition.js";

/**
 * The Discord class represents a Discord object that implements the Runtime interface. It contains properties related to DiscordDef, runtime aspects, and methods for creating and running application types within a Harmony runtime context. The class includes a private method for creating an app type and async methods for running and building app instances based on the provided context.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @export
 * @class Discord
 * @typedef {Discord}
 * @implements {Runtime}
 */
export class Discord implements Runtime {
  /**
   * The property represents the name attribute of a DiscordDef object.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @type {*}
   */
  name = DiscordDef.name;

  /**
   * The runtimeAspect property stores the resolved path of the 'discord.aspect.js' module using the import.meta.resolve function.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @type {*}
   */
  runtimeAspect = import.meta.resolve('./discord.aspect.js');

  /**
   * A private function that creates an app type based on the provided runner path and app name. It runs the app and utilizes pre-made app types for Webpack, Vite, SSR, ESBuild, and more from the specified URL reference. Returns a NodeApp instance with the provided app name, main path, and artifact name.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @private
   * @param {string} runnerPath The path to the runner
   * @param {string} appName The name of the app
   * @returns {*} Creates a new application type instance for the specified runner path and application name. The function generates a NodeApp instance with the provided details and returns it.
   */
  private createAppType(runnerPath: string, appName: string) {
    // run your app
    // you can ready made use app types for Webpack, Vite, SSR, ESBuild and more.
    // https://bit.dev/reference/apps/create-apps
    const path = pathToFileURL(runnerPath).toString();

    const nodeApp = NodeApp.from({
      name: this.name,
      mainPath: path,
      artifactName: `${appName}-${this.name}`
    });

    return nodeApp;
  }

  /**
   * Runs the given Harmony runtime context asynchronously. It creates an application type using the provided runner path and app name. Then, it runs the created application type with the given context and returns the resulting app instance.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @async
   * @param {HarmonyRuntimeContext} context The HarmonyRuntimeContext parameter
   * @returns {unknown} Asynchronously creates and runs an app instance using the provided HarmonyRuntimeContext and returns the app instance.
   */
  async run(context: HarmonyRuntimeContext) {
    const appType = this.createAppType(context.runnerPath, context.appName);
    const appInstance = await appType.run(context);
    return appInstance;
  }

  /**
   * Async function that builds an app instance based on the provided context. It creates an app type using the runner path and app name from the context, then builds the app instance using the created app type. Returns a promise that resolves to the built app instance.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @async
   * @param {RuntimeBuildContext} context An instance of RuntimeBuildContext
   * @returns {Promise<AppBuildResult>} Asynchronously builds an application using the provided RuntimeBuildContext and returns a Promise that resolves to an AppBuildResult.
   */
  async build(context: RuntimeBuildContext): Promise<AppBuildResult> {
    const appType = this.createAppType(context.runnerPath, context.appName);
    const appInstance = await appType.build(context);
    return appInstance;
  }
}
