/*
 * Project: Eventiva
 * File: config.ts
 * Last Modified: 04/09/2024, 22:49
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

import type { AbstractResultHandler } from '@eventiva/utilities.helpers.handler'
import type { Method } from '@eventiva/utilities.helpers.http-methods'
import { Request } from 'express'
import type { AbstractEndpoint } from './abstract-endpoint.js'

export interface CommonConfig<TAG extends string = string> {
    /**
     * @desc Enables cross-origin resource sharing.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
     * @desc You can override the default CORS headers by setting up a provider function here.
     */
    cors?: HeadersProvider;
    /**
     * @desc The ResultHandler to use for handling routing, parsing and upload errors
     * @default defaultResultHandler
     * @see defaultResultHandler
     */
    errorHandler?: AbstractResultHandler;
    /**
     * @desc Which properties of request are combined into the input for endpoints and middlewares.
     * @desc The order matters: priority from lowest to highest
     * @default defaultInputSources
     * @see defaultInputSources
     */
    inputSources?: Partial<InputSources>;
    /**
     * @desc Optional endpoints tagging configuration.
     * @example: { users: "Everything about the users" }
     */
    tags?: TagsConfig<TAG>;
}

type HeadersProvider = ( params: {
    /** @desc The default headers to be overridden. */
    defaultHeaders: Headers;
    request: Request;
    endpoint: AbstractEndpoint;
} ) => Headers | Promise<Headers>;

interface TRequest
    extends Request {
    files?: any;
}

export type InputSource = keyof Pick<
    TRequest,
    'query' | 'body' | 'files' | 'params' | 'headers'
>;
export type InputSources = Record<Method, InputSource[]>;
export type TagsConfig<TAG extends string> = Record<
    TAG,
    string | { description: string; url?: string }
>;
