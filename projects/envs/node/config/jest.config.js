/*
 * Project: Eventiva
 * File: jest.config.js
 * Created Date: Wednesday, January 31st 2024
 * Last Modified: 3/23/24, 11:52 PM
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
 * LICENSE: GNU General Public License v2.0 or later (GPL-2.0-or-later)
 * -----
 * This program has been provided under confidence of the copyright holder and
 * is licensed for copying, distribution and modification under the terms
 * of the GNU General Public License v2.0 or later (GPL-2.0-or-later) published as the License,
 * or (at your option) any later version of this license.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License v2.0 or later for more details.
 * You should have received a copy of the GNU General Public License v2.0 or later
 * along with this program. If not, please write to: licensing@eventiva.co.uk,
 * or see https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html
 * -----
 * This project abides by the GPL Cooperation Commitment.
 * Before filing or continuing to prosecute any legal proceeding or claim
 * (other than a Defensive Action) arising from termination of a Covered
 * License, we commit to extend to the person or entity ('you') accused
 * of violating the Covered License the following provisions regarding
 * cure and reinstatement, taken from GPL version 3.
 * For further details on the GPL Cooperation Commitment please visit
 * the official website: https://gplcc.github.io/gplcc/
 * -----
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
 */

// Override the Jest config to ignore transpiling from specific folders
// See the base Jest config: https://bit.cloud/teambit/react/react/~code/jest/jest.config.js

const { jestConfig } = require('@teambit/react.react-env')

/**
 * Exports the function `generateNodeModulesPattern` from the package `@teambit/dependencies.modules.packages-excluder`.
 *
 * @type {*}
 */
const {
  generateNodeModulesPattern,
} = require('@teambit/dependencies.modules.packages-excluder');
// const { esmConfig } = require('@teambit/react.jest.react-jest');

/**
 * An array containing package names to exclude from a specified operation or process.
 *
 * @type {{}}
 */
const packagesToExclude = ['@teambit', '@my-org', 'my-package-name'];

module.exports = {
  // ...esmConfig,
  ...jestConfig,
  testEnvironment: 'node',
  setupFiles: [],
  setupFilesAfterEnv: [],
  transformIgnorePatterns: [
    '^.+.module.(css|sass|scss)$',
    generateNodeModulesPattern({
      packages: packagesToExclude,
      excludeComponents: true,
    }),
  ],
};
