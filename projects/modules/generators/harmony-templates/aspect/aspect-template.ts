/*
 * Project: Eventiva
 * File: aspect-template.ts
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

import { ComponentID } from '@teambit/component-id'
import { EnvContext } from '@teambit/envs'
import { ComponentContext, ComponentFile, ComponentTemplate } from '@teambit/generator'
import { Logger } from '@teambit/logger'
import prompts from 'prompts'
import { HarmonyTemplatesOptions } from '../harmony-templates-options.js'
import { AspectUserInput } from './aspect-user-input.js'
import { defaultRuntimes } from './default-runtimes.js'
import { runtimeFile } from './files/aspect-runtime.js'
import { aspectFile } from './files/aspect-template.js'
import { configFile } from './files/config-template.js'
import { docsFile } from './files/docs-template.js'
import { indexFile } from './files/index-template.js'
import { slotFile } from './files/slot-template.js'
import { testFile } from './files/test-template.js'

/**
 * An object representing the options for an Aspect Template.
 * The options include:
 * - name: a optional string representing the name of the Aspect Template.
 * - description: an optional string representing the description of the Aspect Template.
 * - hidden: an optional boolean indicating if the Aspect Template is hidden.
 * - options: an optional object of type HarmonyTemplatesOptions representing additional options.
 * - interactive: an optional boolean indicating if the Aspect Template is interactive.
 * - env: an optional string representing the environment of the Aspect Template.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @export
 * @typedef {AspectTemplateOptions}
 */
export type AspectTemplateOptions = {
  name?: string,
  description?: string,
  hidden?: boolean,
  options?: HarmonyTemplatesOptions,
  interactive?: boolean,
  env?: string
};

/**
 * Creates a new AspectTemplate instance with the provided options.
 * The options parameter is an object with the following properties:
 * - name: The name of the aspect template.
 * - description: The description of the aspect template.
 * - hidden: Indicates if the aspect template is hidden.
 * - env: The environment of the aspect template.
 * - options: Additional options for the aspect template.
 * - interactive: Indicates if the aspect template is interactive.
 * Returns a function that takes an EnvContext parameter and returns a new AspectTemplate instance initialized with the provided options.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @export
 * @class AspectTemplate
 * @typedef {AspectTemplate}
 * @implements {ComponentTemplate}
 */
export class AspectTemplate implements ComponentTemplate {
  /**
   * Creates an instance of AspectTemplate.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @constructor
   * @param {Logger} logger The logger instance for logging messages
   * @param {string} [name='aspect']
   * @param {string} [description='create an aspect, and compose to your harmony platform']
   * @param {boolean} [hidden=false]
   * @param {?string} [env]
   * @param {HarmonyTemplatesOptions} [options={}]
   * @param {boolean} [interactive=true]
   * @param {boolean} [installMissingDeps=true]
   */
  constructor(
    private logger: Logger,
    readonly name = 'aspect',
    readonly description = 'create an aspect, and compose to your harmony platform',
    readonly hidden = false,
    readonly env?: string,
    readonly options: HarmonyTemplatesOptions = {},
    readonly interactive = true,
    readonly installMissingDeps = true
  ) {}

  /**
   * Asynchronously generates component files based on the provided ComponentContext.
   * This function turns off the logger, retrieves the configuration runtimes from the options or uses default ones if not provided. It then retrieves the names of the runtimes. If interactive mode is enabled, it prompts the user for input. Filters the runtimes based on user input and maps the runtime names. Generates imports and config extensions based on runtime configurations. Filters out empty slots. Retrieves runtime files and test files based on the runtimes. Maps slot files and retrieves documentation content. Returns an array of ComponentFiles.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @async
   * @param {ComponentContext} context The context parameter
   * @returns {Promise<ComponentFile[]>} Generates an array of component files based on the provided ComponentContext. This function asynchronously generates files according to the specified runtimes, user input, and component configurations. Returns a Promise that resolves to an array of ComponentFile objects.
   */
  async generateFiles(context: ComponentContext): Promise<ComponentFile[]> {
    this.logger.off();
    const configRuntimes = this.options.runtimes || defaultRuntimes;
    const runtimeNames = configRuntimes?.map((runtime) => runtime.name);
    const userInput: AspectUserInput = this.interactive
      ? await this.prompt(context.componentId, runtimeNames)
      : {};

    const runtimes = !userInput.runtimes
      ? configRuntimes
      : configRuntimes.filter((runtime) => {
        return userInput?.runtimes?.includes(runtime.name);
      });

    const userRuntimeNames = runtimes.map((runtime) => {
      return runtime.name;
    });

    const configImports = runtimes.reduce<{imports?: string, configExtends?: string}>((acc, runtime) => {
      if (!runtime.imports) return acc;

      const runtimeImports = runtime.imports(context).map((imp) => {
        // only import if specifically defined in the runtime config
        if (typeof imp === 'string' || !imp[1].config) return undefined;
        return imp[0];
      }).join('\n');

      const config = runtime.configExtends ? runtime.configExtends?.(context) : undefined;
      const configExtends = typeof config === 'object' ? config[0] : config

      return {
        imports: acc.imports ? `${acc.imports}\n ${runtimeImports}` : runtimeImports,
        configExtends: acc.configExtends ? `${acc.configExtends}& ${configExtends}` : configExtends
      };
    }, {imports: '', configExtends: ''});

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
      configFile(context, configImports),
      docsContent,
      ...testFiles,
      ...runtimeFiles,
      ...slotFiles
    ];
  }


  /**
   * A private asynchronous function that prompts the user to select runtimes to support and enter integration slots for a given component. It takes the component ID and an array of runtimes as parameters. It returns the user input which includes the selected runtimes and integration slots.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @private
   * @async
   * @param {ComponentID} componentId The ID of the component
   * @param {string[]} runtimes An array of runtimes
   * @returns {unknown} Prompts the user to select runtimes to support for a specific component, and enter integration slots for the component. Returns the user input object containing the selected runtimes and integration slots.
   */
  private async prompt(componentId: ComponentID, runtimes: string[]) {
    const userInput = await prompts([
      {
        name: 'runtimes',
        type: 'multiselect',
        instructions: false,
        onState: ({ aborted }) => {
          if (aborted) {
            console.error('\naborted aspect creation');
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
   * Creates a new AspectTemplate instance with the provided options.
   * The options parameter is an object with the following properties:
   * - name: The name of the aspect template.
   * - description: The description of the aspect template.
   * - hidden: Indicates if the aspect template is hidden.
   * - env: The environment of the aspect template.
   * - options: Additional options for the aspect template.
   * - interactive: Indicates if the aspect template is interactive.
   * Returns a function that takes an EnvContext parameter and returns a new AspectTemplate instance initialized with the provided options.
   * @author Jonathan Stevens (TGTGamer)
   *
   * @static
   * @param {AspectTemplateOptions} [options={}]
   * @returns {(context: EnvContext) => AspectTemplate} Creates an AspectTemplate instance based on the provided options. Returns a function that takes an EnvContext as a parameter and returns a new AspectTemplate instance with the given logger, name, description, visibility flag, environment, additional options, and interactive flag.
   */
  static from(options: AspectTemplateOptions = {}) {
    return (context: EnvContext) => {
      const logger = context.createLogger(AspectTemplate.name);
      return new AspectTemplate(
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
