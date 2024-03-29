/*
 * Project: Eventiva
 * File: base.ts
 * Last Modified: 3/29/24, 4:54 PM
 *
 * Contributing: Please read through our contributing guidelines.
 * Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0
 * Please interact in ways that contribute to an open, welcoming, diverse,
 * inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution
 * and modification under the terms of the Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * published as the License, or (at your option) any later version of this license. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the Functional Source License, Version 1.1, MIT Future License for more
 * details. You should have received a copy of the Functional Source License, Version 1.1, MIT Future License along
 * with this program. If not, please write to: licensing@eventiva.co.uk, see the official website
 * https://fsl.software/ or Review the GitHub repository https://github.com/getsentry/fsl.software/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before
 * filing or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from
 * termination of a Covered License, we commit to adhering to the Eventiva Cooperation Commitment. You should have
 * received a copy of the Eventiva Cooperation Commitment along with this program. If not, please write to:
 * licensing@eventiva.co.uk, or see https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import { OnInit, Opt, PrimaryKey, Property, wrap } from '@mikro-orm/core'
import { typeid, TypeID } from 'typeid-js'

/**
 * Defines an abstract class named Base that implements PlainBase<T> interface. The class has properties such as _id, _createdAt, _updatedAt, and _deletedAt with their respective types and decorators. It also includes getter methods for uuid, modelType, deletedAt, createdAt, and updatedAt properties. Additionally, the class contains a constructor method, toObject method, and a static from method that throws an error when called.
 *
 * @export
 * @abstract
 * @class Base

 * @template {string} [T="UDM"]
 * @implements {PlainBase<T>}
 */
export abstract class Base<T extends string = 'UDM'> {

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
    @PrimaryKey( { type: 'string' } )
    id: string
    /**
     * The property createdAt represents the date and time when the object was created, initialized with the current date and time.
     *
     * @type {Date}
     */
    @Property() createdAt: Opt<Date> = new Date()
    /**
     * A property that represents the date when the entity was last updated.
     *
     * @type {Date}
     */
    @Property() updatedAt: Opt<Date> = new Date()
    /**
     * This property represents the date and time when the item was deleted, or null if it has not been deleted. It can hold a Date object or null.
     *
     * @type {(Date)}
     */
    @Property() deletedAt?: Opt<Date>

    /**
     * Creates an instance of Base.
     *
     * @constructor
     * @param {T} prefix The prefix parameter
     */
    constructor (
        prefix: T
    ) {
        this._id = typeid( prefix )
        this.id = this._id.toString()
    }

    /**
     * Returns the value of the property '_id'.
     *
     * @readonly
     * @type {TypeID<'UDM'>}
     */
    @Property( { persist: false } ) get t_id () {
        return this._id
    }

    /**
     * Defines a getter method that returns the UUID representation of the _id property.
     *
     * @readonly
     * @type {*}
     */
    @Property( { persist: false } ) get uuid (): Opt<string> {
        return this._id.toUUID()
    }

    /**
     * A getter method that returns the model type of the object by calling the getType method on the _id property.
     *
     * @readonly
     * @type {*}
     */
    @Property( { persist: false } ) get modelType (): Opt<T> {
        return this._id.getType()
    }

    /**
     * Creates a new instance of the current class. This is a static method that throws an error with the message 'Not implemented'.
     *
     * @static
     */
    static from () {
        throw new Error( 'Not implemented' )
    }

    /**
     * Sets the type ID on load.
     */
    @OnInit()
    setTypeID () {
        if ( wrap( this ).isInitialized() ) {
            return
        }
        this._id = this._id ?? TypeID.fromString<T>( this.id )
    }
}
