/*
 * Project: Eventiva
 * File: bit-aspect-env.bit-env.ts
 * Last Modified: 11/08/2024, 23:33
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

import { CAPSULE_ARTIFACTS_DIR, Pipeline } from '@teambit/builder'
import { Compiler } from '@teambit/compiler'
import { EslintConfigWriter, ESLintLinter, EslintTask } from '@teambit/defender.eslint-linter'
import { PrettierConfigWriter, PrettierFormatter } from '@teambit/defender.prettier-formatter'
import { EnvHandler } from '@teambit/envs'
import { StarterList, TemplateList } from '@teambit/generator'
import type { PackageJsonProps } from '@teambit/pkg'
import { PackageGenerator } from '@teambit/pkg'
import { Preview } from '@teambit/preview'
import { ReactPreview } from '@teambit/preview.react-preview'
import { SchemaExtractor } from '@teambit/schema'
import { Tester } from '@teambit/tester'
import { NativeCompileCache } from '@teambit/toolbox.performance.v8-cache'
import { TypeScriptExtractor } from '@teambit/typescript'
import {
    resolveTypes,
    TypescriptCompiler,
    TypescriptConfigWriter,
    TypescriptTask
} from '@teambit/typescript.typescript-compiler'
import { VitestTask, VitestTester } from '@teambit/vite.vitest-tester'
import { ConfigWriterList } from '@teambit/workspace-config-files'
import typescript from 'typescript'
import { BitAspectEnvInterface } from './bit-aspect-env.interface'

// Disable v8-caching because it breaks ESM loaders
NativeCompileCache.uninstall()

export class BitAspectEnv
    implements BitAspectEnvInterface {
    name = 'env'

    type = 'aspect'

    icon = 'https://static.bit.dev/extensions-icons/default.svg'
    /**
     * Default npm ignore paths.
     * Will ignore the "artifacts" directory by default.
     */
    npmIgnore = [ `${ CAPSULE_ARTIFACTS_DIR }/`, '.vitest' ]
    /**
     * Default package.json modifications.
     */
    packageJson: PackageJsonProps = {
        type: 'module',
        main: 'dist/{main}.js',
        types: '{main}.ts'
    }
    protected tsconfigPath = require.resolve( './config/tsconfig.json' )
    protected tsTypesPath = './types'
    protected eslintConfigPath = require.resolve( './config/eslintrc.js' )
    protected eslintExtensions = [ '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cts', '.mts', '.ctsx', '.mtsx' ]
    protected prettierConfigPath = require.resolve( './config/prettier.config.js' )

    /*
     * The compiler to use during development
     */
    compiler (): EnvHandler<Compiler> {
        return TypescriptCompiler.from( {
            tsconfig: this.tsconfigPath,
            esm: true,
            types: resolveTypes( __dirname, [ this.tsTypesPath ] ),
            typescript
        } )
    }

    /*
     * The test runner to use during development
     */
    tester (): EnvHandler<Tester> {
        return VitestTester.from( {
            config: require.resolve( './config/vitest.config.mjs' )
        } )
    }

    /*
     * The linter to use during development
     */
    linter () {
        return ESLintLinter.from( {
            tsconfig: this.tsconfigPath,
            configPath: this.eslintConfigPath,
            pluginsPath: __dirname,
            extensions: this.eslintExtensions
        } )
    }

    preview (): EnvHandler<Preview> {
        return ReactPreview.from( {
            // configure the env not to create a preview for the impl. just for the composition.
            previewConfig: {
                splitComponentBundle: false
            }
            // docsTemplate: require.resolve('./preview/docs'),
            // mounter: require.resolve('./preview/mounter'),
            // transformers: [webpackTransformer],
        } )
    }

    /**
     * The formatter to use during development (source files are not formatted as part of the components' build).
     */
    formatter () {
        return PrettierFormatter.from( {
            configPath: this.prettierConfigPath
        } )
    }

    /**
     * A set of processes to be performed before a component is snapped, during its build phase.
     * @see https://bit.dev/docs/node-env/build-pipelines
     */
    build () {
        return Pipeline.from( [
            TypescriptTask.from( {
                tsconfig: this.tsconfigPath,
                types: resolveTypes( __dirname, [ this.tsTypesPath ] ),
                typescript
            } ),
            EslintTask.from( {
                tsconfig: this.tsconfigPath,
                configPath: this.eslintConfigPath,
                pluginsPath: __dirname,
                extensions: this.eslintExtensions
            } ),
            // JestTask.from({ config: require.resolve('./config/jest.config') }),
            VitestTask.from( {
                config: require.resolve( './config/vitest.config.mjs' )
            } )
        ] )
    }

    /**
     * A list of starters for new projects.
     * This helps create a quick and standardized workspace setup.
     */
    starters () {
        return StarterList.from( [] )
    }

    /**
     * Sets a list of component templates to use across your workspaces.
     * New workspaces would be set to include your envs by default.
     */
    generators () {
        return TemplateList.from( [] )
    }

    /**
     * Configure and control the packaging process of components.
     */
    package () {
        return PackageGenerator.from( {
            packageJson: this.packageJson,
            npmIgnore: this.npmIgnore
        } )
    }

    /**
     * Returns an instance of the default TypeScript extractor.
     * Used by default for type inference for both JS and TS.
     */
    schemaExtractor (): EnvHandler<SchemaExtractor> {
        return TypeScriptExtractor.from( {
            tsconfig: this.tsconfigPath
        } )
    }

    /**
     * Add build tasks to execute upon [snap](https://bit.dev/docs/snaps).
     * Use the snap pipeline for staging and test deployments
     */
    snap () {
        return Pipeline.from( [] )
    }

    /**
     * Add build tasks to execute upon [tag](https://bit.dev/docs/tags).
     * use the tag pipeline for deployments, or other tasks required for
     * publishing a semantic version for a component.
     */
    tag () {
        return Pipeline.from( [] )
    }

    workspaceConfig (): ConfigWriterList {
        return ConfigWriterList.from( [
            TypescriptConfigWriter.from( {
                tsconfig: this.tsconfigPath,
                types: resolveTypes( __dirname, [ './types' ] )
            } ),
            EslintConfigWriter.from( {
                configPath: this.eslintConfigPath,
                tsconfig: this.tsconfigPath
            } ),
            PrettierConfigWriter.from( {
                configPath: this.prettierConfigPath
            } )
        ] )
    }
}

export default new BitAspectEnv()
