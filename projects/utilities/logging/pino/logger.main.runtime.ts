/*
 * Project: Eventiva
 * File: logger.main.runtime.ts
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/23/24, 7:43 PM
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
 * 2024 Resnovas - All Rights Reserved
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
// import { MainRuntime } from '@teambit/cli'
// import { PinoNode } from './pino.node.runtime.js'
// import { Logger as BaseLogger } from '@teambit/logger'

// export class LoggerMain {
//     static runtime = MainRuntime;
//     static dependencies = [];

//     createLogger(extensionName: string): PinoNode {
//         return new PinoNode()
//     }

//     static async provider() {
//         return new LoggerMain()
//     }
// }

// export class Logger extends BaseLogger {

//     silly(message: string, ...meta: any[]): void;
//     trace(message: string, ...meta: any[]): void
//     debug(message: string, ...meta: any[]): void
//     info(message: string, ...meta: any[]): void
//     warn(message: string, ...meta: any[]): void
//     error(message: string, ...meta: any[]): void
//     fatal(message: string, ...meta: any[]): void

//     get isLoaderStarted(): boolean
//     get isSpinning(): boolean | undefined
//     get multiSpinner(): Spinnies

//     createLongProcessLogger(processDescription: string, totalItems?: number, shouldConsole?: ConsoleOnStart): LongProcessLogger

//     setStatusLine(text: string, shouldPrintOnCI?: boolean): void

//     clearStatusLine(): void

//     console(message?: string, ...meta: any[]): void

//     consoleWarn(message?: string, ...meta: any[]): void

//     consoleError(message?: string, ...meta: any[]): void

//     consoleTitle(message: string): void

//     consoleSuccess(message?: string, startTime?: [number, number]): void

//     profile(id: string, console?: boolean): void

//     consoleFailure(message?: string): void

//     consoleWarning(message?: string): void

//     static successSymbol(): string
// }
