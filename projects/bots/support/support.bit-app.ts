/**
* @format
* -----
* Project: @eventiva/eventiva
* File: support.bit-app.ts
* Path: \projects\bots\support\support.bit-app.ts
* Created Date: Sunday, January 28th 2024
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

import { HarmonyPlatform } from '@bitdev/harmony.harmony-platform';
import { NodeJSRuntime } from '@bitdev/harmony.runtimes.nodejs-runtime';
import { BrowserRuntime } from '@bitdev/harmony.runtimes.browser-runtime';
import { SupportPlatformAspect } from '@eventiva/bots.aspects.support-platform';
import { DiscordjsAspect } from '@eventiva/bots.aspects.discordjs';
import { LoggingAspect } from '@eventiva/bots.aspects.logging';
import { I18NAspect } from '@eventiva/bots.aspects.i18n';
import { DefaultLoggingAspect } from '@eventiva/bots.packages.default_logging'

/**
 * Support is a property that encapsulates the configuration for the Harmony Platform support. It specifies the name of the support, the support platform aspect, the runtimes required for the support, and the aspects that should be enabled for the support.
 * @author Jonathan Stevens (@TGTGamer)
 */
export const Support = HarmonyPlatform.from({
  name: 'Support',
  
  platform: [SupportPlatformAspect, {
    name: 'Support',
    slogan: 'Platform',
    logo: 'https://static.bit.dev/extensions-icons/wayne.svg',
    domain: 'https://support.discord.dh1.eventiva.co.uk'
  }],

  runtimes: [
    new BrowserRuntime(),
    new NodeJSRuntime()
  ],

  aspects: [
    LoggingAspect,
    I18NAspect,
    // DiscordjsAspect,
    [
      DiscordjsAspect, 
      { 
        logger: {
          level: "trace",
        }
      }
    ],
    // DefaultLoggingAspect,
    [
      DefaultLoggingAspect, 
      { 
        name: "default_logging",
        logger: {
          level: "trace",
        }
      }
    ],
  ],
});

export default Support;
