/**
 * @format
 * -----
 * Project: @eventiva/eventiva
 * File: generator.ts
 * Path: /projects/envs/generator/generator.ts
 * Created Date: Saturday, March 16th 2024
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

import { TemplatesOptions } from './template-options'
import { SymphonyTemplates } from '@eventiva/modules.generators.symphony-templates'

/**
 * Create a list of Harmony templates.
 */
export function Generator(options: TemplatesOptions = {}) {
    return SymphonyTemplates({
        ...options,
        platformName: options.platformName || 'eventiva-platform',

        runtimes: [
            ...(options.runtimes || []),
            {
                name: 'discord',
                dependencies: [['eventiva.bots/aspects/discordjs', {
                    extraImports: [
                        "DiscordJsModule",
                        "type Event",
                        "type Command",
                        "type Resources"
                    ]
                }]],
                imports: (context) => [
                    [`import { ModuleConfig } from "@eventiva/bots.aspects.discordjs";`, { config: true, aspect: false }]
                ],
                classExtends: (context) => [`DiscordJsModule<${context.namePascalCase}Config>`, { super: `super(config, discordjsDiscord)` }],
                methods: (context) => `public resources: Resources = {};

  public registerEvents(reload?: true) {
    this.discord.registerEvent(this, [
    // add any events here
    ] as Event<any>[])
    return this
  }

  public registerCommands(reload?: true) {
    this.discord.registerCommand(this, [
    // add any commands here
    ] as Command[])
    return this;
  }
      `,
                configExtends: (context) => [`ModuleConfig`, {
                    config: `name: "${context.namePascalCase}Module",
    logger: {
      level: "info",
    }`}],
                provider: (context) => `${context.nameCamelCase}.log.trace(${context.nameCamelCase}.discord.i18n.t("discord:modules.registering", { name: ${context.nameCamelCase}.name }))
    ${context.nameCamelCase}.discord.registerModule(${context.nameCamelCase})
    ${context.nameCamelCase}.log.trace(${context.nameCamelCase}.discord.i18n.t("discord:modules.registered", { name: ${context.nameCamelCase}.name }))`,
            },
        ]
    })
}