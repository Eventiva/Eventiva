/*
 * Project: Eventiva
 * File: harmony-templates-options.ts
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/23/24, 11:56 PM
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

import type { EnvHandler } from '@teambit/envs'
import type { ComponentContext, ComponentFile, ComponentTemplate } from '@teambit/generator'


/**
 * Type representing options for Harmony templates.
 * - name of the platform.
 * - docs file contents.
 * - runtime to generate.
 * - disable creating platform aspects.
 * - disable the harmony platform template.
 * - include additional component templates.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @export
 * @typedef {HarmonyTemplatesOptions}
 */
export type HarmonyTemplatesOptions = {
  /**
   * name of the platform.
   */
  platformName?: string

  /**
   * docs file contents.
   */
  docsFile?: (context: ComponentContext) => ComponentFile

  /**
   * runtime to generate.
   */
  runtimes?: RuntimeOptions[],

  /**
   * disable creating platform aspects.
   */
  disablePlatformAspect?: boolean

  /**
   * disable the harmony platform template.
   */
  disableHarmonyPlatform?: boolean

  /**
   * include additional component templates.
   */
  templates?: EnvHandler<ComponentTemplate>[]

  /**
   * Id of the harmony env to apply on the templates.
   */
  harmonyEnvId?: string
};



/**
 * name of the runtime.
 * e.g. browser, node
 * current context to provide if option provider is included.
 * dependency to include in the runtime template.
 * list of files to include if runtime is requested.
 * list of imports to include in the pipeline. optionally include a config or aspect flag to include the imports within that file. default is to include in the runtime file.
 * Adds Extend to the runtimeAspect class. Pass either a string or an object with name and super. e.g. `Class<ClassOption>` results in "export class Name extends Class<ClassOption> {...}" An optional super can replace the default super() call.
 * defines classes to extend the config. e.g. "BaseConfig" results in "export type NameConfig = {} & BaseConfig" import must be defined in the imports option.
 * name of the extension for the runtime name.
 * list of methods.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @export
 * @typedef {RuntimeOptions}
 */
export type RuntimeOptions = {
  /**
   * name of the runtime.
   * e.g. browser, node
   */
  name: string;

  /**
   * contents to render into
   * the runtime provider.
   */
  provider?: (context: ComponentContext) => string;

  /**
   * dependency to include
   * in the runtime template.
   */
  dependencies?: Dependencies;

  /**
   * list of files to include
   * if runtime is requested.
   */
  files?: (context: ComponentContext) => ComponentFile[];

  /**
   * list of imports to include in the pipeline.
   * optionally include a config or aspect flag to include the imports within that file.
   * default is to include in the runtime file.
   */
  imports?: (context: ComponentContext) => Imports;

  /**
   * Adds Extend to the runtimeAspect class.
   * Pass either a string or an object with name and super.
   * e.g. `Class<ClassOption>`
   * results in "export class Name extends Class<ClassOption> {...}"
   * An optional super can replace the default super() call.
   */
  classExtends?: (context: ComponentContext) => ClassExtends;

  /**
   * defines classes to extend the config.
   * e.g. "BaseConfig"
   * results in "export type NameConfig = {} & BaseConfig"
   * import must be defined in the imports option.
   */
  configExtends?: (context: ComponentContext) => ConfigExtends // TODO switch to ConfigExtends and implement the object as a default onto the config in aspect-template.ts

  /**
   * name of the extension for the runtime name.
   */
  extension?: string;

  /**
   * list of methods.
   */
  methods?: (context: ComponentContext) => string;
}

/**
 * Represents a list of dependencies required by a module. Each dependency can be either a string representing an import or an array containing a string representing an import and an object with optional 'extraImports' property. The 'extraImports' property allows adding additional imports at the end of the import list for that particular dependency. It follows the example format: ["type NameModule", {"extraImport": ["extraImport"]}]. The resulting import statement includes the imports specified along with any extra imports added, all from the '@owner/scope.dependency' module.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @export
 * @typedef {Dependencies}
 */
export type Dependencies = (string | [string, {
  /**
   * Adds additional imports to the end of the import list
   * e.g. [`type NameModule`, `extraImport`]
   * results in "import { NameAspect, type NameRuntime, type NameModule, extraImport} from '@owner/scope.dependency';"
   */
  extraImports?: string[]
}])[]

/**
 * An array type 'Imports' containing elements that are either a string or a tuple with a string as the first element and an object as the second element. The object can have optional properties: 'config' of type boolean indicating if the import should be included in the config file, and 'runtime' of type boolean indicating if the import should be included in the aspect file.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @export
 * @typedef {Imports}
 */
export type Imports = (string | [string, {
  /**
   * should the import be included in the config file?
   */
  config?: boolean
  /**
   * should the import be included in the aspect file?
   */
  runtime?: boolean
}])[]

/**
 * A type that represents either a string or an array with two elements where the first element is a string and the second element is an object with a 'super' property of type string.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @export
 * @typedef {ClassExtends}
 */
export type ClassExtends = string | [string, {
  super: string
}]
/**
 * A type that represents a configuration extension, which can be a string or an array containing a string and an object with a 'config' property of type string.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @export
 * @typedef {ConfigExtends}
 */
export type ConfigExtends = string | [string, {
  config: string
}]
