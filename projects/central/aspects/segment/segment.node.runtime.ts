/*
 * Project: Eventiva
 * File: segment.node.runtime.ts
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/23/24, 11:52 PM
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
 * 2024 Eventiva - All Rights Reserved
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
 * along with this program. If not, please write to: licensing@eventiva.co.uk,
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

import { Analytics } from '@segment/analytics-node'
import { Instance, InstanceSlot } from './instance.js'
import type { SegmentConfig } from './segment-config.js'

/**
 * A class representing a Segment Node in the application. It contains methods for registering plugins, listing plugins, and a static provider method. The Segment Node has a constructor that takes SegmentConfig and PluginSlot as parameters. The registerPlugin method registers a list of plugins with the plugin slot. The listPlugins method returns a list of all plugins registered. The class also has static properties dependencies and defaultConfig. The provider static method creates a new instance of SegmentNode with the provided SegmentConfig and PluginSlot and returns it.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class
 */
export class SegmentNode {
    /**
     * A static property that holds an empty array to store dependencies.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @static
     */
    static dependencies = [];
    /**
     * A static property representing the default configuration for a Segment. An instance of SegmentConfig with the writeKey attribute set to the value of the environment variable SEGMENT_WRITE_KEY.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @static
     */
    static defaultConfig: SegmentConfig = {
        writeKey: process.env.SEGMENT_WRITE_KEY!,
    };
    /**
     * A property that represents the analytics module.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @public
     */
    public analytics: Analytics

    /**
     * Creates an instance of SegmentNode.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @constructor
     * @param config An object with configuration options for the segment
     * @param instanceSlot An instance of instanceSlot
     */
    constructor(
        private config: SegmentConfig,
        private instanceSlot: InstanceSlot,
    ) {
        this.analytics = new Analytics(config)
    }

    /**
     * Creates a new SegmentNode instance with the provided configuration.
     * Throws an error if the SegmentConfig does not have a writeKey defined.
     * Returns the created SegmentNode instance.
     *
     * @param {[]} _ Unused parameter (empty array)
     * @param {SegmentConfig} config Segment configuration object
     * @param {[InstanceSlot]} instanceSlot An array containing an instance slot
     * @returns {Promise<SegmentNode>} A Promise that resolves with a new SegmentNode instance based on the provided config and instanceSlot.
     *                                It throws an error if the writeKey is missing in the config.
     */
    static async provider(
        []: [],
        config: SegmentConfig,
        [instanceSlot]: [InstanceSlot]
    ) {
        if (!config.writeKey) {
            throw new Error('Segment writeKey is required');
        }
        const segment = new SegmentNode(config, instanceSlot);
        return segment;
    }

    /**
     * Registers instances with a given configuration. Each instance in the input array is marked as initialized with 'true' status and a new Analytics object is created with the provided configuration. The initialized instances are then stored using instanceSlot register method. Returns the current object for chaining purposes.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @param instances An array of instances with a boolean flag indicating initialization status.
     * @returns Registers a list of instances with the specified flag, initializes them, and registers them to an instance slot. Returns the current instance for chaining purposes.
     */
    registerInstance(instances: Instance<false>[]) {
        const initializedInstances: Instance<true>[] = [];
        for (let instance of instances) {
            initializedInstances.push({
                ...instance,
                initialized: true,
                analytics: new Analytics(this.config)
            });
        }
        this.instanceSlot.register(initializedInstances);
        return this;
    }

    /**
     * Returns an instance by its name.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @param name A function that retrieves an instance by name.
     * @returns Get an instance by name
     */
    getInstance(name: string) {
        return this.instanceSlot.getByName(name)
    }

    /**
     * Returns all instances.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @returns Retrieve a list of instances from the instance slot.
     */
    listInstances() {
        return this.instanceSlot.flatValues();
    }
}

export default SegmentNode;
