/**
* @format
* -----
* Project: @eventiva/eventiva
* File: logger.ts
* Path: \projects\bots\aspects\logging\logger.ts
* Created Date: Wednesday, January 31st 2024
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
* LICENSE: GNU General Public License v2.0 or later (GPL-2.0-or-later)
* -----
* This program has been provided under confidence of the copyright holder and
* is licensed for copying, distribution and modification under the terms
* of the GNU General Public License v2.0 or later (GPL-2.0-or-later) published as the License,
* or (at your option) any later version of this license.
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License v2.0 or later for more details.
* You should have received a copy of the GNU General Public License v2.0 or later
* along with this program. If not, please write to: jonathan@resnovas.com,
* or see https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html
* -----
* This project abides by the GPL Cooperation Commitment.
* Before filing or continuing to prosecute any legal proceeding or claim
* (other than a Defensive Action) arising from termination of a Covered
* License, we commit to extend to the person or entity ('you') accused
* of violating the Covered License the following provisions regarding
* cure and reinstatement, taken from GPL version 3.
* For further details on the GPL Cooperation Commitment please visit
* the official website: https://gplcc.github.io/gplcc/
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
    logger: pino.Logger<"alert" | "emergency">
}
/**
 * A type that represents a slot in which a collection of loggers can be registered.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 */
export type LoggerSlot = SlotRegistry<Logger>;
