/*
 * Project: Eventiva
 * File: discord.ts
 * Last Modified: 3/29/24, 4:54 PM
 *
 * Contributing: Please read through our contributing guidelines.
 * Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0
 * Please interact in ways that contribute to an open, welcoming, diverse,
 * inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution
 * and modification under the terms of the Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * published as the License, or (at your option) any later version of this license. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the Functional Source License, Version 1.1, MIT Future License for more
 * details. You should have received a copy of the Functional Source License, Version 1.1, MIT Future License along
 * with this program. If not, please write to: licensing@eventiva.co.uk, see the official website
 * https://fsl.software/ or Review the GitHub repository https://github.com/getsentry/fsl.software/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before
 * filing or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from
 * termination of a Covered License, we commit to adhering to the Eventiva Cooperation Commitment. You should have
 * received a copy of the Eventiva Cooperation Commitment along with this program. If not, please write to:
 * licensing@eventiva.co.uk, or see https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

export const discord = {
    clientStarted: 'Discord Client Initialized',
    checks_searching: 'Checking {{key}} exists on configuration',
    checks_found: '{{key}} found on configuration',
    checks_notFound: '{{key}} not found on configuration',
    client: {
        creating: 'Creating Discord Client',
        created: 'Discord Client created'
    },
    init: {
        logging: {
            module: 'Logging module found. Using logging module.',
            module_notFound: '$t(errors:noLogging)'
        },
        creating: 'Creating Discord Client',
        created: 'Discord Client created',
        loggingIn: 'Logging in to Discord',
        loggedIn: 'Logged in to Discord',
        faked: 'Faking login to Discord due to no token'
    },
    events: {
        listing: 'Listing {{count}} events',
        listed: 'Events listed. {{flatmap}}',
        multi: {
            registerEventSlot: 'Registering events against EventSlot',
            registering: 'Registering events. {{count}} events to register',
            registered: 'Events registered against EventSlot. Now hosting {{count}} events'
        },
        single: {
            registering: 'Registering Event - {{name}} - on {{type}} emitter.',
            registered: 'Event - {{name}} - registered on {{type}} emitter.'
        }
    },
    commands: {
        listing: 'Listing {{count}} commands',
        listed: 'Commands listed. {{flatmap}}',
        multi: {
            registerCommandSlot: 'Registering Commands against CommandSlot',
            registering: 'Registering commands. {{count}} commands to register',
            registered: 'Commands registered against CommandSlot. Now hosting {{count}} commands'
        },
        single: {
            binding: 'Registering command - {{name}}',
            bound: 'Command - {{name}}'
        }
    },
    modules: {
        init: 'Initializing module {{name}}',
        init_complete: 'Initialized module {{name}}',
        check: 'Running checks to ensure module is registrable',
        check_name: 'Checking if module name {{name}} is {{key}}',
        check_exists: 'Checking if module name {{name}} exists {{key}}',
        registering: 'Registering module - {{name}}',
        registered: 'Registered module - {{name}}'
    }
} as const

export default discord
