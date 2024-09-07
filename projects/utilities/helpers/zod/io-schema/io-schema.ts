/*
 * Project: Eventiva
 * File: io-schema.ts
 * Last Modified: 07/09/2024, 03:56
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
import type { FlatObject } from '@eventiva/utilities.helpers.common'
import { Security } from '@eventiva/utilities.helpers.http-security'
import { LogicalContainer } from '@eventiva/utilities.helpers.logical-container'
import { copyMeta } from '@eventiva/utilities.helpers.zod.metadata'
import type { RawSchema } from '@eventiva/utilities.helpers.zod.raw-schema'
import { Request, Response } from 'express'
import { z } from 'zod'

export abstract class AbstractMiddleware {
    public abstract getSecurity (): LogicalContainer<Security> | undefined;

    public abstract getSchema (): IOSchema<'strip'>;

    public abstract execute ( params: {
        input: unknown;
        options: FlatObject;
        request: Request;
        response: Response;
        // logger: ActualLogger;
    } ): Promise<FlatObject>;
}

/**
 * @description The type allowed on the top level of Middlewares and Endpoints
 * @param U — only "strip" is allowed for Middlewares due to intersection issue (Zod) #600
 */
export type IOSchema<U extends z.UnknownKeysParam = z.UnknownKeysParam> =
    | BaseObject<U> // z.object()
    | EffectsChain<U> // z.object().refine(), z.object().transform(), z.object().preprocess()
    | RawSchema // ez.raw()
    | z.ZodUnion<[ IOSchema<U>, ...IOSchema<U>[] ]> // z.object().or()
    | z.ZodIntersection<IOSchema<U>, IOSchema<U>> // z.object().and()
    | z.ZodDiscriminatedUnion<string, BaseObject<U>[]> // z.discriminatedUnion()
    | z.ZodPipeline<ObjectBasedEffect<BaseObject<U>>, BaseObject<U>>; // z.object().remap()

type BaseObject<U extends z.UnknownKeysParam> = z.ZodObject<z.ZodRawShape, U>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- workaround for TS2456, circular reference
interface ObjectBasedEffect<T extends z.ZodTypeAny>
    extends z.ZodEffects<T, FlatObject> {
}

type EffectsChain<U extends z.UnknownKeysParam> = ObjectBasedEffect<
    BaseObject<U> | EffectsChain<U>
>;


export const getFinalEndpointInputSchema = <
    MIN extends IOSchema<'strip'>,
    IN extends IOSchema,
> (
    middlewares: AbstractMiddleware[],
    input: IN
): z.ZodIntersection<MIN, IN> => {
    const allSchemas = middlewares
        .map( ( mw ) => mw.getSchema() as IOSchema )
        .concat( input )

    const finalSchema = allSchemas.reduce( (
        acc,
        schema
    ) => acc.and( schema ) )

    return allSchemas.reduce(
        (
            acc,
            schema
        ) => copyMeta( schema, acc ),
        finalSchema
    ) as z.ZodIntersection<MIN, IN>
}
