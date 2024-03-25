/*
 * Project: Eventiva
 * File: aspect-runtime.ts
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/25/24, 2:15 AM
 * -----
 * Contributing: Please read through our contributing guidelines.
 * Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 * -----
 * Code of Conduct: This project abides by the Contributor Covenant, v2.0
 * Please interact in ways that contribute to an open, welcoming, diverse,
 * inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 * -----
 * 2024 Eventiva - All Rights Reserved
 * LICENSE: Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * -----
 * This program has been provided under confidence of the copyright holder and is licensed for copying, distribution
 * and modification under the terms of the Functional Source License, Version 1.1, MIT Future License (FSL-1.1-MIT)
 * published as the License, or (at your option) any later version of this license. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the Functional Source License, Version 1.1, MIT Future License for more
 * details. You should have received a copy of the Functional Source License, Version 1.1, MIT Future License along
 * with this program. If not, please write to: licensing@eventiva.co.uk, see the official website
 * https://fsl.software/ or Review the GitHub repository https://github.com/getsentry/fsl.software/
 * -----
 * This project abides the Eventiva Cooperation Commitment. Adapted from the GPL Cooperation Commitment (GPLCC). Before
 * filing or continuing to prosecute any legal proceeding or claim (other than a Defensive Action) arising from
 * termination of a Covered License, we commit to adhering to the Eventiva Cooperation Commitment. You should have
 * received a copy of the Eventiva Cooperation Commitment along with this program. If not, please write to:
 * licensing@eventiva.co.uk, or see https://eventiva.co.uk/licensing/ecc
 * -----
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

import { ComponentID } from '@teambit/component-id'
import { ComponentContext } from '@teambit/generator'
import { camelCase as camelCaseFn, startCase, upperFirst } from 'lodash'
import { RuntimeOptions } from '../../harmony-templates-options.js'
import { generateName } from './slot-template.js'

/**
 * A type representing the dependencies of a component. It has two properties: 'component' which is a ComponentID, and 'imports' which is an array of strings.
 * @author Jonathan Stevens (TGTGamer)
 *

 */
type Dependencies = {
    component: ComponentID,
    imports: string[]
}

/**
 * Generates JSDoc for the 'generateSlot' function that takes an array of slots and generates registration and listing methods for each slot. It also handles imports and constructor properties initialization based on the generated names of the slots.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @param {string[]} slots An array of strings representing different slots
 * @returns {{ decelerations: string; methods: any; imports: any; args: any; constructorProperties: any; }} Generates JSDoc for the `generateSlot` function that takes an array of slots and generates methods for registering and listing those slots.
 */
function generateSlot (
    slots: string[],
    runtimeSuffix: string,
    deps: string[] = []
) {
    const methods = slots.map( ( slot ) => {
        const { pascalCase, camelCaseSlot, camelCase, displayName } = generateName( slot )

        return `\n  /**
   * register a list of ${ displayName }.
   */
  register${ pascalCase }(${ camelCase }s: ${ pascalCase }[]) {
    this.${ camelCaseSlot }.register(${ camelCase }s);
    return this;
  }

  /**
   * list all ${ displayName }.
   */
  list${ pascalCase }s() {
    return this.${ camelCaseSlot }.flatValues();
  }
`
    } ).join( '\n\n  ' )

    const imports = slots
        .map( ( slot ) => {
            const { pascalCase, name, pascalCaseSlot } = generateName( slot )
            return `import { ${ pascalCase }, ${ pascalCaseSlot } } from './${ name }.js';`
        } )
        .join( '\n' )

    const decelerations = `[${ slots.map(
        ( slot ) => generateName( slot ).camelCaseSlot
    ).join( ', ' ) }]: [${ slots.map( ( slot ) => generateName( slot ).pascalCaseSlot ).join( ', ' ) }]`

    const slotProperties = slots.map( ( slot ) => {
        const { camelCaseSlot, pascalCaseSlot } = generateName( slot )
        return `private ${ camelCaseSlot }: ${ pascalCaseSlot },`
    } )

    const constructorDepProperties = deps
        .map( ( slot ) => {
            const camelCaseSlot = camelCaseFn( slot )
            const pascalCaseSlot = startCase( camelCaseSlot ).replace( / /g, '' )

            return `${ camelCaseSlot }${ runtimeSuffix }: ${ pascalCaseSlot }${ runtimeSuffix },`
        } )

    const constructorProperties = slotProperties.concat( constructorDepProperties ).join( '\n    ' )

    const slotArgs = slots.map( ( slot ) => {
        const { camelCaseSlot } = generateName( slot )
        return camelCaseSlot
    } )

    const depArgs = deps.map( ( slot ) => {
        const camelCaseSlot = camelCaseFn( slot )
        return camelCaseSlot
    } )

    const args = slotArgs.concat( depArgs ).join( ', ' )

    return {
        decelerations,
        methods,
        imports,
        args,
        constructorProperties
    }
}

