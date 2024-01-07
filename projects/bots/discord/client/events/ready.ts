/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: ready.ts
 * Path: \projects\bots\discord\client\events\ready.ts
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
 * A property that represents a client ready event.
 * The property is an `Event` object with a generic type argument of `Events.ClientReady`.
 * The `Event` object has a `data` property, which is an object with the properties `name` and `once`.
 * The `name` property represents the `Events.ClientReady` event.
 * The `once` property is `true`, indicating that the event should only be triggered once.
 * The `Event` object also has an `execute` property, which is an asynchronous function. The function takes two parameters: `this` and `client`.
 * Inside the function, it emits a `log` event with the message `Logged in as ${client.user.tag} at ${new Date().toLocaleString()}`.
 * It then emits a `Debug` event with the message `Deploying commands...`.
 * Finally, it calls the `deployCommands` method asynchronousl
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {Event<Events.ClientReady>}
 */
export const resource: Event<Events.ClientReady> = {
  data: {
    name: Events.ClientReady,
    once: true,
  },
  async execute(this, client) {
    this.logger.info(
      `Logged in as ${client.user.tag} at ${new Date().toLocaleString()}`
    );
    this.emit(Events.Debug, `Deploying commands...`);
    // await this.deployCommands();
  },
};

export default resource;
