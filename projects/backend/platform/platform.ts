/*
 * Project: Eventiva
 * File: platform.ts
 * Last Modified: 05/09/2024, 01:44
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

import { AspectMap, HarmonyPlatform, Runtime } from '@bitdev/harmony.harmony-platform'
import { BrowserRuntime } from '@bitdev/harmony.runtimes.browser-runtime'
import { NodeJSRuntime } from '@bitdev/harmony.runtimes.nodejs-runtime'
import { PlatformAspect } from './platform.aspect.js'

export type PlatformOptions = {
    /**
     * name of the platform.
     */
    name: string;

    /**
     * display name of the product
     */
    displayName?: string,

    /**
     * slogan of the product.
     */
    slogan?: string;

    /**
     * url to logo/
     */
    logo?: string;

    /**
     * supported runtimes
     */
    runtimes?: Runtime[];

    /**
     * list of aspects to use.
     */
    aspects: AspectMap
};

/**
 * declare a new symphony platform
 * in your bit app.
 */
export function Platform ( options: PlatformOptions ): HarmonyPlatform {
    return HarmonyPlatform.from( {
        name: options.name,
        runtimes: options.runtimes || [
            new BrowserRuntime(),
            new NodeJSRuntime()
        ],
        platform: [
            PlatformAspect, {
                name: options.displayName,
                slogan: options.slogan,
                logo: options.logo
            }
        ],
        aspects: options.aspects
    } )
}
