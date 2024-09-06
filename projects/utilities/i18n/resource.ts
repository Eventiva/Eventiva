/*
 * Project: Eventiva
 * File: resource.ts
 * Last Modified: 06/09/2024, 16:21
 *
 * Contributing: Please read through our contributing guidelines. Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0. Please interact in ways that contribute to an open,
 * welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution and
 * modification under the terms of the Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT) published as the License, or
 * (at your option) any later version of this license. You must not move, change, disable, or circumvent the license key functionality
 * in the Software; or modify any portion of the Software protected by the license key to: enable access to the protected
 * functionality without a valid license key; or remove the protected functionality.This program is distributed in the hope that it will
 * be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the Fair Core License, Version 1.0, MIT Future License for more details. You should have received a
 * copy of the Fair Core License, Version 1.0, MIT Future License along with this program. If not, please write to:
 * licensing@eventiva.co.uk, see the official website https://fcl.dev/ or Review the GitHub repository
 * https://github.com/keygen-sh/fcl.dev/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before filing
 * or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from termination of a Covered
 * License, we commit to adhering to the Eventiva Cooperation Commitment. You should have received a copy of the Eventiva
 * Cooperation Commitment along with this program. If not, please write to: licensing@eventiva.co.uk, or see
 * https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */


import { SlotRegistry } from '@bitdev/harmony.harmony'

/**
 * Interface representing a resource.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @interface Resource

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

 */
export type ResourceSlot = SlotRegistry<Resource>;
