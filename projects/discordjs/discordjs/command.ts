/*
 * Project: Eventiva
 * File: command.ts
 * Last Modified: 06/09/2024, 16:21
 *
 * Contributing: Please read through our contributing guidelines. Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0. Please interact in ways that contribute to an open,
 * welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution and
 * modification under the terms of the Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT) published as the License, or
 * (at your option) any later version of this license. You must not move, change, disable, or circumvent the license key functionality
 * in the Software; or modify any portion of the Software protected by the license key to: enable access to the protected
 * functionality without a valid license key; or remove the protected functionality.This program is distributed in the hope that it will
 * be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the Fair Core License, Version 1.0, MIT Future License for more details. You should have received a
 * copy of the Fair Core License, Version 1.0, MIT Future License along with this program. If not, please write to:
 * licensing@eventiva.co.uk, see the official website https://fcl.dev/ or Review the GitHub repository
 * https://github.com/keygen-sh/fcl.dev/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before filing
 * or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from termination of a Covered
 * License, we commit to adhering to the Eventiva Cooperation Commitment. You should have received a copy of the Eventiva
 * Cooperation Commitment along with this program. If not, please write to: licensing@eventiva.co.uk, or see
 * https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import type { SlotRegistry } from '@bitdev/harmony.harmony'
import {
    type Awaitable,
    type ButtonInteraction,
    ChatInputCommandInteraction,
    ContextMenuCommandBuilder,
    Message,
    SlashCommandBuilder,
    StringSelectMenuInteraction
} from 'discord.js'
import type { DiscordJSNode } from './discordjs.node.runtime.js'

/**
 * Interface for the Message object.
 * The Message object represents a message sent by a user in a chat.
 * The object has the following properties:
 * - `type`: a string representing the type of the message. Should be set to 'message'.
 * - `name`: a string representing the name of the message.
 * - `data`: a SlashCommandBuilder object representing the data of the message.
 * - `execute`: a function that is called when the message is executed. It takes an `interaction` parameter of type `Message<boolean>` and returns a promise that resolves to `void`.
 * @author Jonathan Stevens (@TGTGamer)
 */
interface CommandMessage {
    /**
     * The type of the object is 'message'.
     * @author Jonathan Stevens (@TGTGamer)
     */
    type: 'message';
    /**
     * The name of the object, represented as a string.
     * @author Jonathan Stevens (@TGTGamer)
     */
    name: string;
    /**
     * The `data` property is an instance of the `SlashCommandBuilder` class. It represents the data for a slash command.
     * @author Jonathan Stevens (@TGTGamer)
     */
    data: SlashCommandBuilder;
    /**
     * A method that is used to execute an interaction with a boolean message response.
     * - `this` refers to the DiscordJSNode instance.
     * - `interaction` is the interaction object containing the boolean message response.
     * This method is asynchronous and does not return anything.
     * @author Jonathan Stevens (@TGTGamer)
     */
    execute: (
        this: DiscordJSNode,
        interaction: Message<boolean>
    ) => Awaitable<void>;
}

/**
 * Represents a slash command.
 * - `type` - The type of the command ('slash').
 * - `name` - The name of the command.
 * - `data` - The data for building the slash command.
 * - `execute` - The function that will be executed when the command is triggered by a slash command interaction.
 * - `message` (optional) - The function that will be executed when the command is triggered by a message interaction.
 * @author Jonathan Stevens (@TGTGamer)
 */
interface CommandSlash {
    /**
     * Specifies that the type of the property is 'slash'.
     * @author Jonathan Stevens (@TGTGamer)
     */
    type: 'slash';
    /**
     * The name property is a string that represents the name of an object.
     * @author Jonathan Stevens (@TGTGamer)
     */
    name: string;
    /**
     * The data property is of type SlashCommandBuilder, which is a class used to build the data for a slash command. This property is used to store the data for the slash command before sending it to the API.
     * @author Jonathan Stevens (@TGTGamer)
     */
    data: SlashCommandBuilder;
    /**
     * The execute function is a method that allows the DiscordJSNode instance to respond to a chat input command interaction. This function takes two parameters: 'this', which refers to the current instance of DiscordJSNode, and 'interaction', which is the ChatInputCommandInteraction object representing the interaction with the chat input command. The function returns a promise that resolves to void once the execution is complete.
     * @author Jonathan Stevens (@TGTGamer)
     */
    execute: (
        this: DiscordJSNode,
        interaction: ChatInputCommandInteraction
    ) => Awaitable<void>;
    /**
     * This optional property represents a method that can be specified to handle message interactions in Discord.js. It takes a Discord.js Message object as a parameter and returns a Promise that resolves to void.
     * @author Jonathan Stevens (@TGTGamer)
     */
    message?: (
        this: DiscordJSNode,
        interaction: Message<boolean>
    ) => Awaitable<void>;
}

