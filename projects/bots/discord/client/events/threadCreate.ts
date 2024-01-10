/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: threadCreate.ts
 * Path: \projects\bots\discord\client\events\threadCreate.ts
 * Created Date: Friday, January 5th 2024
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
 * The resource property represents an event for when a new thread is created. It is an object of type Event<T>, where T is the event type `ThreadCreate`.
 * The `data` property contains the name of the event (`Events.ThreadCreate`), and the `execute` method is an asynchronous function that takes in `this` and `interaction` parameters.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {Event<Events.ThreadCreate>}
 */
export const resource: Event<Events.ThreadCreate> = {
  data: {
    name: Events.ThreadCreate,
  },
  async execute(this, interaction) {
    this.logger.debug(interaction);
  },
};

export default resource;
