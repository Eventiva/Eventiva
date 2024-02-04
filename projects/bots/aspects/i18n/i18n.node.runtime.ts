/**
* @format
* -----
* Project: @eventiva/eventiva
* File: i18n.node.runtime.ts
* Path: \projects\bots\aspects\i18n\i18n.node.runtime.ts
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


import { I18NConfig } from './i18n-config.js';
import { Resource, ResourceSlot } from './resource.js'
import i18next, {i18n} from 'i18next';
import {common as enCommon} from './locales/en/common.js';
import {common as esCommon} from './locales/es/common.js';
import LoggingAspect, { Log, LoggingNode } from '@eventiva/bots.aspects.logging';

/**
 * export class I18NNode {
 *   ...
 * }
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class
 */
export class I18NNode {

  /**
   * The i18next property is used for internationalization (i18n) purposes. It is a reference to the i18n module named i18next and is used to handle translation and localization in the application.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   */
  public i18next: i18n = i18next;

  /**
   * The `log` property is a reference to the `Log` class or the `Console` object. It is a protected property, accessible only within the class and its subclasses. If no custom logger is provided, the property is set to the global `console` object.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @protected
   */
  protected log: Log | Console = console

  /**
   * The `t` property is a function that provides internationalization support using the `i18next` library. It can be used to translate text in the application.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @public
   */
  public t = this.i18next.t

  /**
   * Creates an instance of I18NNode.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @constructor
   * @param config The configuration object for i18n
   * @param resourceSlot The resource slot to use for i18n
   * @param logging the logging node to use for i18n
   */
  constructor(
    private config: I18NConfig,
    private resourceSlot: ResourceSlot,
    protected logging?: LoggingNode
  ) {
    this.log = logging ? logging.registerLogger([{name: "i18n", options: this.config.logger}]).getLogger("i18n").logger : console
    this.log.trace(`Logging module ${logging ? "found. Using logging module." : "not found. Using Console module."}`)
    
    this.init();
  }


  /**
   * Initialize the object with i18next library and configuration.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @private
   * @async
   * @returns Initializes i18next with the provided configuration and returns the initialized instance.
   */
  private async init() {
    this.log.trace(`Initializing i18next with config: ${JSON.stringify(this.config)}`)
    await this.i18next.init(this.config);
    this.log.trace(`i18next initialized.`)
    return this;
  }


  /**
   * Registers an array of resources.
   * @param resources - Array of resources to register.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @param resources Array of Resource objects to be registered
   * @returns Registers resources by adding them to the i18next instance, loading the languages, namespaces, and resources.
   */
  registerResource(resources: Resource[]) {
    this.log.debug(`Registering resources. ${resources.length} resources to be loaded.`)
    for (const resource of resources) {
      this.log.trace(`Registering resource. ${resource.lng}, ${resource.ns}, ${JSON.stringify(resource.resources)}`)
      this.i18next = this.i18next.addResourceBundle(resource.lng, resource.ns, resource.resources);
      this.log.trace(`Registering resource against ResourceSlot.`)
      this.resourceSlot.register(resource)
      this.log.trace(`Loading resource ${resource.lng} into i18next.`)
      this.i18next.loadLanguages(resource.lng)
      this.log.trace(`Loading namespace ${resource.ns} into i18next.`)
      this.i18next.loadNamespaces(resource.ns)
      this.log.trace(`Loading resources into i18next.`)
      this.i18next.loadResources()
      this.log.trace(`Resource registered.`)
    }
    this.log.debug(`Resources registered against ResourceSlot. Now hosting ${this.resourceSlot.length} Resources`)
    return this;
  }


  /**
   * Returns a list of resources. It calls the 'flatValues' method on the 'resourceSlot' object and returns the result.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @returns Returns the flat values of the resource slot.
   */
  listResources() {
    return this.resourceSlot.flatValues();
  }


  /**
   * Returns the resource with the specified name.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @param name The name of the resource to retrieve.
   * @returns Get the resource with the specified name.
   */
  getResource(name: string) {
    return this.resourceSlot.get(name);
  }


  /**
   * An array of classes that this class depends on. The classes are used as aspect weaving dependencies.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   */
  static dependencies = [LoggingAspect];


  /**
   * The default configuration for internationalization. It includes the language, fallback language, default namespace, fallback namespace, debug mode, and resources.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   */
  static defaultConfig: I18NConfig = {
    lng: 'en', 
    fallbackLng: 'en', 
    defaultNS: "common",
    fallbackNS: "common",
    debug: true,
    resources: {
      en: {
        common: enCommon
      },
      es: {
        common: esCommon
      }
    },
    logger: {
      level: "trace"
    }
  };


  /**
   * This function is a static async method that takes in three arguments: logging (optional), config, and resourceSlot. It creates a new instance of the I18NNode class with the given config and resourceSlot, as well as the optional logging. Finally, it returns the newly created I18NNode instance.
   * @author Jonathan Stevens (@TGTGamer)
   *
   * @static
   * @async
   * @param param0 The logging instance
   * @param param0.logging The logging node
   * @param config The configuration for the I18N node
   * @param param1 The resource slot
   * @param param1.resourceSlot The resource slot node
   * @returns A static async function that provides an instance of the I18NNode class. It takes in a logging node, an I18NConfig object, and a resource slot. It initializes a new instance of the I18NNode class with the provided configuration, resource slot, and logging node, and returns the instance.
   */
  static async provider(
    [logging]: [LoggingNode|undefined],
    config: I18NConfig,
    [resourceSlot]: [ResourceSlot]
  ) {
    const i18N = new I18NNode(config, resourceSlot, logging);
    return i18N;
  }
}

export default I18NNode;
