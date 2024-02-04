/**
* @format
* -----
* Project: @eventiva/eventiva
* File: harmony-bot-generators-options.ts
* Path: \projects\bots\aspects\harmony-bot-generators\harmony-bot-generators-options.ts
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



import type { EnvHandler } from "@teambit/envs";
import type { ComponentContext, ComponentFile, ComponentTemplate } from "@teambit/generator";

/**
 * Options for generating the Harmony Bot generators.
 * - `platformName` (optional): The name of the platform.
 * - `docsFile` (optional): The contents of the documentation file.
 * - `runtimes` (optional): An array of runtime options.
 * - `disablePlatformAspect` (optional): Disable creating platform aspects.
 * - `disableHarmonyPlatform` (optional): Disable the Harmony platform template.
 * - `templates` (optional): An array of additional component templates.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 */
export type HarmonyBotGeneratorsOptions = {
  /**
   * name of the platform.
   */
  platformName?: string;

  /**
   * docs file contents.
   */
  docsFile?: (context: ComponentContext) => ComponentFile;

  /**
   * runtime to generate.
   */
  runtimes?: RuntimeOptions[],

  /**
   * disable creating platform aspects.
   */
  disablePlatformAspect?: boolean;

  /**
   * disable the harmony platform template.
   */
  disableHarmonyPlatform?: boolean;

  /**
   * include additional component templates.
   */
  templates?: EnvHandler<ComponentTemplate>[];
};

/**
 * The runtime options for configuring the runtime.
 * Properties:
 * - name: The name of the runtime (e.g., browser, node).
 * - provider (optional): A function that returns the contents to render into the runtime provider.
 * - dependencies (optional): An array of dependency names to include in the runtime template.
 * - files (optional): A function that returns a list of files to include if the runtime is requested.
 * - imports (optional): A function that returns a list of imports to include in the pipeline.
 * - extension (optional): The name of the extension for the runtime name.
 * - methods (optional): A function that returns a list of methods for the runtime.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
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
   * dependency names to include
   * in the runtime template.
   */
  dependencies?: string[];

  /**
   * list of files to include
   * if runtime is requested.
   */
  files?: (context: ComponentContext) => ComponentFile[];

  /**
   * list of imports to include in the pipeline.
   */
  imports?: (context: ComponentContext) => string[];

  /**
   * name of the extension for the runtime name.
   */
  extension?: string;

  /**
   * list of methods.
   */
  methods?: (context: ComponentContext) => string;
}
