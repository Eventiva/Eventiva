/*
 * Project: Eventiva
 * File: symphony-templates.ts
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/23/24, 11:56 PM
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
 * along with this program. If not, please write to: licensing@eventiva.co.uk,
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

import { HarmonyTemplates } from '@eventiva/modules.generators.harmony-templates'
import { aspectDocsFile } from './aspect-docs'
import { browserRuntimeProvider } from './browser-runtime/browser-provider'
import { graphQLServerFile } from './node-runtime/graphql-server'
import { generateImports, getDummyMethod, nodeRuntimeProvider } from './node-runtime/node-runtime-provider'
import { SymphonyPlatformTemplate } from './symphony-platform/symphony-platform-template'
import { SymphonyTemplatesOptions } from './symphony-templates-options'

/**
 * Creates Symphony templates with the provided options. It includes specified options and overrides default values as needed. The function returns Harmony templates with the Symphony-specific configurations applied such as platformName, docsFile, disableHarmonyPlatform, harmonyEnvId, templates, and runtimes.
 *
 * @export
 * @param {SymphonyTemplatesOptions} [options={}]
 * @returns {*} Creates Symphony templates by extending HarmonyTemplates with Symphony specific configurations and templates.
 */
export function SymphonyTemplates(options: SymphonyTemplatesOptions = {}) {
  return HarmonyTemplates({
    ...options, // include the options to ensure they are always applied then override with the below

    platformName: options.platformName ?? 'symphony-platform',

    docsFile: options.docsFile ?? aspectDocsFile,

    disableHarmonyPlatform: options.disableHarmonyPlatform ?? true,

    harmonyEnvId: options.symphonyEnvId,

    templates: [
      ...(options.templates ?? []), // include the options templates if any
      SymphonyPlatformTemplate.from({ env: options.symphonyEnvId })
    ],

    runtimes: [
      ...(options.runtimes ?? []), // include the options runtimes if any
      {
        name: 'browser',
        provider: browserRuntimeProvider,
        dependencies: [
          'bitdev.symphony/symphony-platform'
        ],
        extension: 'tsx'
      },
      {
        name: 'node',
        provider: nodeRuntimeProvider,
        dependencies: [
          'bitdev.symphony/symphony-platform'
        ],
        imports: generateImports,
        files: (context) => [
          graphQLServerFile(context)
        ],
        methods: getDummyMethod,
      },
    ]
  });
}
