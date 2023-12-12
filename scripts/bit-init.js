/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: bit-init.js
 * Path: \scripts\bit-init.js
 * Created Date: Tuesday, December 12th 2023
 * Author: Jonathan Stevens (Email: jonathan.stevens@eventiva.co.uk, Github: https://github.com/TGTGamer)
 * -----
 * Contributing: Please read through our contributing guidelines. Included are directions for opening
 * issues, coding standards, and notes on development. These can be found at https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
 * 
 * Code of Conduct: This project abides by the Contributor Covenant, version 2.0. Please interact in ways that contribute to an open,
 * welcoming, diverse, inclusive, and healthy community. Our Code of Conduct can be found at https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
 * -----
 * Copyright (c) 2023 Eventiva - All Rights Reserved
 * LICENSE: GNU General Public License v3.0 only (GPL-3.0)
 * -----
 * This program has been provided under confidence of the copyright holder and is 
 * licensed for copying, distribution and modification under the terms of
 * the GNU General Public License v3.0 only (GPL-3.0) published as the License,
 * or (at your option) any later version of this license.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License v3.0 only for more details.
 * 
 * You should have received a copy of the GNU General Public License v3.0 only
 * along with this program. If not, please write to: jonathan.stevens@eventiva.co.uk,
 * or see https://www.gnu.org/licenses/gpl-3.0-standalone.html
 * 
 * DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE - PLEASE SEE THE LICENSE FILE FOR DETAILS
 * -----
 * Last Modified: 12-12-2023
 * By: Jonathan Stevens (Email: jonathan.stevens@eventiva.co.uk, Github: https://github.com/TGTGamer)
 */

const { execSync } = require("child_process");

const run = async (wsdir) => {
  const bitVersion = ""; // Leave empty for latest version
  await exec("npm i -g @teambit/bvm");
  await exec(`bvm install ${bitVersion} --use-system-node`);
  process.env.PATH = `${process.env.HOME}/bin:` + process.env.PATH; // This step may change depending on your CI runner

  execSync("bit install", { cwd: wsdir, shell: "/bin/bash" });
};

module.exports = run;
