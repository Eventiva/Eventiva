/*
 * Project: Eventiva
 * File: rest.node.runtime.ts
 * Last Modified: 07/09/2024, 03:55
 *
 * Contributing: Please read through our contributing guidelines. Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0. Please interact in ways that contribute to an open,
 * welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 *
 * Copyright (c) 2024 Eventiva Ltd. All Rights Reserved
 * LICENSE: Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT)
 *
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution and
 * modification under the terms of the Fair Core License, Version 1.0, MIT Future License (FCL-1.0-MIT) published as the License, or
 * (at your option) any later version of this license. You must not move, change, disable, or circumvent the license key functionality
 * in the Software; or modify any portion of the Software protected by the license key to: enable access to the protected
 * functionality without a valid license key; or remove the protected functionality.This program is distributed in the hope that it will
 * be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the Fair Core License, Version 1.0, MIT Future License for more details. You should have received a
 * copy of the Fair Core License, Version 1.0, MIT Future License along with this program. If not, please write to:
 * licensing@eventiva.co.uk, see the official website https://fcl.dev/ or Review the GitHub repository
 * https://github.com/keygen-sh/fcl.dev/
 *
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before filing
 * or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from termination of a Covered
 * License, we commit to adhering to the Eventiva Cooperation Commitment. You should have received a copy of the Eventiva
 * Cooperation Commitment along with this program. If not, please write to: licensing@eventiva.co.uk, or see
 * https://eventiva.co.uk/licensing/ecc
 *
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import { PlatformAspect, type PlatformNode } from '@eventiva/backend.platform'
import { DatabaseNode } from '@eventiva/utilities.database'
import { moveRaw } from '@eventiva/utilities.helpers.common'
import { createNotFoundHandler } from '@eventiva/utilities.helpers.handler-not-found'
import { createParserFailureHandler } from '@eventiva/utilities.helpers.handler-parser-failed'
import { defaultResultHandler } from '@eventiva/utilities.helpers.handler-result'
import { ExpressMiddleware } from '@eventiva/utilities.helpers.middleware'
import type { Parsers } from '@eventiva/utilities.helpers.parsers'
import { peerLoader } from '@eventiva/utilities.helpers.peer-loader'
import { createUploadParsers } from '@eventiva/utilities.helpers.upload-parser'
import type compression from 'compression'
import express from 'express'
import type { RestConfig } from './rest-config.js'

export class RestNode {
    static dependencies = [
        PlatformAspect
    ]
    static defaultConfig: RestConfig = {
        server: {
            listen: 3000
        }
    }

    constructor (
        private config: RestConfig
    ) {
    }

    static async provider (
        [ platform, databaseNode ]: [ PlatformNode, DatabaseNode ],
        config: RestConfig
    ) {
        const rest = new RestNode( config )

        await rest.registerBackend( platform )

        return rest
    }

    async registerBackend ( platform: PlatformNode ) {

        const {
            // TODO: Implement Logging
            notFoundHandler,
            parserFailureHandler
            // loggingMiddleware,
        } = this.makeCommonEntities( this.config )


        const middlewares = []


        if ( this.config.server.compression ) {
            const compressor = await peerLoader<typeof compression>( 'compression' )
            middlewares.push(
                new ExpressMiddleware( compressor(
                    typeof this.config.server.compression === 'object'
                        ? this.config.server.compression
                        : undefined
                ) )
            )
        }

        const parsers: Parsers = {
            json: [ this.config.server.jsonParser || express.json() ],
            raw: [ this.config.server.rawParser || express.raw(), moveRaw ],
            upload: this.config.server.upload
                ? await createUploadParsers( { upload: this.config.server.upload } )
                : []
        }

        platform.registerBackendServer( [
            {
                name: 'api',
                parsers,
                middlewares,
                middlewaresPostRouting: [ parserFailureHandler, notFoundHandler ]
            }
        ] )
    }

    private makeCommonEntities ( config: RestConfig ) {
        const errorHandler = config.errorHandler || defaultResultHandler
        // const loggingMiddleware = createLoggingMiddleware({ rootLogger, config });
        // TODO: Implement Logging
        const notFoundHandler = new ExpressMiddleware( createNotFoundHandler( { errorHandler } ) )
        const parserFailureHandler = { execute: createParserFailureHandler( { errorHandler } ) }
        return {
            errorHandler,
            notFoundHandler,
            parserFailureHandler
            // loggingMiddleware,
            // TODO: Implement Logging
        }
    };
}

export default RestNode
