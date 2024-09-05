/*
 * Project: Eventiva
 * File: io-schema.ts
 * Last Modified: 05/09/2024, 01:47
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
import type { FlatObject } from '@eventiva/utilities.helpers.common'
import type { RawSchema } from '@eventiva/utilities.helpers.zod.raw-schema'
import { z } from 'zod'

/**
 * @desc The type allowed on the top level of Middlewares and Endpoints
 * @param U — only "strip" is allowed for Middlewares due to intersection issue (Zod) #600
 * */
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

/** @desc An error related to the input and output schemas declaration */
export class IOSchemaError
    extends Error {
    public override name = 'IOSchemaError'
}
