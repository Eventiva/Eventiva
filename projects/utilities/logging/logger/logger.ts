/*
 * Project: Eventiva
 * File: logger.ts
 * Last Modified: 28/08/2024, 08:43
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

import type { SlotRegistry } from '@bitdev/harmony.harmony'
import { LoggerAspect } from './index.js'
import type { LoggerConfig } from './logger-config.js'
import { DefaultLevels } from './logger.node.runtime.js'

export type Logger<TLevels extends string> = {
    name: string,
    options?: LoggerConfig<TLevels>
    logger?: {
        [level in ( typeof DefaultLevels[number] | TLevels )]: (
            msg: string,
            obj?: object,
            ...args: any[]
        ) => void;
    }
}

export type LoggerSlot<TLevels extends string> = SlotRegistry<Logger<TLevels>>;

export type LoggerUtilType<CustomLevels extends string = never> = {
    [level in ( typeof DefaultLevels[number] | CustomLevels )]: (
        msg: string,
        obj?: object,
        ...args: any[]
    ) => void;
}

export abstract class LoggerUtil<CustomLevels extends string = never>
    implements LoggerUtilType {
    static readonly dependencies = [ LoggerAspect ]
    static readonly defaultConfig: LoggerConfig = {
        level: 'info',
        module: 'utilities:logging:undefined'
    }
    abstract warning: (
        msg: string,
        obj?: object,
        ...args: any[]
    ) => void
    abstract critical: (
        msg: string,
        obj?: object,
        ...args: any[]
    ) => void
    abstract alert: (
        msg: string,
        obj?: object,
        ...args: any[]
    ) => void
    abstract emergency: (
        msg: string,
        obj?: object,
        ...args: any[]
    ) => void
    abstract trace: (
        msg: string,
        obj?: object,
        ...args: any[]
    ) => void
    abstract debug: (
        msg: string,
        obj?: object,
        ...args: any[]
    ) => void
    abstract info: (
        msg: string,
        obj?: object,
        ...args: any[]
    ) => void
    abstract notice: (
        msg: string,
        obj?: object,
        ...args: any[]
    ) => void
    abstract warn: (
        msg: string,
        obj?: object,
        ...args: any[]
    ) => void
    abstract error: (
        msg: string,
        obj?: object,
        ...args: any[]
    ) => void
    abstract fatal: (
        msg: string,
        obj?: object,
        ...args: any[]
    ) => void

    constructor ( protected config: LoggerConfig<CustomLevels> ) {
    }
}

export default LoggerUtil
