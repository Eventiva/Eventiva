/*
 * Project: Eventiva
 * File: middleware.ts
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

import { EmptyObject, FlatObject } from '@eventiva/utilities.helpers.common'
import { Security } from '@eventiva/utilities.helpers.http-security'
import { LogicalContainer } from '@eventiva/utilities.helpers.logical-container'
import { InputValidationError } from '@eventiva/utilities.helpers.zod.errors'
import { AbstractMiddleware, IOSchema } from '@eventiva/utilities.helpers.zod.io-schema'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

type Handler<IN, OPT, OUT> = ( params: {
    input: IN;
    options: OPT;
    request: Request;
    response: Response;
    // logger: ActualLogger; TODO: Implement Logger
} ) => Promise<OUT>;

export class Middleware<
    IN extends IOSchema<'strip'>,
    OPT extends FlatObject,
    OUT extends FlatObject,
    SCO extends string,
>
    extends AbstractMiddleware {
    readonly #schema: IN
    readonly #security?: LogicalContainer<
        Security<Extract<keyof z.input<IN>, string>, SCO>
    >
    readonly #handler: Handler<z.output<IN>, OPT, OUT>

    constructor (
        {
            input,
            security,
            handler
        }: {
            input: IN;
            security?: LogicalContainer<
                Security<Extract<keyof z.input<IN>, string>, SCO>
            >;
            handler: Handler<z.output<IN>, OPT, OUT>;
        } ) {
        super()
        this.#schema = input
        this.#security = security
        this.#handler = handler
    }

    public override getSecurity () {
        return this.#security
    }

    public override getSchema () {
        return this.#schema
    }

    /** @throws InputValidationError */
    public override async execute (
        {
            input,
            ...rest
        }: {
            input: unknown;
            options: OPT;
            request: Request;
            response: Response;
            // logger: ActualLogger;
        } ) {
        try {
            const validInput = ( await this.#schema.parseAsync( input ) ) as z.output<IN>
            return this.#handler( { ...rest, input: validInput } )
        } catch ( e ) {
            throw e instanceof z.ZodError
                ? new InputValidationError( e )
                : e
        }
    }
}

export class ExpressMiddleware<
    R extends Request,
    S extends Response,
    OUT extends FlatObject,
>
    extends Middleware<
        z.ZodObject<EmptyObject, 'strip'>,
        FlatObject,
        OUT,
        string
    > {
    constructor (
        nativeMw: (
            request: R,
            response: S,
            next: NextFunction
        ) => void | Promise<void>,
        {
            provider = () => ( {} ) as OUT,
            transformer = ( err: Error ) => err
        }: {
            provider?: (
                request: R,
                response: S
            ) => OUT | Promise<OUT>;
            transformer?: ( err: Error ) => Error;
        } = {}
    ) {
        super( {
            input: z.object( {} ),
            handler: async ( { request, response } ) =>
                new Promise<OUT>( (
                    resolve,
                    reject
                ) => {
                    const next = ( err?: unknown ) => {
                        if ( err && err instanceof Error ) {
                            return reject( transformer( err ) )
                        }
                        resolve( provider( request as R, response as S ) )
                    }
                    nativeMw( request as R, response as S, next )
                } )
        } )
    }
}

