/**
* @format
* -----
* Project: @eventiva/eventiva
* File: command.ts
* Path: \projects\bots\aspects\discordjs\command.ts
* Created Date: Monday, January 29th 2024
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

import {
  type SlashCommandBuilder,
  type ContextMenuCommandBuilder,
  type ChatInputCommandInteraction,
  type StringSelectMenuInteraction,
  type ButtonInteraction,
  type Awaitable,
  type Message,
} from 'discord.js';
import type { SlotRegistry } from '@bitdev/harmony.harmony';


/**
 * A type that represents different types of commands.
 * The `Command` type is a union of three possible command types: `slash`, `button`, and `selectMenu`.
 * - For `slash` commands, the `data` property should be an instance of `SlashCommandBuilder`, and the `execute` property should be a function that takes a `ChatInputCommandInteraction` parameter and returns a `Promise`.
 * - For `button` commands, the `data` property should be an instance of `ContextMenuCommandBuilder`, and the `execute` property should be a function that takes a `ButtonInteraction` parameter and returns a `Promise`.
 * - For `selectMenu` commands, the `data` property should be an instance of `ContextMenuCommandBuilder`, and the `execute` property should be a function that takes a `StringSelectMenuInteraction` parameter and returns a `Promise`.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @typedef {Command}
 */
export type Command =
  | {
    type: 'message';
    name: string;
    data: SlashCommandBuilder;
    execute: (interaction: Message<boolean>) => Awaitable<void>;
  }
  | {
    type: 'slash';
    name: string;
    data: SlashCommandBuilder;
    execute: (
      interaction: ChatInputCommandInteraction
    ) => Awaitable<void>;
    message?: (
            interaction: Message<boolean>
    ) => Awaitable<void>;
  }
  | {
    type: 'button';
    name: string;
    data: ContextMenuCommandBuilder;
    execute: (
      interaction: ButtonInteraction
    ) => Awaitable<void>;
    message?: (
      interaction: Message<boolean>
    ) => Awaitable<void>;
  }
  | {
    type: 'selectMenu';
    name: string;
    data: ContextMenuCommandBuilder;
    execute: (
      interaction: StringSelectMenuInteraction
    ) => Awaitable<void>;
    message?: (
      interaction: Message<boolean>
    ) => Awaitable<void>;
  };

export type CommandSlot = SlotRegistry<Command[]>;