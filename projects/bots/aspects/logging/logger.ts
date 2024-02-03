/**
* @format
* -----
* Project: @eventiva/eventiva
* File: logger.ts
* Path: \projects\bots\aspects\logging\logger.ts
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

import pino from 'pino';
import type { SlotRegistry } from '@bitdev/harmony.harmony';
import { LoggingConfig } from './logging-config';
/**
 * Represents a logger object for logging messages. The type parameter specifies the log levels that the logger supports.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 */
export type Log = pino.Logger<"alert" | "emergency">
/**
 * The Logger type represents a logger instance.
 * Properties:
 * - name: A string representing the name of the logger.
 * - options: An optional object of type LoggingConfig, excluding the 'customLevels' property.
 * - logger: An optional instance of the 'pino.Logger' class with valid log level values of 'alert' or 'emergency'.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 */
export type Logger = {
    name: string,
    options?: Omit<LoggingConfig, "customLevels">
    logger?: pino.Logger<"alert" | "emergency">
}
/**
 * A type that represents a slot in which a collection of loggers can be registered.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 */
export type LoggerSlot = SlotRegistry<Logger>;
