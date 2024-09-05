/*
 * Project: Eventiva
 * File: rest.node.runtime.ts
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

import { PlatformAspect, type PlatformNode } from '@eventiva/backend.platform'
import { DatabaseNode } from '@eventiva/utilities.database'
import { moveRaw } from '@eventiva/utilities.helpers.common'
import { createNotFoundHandler } from '@eventiva/utilities.helpers.handler-not-found'
import { createParserFailureHandler } from '@eventiva/utilities.helpers.handler-parser-failed'
import type { Parsers } from '@eventiva/utilities.helpers.parsers'
import { peerLoader } from '@eventiva/utilities.helpers.peer-loader'
import { createUploadParsers } from '@eventiva/utilities.helpers.upload-parser'
import type compression from 'compression'
import express from 'express'
import type { RestConfig } from './rest-config.js'
import { defaultResultHandler } from './result-handler.js'


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

        // const {
        //     // TODO: Implement Logging
        //     notFoundHandler,
        //     parserFailureHandler
        //     // loggingMiddleware,
        // } = this.makeCommonEntities( this.config )


        const middlewares = [
            // parserFailureHandler,
            // notFoundHandler
        ]


        if ( this.config.server.compression ) {
            const compressor = await peerLoader<typeof compression>( 'compression' )
            middlewares.push(
                compressor(
                    typeof this.config.server.compression === 'object'
                        ? this.config.server.compression
                        : undefined
                )
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
                parsers,
                middlewares
            }
        ] )

    }

    private makeCommonEntities ( config: RestConfig ) {
        const errorHandler = config.errorHandler || defaultResultHandler
        // const loggingMiddleware = createLoggingMiddleware({ rootLogger, config });
        // TODO: Implement Logging
        const notFoundHandler = createNotFoundHandler( { errorHandler } )
        const parserFailureHandler = createParserFailureHandler( { errorHandler } )
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
