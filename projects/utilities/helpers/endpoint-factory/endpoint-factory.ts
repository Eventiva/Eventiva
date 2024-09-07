/*
 * Project: Eventiva
 * File: endpoint-factory.ts
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

import { type EmptyObject, FlatObject } from '@eventiva/utilities.helpers.common'
import { Endpoint } from '@eventiva/utilities.helpers.endpoint'
import { AbstractResultHandler } from '@eventiva/utilities.helpers.handler'
import { defaultResultHandler } from '@eventiva/utilities.helpers.handler-result'
import { Method } from '@eventiva/utilities.helpers.http-methods'
import { ExpressMiddleware, Middleware } from '@eventiva/utilities.helpers.middleware'
import { CommonConfig } from '@eventiva/utilities.helpers.zod.common'
import { AbstractMiddleware, getFinalEndpointInputSchema, IOSchema } from '@eventiva/utilities.helpers.zod.io-schema'
import { Request, Response } from 'express'
import { z } from 'zod'

export type Handler<IN, OUT, OPT> = ( params: {
    input: IN;
    options: OPT;
    // logger: ActualLogger;
} ) => Promise<OUT>;

type BuildProps<
    IN extends IOSchema,
    OUT extends IOSchema,
    MIN extends IOSchema<'strip'>,
    OPT extends FlatObject,
    SCO extends string,
    TAG extends string,
> = {
    input: IN;
    output: OUT;
    handler: Handler<z.output<z.ZodIntersection<MIN, IN>>, z.input<OUT>, OPT>;
    description?: string;
    shortDescription?: string;
    operationId?: string | ( ( method: Method ) => string );
} & ( { method: Method } | { methods: Method[] } ) &
    ( { scopes?: SCO[] } | { scope?: SCO } ) &
    ( { tags?: TAG[] } | { tag?: TAG } );

export class EndpointsFactory<
    IN extends IOSchema<'strip'> = z.ZodObject<EmptyObject, 'strip'>,
    OUT extends FlatObject = EmptyObject,
    SCO extends string = string,
    TAG extends string = string,
> {
    public use: typeof this.addExpressMiddleware = this.addExpressMiddleware
    protected resultHandler: AbstractResultHandler
    protected middlewares: AbstractMiddleware[] = []

    /** @desc Consider using the "config" prop with the "tags" option to enforce constraints on tagging the endpoints */
    constructor ( resultHandler: AbstractResultHandler );

    constructor ( params: {
        resultHandler: AbstractResultHandler;
        config?: CommonConfig<TAG>;
    } );

    constructor (
        subject:
            | AbstractResultHandler
            | {
            resultHandler: AbstractResultHandler;
            config?: CommonConfig<TAG>;
        }
    ) {
        this.resultHandler =
            'resultHandler' in subject
                ? subject.resultHandler
                : subject
    }

    static #create<
        CIN extends IOSchema<'strip'>,
        COUT extends FlatObject,
        CSCO extends string,
        CTAG extends string,
    > (
        middlewares: AbstractMiddleware[],
        resultHandler: AbstractResultHandler
    ) {
        const factory = new EndpointsFactory<CIN, COUT, CSCO, CTAG>( resultHandler )
        factory.middlewares = middlewares
        return factory
    }

    public addMiddleware<
        AIN extends IOSchema<'strip'>,
        AOUT extends FlatObject,
        ASCO extends string,
    > (
        subject:
            | Middleware<AIN, OUT, AOUT, ASCO>
            | ConstructorParameters<typeof Middleware<AIN, OUT, AOUT, ASCO>>[0]
    ) {
        return EndpointsFactory.#create<
            z.ZodIntersection<IN, AIN>,
            OUT & AOUT,
            SCO & ASCO,
            TAG
        >(
            this.middlewares.concat(
                subject instanceof Middleware
                    ? subject
                    : new Middleware( subject )
            ),
            this.resultHandler
        )
    }

    public addExpressMiddleware<
        R extends Request,
        S extends Response,
        AOUT extends FlatObject = EmptyObject,
    > ( ...params: ConstructorParameters<typeof ExpressMiddleware<R, S, AOUT>> ) {
        return EndpointsFactory.#create<IN, OUT & AOUT, SCO, TAG>(
            this.middlewares.concat( new ExpressMiddleware( ...params ) ),
            this.resultHandler
        )
    }

    public addOptions<AOUT extends FlatObject> ( getOptions: () => Promise<AOUT> ) {
        return EndpointsFactory.#create<IN, OUT & AOUT, SCO, TAG>(
            this.middlewares.concat(
                new Middleware( {
                    input: z.object( {} ),
                    handler: getOptions
                } )
            ),
            this.resultHandler
        )
    }

    public build<BIN extends IOSchema, BOUT extends IOSchema> (
        {
            input,
            handler,
            output: outputSchema,
            description,
            shortDescription,
            operationId,
            ...rest
        }: BuildProps<BIN, BOUT, IN, OUT, SCO, TAG> ): Endpoint<
        z.ZodIntersection<IN, BIN>,
        BOUT,
        OUT,
        SCO,
        TAG
    > {
        const { middlewares, resultHandler } = this
        const methods = 'methods' in rest
            ? rest.methods
            : [ rest.method ]
        const getOperationId =
            typeof operationId === 'function'
                ? operationId
                : () => operationId
        const scopes =
            'scopes' in rest
                ? rest.scopes
                : 'scope' in rest && rest.scope
                    ? [ rest.scope ]
                    : []
        const tags =
            'tags' in rest
                ? rest.tags
                : 'tag' in rest && rest.tag
                    ? [ rest.tag ]
                    : []
        return new Endpoint( {
            handler,
            middlewares,
            outputSchema,
            resultHandler,
            scopes,
            tags,
            methods,
            getOperationId,
            description,
            shortDescription,
            inputSchema: getFinalEndpointInputSchema<IN, BIN>( middlewares, input )
        } )
    }
}

export const defaultEndpointsFactory = new EndpointsFactory(
    defaultResultHandler
)
