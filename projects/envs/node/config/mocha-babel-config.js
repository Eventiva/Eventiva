/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: mocha-babel-config.js
 * Path: /projects/envs/node/config/mocha-babel-config.js
 * Created Date: Tuesday, March 19th 2024
 * Author: Jonathan Stevens (Email: jonathan@resnovas.com
 * Github: https://github.com/TGTGamer)
 * -----
 * Contributing: Please read through our contributing guidelines.
 * Included are directions for opening issues, coding standards,
 * and notes on development. These can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 *
 * Code of Conduct: This project abides by the Contributor Covenant, version 2.0.
 * Please interact in ways that contribute to an open, welcoming, diverse,
 * inclusive, and healthy community. Our Code of Conduct can be found at
 * https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 * -----
 * Copyright (c) 2024 Resnovas - All Rights Reserved
 * LICENSE: GNU General Public License v2.0 or later (GPL-2.0-or-later)
 * -----
 * This program has been provided under confidence of the copyright holder and
 * is licensed for copying, distribution and modification under the terms
 * of the GNU General Public License v2.0 or later (GPL-2.0-or-later)
 * published as the License, or (at your option) any later
 * version of this license.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License v2.0 or later for more details.
 * You should have received a copy of the GNU General Public License v2.0 or later
 * along with this program. If not, please write to: jonathan@resnovas.com,
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

const presets = [
  require.resolve('@babel/preset-typescript'),
  [
    require.resolve('@babel/preset-env'),
    {
      targets: {
        node: 18,
      },
      // useBuiltIns: 'usage',
      // corejs: 3,
    },
  ],
];
const plugins = [
  // [
    // require.resolve('@babel/plugin-transform-modules-commonjs'),
    // {
    //   lazy: () => true,
    // },
  // ],
  // require.resolve('@babel/plugin-transform-modules-commonjs'),
  require.resolve('babel-plugin-transform-typescript-metadata'),
  [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
  // [require.resolve('@babel/plugin-transform-runtime')],
  [require.resolve('@babel/plugin-transform-object-rest-spread')],
  [require.resolve('@babel/plugin-transform-class-properties')],
];

module.exports = {
  presets,
  plugins,
  sourceMaps: true,
};