/**
 * Generates dependency types based on the given dependencies array and runtime name.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @param {?string[]} [deps]
 * @param {string} [runtimeName='node']
 * @returns {string} This function generates type definitions based on input dependencies and runtime name. It accepts an optional array of dependencies and a runtime name, defaulted to 'node'. It returns a string representing the type definitions for the dependencies.
 */
function generateDependencyTypes (
    deps?: string[],
    runtimeName: string = 'node'
) {
    if ( !deps ) {
        return `deps: []`
    }
    const typeDeps = deps?.map( ( dep ) => {
        const capRuntime = upperFirst( runtimeName )
        const camelCaseDep = upperFirst( camelCaseFn( dep ) )
        return `${ camelCaseDep }${ capRuntime }`
    } ).join( ',' )

    const varNames = deps?.map( ( dep ) => {
        return camelCaseFn( dep )
    } ).join( ', ' )

    return `[${ varNames }]: [${ typeDeps }]`
}

/**
 * Generates a static list of dependencies based on the provided array of dependency names. If no dependencies are provided, an empty array is returned. Each dependency name is transformed into camelCase and then appended with the string 'Aspect'. The final result is an array containing all transformed dependencies.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @param {?string[]} [deps]
 * @returns {string} Generates static dependencies based on an array of strings
 */
function generateStaticDeps ( deps?: string[] ) {
    if ( !deps?.length ) {
        return '[]'
    }
    const typeDeps = deps?.map( ( dep ) => {
        const camelCaseDep = upperFirst( camelCaseFn( dep ) )
        return `${ camelCaseDep }Aspect`
    } ).join( ', ' )

    return `[${ typeDeps }]`
}

/**
 * Generates imports for the given dependencies and runtime. If the dependencies array is empty, an empty string is returned. Each dependency in the array is mapped to generate an import statement. The import statement includes the dependency details such as aspect, type, and imports. The dependencies are transformed into import statements with specific formatting and naming conventions.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @param {Dependencies[]} deps An array of Dependencies objects
 * @param {string} runtime A string representing the runtime
 * @returns {*} This function generates import statements for dependencies based on the Dependencies array and a runtime string. It converts each dependency information to import statements using the component name, runtime, and imports. The imports are formatted as per the structure and returned as a concatenated string.
 */
function generateDepImports (
    deps: Dependencies[],
    runtime: string
) {
    if ( !deps?.length ) {
        return ''
    }
    return deps?.map( ( depId ) => {
        const imports = depId.imports?.join( ', ' ) || undefined
        const camelCaseDep = upperFirst( camelCaseFn( depId.component.name ) )
        const capRuntime = upperFirst( runtime )
        const [ owner, scopeName ] = depId.component.scope.split( '.' )
        return `import { ${ camelCaseDep }Aspect, type ${ camelCaseDep }${ capRuntime } ${ imports
            ? `, ${ imports }`
            : '' }} from '@${ owner }/${ scopeName }.${ depId.component.fullName.replace(
            new RegExp( '/', 'g' ),
            '.'
        ) }';\n`
    } ).join( '\n' )
}

/**
 * Generates a string containing user imports based on the provided ComponentContext and RuntimeOptions. If the RuntimeOptions imports are falsy, an empty string is returned. The function iterates over the imports in the RuntimeOptions, processing each import. If an import is a string, it is returned as is. If an import is not a string, it checks whether the user has turned off aspect imports. The final string contains all processed imports separated by newlines.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @param {ComponentContext} context The context parameter representing the component context.
 * @param {RuntimeOptions} runtime The runtime parameter representing the runtime options.
 * @returns {string} Generates user imports based on the provided context and runtime options.
 */
