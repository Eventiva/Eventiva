/*
 * Project: Eventiva
 * File: rest-config.ts
 * Last Modified: 06/09/2024, 08:12
 *
 * Contributing: Please read through our contributing guidelines. Included are directions for opening issues, coding standards,
 *  and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0. Please interact in ways that contribute to an open,
 *  welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at
 *  https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution and
 * modification under the terms of the Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT) published as the License, or
 *  (at your option) any later version of this license. You must not move, change, disable, or circumvent the license key functionality
 *   in the Software; or modify any portion of the Software protected by the license key to: enable access to the protected
 *   functionality without a valid license key; or remove the protected functionality.This program is distributed in the hope that it will
 *   be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 *   PARTICULAR PURPOSE. See the Fair Core License, Version 1.0, MIT Future License for more details. You should have received a
 *   copy of the Fair Core License, Version 1.0, MIT Future License along with this program. If not, please write to:
 *   licensing@eventiva.co.uk, see the official website https://fcl.dev/ or Review the GitHub repository
 *   https://github.com/keygen-sh/fcl.dev/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before filing
 *  or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from termination of a Covered
 *  License, we commit to adhering to the Eventiva Cooperation Commitment. You should have received a copy of the Eventiva
 *  Cooperation Commitment along with this program. If not, please write to: licensing@eventiva.co.uk, or see
 *  https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import { UploadOptions } from '@eventiva/utilities.helpers.upload-parser'
import type { CommonConfig } from '@eventiva/utilities.helpers.zod.common'
import type compression from 'compression'
import { IRouter, RequestHandler } from 'express'
import { ServerOptions } from 'node:https'
import { ListenOptions } from 'node:net'

// use this type for your aspect config.
export interface RestConfig<TAG extends string = string>
    extends CommonConfig<TAG> {
    /** @desc Server configuration. */
    server: {
        /** @desc Port, UNIX socket or custom options. */
        listen: number | string | ListenOptions;
        /**
         * @desc Custom JSON parser.
         * @default express.json()
         * @link https://expressjs.com/en/4x/api.html#express.json
         * */
        jsonParser?: RequestHandler;
        /**
         * @desc Enable or configure uploads handling.
         * @default undefined
         * @requires express-fileupload
         * */
        upload?: boolean | UploadOptions;
        /**
         * @desc Enable or configure response compression.
         * @default undefined
         * @requires compression
         */
        compression?: boolean | CompressionOptions;
        /**
         * @desc Custom raw parser (assigns Buffer to request body)
         * @default express.raw()
         * @link https://expressjs.com/en/4x/api.html#express.raw
         * */
        rawParser?: RequestHandler;
        /**
         * @desc A code to execute before processing the Routing of your API (and before parsing).
         * @desc This can be a good place for express middlewares establishing their own routes.
         * @desc It can help to avoid making a DIY solution based on the attachRouting() approach.
         * @default undefined
         * @example ({ app }) => { app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); }
         * */
        beforeRouting?: BeforeRouting;
    };
    /** @desc Enables HTTPS server as well. */
    https?: {
        /** @desc At least "cert" and "key" options required. */
        options: ServerOptions;
        /** @desc Port, UNIX socket or custom options. */
        listen: number | string | ListenOptions;
    };
}


type CompressionOptions = Pick<
    compression.CompressionOptions,
    'threshold' | 'level' | 'strategy' | 'chunkSize' | 'memLevel'
>;

type BeforeRouting = ( params: {
    app: IRouter;
} ) => void | Promise<void>;


