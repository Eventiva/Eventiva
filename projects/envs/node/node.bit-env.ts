/*
 * Project: Eventiva
 * File: node.bit-env.ts
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

import { NodeAppTemplate, NodeEnvTemplate, NodeModuleTemplate } from '@bitdev/node.generators.node-templates'
/**
 * this env extends the Bit official Harmony environment.
 * learn more: https://bit.cloud/bitdev/harmony/harmony-env
 */
import { SymphonyEnv } from '@bitdev/symphony.envs.symphony-env'
import { Generator } from '@eventiva/envs.generator'
import { DiscordChangelog } from '@eventiva/workflows.discord-changelog'
import { GenerateChangelogTask } from '@eventiva/workflows.generate-changelog'
import { CAPSULE_ARTIFACTS_DIR, Pipeline } from '@teambit/builder'
import { Compiler } from '@teambit/compiler'
import { EslintConfigWriter, ESLintLinter } from '@teambit/defender.eslint-linter'
import { PrettierConfigWriter, PrettierFormatter } from '@teambit/defender.prettier-formatter'
import { EnvHandler } from '@teambit/envs'
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

// Disable v8-caching because it breaks ESM loaders
NativeCompileCache.uninstall()

/**
 * Class representing a Node that extends HarmonyEnv.
 * A shorthand name for the environment is 'node'.
 * The Node class includes a generator method.
 * @author Jonathan Stevens (@TGTGamer)
 *
 * @export
 * @class
 * @extends {HarmonyEnv}
 */
