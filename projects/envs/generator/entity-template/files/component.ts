/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: component.ts
 * Path: /projects/envs/generator/entity-template/files/component.ts
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



import { ComponentContext } from '@teambit/generator';

/**
 * A function that takes a ComponentContext object as a parameter and returns an object with two properties: relativePath and content. The content property is a string containing TypeScript code that defines a class named with the capitalized version of the context name. The class has a constructor that takes a name parameter, a toObject method that serializes the class into a serializable object, and a static from method that creates an instance of the class from a Plain<name> object.
 *
 * @param {ComponentContext} context The ComponentContext object
 * @returns {{ relativePath: string; content: string; }} A function that takes a ComponentContext object and returns an object with properties relativePath and content. The content contains a TypeScript class definition named with the name provided in the ComponentContext object. The class has a constructor that takes a name parameter and two methods: toObject() which serializes the class instance into a serializable object, and static method from() which creates a class instance from a plain object.
 */
export const componentFile = (context: ComponentContext) => {
  const { name, namePascalCase } = context;
  return {
    relativePath: `${name}.ts`,
    content: `
import { ${namePascalCase} as Plain${namePascalCase} } from '@eventiva/central.aspects.database'

/**
 * Exports the generated Document type for use within other components
 *
 * @export
 * @class Document
 * @typedef {Document}
 * @implements {User}
 */
export { Plain${namePascalCase} }

export class ${namePascalCase} implements Plain${namePascalCase} {
  constructor(
    readonly id: string,
    private _createdAt: Date = new Date(),
    private _updatedAt: Date = new Date(),
    private _deletedAt: Date | null = null
  ) {}

  /**
   * Returns the value of the 'createdAt' property.
   *
   * @public
   * @readonly
   * @type {Date}
   */
  public get createdAt() {
    return this._createdAt
  }

  /**
   * Returns the value of the updatedAt property.
   *
   * @public
   * @readonly
   * @type {Date}
   */
  public get updatedAt() {
    return this._updatedAt
  }

  /**
   * Returns the value of the deletedAt property.
   *
   * @public
   * @readonly
   * @type {Date}
   */
  public get deletedAt() {
    return this._deletedAt
  }

  /**
   * Creates and returns a Plain${namePascalCase} object with the properties id, createdAt, updatedAt, and deletedAt copied from the current object instance.
   *
   * @returns {Plain${namePascalCase}} Returns a Plain${namePascalCase} object with the properties 'id', 'createdAt', 'updatedAt', and 'deletedAt' based on the current object's properties.
   */
  toObject() {
    const returnable: Plain${namePascalCase} = {
      id: this.id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt
    }
    return returnable
  }

  /**
   * Creates a new ${namePascalCase} object based on the provided Plain${namePascalCase} object.
   *
   * @static
   * @param {Plain${namePascalCase}} plain${namePascalCase} A plain user object
   * @returns {${namePascalCase}} Creates a new ${namePascalCase} object from a Plain${namePascalCase} object
   */
  static from(plain${namePascalCase}: Plain${namePascalCase}) {
    return new ${namePascalCase}(
      plain${namePascalCase}.id
    );
  }
}
`,
  };
};
