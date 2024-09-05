/*
 * Project: Eventiva
 * File: index.ts
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

import { FlatObject } from '@eventiva/utilities.helpers.common'
import { Intact, Remap } from '@eventiva/utilities.helpers.mapping-helpers'
import { Metadata, metaSymbol } from '@eventiva/utilities.helpers.zod.metadata'
/**
 * @fileoverview Zod Runtime Plugin
 * @see https://github.com/colinhacks/zod/blob/90efe7fa6135119224412c7081bd12ef0bccef26/plugin/effect/src/index.ts#L21-L31
 * @desc This code modifies and extends zod's functionality immediately when importing express-zod-api
 * @desc Enables .example() on all schemas (ZodType)
 * @desc Enables .label() on ZodDefault
 * @desc Enables .remap() on ZodObject
 * @desc Stores the argument supplied to .brand() on all schema (runtime distinguishable branded types)
 * */
import { clone, fromPairs, map, pair, pipe, toPairs } from 'ramda'
import { z } from 'zod'

declare module 'zod' {
    interface ZodTypeDef {
        [ metaSymbol ]?: Metadata;
    }

    interface ZodType {
        /** @desc Add an example value (before any transformations, can be called multiple times) */
        example ( example: this['_input'] ): this;
    }

    interface ZodDefault<T extends z.ZodTypeAny> {
        /** @desc Change the default value in the generated Documentation to a label */
        label ( label: string ): this;
    }

    interface ZodObject<
        T extends z.ZodRawShape,
        UnknownKeys extends z.UnknownKeysParam = z.UnknownKeysParam,
        Catchall extends z.ZodTypeAny = z.ZodTypeAny,
        Output = z.objectOutputType<T, Catchall, UnknownKeys>,
        Input = z.objectInputType<T, Catchall, UnknownKeys>,
    > {
        remap<V extends string, U extends { [P in keyof T]?: V }> (
            mapping: U
        ): z.ZodPipeline<
            z.ZodEffects<this, FlatObject>, // internal type simplified
            z.ZodObject<Remap<T, U, V> & Intact<T, U>, UnknownKeys>
        >;

        remap<U extends z.ZodRawShape> (
            mapper: ( subject: T ) => U
        ): z.ZodPipeline<z.ZodEffects<this, FlatObject>, z.ZodObject<U>>; // internal type simplified
    }
}

const exampleSetter = function (
    this: z.ZodType,
    value: ( typeof this )['_input']
) {
    const copy = cloneSchema( this )
    copy._def[ metaSymbol ]!.examples.push( value )
    return copy
}

const labelSetter = function (
    this: z.ZodDefault<z.ZodTypeAny>,
    label: string
) {
    const copy = cloneSchema( this )
    copy._def[ metaSymbol ]!.defaultLabel = label
    return copy
}

const brandSetter = function (
    this: z.ZodType,
    brand?: string | number | symbol
) {
    return new z.ZodBranded( {
        typeName: z.ZodFirstPartyTypeKind.ZodBranded,
        type: this,
        description: this._def.description,
        errorMap: this._def.errorMap,
        [ metaSymbol ]: { examples: [], ...clone( this._def[ metaSymbol ] ), brand }
    } )
}

const objectMapper = function (
    this: z.ZodObject<z.ZodRawShape>,
    tool:
        | Record<string, string>
        | ( <T>( subject: T ) => { [P in string | keyof T]: T[keyof T] } )
) {
    const transformer =
        typeof tool === 'function'
            ? tool
            : pipe(
                toPairs,
                map( ( [ key, value ] ) => pair( tool[ String( key ) ] || key, value ) ),
                fromPairs
            )
    const nextShape = transformer( clone( this.shape ) ) // immutable
    const output = z.object( nextShape )[ this._def.unknownKeys ]() // proxies unknown keys when set to "passthrough"
    return this.transform( transformer ).pipe( output )
}

if ( !( metaSymbol in globalThis ) ) {
    ( globalThis as Record<symbol, unknown> )[ metaSymbol ] = true
    Object.defineProperties( z.ZodType.prototype, {
        [ 'example' satisfies keyof z.ZodType ]: {
            get (): z.ZodType['example'] {
                return exampleSetter.bind( this )
            }
        },
        [ 'brand' satisfies keyof z.ZodType ]: {
            set () {
            }, // this is required to override the existing method
            get () {
                return brandSetter.bind( this ) as z.ZodType['brand']
            }
        }
    } )
    Object.defineProperty(
        z.ZodDefault.prototype,
        'label' satisfies keyof z.ZodDefault<z.ZodTypeAny>,
        {
            get (): z.ZodDefault<z.ZodTypeAny>['label'] {
                return labelSetter.bind( this )
            }
        }
    )
    Object.defineProperty(
        z.ZodObject.prototype,
        'remap' satisfies keyof z.ZodObject<z.ZodRawShape>,
        {
            get () {
                return objectMapper.bind( this ) as z.ZodObject<z.ZodRawShape>['remap']
            }
        }
    )
}

/** @link https://github.com/colinhacks/zod/blob/3e4f71e857e75da722bd7e735b6d657a70682df2/src/types.ts#L485 */
export const cloneSchema = <T extends z.ZodType> ( schema: T ) => {
    const copy = schema.describe( schema.description as string )
    copy._def[ metaSymbol ] = // clone for deep copy, issue #827
        clone( copy._def[ metaSymbol ] ) || ( { examples: [] } satisfies Metadata )
    return copy
}
