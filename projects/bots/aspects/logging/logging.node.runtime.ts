/**
* @format
* -----
* Project: @eventiva/eventiva
* File: logging.node.runtime.ts
* Path: \projects\bots\aspects\logging\logging.node.runtime.ts
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
import pinoCaller from 'pino-caller';
import pretty from 'pino-pretty';
import type { LoggingConfig } from './logging-config.js';
import { Log, Logger, LoggerSlot } from './logger.js';

/**
 * A class representing a logging node. It provides logging functionalities using the pino library.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class LoggingNode
 * @typedef {LoggingNode}
 */
export class LoggingNode {
  /**
   * A property that returns a readable stream of the formatted output. The stream is configured with options to enable colorization, with the 'colorize' parameter set to true.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {*}
   */
  stream = pretty({
    colorize: true
  })
  /**
   * The `console` object provides access to the browser's debugging console. You can use it to output messages, debug code, and track the execution of your JavaScript code. The console object also provides various methods, such as log, warn, and error, for different types of messages.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @type {Log}
   */
  console: Log
  /**
   * This property is a reference to the logging object used by the application. It can be either an instance of the Log class or the Console object. By default, it is set to the Console object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @private
   * @type {(Log | Console)}
   */
  private log: Log | Console = console

  /**
   * Creates an instance of LoggingNode.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param {LoggingConfig} config The logging configuration.
   * @param {LoggerSlot} loggerSlot The logger slot to use.
   */
  constructor(
    private config: LoggingConfig,
    private loggerSlot: LoggerSlot,
  ) { 
    // @ts-expect-error Type guarding error. Not sure how to fix. TODO: Fix me somehow
    this.console = process.env.NODE_ENV === 'development' ? pinoCaller(pino(this.config, this.stream)) : pino(this.config, this.stream);
    this.log = this.registerLogger([{name: "logger:main", options: {level: config.level}}]).getLogger("logger:main").logger
  }
  
    /**
     * Registers an array of loggers.
     * Creates a new child logger on each logger argument.
     * Logs debug messages for each step of the registration process.
     * Registers each logger against the LoggerSlot.
     * Returns the current instance of the object.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @param {Logger[]} loggers An array of Logger objects.
     * @returns {this} Registers an array of loggers and adds them to the logger slot.
     */
    registerLogger(loggers: Partial<Logger>[]) {
      // create a new child logger on each logger arg
      if(this.log) this.log.debug(`Registering loggers. ${loggers.length} loggers to be loaded.`)
      for (let logger of loggers) {
        if(this.log) this.log.debug(`Registering logger ${logger.name}, with level: ${logger.options?.level}.`)
        logger.logger = this.console.child({module: logger.name})
        if (this.log) this.log.debug(`Registering logger ${logger.name} against LoggerSlot`)
        this.loggerSlot.register(logger as Logger)
        if(this.log) this.log.debug(`Logger ${logger.name} registered.`)
      }
      if(this.log) this.log.debug(`Loggers registered against LoggerSlot. Now hosting ${this.loggerSlot.length} Loggers`)

      return this;
    }
  
    /**
     * Returns the list of loggers. Each logger is represented as a value in an array.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @returns {*} Returns the list of loggers.
     */
    listLoggers() {
      return this.loggerSlot.flatValues();
    }

    /**
     * Returns the logger for the specified module.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @param {string} module The name of the module from which to get the logger
     * @returns {*} This function takes a module name as input and returns a logger for that module.
     */
    getLogger(module: string): Logger {
      const logger = this.loggerSlot.getByName(module)
      if (logger) return logger
      this.log.error(`Logger ${module} not found. Returning default logger.`)
      throw new Error(`Logger ${module} not found. Returning default logger.`)
    }

  /**
   * An array containing the dependencies of the class.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   * @type {{}}
   */
  static dependencies = [];

  /**
   * The default configuration for logging. It includes the logging level and custom levels.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   * @type {LoggingConfig}
   */
  static defaultConfig: LoggingConfig = {
    level: 'trace',
    customLevels: {
      alert: 70,
      emergency: 80 
    },
  };

  /**
   * Creates a logging provider with the given configuration and logger.
   * @param deps - An empty array of dependencies.
   * @param config - The configuration for the logging provider.
   * @param Logger - The logger slot to be used for logging.
   * @returns A Promise that resolves to a logging provider.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   * @async
   * @param {[]} deps An array of dependencies
   * @param {LoggingConfig} config The logging configuration
   * @param {[LoggerSlot]} param0 A logger slot
   * @param {LoggerSlot} param0.Logger
   * @returns {unknown} Creates a logging provider with the specified dependencies, configuration, and logger slot.
   */
  static async provider(
    deps: [],
    config: LoggingConfig,
    [Logger]: [LoggerSlot]
  ) {
    const logging = new LoggingNode(config, Logger);
    return logging;
  }
}

export default LoggingNode;
