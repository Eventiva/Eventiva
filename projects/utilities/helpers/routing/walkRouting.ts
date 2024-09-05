/*
 * Project: Eventiva
 * File: walkRouting.ts
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

import { RoutingError } from '@eventiva/utilities.helpers.errors'
import type { AuxMethod, Method } from '@eventiva/utilities.helpers.http-methods'
import { ServeStatic, type StaticHandler } from '@eventiva/utilities.helpers.serve-static'
import { AbstractEndpoint } from '@eventiva/utilities.helpers.zod.common'
import { DependsOnMethod } from '@eventiva/utilities.helpers.zod.depends-on-method'
import assert from 'node:assert/strict'
import type { Routing } from './routing.js'

export interface RoutingWalkerParams {
    routing: Routing;
    onEndpoint: (
        endpoint: AbstractEndpoint,
        path: string,
        method: Method | AuxMethod,
        siblingMethods?: ReadonlyArray<Method>
    ) => void;
    onStatic?: (
        path: string,
        handler: StaticHandler
    ) => void;
    parentPath?: string;
}

export const walkRouting = (
    {
        routing,
        onEndpoint,
        onStatic,
        parentPath
    }: RoutingWalkerParams ) => {
    const pairs = Object.entries( routing ).map(
        ( [ key, value ] ) => [ key.trim(), value ] as const
    )
    for ( const [ segment, element ] of pairs ) {
        assert.doesNotMatch(
            segment,
            /\//,
            new RoutingError(
                `The entry '${ segment }' must avoid having slashes — use nesting instead.`
            )
        )
        const path = `${ parentPath || '' }${ segment
            ? `/${ segment }`
            : '' }`
        if ( element instanceof AbstractEndpoint ) {
            const methods: ( Method | AuxMethod )[] = element.getMethods().slice()
            methods.push( 'options' )
            for ( const method of methods ) {
                onEndpoint( element, path, method )
            }
        } else if ( element instanceof ServeStatic ) {
            if ( onStatic ) {
                element.apply( path, onStatic )
            }
        } else if ( element instanceof DependsOnMethod ) {
            for ( const [ method, endpoint ] of element.pairs ) {
                assert(
                    endpoint.getMethods().includes( method ),
                    new RoutingError(
                        `Endpoint assigned to ${ method } method of ${ path } must support ${ method } method.`
                    )
                )
                onEndpoint( endpoint, path, method )
            }
            if ( element.firstEndpoint ) {
                onEndpoint(
                    element.firstEndpoint,
                    path,
                    'options',
                    element.siblingMethods
                )
            }
        } else {
            walkRouting( {
                onEndpoint,
                onStatic,
                routing: element,
                parentPath: path
            } )
        }
    }
}
