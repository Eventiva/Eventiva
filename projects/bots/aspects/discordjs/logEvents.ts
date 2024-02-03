/**
* @format
* -----
* Project: @eventiva/eventiva
* File: logEvents.ts
* Path: \projects\bots\aspects\discordjs\logEvents.ts
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
import { Events } from 'discord.js';
import { LogLevels } from "@eventiva/bots.aspects.logging";
import type { Event } from "./event"
import type { DiscordjsNode } from './discordjs.node.runtime';

/**
 * The property `EventsClientReady` is an event that represents when the client is ready. It contains a callback function `execute` that will be executed once when the event is triggered. The callback function takes a `client` parameter and logs a message to the console with information about the client's login.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {Event<Events.ClientReady>}
 */
const EventsClientReady: Event<Events.ClientReady> = {
    name: Events.ClientReady,
    once: true,
    async execute(this: DiscordjsNode, client) {
      this.client.emit(LogLevels.Info, `Logged in as ${client.user.tag} at ${new Date().toLocaleString()}`)
    }
}

/**
 * The `EventsInfo` property is an event for logging information. It is of type `Event<LogLevels.Info>`. It contains the following attributes:
 * - `name`: The name of the event, which is `LogLevels.Info`.
 * - `once`: A boolean value indicating whether the event should only be executed once.
 * - `execute`: An asynchronous function that takes a `message` parameter and executes the logging of the information.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {Event<LogLevels.Info>}
 */
const EventsInfo: Event<LogLevels.Info> = {
    name: LogLevels.Info,
    once: false,
    async execute(this: DiscordjsNode, message) {
      this.log.info(message)
    }
}
/**
 * A debug event. Triggered when a debug message needs to be logged.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {Event<LogLevels.Debug>}
 */
const EventsDebug: Event<LogLevels.Debug> = {
    name: LogLevels.Debug,
    once: false,
    async execute(this: DiscordjsNode, message) {
      this.log.debug(message)
    }
}
/**
 * A property that represents an event trace. It is an instance of `Event` with a generic type of `LogLevels.Trace`. The value of this property is an object with properties `name`, `once`, and `execute`. The `name` property is set to `LogLevels.Trace`. The `once` property is set to `false`. The `execute` property is an asynchronous function that takes a `message` parameter and logs the message at the trace level using the `log` property of `this`.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {Event<LogLevels.Trace>}
 */
const EventsTrace: Event<LogLevels.Trace> = {
    name: LogLevels.Trace,
    once: false,
    async execute(this: DiscordjsNode, message) {
      this.log.trace(message)
    }
}
/**
 * A property that represents a warn event. It is an instance of the Event class with the generic type parameter set to LogLevels.Warn. The name of the event is 'LogLevels.Warn'. It can be triggered multiple times. The event handler is an asynchronous function that takes a 'message' parameter and logs a warning message using the 'log' property of the DiscordjsNode instance.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {Event<LogLevels.Warn>}
 */
const EventsWarn: Event<LogLevels.Warn> = {
    name: LogLevels.Warn,
    once: false,
    async execute(this: DiscordjsNode, message) {
      this.log.warn(message)
    }
}
/**
 * A property that represents a fatal event in the Logs. The event is of type `Event<LogLevels.Fatal>`. It has a name, which is set to `LogLevels.Fatal`, and a `execute` function which is called when the event is triggered. The `execute` function is an asynchronous function that takes a `message` parameter. If the `fatal` property exists in the `log` object of the `DiscordjsNode`, it calls the `fatal` method of the `log` object with the `message` as an argument. Otherwise, it calls the `error` method of the `log` object with the `message` as an argument.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {Event<LogLevels.Fatal>}
 */
const EventsFatal: Event<LogLevels.Fatal> = {
    name: LogLevels.Fatal,
    once: false,
    async execute(this: DiscordjsNode, message) {
      if ('fatal' in this.log)  return this.log.fatal(message)
      return this.log.error(message)
    }
}
/**
 * The EventsAlert property is an event that listens for an alert level log message. It is of type Event<LogLevels.Alert>.
 * The event has three properties:
 * - name: The name of the log level, which is LogLevels.Alert.
 * - once: A boolean value indicating whether the event should only be fired once or multiple times.
 * - async execute(this: DiscordjsNode, message): A function that is executed when the event is triggered. It takes a parameter 'message' and logs the message as an alert if the 'alert' property exists in the 'log' object, otherwise it logs the message as an error.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {Event<LogLevels.Alert>}
 */
const EventsAlert: Event<LogLevels.Alert> = {
    name: LogLevels.Alert,
    once: false,
    async execute(this: DiscordjsNode, message) {
      if ('alert' in this.log)  return this.log.alert(message) 
      return this.log.error(message)
    }
}
/**
 * Represents an emergency event in the logging system.
 * - `name`: The name of the event, which is set to `LogLevels.Emergency`.
 * - `once`: Indicates whether the event should be executed only once.
 * - `execute`: The function that is executed when the event is triggered. This function takes a message as a parameter and logs the message as an emergency. If the `emergency` method is available in the log property, it will be used. Otherwise, the `error` method will be used.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {Event<LogLevels.Emergency>}
 */
const EventsEmergency: Event<LogLevels.Emergency> = {
    name: LogLevels.Emergency,
    once: false,
    async execute(this: DiscordjsNode, message) {
      if ('emergency' in this.log)  return this.log.emergency(message)
      return this.log.error(message)
    }
}

/**
 * An array containing the different event types that can be logged. Available event types are: EventsClientReady, EventsDebug, EventsAlert, EventsEmergency, EventsFatal, EventsInfo, EventsTrace, and EventsWarn.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @type {{}}
 */
export const LogEvents = [EventsClientReady, EventsDebug, EventsAlert, EventsEmergency, EventsFatal, EventsInfo, EventsTrace, EventsWarn]
/**
 * The type represents various types of log events. It can be one of the following types: ClientReady, Debug, Alert, Emergency, Fatal, Info, Trace, or Warn
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @typedef {LogEventsTypes}
 */
export type LogEventsTypes = Events.ClientReady | LogLevels.Debug | LogLevels.Alert | LogLevels.Emergency | LogLevels.Fatal | LogLevels.Fatal | LogLevels.Info | LogLevels.Trace | LogLevels.Warn