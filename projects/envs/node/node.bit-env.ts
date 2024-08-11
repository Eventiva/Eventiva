/*
 * Project: Eventiva
 * File: node.bit-env.ts
 * Last Modified: 11/08/2024, 21:17
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

import { NodeEnv as BitdevNode } from '@bitdev/node.node-env'
import { HarmonyWorkspaceStarter } from '@bitdev/symphony.generators.symphony-starters'
import { tailwindConfig } from '@eventiva/modules.design-system-package'
import { DiscordChangelog } from '@eventiva/workflows.discord-changelog'
import { GenerateChangelogTask } from '@eventiva/workflows.generate-changelog'
import { ShadcnUiTemplate } from '@frontend/shadcn-ui.generators.shadcn-ui'
import { tailwindTransformer } from '@frontend/tailwind.transformers.tailwind'
import { Pipeline } from '@teambit/builder'
import { Compiler } from '@teambit/compiler'
import { ESLintLinter } from '@teambit/defender.eslint-linter'
import { PrettierFormatter } from '@teambit/defender.prettier-formatter'
import { EnvHandler } from '@teambit/envs'
import { StarterList, TemplateList } from '@teambit/generator'
import { PackageGenerator } from '@teambit/pkg'
import type { Preview } from '@teambit/preview'
import { ReactPreview } from '@teambit/preview.react-preview'
import { Tester } from '@teambit/tester'
import { NativeCompileCache } from '@teambit/toolbox.performance.v8-cache'
import { resolveTypes, TypescriptCompiler, TypescriptTask } from '@teambit/typescript.typescript-compiler'
import { VitestTask, VitestTester } from '@teambit/vite.vitest-tester'
import { createRequire } from 'node:module'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// Disable v8-caching because it breaks ESM loaders
NativeCompileCache.uninstall()

const localRequire = createRequire( import.meta.url )
const fileFolderPath = dirname( fileURLToPath( import.meta.url ) )

export class NodeEnv
    extends BitdevNode {

    /* shorthand name for the environment */
    name = 'eventiva-env'

    type = 'harmony'

    icon = 'https://static.bit.dev/extensions-icons/harmony.svg'

    protected tsconfigPath = localRequire.resolve( './config/tsconfig.json' )

    protected tsTypesPath = './types'

    protected eslintConfigPath = localRequire.resolve( './config/eslintrc.cjs' )

    protected eslintExtensions = [ '.ts', '.tsx', '.js', '.jsx', '.mjs' ]

    protected prettierConfigPath = localRequire.resolve( './config/prettier.config.cjs' )

    protected previewMounter = localRequire.resolve( './preview/mounter.js' )

    override compiler (): EnvHandler<Compiler> {
        return TypescriptCompiler.from( {
            tsconfig: this.tsconfigPath,
            esm: true,
            types: resolveTypes( fileFolderPath, [ this.tsTypesPath ] )
        } )
    }

    override tester (): EnvHandler<Tester> {
        return VitestTester.from( {
            config: localRequire.resolve( './config/vitest.config.mjs' )
        } )
    }

    override linter () {
        return ESLintLinter.from( {
            tsconfig: this.tsconfigPath,
            configPath: this.eslintConfigPath,
            pluginsPath: fileFolderPath,
            extensions: this.eslintExtensions
        } )
    }

    override preview (): EnvHandler<Preview> {
        return ReactPreview.from( {
            mounter: this.previewMounter,
            previewConfig: {
                splitComponentBundle: false,
                strategyName: 'component'
            },
            transformers: [
                tailwindTransformer( {
                    config: tailwindConfig,
                    cdn: true
                } )
            ]
        } )
    }

    override generators () {
        return TemplateList.from( [
            // SymphonyTemplates(),
            ShadcnUiTemplate.from( {
                style: 'new-york'
            } )
        ] )
    }

    // override generators () {
    //     return Generator( {
    //         templates: [
    //             NodeEnvTemplate.from(),
    //             NodeModuleTemplate.from(),
    //             // PlatformTemplate.from(),
    //             NodeAppTemplate.from()
    //             // ExpressAppTemplate.from(),
    //             // BitAppTemplate.from(),
    //             // GraphQLServerTemplate.from()
    //         ]
    //     } )
    // }

    /**
     * the formatter to use during development
     * (source files are not formatted as part of the components' build)
     */
    override formatter () {
        return PrettierFormatter.from( {
            configPath: this.prettierConfigPath
        } )
    }

    override package () {
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
     * define the build pipeline for a component.
     * pipelines are optimized for performance and consistency.
     * making sure every component is independently built and tested.
     */
    override build () {
        return Pipeline.from( [
            TypescriptTask.from( {
                tsconfig: this.tsconfigPath,
                types: resolveTypes( fileFolderPath, [ this.tsTypesPath ] )
            } ),
            VitestTask.from( {
                config: localRequire.resolve( './config/vitest.config.mjs' )
            } )
        ] )
    }

    override starters () {
        return StarterList.from( [
            HarmonyWorkspaceStarter.from()
        ] )
    }

    // override snap () {
    //     return Pipeline.from( [] )
    // }

    override tag () {
        return Pipeline.from( [
            GenerateChangelogTask.from(),
            DiscordChangelog.from()
        ] )
    }
}

export default new NodeEnv()
