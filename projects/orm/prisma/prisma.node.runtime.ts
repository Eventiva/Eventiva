/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: prisma.node.runtime.ts
 * Path: /projects/orm/prisma/prisma.node.runtime.ts
 * Created Date: Wednesday, March 20th 2024
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

import { SymphonyPlatformAspect, type SymphonyPlatformNode } from '@bitdev/symphony.symphony-platform';
import type { PrismaConfig } from './prisma-config.js';
import { Em, EmSlot } from './em.js'
import { prismaGqlSchema } from './prisma.graphql.js'

export class PrismaNode {
  constructor(
    private config: PrismaConfig,
    private emSlot: EmSlot,
  ) {}

  /**
   * register a list of em.
   */
  registerEm(ems: Em[]) {
    this.emSlot.register(ems);
    return this;
  }

  /**
   * list all em.
   */
  listEms() {
    return this.emSlot.flatValues();
  }

  /**
   * retrieve something.
   */
  async getSomething(id: string) {
    return id;
  }

  static dependencies = [SymphonyPlatformAspect];

  static defaultConfig: PrismaConfig = {};

  static async provider(
    [symphonyPlatform]: [SymphonyPlatformNode],
    config: PrismaConfig,
    [emSlot]: [EmSlot]
  ) {
    const prisma = new PrismaNode(config, emSlot);
    const gqlSchema = prismaGqlSchema(prisma);

    symphonyPlatform.registerBackendServer([
      {
        gql: gqlSchema,
      }
    ]);

    return prisma;
  }
}

export default PrismaNode;
