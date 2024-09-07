/*
 * Project: Eventiva
 * File: result-handler.ts
 * Last Modified: 06/09/2024, 16:38
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

import '@eventiva/utilities.plugins.zod'
import { contentTypes } from '@eventiva/utilities.helpers.content-types'
import { ResultHandlerError } from '@eventiva/utilities.helpers.errors'
import { AbstractResultHandler, type Handler } from '@eventiva/utilities.helpers.handler'
import type { NormalizedResponse } from '@eventiva/utilities.helpers.zod.api-response'
import { type ApiResponse, defaultStatusCodes } from '@eventiva/utilities.helpers.zod.api-response'
import { getExamples } from '@eventiva/utilities.helpers.zod.common'
import { getMessageFromError, getStatusCodeFromError } from '@eventiva/utilities.helpers.zod.errors'
import type { IOSchema } from '@eventiva/utilities.helpers.zod.io-schema'
import assert from 'node:assert/strict'
import { z } from 'zod'

export type Result<S extends z.ZodTypeAny = z.ZodTypeAny> =
    | S // plain schema, default status codes applied
    | ApiResponse<S> // single response definition, status code(s) customizable
    | ApiResponse<S>[]; // Feature #1431: different responses for different status codes (non-empty, prog. check!)

export type LazyResult<R extends Result, A extends unknown[] = []> = (
    ...args: A
) => R;

export type ResultSchema<R extends Result> =
    R extends Result<infer S>
        ? S
        : never;

export class ResultHandler<
    POS extends Result,
    NEG extends Result,
>
    extends AbstractResultHandler {
    readonly #positive: POS | LazyResult<POS, [ IOSchema ]>
    readonly #negative: NEG | LazyResult<NEG>

    constructor ( params: {
        /** @desc A description of the API response in case of success (schema, status code, MIME type) */
        positive: POS | LazyResult<POS, [ IOSchema ]>;
        /** @desc A description of the API response in case of error (schema, status code, MIME type) */
        negative: NEG | LazyResult<NEG>;
        /** @desc The actual implementation to transmit the response in any case */
        handler: Handler<z.output<ResultSchema<POS> | ResultSchema<NEG>>>;
    } ) {
        super( params.handler )
        this.#positive = params.positive
        this.#negative = params.negative
    }

    public override getPositiveResponse ( output: IOSchema ) {
        return normalize( this.#positive, {
            variant: 'positive',
            arguments: [ output ],
            statusCodes: [ defaultStatusCodes.positive ],
            mimeTypes: [ contentTypes.json ]
        } )
    }

    public override getNegativeResponse () {
        return normalize( this.#negative, {
            variant: 'negative',
            arguments: [],
            statusCodes: [ defaultStatusCodes.negative ],
            mimeTypes: [ contentTypes.json ]
        } )
    }
}

export const defaultResultHandler = new ResultHandler( {
    positive: ( output ) => {
        // Examples are taken for proxying: no validation needed for this
        const examples = getExamples( { schema: output } )
        const responseSchema = z.object( {
            status: z.literal( 'success' ),
            data: output
        } )
        return examples.reduce<typeof responseSchema>(
            (
                acc,
                example
            ) => acc.example( { status: 'success', data: example } ),
            responseSchema
        )
    },
    negative: z
        .object( {
            status: z.literal( 'error' ),
            error: z.object( { message: z.string() } )
        } )
        .example( {
            status: 'error',
            error: {
                message: getMessageFromError( new Error( 'Sample error message' ) )
            }
        } ),
    handler: ( { error, input, output, request, response } ) => {
        if ( !error ) {
            response
                .status( defaultStatusCodes.positive )
                .json( { status: 'success', data: output } )
            return
        }
        const statusCode = getStatusCodeFromError( error )

        // logInternalError({ logger, statusCode, request, error, input });
        // TODO: implement logging

        response.status( statusCode ).json( {
            status: 'error',
            error: { message: getMessageFromError( error ) }
        } )
    }
} )

/** @throws ResultHandlerError when Result is an empty array */
export const normalize = <A extends unknown[]> (
    subject: Result | LazyResult<Result, A>,
    features: {
        variant: 'positive' | 'negative';
        arguments: A;
        statusCodes: [ number, ...number[] ];
        mimeTypes: [ string, ...string[] ];
    }
): NormalizedResponse[] => {
    if ( typeof subject === 'function' ) {
        return normalize( subject( ...features.arguments ), features )
    }
    if ( subject instanceof z.ZodType ) {
        return [ { ...features, schema: subject } ]
    }
    if ( Array.isArray( subject ) ) {
        assert(
            subject.length,
            new ResultHandlerError(
                `At least one ${ features.variant } response schema required.`
            )
        )
    }
    return ( Array.isArray( subject )
        ? subject
        : [ subject ] ).map(
        ( { schema, statusCodes, statusCode, mimeTypes, mimeType } ) => ( {
            schema,
            statusCodes: statusCode
                ? [ statusCode ]
                : statusCodes || features.statusCodes,
            mimeTypes: mimeType
                ? [ mimeType ]
                : mimeTypes || features.mimeTypes
        } )
    )
}
