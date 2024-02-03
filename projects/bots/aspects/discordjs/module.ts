/**
* @format
* -----
* Project: @eventiva/eventiva
* File: module.ts
* Path: \projects\bots\aspects\discordjs\module.ts
* Created Date: Thursday, February 1st 2024
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

import { DiscordjsAspect } from "./discordjs.aspect.js";
import type { Log } from "@eventiva/bots.aspects.logging";
import type { Command } from "./command";
import type { DiscordjsNode } from './discordjs.node.runtime';
import type { ExtendedClientEvents, Event } from "./event";

/**
 * An object that represents a collection of resources. Each resource is identified by a key that corresponds to an event or command name from the ExtendedClientEvents interface. The value for each key can be either an Event object or a Command object.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 */
export type Resources = {
    [K in keyof ExtendedClientEvents]?: Event<K>
} | {
    [index: string]: Command
}

/**
 * The DiscordJsModule class represents a module for the Discord.js library. It provides methods for initializing the module, registering events and commands, and setting the log for the module instance.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class
 * @template C The type parameter for the DiscordJsModule class
 * @implements {DiscordJsModule<C>}
 */
export class DiscordJsModule<C = {}> {
  /**
   * The name of the module that represents the 'ready' event.
   * @author Jonathan Stevens (@TGTGamer)
   */
  public name: string

  /**
   * The `log` property is a public property that stores an instance of either the `Log` or `Console` class. By default, it is initialized with the `console` object. It can be used to log messages or debug information.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   */
  public log: Log | Console = console
  
  /**
   * Creates an instance of ReadyNode.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param discord The DiscordjsNode instance to use.
   * @param config The configuration object for the ready event.
   */
  constructor(
    public discord: DiscordjsNode,
    protected config: C,
  ) {}

  /**
   * Registers events for the Discord client.
   * Returns the object itself after registering the events.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   * @returns Registers events for the current instance of the application.
   */
  public registerEvents(reload?: true) {
    return this;
  }

  /**
   * Registers events for the Discord client.
   * Returns the object itself after registering the events.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   * @returns Registers events for the current instance of the application.
   */
  public registerCommands(reload?: true) {
    return this;
  }

  /**
   * Sets the log for the DiscordJsModule instance and returns the modified instance.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   * @param log The log to set.
   * @returns Sets the log for the DiscordJsModule and returns the module instance.
   */
  public setLog(log: Log): DiscordJsModule<C> {
    this.log = log;
    return this;
  }

  /**
   * The resources object that holds all the event handlers for the client.
   * Each key represents an event name, and its corresponding value is an object with the name of the event and the handler function.
   * The handler function is an asynchronous function that takes the client object as an argument.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   */
  public resources: Resources = {};

  /**
   * An array of dependencies required by the current module. The elements of the array are instances of the DiscordjsAspect class.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   */
  static dependencies = [DiscordjsAspect];

  /**
   * The default configuration for the Ready class. It is an empty object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   */
  static defaultConfig = {};
}