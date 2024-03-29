/*
 * Project: Eventiva
 * File: entity-template.ts
 * Last Modified: 3/29/24, 4:54 PM
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

import { ComponentContext, ComponentFile, ComponentTemplate } from '@teambit/generator'
import { componentFile } from './files/component.js'
import { docsFile } from './files/docs.js'
import { indexFile } from './files/index-file.js'
import { modelFile } from './files/model.js'
import { testFile } from './files/test.js'

/**
 * A partial type that extends the ComponentTemplateOptions interface by picking the 'name', 'description', 'hidden', and 'env' properties from the ComponentTemplate interface.
 *
 * @export

 */
export type NodeComponentTemplateOptions = Partial<
    Pick<ComponentTemplate, 'name' | 'description' | 'hidden' | 'env'>
>;

/**
 * Creates an instance of EntityTemplate.
 * @param {string} [name='entity']
 * @param {string} [description='create entities to reuse data structures efficiently - using zmodel']
 * @param {boolean} [hidden=false]
 * @param {?string} [env]
 * Generates an array of component files based on the provided ComponentContext, including index file, component file, test file, and docs file.
 * @param {ComponentContext} context The component context used to generate component files
 * @returns {ComponentFile[]} Generates an array of ComponentFile objects based on the given ComponentContext.
 * Creates a new EntityTemplate using the provided NodeComponentTemplateOptions. If no options are provided, default empty options will be used.
 * @param {NodeComponentTemplateOptions} [options={}]
 * @returns {() => EntityTemplate} Creates a new EntityTemplate based on the provided options. If no options are provided, default options are used. Returns a function that when called will instantiate a new EntityTemplate with the specified name, description, visibility, and environment.
 *
 * @export
 * @class EntityTemplate

 * @implements {ComponentTemplate}
 */
export class EntityTemplate
    implements ComponentTemplate {
    /**
     * Creates an instance of EntityTemplate.
     *
     * @constructor
     * @param {string} [name='entity']
     * @param {string} [description='create entities to reuse data structures efficiently']
     * @param {boolean} [hidden=false]
     * @param {?string} [env]
     */
    constructor (
        readonly name = 'entity',
        readonly description = 'create entities to reuse data structures efficiently',
        readonly hidden = false,
        readonly env?: string
    ) {
    }

    /**
     * Creates a new EntityTemplate using the provided NodeComponentTemplateOptions. If no options are provided, default empty options will be used.
     *
     * @static
     * @param {NodeComponentTemplateOptions} [options={}]
     * @returns {() => EntityTemplate} Creates a new EntityTemplate based on the provided options. If no options are provided, default options are used. Returns a function that when called will instantiate a new EntityTemplate with the specified name, description, visibility, and environment.
     */
    static from ( options: NodeComponentTemplateOptions = {} ) {
        return () =>
            new EntityTemplate(
                options.name,
                options.description,
                options.hidden,
                options.env
            )
    }

    /**
     * Generates an array of component files based on the provided ComponentContext, including index file, component file, test file, and docs file.
     *
     * @param {ComponentContext} context The component context used to generate component files
     * @returns {ComponentFile[]} Generates an array of ComponentFile objects based on the given ComponentContext.
     */
    generateFiles ( context: ComponentContext ): ComponentFile[] {
        return [
            indexFile( context ),
            componentFile( context ),
            testFile( context ),
            modelFile( context ),
            docsFile( context )
        ]
    }
}
