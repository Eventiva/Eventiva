/*
 * Project: Eventiva
 * File: upload-parser.ts
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

import { peerLoader } from '@eventiva/utilities.helpers.peer-loader'
import { Request, type RequestHandler } from 'express'
import type fileUpload from 'express-fileupload'

export type UploadOptions = Pick<
    fileUpload.Options,
    | 'createParentPath'
    | 'uriDecodeFileNames'
    | 'safeFileNames'
    | 'preserveExtension'
    | 'useTempFiles'
    | 'tempFileDir'
    | 'debug'
    | 'uploadTimeout'
    | 'limits'
> & {
    /**
     * @description The error to throw when the file exceeds the configured fileSize limit (handled by errorHandler).
     * @see limits
     * @example createHttpError(413, "The file is too large")
     */
    limitError?: Error;
    /**
     * @description A handler to execute before uploading — it can be used for restrictions by throwing an error.
     * @default undefined
     * @example ({ request }) => { throw createHttpError(403, "Not authorized"); }
     */
    beforeUpload?: BeforeUpload;
};

export type BeforeUpload = ( params: {
    request: Request;
} ) => void | Promise<void>;

export const createUploadParsers = async ( { upload }: {
    upload: boolean | UploadOptions;
} ): Promise<RequestHandler[]> => {
    const uploader = await peerLoader<typeof fileUpload>( 'express-fileupload' )
    const { limitError, beforeUpload, ...options } = {
        ...( typeof upload === 'object' && upload )
    }
    const parsers: RequestHandler[] = []
    parsers.push( async (
        request,
        response,
        next
    ) => {
        try {
            await beforeUpload?.( { request } )
        } catch ( error ) {
            return next( error )
        }
        uploader( {
            debug: true,
            ...options,
            abortOnLimit: false,
            parseNested: true
        } )( request, response, next )
    } )
    if ( limitError ) {
        parsers.push( createUploadFailureHandler( limitError ) )
    }
    return parsers
}

export const createUploadFailureHandler =
    ( error: Error ): RequestHandler =>
        (
            req,
            {},
            next
        ) => {
            const failedFile = Object.values( req?.files || [] )
                .flat()
                .find( ( { truncated } ) => truncated )
            if ( failedFile ) {
                return next( error )
            }
            next()
        }
