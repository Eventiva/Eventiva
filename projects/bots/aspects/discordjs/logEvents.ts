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
import { LogLevels } from "@eventiva/bots.aspects.logging";
import { Event } from "./event"
import {Events} from 'discord.js';
import {DiscordjsNode} from './discordjs.node.runtime'

const EventsClientReady: Event<Events.ClientReady> = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
      client.emit(LogLevels.Info, `Logged in as ${client.user.tag} at ${new Date().toLocaleString()}`)
    }
}

const EventsInfo: Event<LogLevels.Info> = {
    name: LogLevels.Info,
    once: true,
    async execute(this: DiscordjsNode, message) {
      this.logging.console.info(message)
    }
}
const EventsDebug: Event<LogLevels.Debug> = {
    name: LogLevels.Debug,
    once: true,
    async execute(this: DiscordjsNode, message) {
      this.logging.console.debug(message)
    }
}
const EventsTrace: Event<LogLevels.Trace> = {
    name: LogLevels.Trace,
    once: true,
    async execute(this: DiscordjsNode, message) {
      this.logging.console.trace(message)
    }
}
const EventsWarn: Event<LogLevels.Warn> = {
    name: LogLevels.Warn,
    once: true,
    async execute(this: DiscordjsNode, message) {
      this.logging.console.warn(message)
    }
}
const EventsFatal: Event<LogLevels.Fatal> = {
    name: LogLevels.Fatal,
    once: true,
    async execute(this: DiscordjsNode, message) {
      this.logging.console.fatal(message)
    }
}
const EventsAlert: Event<LogLevels.Alert> = {
    name: LogLevels.Alert,
    once: true,
    async execute(this: DiscordjsNode, message) {
      this.logging.console.alert(message)
    }
}
const EventsEmergency: Event<LogLevels.Emergency> = {
    name: LogLevels.Emergency,
    once: true,
    async execute(this: DiscordjsNode, message) {
      this.logging.console.emergency(message)
    }
}

export const LogEvents = [EventsClientReady, EventsDebug, EventsAlert, EventsEmergency, EventsFatal, EventsInfo, EventsTrace, EventsWarn]
export type LogEventsTypes = Events.ClientReady | LogLevels.Debug | LogLevels.Alert | LogLevels.Emergency | LogLevels.Fatal | LogLevels.Fatal | LogLevels.Info | LogLevels.Trace | LogLevels.Warn