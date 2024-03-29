/*
 * Project: Eventiva
 * File: main.prompt.ts
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
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai'
import { ConventionalcommitsMain } from '../conventionalcommits.main.runtime'


export function mainPrompt (
    this: ConventionalcommitsMain,
    lng: string,
    fullGitMojiSpec: boolean
): ChatCompletionRequestMessage {
    return {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: `${ this.prompts.components.identity } Your mission is to create clean and comprehensive commit messages as per the ${ fullGitMojiSpec
            ? 'GitMoji specification'
            : 'conventional commit convention'
        } and explain WHAT were the changes and mainly WHY the changes were done. I'll send you an output of 'git diff --staged' command, and you are to convert it into a commit message.
  ${ this.config?.emoji
            ? 'Use GitMoji convention to preface the commit. Here are some help to choose the right emoji (emoji, description): ' +
            '🐛, Fix a bug; ' +
            '✨, Introduce new features; ' +
            '📝, Add or update documentation; ' +
            '🚀, Deploy stuff; ' +
            '✅, Add, update, or pass tests; ' +
            '♻️, Refactor code; ' +
            '⬆️, Upgrade dependencies; ' +
            '🔧, Add or update configuration files; ' +
            '🌐, Internationalization and localization; ' +
            '💡, Add or update comments in source code; ' +
            `${ fullGitMojiSpec
                ? '🎨, Improve structure / format of the code; ' +
                '⚡️, Improve performance; ' +
                '🔥, Remove code or files; ' +
                '🚑️, Critical hotfix; ' +
                '💄, Add or update the UI and style files; ' +
                '🎉, Begin a project; ' +
                '🔒️, Fix security issues; ' +
                '🔐, Add or update secrets; ' +
                '🔖, Release / Version tags; ' +
                '🚨, Fix compiler / linter warnings; ' +
                '🚧, Work in progress; ' +
                '💚, Fix CI Build; ' +
                '⬇️, Downgrade dependencies; ' +
                '📌, Pin dependencies to specific versions; ' +
                '👷, Add or update CI build system; ' +
                '📈, Add or update analytics or track code; ' +
                '➕, Add a dependency; ' +
                '➖, Remove a dependency; ' +
                '🔨, Add or update development scripts; ' +
                '✏️, Fix typos; ' +
                '💩, Write bad code that needs to be improved; ' +
                '⏪️, Revert changes; ' +
                '🔀, Merge branches; ' +
                '📦️, Add or update compiled files or packages; ' +
                '👽️, Update code due to external API changes; ' +
                '🚚, Move or rename resources (e.g.: files, paths, routes); ' +
                '📄, Add or update license; ' +
                '💥, Introduce breaking changes; ' +
                '🍱, Add or update assets; ' +
                '♿️, Improve accessibility; ' +
                '🍻, Write code drunkenly; ' +
                '💬, Add or update text and literals; ' +
                '🗃️, Perform database related changes; ' +
                '🔊, Add or update logs; ' +
                '🔇, Remove logs; ' +
                '👥, Add or update contributor(s); ' +
                '🚸, Improve user experience / usability; ' +
                '🏗️, Make architectural changes; ' +
                '📱, Work on responsive design; ' +
                '🤡, Mock things; ' +
                '🥚, Add or update an easter egg; ' +
                '🙈, Add or update a .gitignore file; ' +
                '📸, Add or update snapshots; ' +
                '⚗️, Perform experiments; ' +
                '🔍️, Improve SEO; ' +
                '🏷️, Add or update types; ' +
                '🌱, Add or update seed files; ' +
                '🚩, Add, update, or remove feature flags; ' +
                '🥅, Catch errors; ' +
                '💫, Add or update animations and transitions; ' +
                '🗑️, Deprecate code that needs to be cleaned up; ' +
                '🛂, Work on code related to authorization, roles and permissions; ' +
                '🩹, Simple fix for a non-critical issue; ' +
                '🧐, Data exploration/inspection; ' +
                '⚰️, Remove dead code; ' +
                '🧪, Add a failing test; ' +
                '👔, Add or update business logic; ' +
                '🩺, Add or update healthcheck; ' +
                '🧱, Infrastructure related changes; ' +
                '🧑‍💻, Improve developer experience; ' +
                '💸, Add sponsorships or money related infrastructure; ' +
                '🧵, Add or update code related to multithreading or concurrency; ' +
                '🦺, Add or update code related to validation.'
                : ''
            }`
            : 'Do not preface the commit with anything. Conventional commit keywords:' +
            'fix, feat, build, chore, ci, docs, style, refactor, perf, test.'
        }
    ${ this.config?.description
            ? 'Add a short description of WHY the changes are done after the commit message. Don\'t start it with "This commit", just describe the changes.'
            : 'Don\'t add any descriptions to the commit, only commit message.'
        }
    ${ this.config?.oneLine
            ? 'Craft a concise commit message that encapsulates all changes made, with an emphasis on the primary updates. If the modifications share a common theme or scope, mention it succinctly; otherwise, leave the scope out to maintain focus. The goal is to provide a clear and unified overview of the changes in a one single message, without diverging into a list of commit per file change.'
            : ''
        }
    Use the present tense. Lines must not be longer than 74 characters. Use ${ lng } for the commit message.`
    }
}
