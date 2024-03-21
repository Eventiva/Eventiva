/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: base.ts
 * Path: /projects/entities/base/base/base.ts
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

import { PrimaryKey, Property, Opt, OnInit, wrap } from '@mikro-orm/core'
import { typeid, TypeID } from 'typeid-js';

/**
 * Defines an abstract class named Base that implements PlainBase<T> interface. The class has properties such as _id, _createdAt, _updatedAt, and _deletedAt with their respective types and decorators. It also includes getter methods for uuid, modelType, deletedAt, createdAt, and updatedAt properties. Additionally, the class contains a constructor method, toObject method, and a static from method that throws an error when called.
 *
 * @export
 * @abstract
 * @class Base
 * @typedef {Base}
 * @template {string} [T="UDM"]
 * @implements {PlainBase<T>}
 */
export abstract class Base<T extends string = "UDM">{

  /**
   * A property that represents the unique identifier of the TypeID associated with the current instance. It is of type TypeID of the current Type, and its value is determined by invoking the typeid method with the current Type as the argument.
   *
   * @type {TypeID<T>}
   */
  _id: Opt<TypeID<T>>

  /**
   * A string representing the primary key of an entity. It is generated based on the '_id' property converted to a string value.
   *
   * @type {string}
   */
  @PrimaryKey({ type: 'string' })
  id: string

  /**
   * Creates an instance of Base.
   *
   * @constructor
   * @param {T} prefix The prefix parameter
   */
  constructor(
    prefix: T
  ) {
    this._id = typeid(prefix)
    this.id = this._id.toString()
  }

  /**
   * Sets the type ID on load.
   */
  @OnInit()
  setTypeID() {
    if (wrap(this).isInitialized()) return
    this._id = this._id ?? TypeID.fromString<T>(this.id)
  }

  /**
   * Returns the value of the property '_id'.
   *
   * @readonly
   * @type {TypeID<"UDM">}
   */
  @Property({ persist: false }) get t_id() {
    return this._id
  }

  /**
   * Defines a getter method that returns the UUID representation of the _id property.
   *
   * @readonly
   * @type {*}
   */
  @Property({ persist: false }) get uuid(): Opt<string> {
    return this._id.toUUID()
  }

  /**
   * A getter method that returns the model type of the object by calling the getType method on the _id property.
   *
   * @readonly
   * @type {*}
   */
  @Property({ persist: false }) get modelType(): Opt<T> {
    return this._id.getType()
  }

  /**
   * The property createdAt represents the date and time when the object was created, initialized with the current date and time.
   *
   * @type {Date}
   */
  @Property() createdAt: Opt<Date> = new Date();

  /**
   * A property that represents the date when the entity was last updated.
   *
   * @type {Date}
   */
  @Property() updatedAt: Opt<Date> = new Date();

  /**
   * This property represents the date and time when the item was deleted, or null if it has not been deleted. It can hold a Date object or null.
   *
   * @type {(Date)}
   */
  @Property() deletedAt?: Opt<Date>

  /**
   * Creates a new instance of the current class. This is a static method that throws an error with the message 'Not implemented'.
   *
   * @static
   */
  static from() {
    throw new Error('Not implemented')
  }
}