/**
 * Represents a command button.
 * - `type`: The type of the button, always `'button'`.
 * - `name`: The name of the button.
 * - `data`: The command builder for the button's context menu command.
 * - `execute`: A function that is called when the button is clicked. It takes an interaction object of type `ButtonInteraction` and returns a promise that resolves to `void`.
 * - `message` (optional): A function that is called when the button is clicked in a message context menu. It takes an interaction object of type `Message<boolean>` and returns a promise that resolves to `void`.
 * @author Jonathan Stevens (@TGTGamer)
 */
interface CommandButton {
    /**
     * The type of the element is 'button'.
     * @author Jonathan Stevens (@TGTGamer)
     */
    type: 'button';
    /**
     * The name of the property.
     * @author Jonathan Stevens (@TGTGamer)
     */
    name: string;
    /**
     * The data property is an instance of the ContextMenuCommandBuilder class.
     * @author Jonathan Stevens (@TGTGamer)
     */
    data: ContextMenuCommandBuilder;
    /**
     * Executes the button interaction callback function.
     * - 'this' refers to an instance of DiscordJSNode.
     * - 'interaction' is the button interaction object.
     * - The function returns a promise that resolves to void.
     * @author Jonathan Stevens (@TGTGamer)
     */
    execute: (
        this: DiscordJSNode,
        interaction: ButtonInteraction
    ) => Awaitable<void>;
    /**
     * This property represents a message that can be sent as a response to an interaction. It takes two parameters: 'this' which refers to the current DiscordJSNode instance, and 'interaction' which is the interaction object for which the message is being sent. The message can be of type boolean and the return type of this function is void. This property is optional and may not be present in all cases.
     * @author Jonathan Stevens (@TGTGamer)
     */
    message?: (
        this: DiscordJSNode,
        interaction: Message<boolean>
    ) => Awaitable<void>;
}

/**
 * An interface representing a command that can be executed through a select menu.
 * The command has a type which is always 'selectMenu'.
 * The command has a name which is a string.
 * The command has data which is an object of type ContextMenuCommandBuilder.
 * The command has an execute method that is a callback function taking an argument interaction of type StringSelectMenuInteraction and returning a Promise or an asynchronous function taking an argument interaction of type StringSelectMenuInteraction and returning void.
 * The command may have a message method that is a callback function taking an argument interaction of type Message<boolean> and returning a Promise or an asynchronous function taking an argument interaction of type Message<boolean> and returning void.
 * @author Jonathan Stevens (@TGTGamer)
 */
interface CommandSelectMenu {
    /**
     * Specifies that the type of the property is 'selectMenu'.
     * @author Jonathan Stevens (@TGTGamer)
     */
    type: 'selectMenu';
    /**
     * The name of the property. It must be a string.
     * @author Jonathan Stevens (@TGTGamer)
     */
    name: string;
    /**
     * The data property represents the instance of ContextMenuCommandBuilder class.
     * @author Jonathan Stevens (@TGTGamer)
     */
    data: ContextMenuCommandBuilder;
    /**
     * A callback function that is called when the 'execute' event is triggered by the Discord.js library. It takes the 'interaction' parameter of type 'StringSelectMenuInteraction', which represents a user's selection from a select menu with string options. The function returns a Promise that resolves to void.
     * @author Jonathan Stevens (@TGTGamer)
     */
    execute: (
        this: DiscordJSNode,
        interaction: StringSelectMenuInteraction
    ) => Awaitable<void>;
    /**
     * A callback function that handles an incoming message interaction event.
     * - `this` refers to the DiscordJSNode instance.
     * - `interaction` is the message interaction object.
     * - The callback function can be asynchronous and must return void.
     * @author Jonathan Stevens (@TGTGamer)
     */
    message?: (
        this: DiscordJSNode,
        interaction: Message<boolean>
    ) => Awaitable<void>;
}


/**
 * Represents a command that can be executed.
 * It can be a message command, a slash command, a button command, or a select menu command.
 * @author Jonathan Stevens (@TGTGamer)
 */
export type Command =
    | CommandMessage
    | CommandSlash
    | CommandButton
    | CommandSelectMenu;

/**
 * A specialized slot in a slot registry for storing instances of the Command class.
 * @author Jonathan Stevens (@TGTGamer)
 */
export type CommandSlot = SlotRegistry<Command[]>;