export class Node
    extends SymphonyEnv {

    /* shorthand name for the environment */
    /**
     * shorthand name for the environment
     * @author Jonathan Stevens (@TGTGamer)
     */
    name = 'Eventiva Node Environment'

    /**
     * Default npm ignore paths.
     * Will ignore the "artifacts" directory by default.
     */
    npmIgnore = [ `${ CAPSULE_ARTIFACTS_DIR }/` ]

    /**
     * The path to the tsconfig.json file resolved using require.resolve() function and marked as protected.
     *
     * @protected
     * @type {*}
     */
    protected tsconfigPath = require.resolve( './config/tsconfig.json' )

    /**
     * A protected property that stores the path to the TypeScript types directory, which is set to './types'.
     *
     * @protected
     * @type {string}
     */
    protected tsTypesPath = './types'

    /**
     * The path to the Jest configuration file, resolved using require.resolve()
     *
     * @protected
     * @type {*}
     */
    protected jestConfigPath = require.resolve( './config/jest.config' )

    /**
     * The path to the eslint configuration file, resolved using require.resolve method, pointing to './config/eslintrc.js'. This property is marked as protected.
     *
     * @protected
     * @type {*}
     */
    protected eslintConfigPath = require.resolve( './config/eslintrc.js' )

    /**
     * A property that stores an array of file extensions supported by ESLint. It includes the extensions ['.ts', '.tsx', '.js', '.jsx', '.mjs'].
     *
     * @protected
     * @type {{}}
     */
    protected eslintExtensions = [ '.ts', '.tsx', '.js', '.jsx', '.mjs' ]

    /**
     * The path to the Prettier configuration file, resolved using require.resolve to './config/prettier.config.js'. This property is protected and stores the absolute path to the Prettier configuration file.
     *
     * @protected
     * @type {*}
     */
    protected prettierConfigPath = require.resolve( './config/prettier.config.js' )

    /**
     * An array of file extensions supported by Prettier for formatting. Includes extensions commonly used in JavaScript, TypeScript, JSON, CSS, SCSS, Markdown, HTML, and YAML files.
     *
     * @protected
     * @type {{}}
     */
    protected prettierExtensions = [
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.mjs',
        '.cjs',
        '.json',
        '.css',
        '.scss',
        '.md',
        '.mdx',
        '.html',
        '.yml',
        '.yaml'
    ]

    /**
     * A protected property that holds the resolved path to the mounter file in the preview directory.
     *
     * @protected
     * @type {*}
     */
    protected previewMounter = require.resolve( './preview/mounter' )

    /**
     * A generator function.
     * @author Jonathan Stevens (@TGTGamer)
     */
    generators () {
        return Generator( {
            templates: [
                NodeEnvTemplate.from(),
                NodeModuleTemplate.from(),
                // PlatformTemplate.from(),
                NodeAppTemplate.from()
                // ExpressAppTemplate.from(),
                // BitAppTemplate.from(),
                // GraphQLServerTemplate.from()
            ]
        } )
    }

    /**
     * return an instance of a Compiler. use components like typescript-compiler (teambit.typescript/typescript-compiler)
     * or our babel-compiler (teambit.compilation/babel-compiler).
     * @example
     * return TypescriptCompiler.from({
     *  tsconfig: require.resolve("./config/tsconfig.json"), // path to tsconfig.json
     *  types: resolveTypes(__dirname, ["./types"]),
     *  typescript,
     * });
     */
    compiler (): EnvHandler<Compiler> {
        return TypescriptCompiler.from( {
            esm: true,
            tsconfig: this.tsconfigPath,
            types: resolveTypes( __dirname, [ this.tsTypesPath ] )
        } )
    }

    /**
     * returns an instance of a Bit tester implementation. use components like mocha-tester or
     * jest-tester or [build your own](http/://bit.dev/reference/testing/set-up-tester).
     */
    tester (): EnvHandler<Tester> {
        return VitestTester.from( {
            config: require.resolve( './config/vitest.config.mjs' )
        } )
    }

    /**
     * return an instance of a Bit preview instance. used for preview purposes.
     * base preview is a general purpose webpack preview.
     */
    preview (): EnvHandler<Preview> {
        return ReactPreview.from( {
            previewConfig: {
                splitComponentBundle: false,
                strategyName: 'component'
            }
        } )
    }

    /**
     * returns an instance of the default ESLint.
     * config files would be used to validate coding standards in components.
     * bit will write the minimum required files in any workspace to optimize
     * for dev experience.
     */
    linter () {
        return ESLintLinter.from( {
            tsconfig: this.tsconfigPath,
            configPath: this.eslintConfigPath,
            // resolve all plugins from the react environment.
            pluginsPath: __dirname,
            extensions: this.eslintExtensions
        } )
    }

    /**
     * used by bit's formatter. helps to standardize and automate
     * code styling. can be used a build task or using bit lint and common
     * ides.
     */
    formatter () {
        return PrettierFormatter.from( {
            configPath: this.prettierConfigPath
        } )
    }

    /**
     * define the build pipeline for a component.
     * pipelines are optimized for performance and consistency.
     * making sure every component is independently built and tested.
     */
    build () {
        return Pipeline.from( [
            TypescriptTask.from( {
                tsconfig: this.tsconfigPath,
                types: resolveTypes( __dirname, [ this.tsTypesPath ] )
            } ),
            VitestTask.from( {
                config: require.resolve( './config/vitest.config.mjs' )
            } )
        ] )
    }

    /**
     * add build tasks to execute upon [snap](https://bit.dev/docs/snaps).
     * use the snap pipeline for staging and test deployments
     */
    snap () {
        return Pipeline.from( [
            GenerateChangelogTask.from(),
            DiscordChangelog.from()
        ] )
    }

    /**
     * add build tasks to execute upon [tag](https://bit.dev/docs/tags).
     * use the tag pipeline for deployments, or other tasks required for
     * publishing a semantic version for a component.
     */
    tag () {
        return Pipeline.from( [
            GenerateChangelogTask.from(),
            DiscordChangelog.from()
        ] )
    }

    /**
     * configure and control the packaging process of components.
     */
    package () {
        return PackageGenerator.from( {
            packageJson: {
                main: 'dist/{main}.js',
                types: '{main}.ts',
                type: 'module'
            },
            npmIgnore: this.npmIgnore
        } )
    }

    /**
     * Returns a ConfigWriterList instance with TypescriptConfigWriter, EslintConfigWriter, and PrettierConfigWriter configurations based on the paths provided
     *
     * @returns {ConfigWriterList} Returns a list of ConfigWriter objects including TypescriptConfigWriter, EslintConfigWriter, and PrettierConfigWriter with their respective configurations.
     */
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

    /**
     * returns an instance of the default TypeScript extractor.
     * used by default for type inference for both JS and TS.
     */
    schemaExtractor (): EnvHandler<SchemaExtractor> {
        return TypeScriptExtractor.from( {
            tsconfig: require.resolve( './config/tsconfig.json' )
        } )
    }
}

export default new Node()
