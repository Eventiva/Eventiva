/*
 * Project: Eventiva
 * File: event.ts
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/25/24, 2:15 AM
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
 * LICENSE: Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * -----
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution
 * and modification under the terms of the Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * published as the License, or (at your option) any later version of this license. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the Functional Source License, Version 1.1, MIT Future License for more
 * details. You should have received a copy of the Functional Source License, Version 1.1, MIT Future License along
 * with this program. If not, please write to: licensing@eventiva.co.uk, see the official website
 * https://fsl.software/ or Review the GitHub repository https://github.com/getsentry/fsl.software/
 * -----
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before
 * filing or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from
 * termination of a Covered License, we commit to adhering to the Eventiva Cooperation Commitment. You should have
 * received a copy of the Eventiva Cooperation Commitment along with this program. If not, please write to:
 * licensing@eventiva.co.uk, or see https://eventiva.co.uk/licensing/ecc
 * -----
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import { SlotRegistry } from '@bitdev/harmony.harmony'
import { Awaitable, ClientEvents } from 'discord.js'
import { DiscordJsModule } from './module.js'


/**
 * The interface ExtendedClientEvents extends the ClientEvents interface and includes additional events for logging levels: debug, trace, info, warn, fatal, alert, and emergency. Each event has a single parameter 'message' of type string.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @interface ExtendedClientEvents

 * @extends {ClientEvents}
 */
export interface ExtendedClientEvents
    extends ClientEvents {
    /**
     * The `debug` property is a method that takes a `message` parameter of type string. It is used for debugging purposes and can be used to log messages to the console.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @type {[message: string]}
     */
    debug: [ message: string ];
    /**
     * An array that stores trace messages. Each message is a string.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @type {[message: string]}
     */
    trace: [ message: string ];
    /**
     * A property that holds information in the form of a message. The message is of type string.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @type {[message: string]}
     */
    info: [ message: string ];
    /**
     * The `warn` property is a function that accepts a `message` of type string. It is used to log warning messages.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @type {[message: string]}
     */
    warn: [ message: string ];
    /**
     * A property representing a fatal error message. The value should be a string.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @type {[message: string]}
     */
    fatal: [ message: string ];
    /**
     * A property that triggers an alert with the specified message.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @type {[message: string]}
     */
    alert: [ message: string ];
    /**
     * The emergency property represents a message for emergency situations.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @type {[message: string]}
     */
    emergency: [ message: string ];

    /**
     * The moduleRegistered property represents the registered module in DiscordJsModule format.
     * @author Jonathan Stevens (@TGTGamer)
     */
    moduleRegistered: [ module: DiscordJsModule, reload?: true ]
}

/**
 * A generic event type that corresponds to a specific event key from the `ClientEvents` interface.
 * Properties:
 * - `data`: An object containing the event name and optional `once` flag.
 * - `execute`: Function that is called when the event is triggered, with arguments matching the corresponding event key from the `ClientEvents` interface.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export

 * @template {keyof ClientEvents} E The type of event
 */
export interface Event<E extends keyof ExtendedClientEvents> {

    /**
     * The name of the property.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @type {E}
     */
    name: E;

    /**
     * Specifies whether the function should only be executed once. If set to true, the function will only be called the first time it is invoked, and subsequent calls will be ignored.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @type {?boolean}
     */
    once?: boolean;

    /**
     * A method that executes a given function with the provided arguments. The function is determined by the event type, 'E', from the 'ExtendedClientEvents' object. The arguments are passed as parameters to the function. The return value is an 'Awaitable' Promise that resolves to 'void'.
     * @author Jonathan Stevens (@TGTGamer)
     *
     * @type {(...args: ExtendedClientEvents[E]) => Awaitable<void>}
     */
    execute: (
        this: DiscordJsModule,
        ...args: ExtendedClientEvents[E]
    ) => Awaitable<void>;
}

/**
 * A generic type representing an event slot.
 * It is a mapping from an event key in the ExtendedClientEvents union to a SlotRegistry of that event.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export

 * @template {keyof ExtendedClientEvents} E The key of the extended client events.
 */
export type EventSlot<E extends keyof ExtendedClientEvents> = SlotRegistry<Event<E>[]>;
