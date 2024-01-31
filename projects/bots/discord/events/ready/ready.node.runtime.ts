/**
* @format
* -----
* Project: @eventiva/eventiva
* File: ready.node.runtime.ts
* Path: \projects\bots\discord\events\ready\ready.node.runtime.ts
* Created Date: Tuesday, January 30th 2024
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
import {Events} from 'discord.js'
import DiscordjsAspect, { DiscordjsNode } from '@eventiva/bots.aspects.discordjs';
import type { ReadyConfig } from './ready-config.js';
import { Event } from '@eventiva/bots.aspects.discordjs';


export class ReadyNode {
  constructor(
    private discordjs: DiscordjsNode,
    private config: ReadyConfig,
  ) {}
  
  resource: Event<Events.ClientReady> = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
      client.emit("info", `Logged in as ${client.user.tag} at ${new Date().toLocaleString()}`)
    }
  }

  static dependencies = [DiscordjsAspect];

  static defaultConfig: ReadyConfig = {};

  static async provider(
    [discordjs]: [DiscordjsNode|undefined],
    config: ReadyConfig,
  ) {
    if (!discordjs) throw new Error("DiscordJS not in dependancies")
    const ready = new ReadyNode(discordjs, config);

    return ready;
  }
}

export default ReadyNode;
