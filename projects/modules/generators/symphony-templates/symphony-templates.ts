/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: symphony-templates.ts
 * Path: /projects/modules/generators/symphony-templates/symphony-templates.ts
 * Created Date: Saturday, March 16th 2024
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

import { HarmonyTemplates } from '@eventiva/modules.generators.harmony-templates';
import { browserRuntimeProvider } from './browser-runtime/browser-provider';
import { generateImports, getDummyMethod, nodeRuntimeProvider } from './node-runtime/node-runtime-provider';
import { graphQLServerFile } from './node-runtime/graphql-server';
import { aspectDocsFile } from './aspect-docs';
import { SymphonyTemplatesOptions } from './symphony-templates-options';
import { SymphonyPlatformTemplate } from './symphony-platform/symphony-platform-template';

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
