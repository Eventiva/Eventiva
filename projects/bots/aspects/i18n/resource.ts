/**
* @format
* -----
* Project: @eventiva/eventiva
* File: resource.ts
* Path: \projects\bots\aspects\i18n\resource.ts
* Created Date: Monday, January 29th 2024
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
* LICENSE: Creative Commons Zero v1.0 Universal (CC0-1.0)
* -----
* This program has been provided under confidence of the copyright holder and
* is licensed for copying, distribution and modification under the terms of
* the Creative Commons Zero v1.0 Universal (CC0-1.0) published as the License,
* or (at your option) any later version of this license.
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* Creative Commons Zero v1.0 Universal for more details.
* You should have received a copy of the Creative Commons Zero v1.0 Universal
* along with this program. If not, please write to: jonathan@resnovas.com,
* or see https://creativecommons.org/publicdomain/zero/1.0/legalcode
* -----
* DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
*/

import { SlotRegistry } from '@bitdev/harmony.harmony';

/**
 * Interface representing a resource.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @interface Resource
 * @typedef {Resource}
 */
export interface Resource {
  /**
   * The name of a person or thing. It is a string.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  name: string;
  /**
   * The 'lng' property represents the longitude coordinate of a location. It is a string value.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  lng: string,
  /**
   * The ns property is a string that represents the namespace of the object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {string}
   */
  ns: string,
  /**
   * The resources property is an object representing the available resources. It can store any type of data.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {*}
   */
  resources: any, 
}

/**
 * A type representing a slot in a registry for a resource.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @typedef {ResourceSlot}
 */
export type ResourceSlot = SlotRegistry<Resource>;
