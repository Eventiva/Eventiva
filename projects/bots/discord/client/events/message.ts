/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: message.ts
 * Path: \projects\bots\discord\client\events\message.ts
 * Created Date: Thursday, January 4th 2024
 * Author: Jonathan Stevens (Email: jonathan.stevens@eventiva.co.uk, Github: https://github.com/TGTGamer)
 * -----
 * Contributing: Please read through our contributing guidelines. Included are directions for opening
 * issues, coding standards, and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, version 2.0. Please interact in ways that contribute to an open,
 * welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 * -----
 * Copyright (c) 2024 Eventiva - All Rights Reserved
 * LICENSE: GNU General Public License v3.0 only (GPL-3.0)
 * -----
 * This program has been provided under confidence of the copyright holder and is
 * licensed for copying, distribution and modification under the terms of
 * the GNU General Public License v3.0 only (GPL-3.0) published as the License,
 * or (at your option) any later version of this license.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License v3.0 only for more details.
 *
 * You should have received a copy of the GNU General Public License v3.0 only
 * along with this program. If not, please write to: jonathan.stevens@eventiva.co.uk,
 * or see https://www.gnu.org/licenses/gpl-3.0-standalone.html
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE - PLEASE SEE THE LICENSE FILE FOR DETAILS
 */

import { Events } from 'discord.js';
import type { Event } from '../client';

/**
 * A property representing an event resource. The resource is of type `Event<Events.MessageCreate>`. It has a property `data` which is an object containing the `name` property. The `name` property is of type `Events.MessageCreate`. The `execute` function is an asynchronous function that takes in two parameters: `this` and `message`. Inside the function, it checks if the `message` author is a bot and returns if true. It also checks if the `message` content is equal to 'ping' and if so, it uses the `message` object to reply with 'pong'.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {Event<Events.MessageCreate>}
 */
export const resource: Event<Events.MessageCreate> = {
  data: {
    name: Events.MessageCreate,
  },
  async execute(this, message) {
    if (message.author.bot) return;
    this.logger.debug(message);
    if (message.content === 'ping') {
      await message.reply({ content: 'pong' });
    }
  },
};

export default resource;
