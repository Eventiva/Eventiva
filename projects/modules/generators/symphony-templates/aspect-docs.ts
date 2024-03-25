/*
 * Project: Eventiva
 * File: aspect-docs.ts
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/25/24, 1:48 AM
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
 * LICENSE: Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * -----
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution
 * and modification under the terms of the Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * published as the License, or (at your option) any later version of this license. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the Functional Source License, Version 1.1, MIT Future License for more
 * details. You should have received a copy of the Functional Source License, Version 1.1, MIT Future License along
 * with this program. If not, please write to: licensing@eventiva.co.uk, see the official website
 * https://fsl.software/ or Review the GitHub repository https://github.com/getsentry/fsl.software/
 * -----
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before
 * filing or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from
 * termination of a Covered License, we commit to adhering to the Eventiva Cooperation Commitment. You should have
 * received a copy of the Eventiva Cooperation Commitment along with this program. If not, please write to:
 * licensing@eventiva.co.uk, or see https://eventiva.co.uk/licensing/ecc
 * -----
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import { ComponentContext } from '@teambit/generator'

export function aspectDocsFile ( context: ComponentContext ) {
    return {
        relativePath: `${ context.name }.docs.mdx`,
        content: `---
description: 'A plugable ${ context.namePascalCase } aspect. Can be used to provider a Browser and API.'
labels: ['aspect', 'composition', 'extendability']
---

A plugable ${ context.namePascalCase } aspect. Used to maintain ${ context.namePascalCase } across the platform.

## Get started

Compose the aspect into your Harmony platform:

\`\`\`ts
import { SymphonyPlatform } from '@bitdev/symphony.symphony-platform';

/**
 * compose the symphony platform.
 */
export const MyPlatform = SymphonyPlatform({
  name: 'my-platform',

  aspects: [
    ${ context.namePascalCase }Aspect,
  ]
});

export default MyPlatform;
\`\`\``
    }
}
