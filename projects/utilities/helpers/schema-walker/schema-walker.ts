/*
 * Project: Eventiva
 * File: schema-walker.ts
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

import type { EmptyObject, FlatObject } from '@eventiva/utilities.helpers.common'
import { metaSymbol } from '@eventiva/utilities.helpers.zod.metadata'
import { z } from 'zod'

export interface NextHandlerInc<U> {
    next: ( schema: z.ZodTypeAny ) => U;
}

interface PrevInc<U> {
    prev: U;
}

export type SchemaHandler<
    U,
    Context extends FlatObject = EmptyObject,
    Variant extends 'regular' | 'each' | 'last' = 'regular',
> = (
    schema: any, // eslint-disable-line @typescript-eslint/no-explicit-any -- for assignmet compatibility
    ctx: Context &
        ( Variant extends 'regular'
            ? NextHandlerInc<U>
            : Variant extends 'each'
                ? PrevInc<U>
                : Context )
) => U;

export type HandlingRules<
    U,
    Context extends FlatObject = EmptyObject,
    K extends string | symbol = string | symbol,
> = Partial<Record<K, SchemaHandler<U, Context>>>;

/** @since 10.1.1 calling onEach _after_ handler and giving it the previously achieved result */
export const walkSchema = <
    U extends object,
    Context extends FlatObject = EmptyObject,
> (
    schema: z.ZodTypeAny,
    {
        onEach,
        rules,
        onMissing,
        ctx = {} as Context
    }: {
        ctx?: Context;
        onEach?: SchemaHandler<U, Context, 'each'>;
        rules: HandlingRules<U, Context>;
        onMissing: SchemaHandler<U, Context, 'last'>;
    }
): U => {
    const handler =
        rules[ schema._def[ metaSymbol ]?.brand as keyof typeof rules ] ||
        rules[ schema._def.typeName as keyof typeof rules ]
    const next = ( subject: z.ZodTypeAny ) =>
        walkSchema( subject, { ctx, onEach, rules, onMissing } )
    const result = handler
        ? handler( schema, { ...ctx, next } )
        : onMissing( schema, ctx )
    const overrides = onEach && onEach( schema, { prev: result, ...ctx } )
    return overrides
        ? { ...result, ...overrides }
        : result
}
