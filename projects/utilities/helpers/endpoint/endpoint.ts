/*
 * Project: Eventiva
 * File: endpoint.ts
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

import { FlatObject, getActualMethod } from '@eventiva/utilities.helpers.common'
import { ContentType, contentTypes } from '@eventiva/utilities.helpers.content-types'
import { makeErrorFromAnything, ResultHandlerError } from '@eventiva/utilities.helpers.errors'
import { AbstractResultHandler } from '@eventiva/utilities.helpers.handler'
import { lastResortHandler } from '@eventiva/utilities.helpers.handler-last-resort'
import type { AuxMethod, Method } from '@eventiva/utilities.helpers.http-methods'
import { Security } from '@eventiva/utilities.helpers.http-security'
import { getInput } from '@eventiva/utilities.helpers.input-source'
import { combineContainers, type LogicalContainer } from '@eventiva/utilities.helpers.logical-container'
import { ExpressMiddleware } from '@eventiva/utilities.helpers.middleware'
import type { NormalizedResponse } from '@eventiva/utilities.helpers.zod.api-response'
import {
    AbstractEndpoint,
    CommonConfig,
    type DescriptionVariant,
    type IOVariant,
    type ResponseVariant
} from '@eventiva/utilities.helpers.zod.common'
import { hasRaw, hasUpload } from '@eventiva/utilities.helpers.zod.deep-checks'
import { InputValidationError, OutputValidationError } from '@eventiva/utilities.helpers.zod.errors'
import { AbstractMiddleware, IOSchema } from '@eventiva/utilities.helpers.zod.io-schema'
import { Request, Response } from 'express'
import { z } from 'zod'


export type Handler<IN, OUT, OPT> = ( params: {
    input: IN;
    options: OPT;
    // logger: ActualLogger; TODO: implement logging
} ) => Promise<OUT>;

export type MimeVariant = Extract<IOVariant, 'input'> | ResponseVariant;

export class Endpoint<
    IN extends IOSchema,
    OUT extends IOSchema,
    OPT extends FlatObject,
    SCO extends string,
    TAG extends string,
>
    extends AbstractEndpoint {
    readonly #descriptions: Record<DescriptionVariant, string | undefined>
    readonly #methods: ReadonlyArray<Method>
    readonly #middlewares: AbstractMiddleware[]
    readonly #mimeTypes: Record<MimeVariant, ReadonlyArray<string>>
    readonly #responses: Record<
        ResponseVariant,
        ReadonlyArray<NormalizedResponse>
    >
    readonly #handler: Handler<z.output<IN>, z.input<OUT>, OPT>
    readonly #resultHandler: AbstractResultHandler
    readonly #schemas: { input: IN; output: OUT }
    readonly #scopes: ReadonlyArray<SCO>
    readonly #tags: ReadonlyArray<TAG>
    readonly #getOperationId: ( method: Method ) => string | undefined
    readonly #requestType: ContentType

    constructor (
        {
            methods,
            inputSchema,
            outputSchema,
            handler,
            resultHandler,
            getOperationId = () => undefined,
            scopes = [],
            middlewares = [],
            tags = [],
            description: long,
            shortDescription: short
        }: {
            middlewares?: AbstractMiddleware[];
            inputSchema: IN;
            outputSchema: OUT;
            handler: Handler<z.output<IN>, z.input<OUT>, OPT>;
            resultHandler: AbstractResultHandler;
            description?: string;
            shortDescription?: string;
            getOperationId?: ( method: Method ) => string | undefined;
            methods: Method[];
            scopes?: SCO[];
            tags?: TAG[];
        } ) {
        super()
        this.#handler = handler
        this.#resultHandler = resultHandler
        this.#middlewares = middlewares
        this.#getOperationId = getOperationId
        this.#methods = Object.freeze( methods )
        this.#scopes = Object.freeze( scopes )
        this.#tags = Object.freeze( tags )
        this.#descriptions = { long, short }
        this.#schemas = { input: inputSchema, output: outputSchema }
        this.#responses = {
            positive: Object.freeze( resultHandler.getPositiveResponse( outputSchema ) ),
            negative: Object.freeze( resultHandler.getNegativeResponse() )
        }
        this.#requestType = hasUpload( inputSchema )
            ? 'upload'
            : hasRaw( inputSchema )
                ? 'raw'
                : 'json'
        this.#mimeTypes = {
            input: Object.freeze( [ contentTypes[ this.#requestType ] ] ),
            positive: Object.freeze(
                this.#responses.positive.flatMap( ( { mimeTypes } ) => mimeTypes )
            ),
            negative: Object.freeze(
                this.#responses.negative.flatMap( ( { mimeTypes } ) => mimeTypes )
            )
        }
    }

    public override getDescription ( variant: DescriptionVariant ) {
        return this.#descriptions[ variant ]
    }

    public override getMethods () {
        return this.#methods
    }

    public override getSchema ( variant: 'input' ): IN;
    public override getSchema ( variant: 'output' ): OUT;
    public override getSchema ( variant: ResponseVariant ): z.ZodTypeAny;
    public override getSchema ( variant: IOVariant | ResponseVariant ) {
        if ( variant === 'input' || variant === 'output' ) {
            return this.#schemas[ variant ]
        }
        return this.getResponses( variant )
            .map( ( { schema } ) => schema )
            .reduce( (
                agg,
                schema
            ) => agg.or( schema ) )
    }

    public override getMimeTypes ( variant: MimeVariant ) {
        return this.#mimeTypes[ variant ]
    }

    public override getRequestType () {
        return this.#requestType
    }

    public override getResponses ( variant: ResponseVariant ) {
        return this.#responses[ variant ]
    }

    public override getSecurity () {
        return this.#middlewares.reduce<LogicalContainer<Security>>(
            (
                acc,
                middleware
            ) => {
                const security = middleware.getSecurity()
                return security
                    ? combineContainers( acc, security )
                    : acc
            },
            { and: [] }
        )
    }

    public override getScopes () {
        return this.#scopes
    }

    public override getTags () {
        return this.#tags
    }

    public override getOperationId ( method: Method ): string | undefined {
        return this.#getOperationId( method )
    }

    public override async execute (
        {
            request,
            response,
            // logger,
            config,
            siblingMethods = []
        }: {
            request: Request;
            response: Response;
            // logger: ActualLogger; TODO: Implement Logger
            config: CommonConfig;
            siblingMethods?: Method[];
        } ) {
        const method = getActualMethod( request )
        const options: Partial<OPT> = {}
        let output: FlatObject | null = null
        let error: Error | null = null
        if ( config.cors ) {
            let headers = this.#getDefaultCorsHeaders( siblingMethods )
            if ( typeof config.cors === 'function' ) {
                headers = await config.cors( {
                    request,
                    // logger,
                    endpoint: this,
                    defaultHeaders: headers
                } )
            }
            for ( const key in headers ) {
                response.set( key, headers[ key ] )
            }
        }
        const input = getInput( request, config.inputSources )
        try {
            await this.#runMiddlewares( {
                method,
                input,
                request,
                response,
                // logger,
                options
            } )
            if ( response.writableEnded ) {
                return
            }
            if ( method === 'options' ) {
                response.status( 200 ).end()
                return
            }
            output = await this.#parseOutput(
                await this.#parseAndRunHandler( {
                    input,
                    // logger,
                    options: options as OPT // ensured the complete OPT by writableEnded condition and try-catch
                } )
            )
        } catch ( e ) {
            error = makeErrorFromAnything( e )
        }
        await this.#handleResult( {
            input,
            output,
            request,
            response,
            error,
            // logger,
            options
        } )
    }

    #getDefaultCorsHeaders ( siblingMethods: Method[] ): Record<string, string> {
        const accessMethods = ( this.#methods as Array<Method | AuxMethod> )
            .concat( siblingMethods )
            .concat( 'options' )
            .join( ', ' )
            .toUpperCase()
        return {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': accessMethods,
            'Access-Control-Allow-Headers': 'content-type'
        }
    }

    async #parseOutput ( output: z.input<OUT> ) {
        try {
            return ( await this.#schemas.output.parseAsync( output ) ) as FlatObject
        } catch ( e ) {
            throw e instanceof z.ZodError
                ? new OutputValidationError( e )
                : e
        }
    }

    async #runMiddlewares (
        {
            method,
            input,
            request,
            response,
            // logger,
            options
        }: {
            method: Method | AuxMethod;
            input: Readonly<FlatObject>; // Issue #673: input is immutable, since this.inputSchema is combined with ones of middlewares
            request: Request;
            response: Response;
            // logger: ActualLogger; TODO implement logger
            options: Partial<OPT>;
        } ) {
        for ( const mw of this.#middlewares ) {
            if ( method === 'options' && !( mw instanceof ExpressMiddleware ) ) {
                continue
            }
            Object.assign(
                options,
                await mw.execute( {
                    input,
                    options,
                    request,
                    response
                    // logger
                } )
            )
            if ( response.writableEnded ) {
                // logger.warn(
                //     'A middleware has closed the stream. Accumulated options:',
                //     options
                // )
                break
            }
        }
    }

    async #parseAndRunHandler (
        {
            input,
            options
            // logger
        }: {
            input: Readonly<FlatObject>;
            options: OPT;
            // logger: ActualLogger;
        } ) {
        let finalInput: z.output<IN> // final input types transformations for handler
        try {
            finalInput = ( await this.#schemas.input.parseAsync(
                input
            ) ) as z.output<IN>
        } catch ( e ) {
            throw e instanceof z.ZodError
                ? new InputValidationError( e )
                : e
        }
        return this.#handler( {
            input: finalInput,
            options
            // logger
        } )
    }

    async #handleResult (
        {
            error,
            request,
            response,
            // logger,
            input,
            output,
            options
        }: {
            error: Error | null;
            request: Request;
            response: Response;
            // logger: ActualLogger;
            input: FlatObject;
            output: FlatObject | null;
            options: Partial<OPT>;
        } ) {
        try {
            await this.#resultHandler.execute( {
                error,
                output,
                request,
                response,
                // logger,
                input,
                options
            } )
        } catch ( e ) {
            lastResortHandler( {
                // logger,
                response,
                error: new ResultHandlerError(
                    makeErrorFromAnything( e ).message,
                    error || undefined
                )
            } )
        }
    }
}
