/*
 * Project: Eventiva
 * File: logical-container.ts
 * Last Modified: 06/09/2024, 16:21
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

import { combinations, isObject } from '@eventiva/utilities.helpers.common'
import { chain } from 'ramda'

type LogicalOr<T> = { or: T[] };
type LogicalAnd<T> = { and: T[] };

export type LogicalContainer<T> =
    | LogicalOr<T | LogicalAnd<T>>
    | LogicalAnd<T | LogicalOr<T>>
    | T;

const isLogicalOr = ( subject: unknown ): subject is LogicalOr<unknown> =>
    // @ts-ignore
    isObject( subject ) && 'or' in subject

const isLogicalAnd = ( subject: unknown ): subject is LogicalAnd<unknown> =>
    // @ts-ignore
    isObject( subject ) && 'and' in subject

/** @desc combines several LogicalAnds into a one */
const flattenAnds = <T> ( subject: ( T | LogicalAnd<T> )[] ): LogicalAnd<T> => ( {
    and: chain( ( item ) => ( isLogicalAnd( item )
        ? item.and
        : [ item ] ), subject )
} )

/** @desc creates a LogicalContainer out of another one */
export const mapLogicalContainer = <T, S> (
    container: LogicalContainer<T>,
    fn: ( subject: T ) => S
): LogicalContainer<S> => {
    if ( isLogicalAnd( container ) ) {
        return {
            and: container.and.map( ( entry ) =>
                isLogicalOr( entry )
                    ? { or: entry.or.map( fn ) }
                    : fn( entry )
            )
        }
    }
    if ( isLogicalOr( container ) ) {
        return {
            or: container.or.map( ( entry ) =>
                isLogicalAnd( entry )
                    ? { and: entry.and.map( fn ) }
                    : fn( entry )
            )
        }
    }
    return fn( container )
}

/** @desc converts LogicalAnd into LogicalOr */
export const andToOr = <T> (
    subject: LogicalAnd<T | LogicalOr<T>>
): LogicalOr<T | LogicalAnd<T>> =>
    subject.and.reduce<LogicalOr<T | LogicalAnd<T>>>(
        (
            acc,
            item
        ) => ( {
            or: combinations(
                acc.or,
                isLogicalOr( item )
                    ? item.or
                    : [ item ],
                flattenAnds
            )
        } ),
        { or: [] }
    )

/** @desc reducer, combines two LogicalContainers */
export const combineContainers = <T> (
    left: LogicalContainer<T>,
    right: LogicalContainer<T>
): LogicalContainer<T> => {
    if ( isLogicalAnd( left ) ) {
        if ( isLogicalOr( right ) ) {
            return combineContainers( andToOr( left ), right )
        }
        return flattenAnds( [ left, right ] )
    }

    if ( isLogicalOr( left ) ) {
        if ( isLogicalAnd( right ) ) {
            return combineContainers( right, left )
        }
        if ( isLogicalOr( right ) ) {
            return { or: combinations( left.or, right.or, flattenAnds ) }
        }
        return combineContainers( left, { and: [ right ] } )
    }

    if ( isLogicalAnd( right ) || isLogicalOr( right ) ) {
        return combineContainers( right, left )
    }

    return { and: [ left, right ] }
}
