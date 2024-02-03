/**
* @format
* -----
* Project: @eventiva/eventiva
* File: discord.ts
* Path: \projects\bots\aspects\discordjs\locales\en\discord.ts
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

export const discord = {
    checks: {
        searching: "Checking {{key}} exists on configuration",
        found: "{{key}} found on configuration",
        notFound: "{{key}} not found on configuration",
    },
    init: {
        logging: {
            module: "Logging module found. Using logging module.",
            module_notFound: "$t(errors:noLogging)",
        },
        creating: "Creating Discord Client",
        created: "Discord Client created",
        loggingIn: "Logging in to Discord",
        loggedIn: "Logged in to Discord",
        faked: "Faking login to Discord due to no token",
    },
    events: {
        default: "Registering default events",
        multi: {
            registerEventSlot: "Registering events. {{count}} events to register",
            registering: "Registering events. {{count}} events to register",
            registered: "Events registered against EventSlot. Now hosting {{count}} events",
        }, 
        single: {
            registerEventSlot: "Registering Event - {{name}} - against EventSlot",
            registering: "Registering Event - {{name}} - on {{type}} emitter.",
            registered: "Event - {{name}} - registered on {{type}} emitter.",
        }
    },
    commands: {
        multi: {
            registering: "Registering commands. {{count}} commands to register",
            registered: "Commands registered against CommandSlot. Now hosting {{count}} commands",
        },
        single: {
            registerCommandSlot: "Registering Command - {{name}} - against CommandSlot",
            registered: "Command - {{name}} - registered against CommandSlot",
        }
    },
    modules: {
        check: "Running checks to ensure module is registrable",
        check_name: "Checking if module name {{name}} is {{key}}",
        check_exists: "Checking if module name {{name}} exists {{key}}",
        registering: "Registering module - {{name}} - against ModuleSlot",
        registered: "Registered module - {{name}} - against ModuleSlot. Now hosting {{count}} modules",
    },
} as const;