function generateUserImports (
    context: ComponentContext,
    runtime: RuntimeOptions
): string {
    if ( !runtime.imports ) {
        return ''
    }
    return runtime.imports( context ).map( ( imp ) => {
        // if the import is a string, import it as is
        if ( typeof imp === 'string' ) {
            return imp
        }
        // otherwise check if the user has turned of aspect imports
        if ( !imp[ 1 ].runtime ) {
            return undefined
        }
        return imp[ 0 ]
    } ).join( '\n' )
}

/**
 * Generates a runtime file content for a component with the provided context, runtime options, and slots. The runtime content includes dependencies, imports, class definition, constructor, methods, default config, and provider function. It also generates import statements, class inheritance, and necessary configurations based on the input parameters.
 * @author Jonathan Stevens (TGTGamer)
 *
 * @export
 * @param {ComponentContext} context The context parameter representing the component context
 * @param {RuntimeOptions} runtime The runtime options for the function
 * @param {string[]} slots An array of strings representing slots
 * @returns {{ relativePath: string; content: string; }} Creates a runtime file based on the provided context, runtime options, and slot information. The function generates the content of the runtime file including dependencies, imports, class definition, methods, constructor, provider function, and default configuration.
 */
export function runtimeFile (
    context: ComponentContext,
    runtime: RuntimeOptions,
    slots: string[]
) {
    const runtimeSuffix = upperFirst( runtime.name )
    const deps = runtime.dependencies?.map( ( dep ) => ( {
        component: typeof dep === 'object'
            ? ComponentID.fromString( dep[ 0 ] )
            : ComponentID.fromString( dep ),
        imports: typeof dep === 'object'
            ? dep[ 1 ].extraImports
            : undefined
    } as Dependencies ) ) || []
    const depNames = deps?.map( ( dep ) => dep.component.name ) || []
    const depImports = generateDepImports( deps, runtime.name )
    const userImports = generateUserImports( context, runtime )
    const classExtends = runtime.classExtends
        ? runtime.classExtends( context )
        : undefined
    const configExtends = runtime.configExtends
        ? runtime.configExtends( context )
        : undefined
    const runtimeConfig = typeof configExtends === 'object'
        ? configExtends[ 1 ].config
        : undefined
    const runtimeIdentifier = `${ context.namePascalCase }${ runtimeSuffix }`
    const configIdentifier = `${ context.namePascalCase }Config`
    const { decelerations, imports, args, methods, constructorProperties } = generateSlot(
        slots || [],
        runtimeSuffix,
        depNames
    )
    const userMethods = runtime.methods
        ? runtime.methods( context )
        : ''
    const aspectArgs = args?.length
        ? `(config, ${ args })`
        : '(config)'
    const constructorProps = constructorProperties
        ? `\n    ${ constructorProperties }`
        : ''

    return {
        relativePath: `${ context.name }.${ runtime.name }.runtime.${ runtime?.extension || 'ts' }`,
        content: `${ depImports }import type { ${ configIdentifier } } from './${ context.name }-config.js';
${ imports }${ userImports }

export class ${ runtimeIdentifier } ${ classExtends && ( `extends ${ typeof classExtends === 'object'
            ? classExtends[ 0 ]
            : classExtends } ` ) }{
  constructor(
    protected config: ${ configIdentifier },${ constructorProps }
  ) {${ classExtends && ( typeof classExtends === 'object'
            ? classExtends[ 1 ].super
            : 'super()' ) }}
  ${ slots.length
            ? methods
            : '' }${ userMethods }
  static dependencies = ${ generateStaticDeps( depNames ) };

  static defaultConfig: ${ configIdentifier } = {${ runtimeConfig }};

  static async provider(
    ${ generateDependencyTypes( depNames, runtime.name ) },
    config: ${ configIdentifier },${ slots.length
            ? `\n    ${ decelerations }`
            : '' }
  ) {
    const ${ context.nameCamelCase } = new ${ runtimeIdentifier }${ aspectArgs };
    ${ runtime?.provider
            ? runtime.provider( context )
            : '\n' }
    return ${ context.nameCamelCase };
  }
}

export default ${ runtimeIdentifier };
`
    }
}
