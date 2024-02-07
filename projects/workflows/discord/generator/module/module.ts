/**
* @format
* -----
* Project: @eventiva/eventiva
* File: module.ts
* Path: \projects\workflows\discord\generator\module\module.ts
* Created Date: Sunday, February 4th 2024
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

import { ComponentFile, ComponentContext, ComponentTemplate } from "@teambit/generator";
import { ComponentID } from '@teambit/component-id';
import { Logger } from '@teambit/logger';
import prompts from 'prompts';
import { EnvContext } from "@teambit/envs";
import { indexFile } from "./files/index-template.js";
import { HarmonyTemplatesOptions } from "@bitdev/harmony.generators.harmony-templates";
import { runtimeFile } from "./files/aspect-runtime.js";
import { configFile } from "./files/config-template.js";
import { aspectFile } from "./files/aspect-template.js";
import { ModuleUserInput } from "./module-user-input.js";
import { slotFile } from "./files/slot-template.js";
import { docsFile } from "./files/docs-template.js";
import { testFile } from "./files/test-template.js";
import { defaultRuntimes } from "./default-runtimes.js";

/**
 * Options for creating an aspect template.
 * - `name`: The name of the aspect template.
 * - `description`: The description of the aspect template.
 * - `hidden`: Whether the aspect template is hidden.
 * - `options`: The options for the HarmonyBot generator.
 * - `interactive`: Whether the aspect template is interactive.
 * - `env`: The environment for the aspect template.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 */
export type moduleTemplateOptions = {
  name?: string,
  description?: string,
  hidden?: boolean,
  options?: HarmonyTemplatesOptions,
  interactive?: boolean,
  env?: string
}; 

/**
 * The moduleTemplate class is a component template that allows you to create an module and compose it to your harmony platform.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class
 * @implements {ComponentTemplate}
 */
export class ModuleComponentTemplate implements ComponentTemplate {
  /**
   * Creates an instance of moduleTemplate.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param logger The logger instance for logging messages
   * @param [name='module']
   * @param [description='create an module, and compose to your harmony platform']
   * @param [hidden=false]
   * @param [env]
   * @param [options={}]
   * @param [interactive=true]
   * @param [installMissingDeps=true]
   */
  constructor(
    private logger: Logger,
    readonly name = 'discordjs-module',
    readonly description = 'create an discord.js module',
    readonly hidden = false,
    readonly env?: string,
    readonly options: HarmonyTemplatesOptions = {},
    readonly interactive = true,
    readonly installMissingDeps = true
  ) {}

  /**
   * Asynchronously generates files for a component.
   * The function takes a ComponentContext as input and returns a Promise<ComponentFile[]>.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @async
   * @param context The component context
   * @returns Asynchronously generates files for a component based on the provided context.
   */
  async generateFiles(context: ComponentContext): Promise<ComponentFile[]> {
    this.logger.off();
    const configRuntimes = this.options.runtimes || defaultRuntimes;
    const runtimeNames = configRuntimes?.map((runtime) => runtime.name);
    const userInput: ModuleUserInput = this.interactive
      ? await this.prompt(context.componentId, runtimeNames)
      : {};

    const runtimes = !userInput.runtimes 
      ? configRuntimes
      : configRuntimes.filter((runtime) => {
        return userInput.runtimes!.includes(runtime.name);
      });

    const userRuntimeNames = runtimes.map((runtime) => {
      return runtime.name;
    });

    const slots = userInput.slots?.filter(slot => !!slot) || [];

    const runtimeFiles = runtimes?.flatMap((runtime) => {
      const userFiles = runtime.files ? runtime.files(context) : [];
      return [runtimeFile(context, runtime, slots || []), ...userFiles];
    }) || [];

    const testFiles = runtimes?.map((runtime) => {
      return testFile(context, runtime.name);
    }) || [];

    const slotFiles = slots?.map((slot) => slotFile(slot)) || [];
    const docsContent = this.options.docsFile
      ? this.options.docsFile(context)
      : docsFile(context);

    return [
      indexFile(context, this.options, userRuntimeNames),
      aspectFile(context),
      configFile(context),
      docsContent,
      ...testFiles,
      ...runtimeFiles,
      ...slotFiles
    ];
  }


  /**
   * Prompts the user to select runtimes to support for a given component ID and enter integration slots.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @private
   * @async
   * @param componentId The ID of the component
   * @param runtimes An array of runtimes
   * @returns Prompts the user to select runtimes to support and enter integration slots for a component.
   */
  private async prompt(componentId: ComponentID, runtimes: string[]) {
    const userInput = await prompts([
      {
        name: 'runtimes',
        type: 'multiselect',
        instructions: false,
        onState: ({ aborted }) => {
          if (aborted) {
            console.error('\naborted module creation');
            process.exit(1);
          }
        },
        message: `select runtimes to support for "${componentId.name}"`,
        choices: runtimes?.map((runtime) => {
          return {
            title: runtime,
            value: runtime
          }
        })
      },
      {
        name: 'slots',
        type: 'list',
        message: `enter integration slots (e.g. "route,menu-item") for "${componentId.name}"`,
      },
    ]);

    return userInput;
  }

  /**
   * Creates a new instance of moduleTemplate using the provided options. If no options are provided, default options will be used.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   * @param [options={}]
   * @returns Creates an instance of moduleTemplate with the provided options.
   */
  static from(options: moduleTemplateOptions = {}) {
    return (context: EnvContext) => {
      const logger = context.createLogger(ModuleComponentTemplate.name);
      return new ModuleComponentTemplate(
        logger,
        options.name,
        options.description,
        options.hidden,
        options.env,
        options.options,
        options.interactive,
      );
    };
  }
}
