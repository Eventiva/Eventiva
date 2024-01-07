/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: create.ts
 * Path: \projects\bots\discord\client\commands\support\create.ts
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

import {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
} from 'discord.js';
import type { Command } from '../../client';

/**
 * Creates a new action row with a select menu component containing three options: Bulbasaur, Charmander, and Squirtle.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @returns {*} This function creates a new row containing a string select menu with options for Bulbasaur, Charmander, and Squirtle.
 */
function createRow() {
  const select = new StringSelectMenuBuilder()
    .setCustomId('starter')
    .setPlaceholder('Make a selection!')
    .addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel('Bulbasaur')
        .setDescription('The dual-type Grass/Poison Seed Pokémon.')
        .setValue('bulbasaur'),
      new StringSelectMenuOptionBuilder()
        .setLabel('Charmander')
        .setDescription('The Fire-type Lizard Pokémon.')
        .setValue('charmander'),
      new StringSelectMenuOptionBuilder()
        .setLabel('Squirtle')
        .setDescription('The Water-type Tiny Turtle Pokémon.')
        .setValue('squirtle')
    );

  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);
}

/**
 * The command resource used to create a slash command for the 'support' option.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {Command}
 */
export const resource: Command = {
  type: 'slash',
  data: new SlashCommandBuilder()
    .setName('support')
    .setDescription('Creates the support menu!'),

  async execute(this, interaction) {
    const row = createRow();

    await interaction.reply({
      content: 'Choose your support option!',
      components: [row],
    });
  },
  async message(this, message) {
    const row = createRow();

    await message.reply({
      content: 'Choose your support option!',
      components: [row],
    });
  },
};

export default resource;
