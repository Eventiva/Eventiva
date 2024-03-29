/*
 * Project: Eventiva
 * File: resource.ts
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
