/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: entity-template.ts
 * Path: /projects/envs/generator/entity-template/entity-template.ts
 * Created Date: Monday, March 18th 2024
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

import {
  ComponentContext,
  ComponentFile,
  ComponentTemplate,
} from '@teambit/generator';
import { indexFile } from './files/index-file.js';
import { componentFile } from './files/component.js';
import { testFile } from './files/test.js';
import { docsFile } from './files/docs.js';
import { modelFile } from './files/model.js'

// TODO: replace this with "import {ComponentTemplateOptions} from '@teambit/generator';" once v1.3 is released
/**
 * A partial type that extends the ComponentTemplateOptions interface by picking the 'name', 'description', 'hidden', and 'env' properties from the ComponentTemplate interface.
 *
 * @export
 * @typedef {NodeComponentTemplateOptions}
 */
export type NodeComponentTemplateOptions = Partial<
  Pick<ComponentTemplate, 'name' | 'description' | 'hidden' | 'env'>
>;

/**
 * Creates an instance of EntityTemplate.
 * @param {string} [name='entity']
 * @param {string} [description='create entities to reuse data structures efficiently - using zmodel']
 * @param {boolean} [hidden=false]
 * @param {?string} [env]
 * Generates an array of component files based on the provided ComponentContext, including index file, component file, test file, and docs file.
 * @param {ComponentContext} context The component context used to generate component files
 * @returns {ComponentFile[]} Generates an array of ComponentFile objects based on the given ComponentContext.
 * Creates a new EntityTemplate using the provided NodeComponentTemplateOptions. If no options are provided, default empty options will be used.
 * @param {NodeComponentTemplateOptions} [options={}]
 * @returns {() => EntityTemplate} Creates a new EntityTemplate based on the provided options. If no options are provided, default options are used. Returns a function that when called will instantiate a new EntityTemplate with the specified name, description, visibility, and environment.
 *
 * @export
 * @class EntityTemplate
 * @typedef {EntityTemplate}
 * @implements {ComponentTemplate}
 */
export class EntityTemplate implements ComponentTemplate {
  /**
   * Creates an instance of EntityTemplate.
   *
   * @constructor
   * @param {string} [name='entity']
   * @param {string} [description='create entities to reuse data structures efficiently']
   * @param {boolean} [hidden=false]
   * @param {?string} [env]
   */
  constructor(
    readonly name = 'entity',
    readonly description = 'create entities to reuse data structures efficiently',
    readonly hidden = false,
    readonly env?: string
  ) {}

  /**
   * Generates an array of component files based on the provided ComponentContext, including index file, component file, test file, and docs file.
   *
   * @param {ComponentContext} context The component context used to generate component files
   * @returns {ComponentFile[]} Generates an array of ComponentFile objects based on the given ComponentContext.
   */
  generateFiles(context: ComponentContext): ComponentFile[] {
    return [
      indexFile(context),
      componentFile(context),
      testFile(context),
      modelFile(context),
      docsFile(context),
    ];
  }

  /**
   * Creates a new EntityTemplate using the provided NodeComponentTemplateOptions. If no options are provided, default empty options will be used.
   *
   * @static
   * @param {NodeComponentTemplateOptions} [options={}]
   * @returns {() => EntityTemplate} Creates a new EntityTemplate based on the provided options. If no options are provided, default options are used. Returns a function that when called will instantiate a new EntityTemplate with the specified name, description, visibility, and environment.
   */
  static from(options: NodeComponentTemplateOptions = {}) {
    return () =>
      new EntityTemplate(
        options.name,
        options.description,
        options.hidden,
        options.env
      );
  }
}
