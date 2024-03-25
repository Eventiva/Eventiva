/*
 * Project: Eventiva
 * File: mikro.bit-env.ts
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

/**
 * this env extends the Bit official NodeJS environment.
 * learn more: https://bit.cloud/bitdev/node/node-env
 */
import { NodeEnv } from '@eventiva/envs.node'

/**
 * A class named Mikro that extends NodeEnv. It has a property 'name' representing the shorthand name for the environment. It contains a method 'build' that returns a Pipeline built from various tasks such as TypescriptTask, EslintTask, and VitestTask.
 *
 * @export
 * @class Mikro

 * @extends {NodeEnv}
 */
export class Mikro
    extends NodeEnv {
    /* shorthand name for the environment */
    /**
     * shorthand name for the environment
     *
     * @type {string}
     */
    name = 'mikro'

    /**
     * Builds and returns a pipeline with TypeScript, ESLint, and Vitest tasks. The pipeline consists of a TypeScript task with the provided tsconfig path and types resolved from the given tsTypesPath. It also includes an ESLint task with the tsconfig path, ESLint config path, plugins path, and specified extensions. Additionally, it includes a Vitest task with the config resolved from the vitest.config.mjs file.
     *
     * @returns {*} Returns a pipeline with TypeScriptTask, EslintTask, and VitestTask tasks with specified configurations and paths.
     */
    build () {
        return super.build().add( [] )
    }
}

export default new Mikro()
